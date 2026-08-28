-- Run this ENTIRE file once in the Supabase SQL Editor.
-- Secret must match backend/supabase.js ADMIN_RPC_SECRET.

-- 1) Clean old objects
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user() cascade;
drop function if exists public.check_user_approved(text) cascade;
drop function if exists public.admin_list_users(text) cascade;
drop function if exists public.admin_set_status(text, uuid, text) cascade;
drop function if exists public.admin_delete_user(text, uuid) cascade;
drop function if exists public.is_approved() cascade;
drop function if exists public.ensure_own_profile() cascade;
drop table if exists public.generations cascade;
drop table if exists public.profiles cascade;

-- 2) Tables
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table public.generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  original_path text,
  result_path text,
  result_type text,
  story_text text,
  created_at timestamptz not null default timezone('utc'::text, now())
);

-- 3) Trigger: never block Auth signup if profile insert has a problem
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, status)
  values (new.id, new.email, 'pending')
  on conflict (id) do nothing;
  return new;
exception
  when others then
    -- Signup must still succeed even if this insert is blocked.
    return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- 4) Login helper
create or replace function public.check_user_approved(p_email text)
returns boolean
language plpgsql
security definer
stable
set search_path = public
as $$
declare
  v_status text;
begin
  select pr.status into v_status
  from public.profiles as pr
  where lower(coalesce(pr.email, '')) = lower(trim(p_email))
  limit 1;
  return v_status is not distinct from 'approved';
end;
$$;

create or replace function public.is_approved()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles as pr
    where pr.id = auth.uid() and pr.status = 'approved'
  );
$$;

-- Called after signup while the new session still exists
create or replace function public.ensure_own_profile()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    return;
  end if;
  insert into public.profiles (id, email, status)
  values (auth.uid(), coalesce(auth.jwt() ->> 'email', ''), 'pending')
  on conflict (id) do nothing;
end;
$$;

-- 5) Admin RPCs (secret: my_hackathon_secret_123)
create or replace function public.admin_list_users(p_secret text)
returns table (
  id uuid,
  email text,
  status text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_secret is distinct from 'my_hackathon_secret_123' then
    raise exception 'Invalid secret';
  end if;
  return query
  select pr.id, pr.email, pr.status, pr.created_at
  from public.profiles as pr
  order by pr.created_at desc;
end;
$$;

create or replace function public.admin_set_status(p_secret text, p_user_id uuid, p_status text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_secret is distinct from 'my_hackathon_secret_123' then
    raise exception 'Invalid secret';
  end if;
  if p_status not in ('pending', 'approved', 'rejected') then
    raise exception 'Invalid status';
  end if;
  update public.profiles as pr
  set status = p_status, updated_at = timezone('utc'::text, now())
  where pr.id = p_user_id;
end;
$$;

create or replace function public.admin_delete_user(p_secret text, p_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_secret is distinct from 'my_hackathon_secret_123' then
    raise exception 'Invalid secret';
  end if;
  delete from auth.users where auth.users.id = p_user_id;
end;
$$;

-- 6) Grants (required for the browser / anon key)
grant usage on schema public to anon, authenticated;

grant select, insert on table public.profiles to authenticated;
grant select, insert on table public.generations to authenticated;

grant execute on function public.check_user_approved(text) to anon, authenticated;
grant execute on function public.ensure_own_profile() to authenticated;
grant execute on function public.is_approved() to authenticated;
grant execute on function public.admin_list_users(text) to anon, authenticated;
grant execute on function public.admin_set_status(text, uuid, text) to anon, authenticated;
grant execute on function public.admin_delete_user(text, uuid) to anon, authenticated;

-- 7) RLS policies (RLS without policies blocks EVERY insert, including signup)
alter table public.profiles enable row level security;
alter table public.generations enable row level security;

create policy "profiles_select_own"
  on public.profiles for select to authenticated
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert to authenticated
  with check (auth.uid() = id);

create policy "generations_select_own_approved"
  on public.generations for select to authenticated
  using (auth.uid() = user_id and public.is_approved());

create policy "generations_insert_own_approved"
  on public.generations for insert to authenticated
  with check (auth.uid() = user_id and public.is_approved());

-- 8) Existing Auth users who have no profile yet
insert into public.profiles (id, email, status)
select u.id, u.email, 'pending'
from auth.users u
on conflict (id) do nothing;

notify pgrst, 'reload schema';
