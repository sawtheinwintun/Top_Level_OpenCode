# Cartoon Ink Studio

Web app for approved members to turn one photo into a cartoon illustration using Google Gemini, with a Myanmar/English toggle and a separate admin approval desk.

## Folder structure

```
frontend/          # pages, styles, UI logic
  index.html       # user studio (protected)
  login.html       # user login + registration
  admin.html       # hardcoded admin desk
  style.css
  script.js
backend/
  supabase.js      # config placeholders + Supabase helpers
  api.js           # Gemini transform + download helpers
supabase/
  schema.sql       # tables, RLS, admin RPCs, storage bucket
```

## 1. Supabase setup

1. Create a project at [https://supabase.com](https://supabase.com).
2. Open **SQL Editor**, paste and run `supabase/schema.sql`.
3. In that SQL, replace **every** `CHANGE_ME_ADMIN_RPC_SECRET` with a long random string (same value in all three functions).
4. **Authentication → Providers → Email**: turn **Confirm email** off for local/hackathon use, so signup works immediately.
5. **Project Settings → API**: copy Project URL and `anon` `public` key.
6. **Storage**: the SQL creates a public bucket named `uploads`. Confirm it exists.

## 2. Keys in code

Edit `backend/supabase.js`:

```js
SUPABASE_URL: "https://YOUR_PROJECT.supabase.co",
SUPABASE_ANON_KEY: "eyJ...",
GEMINI_API_KEY: "AIza...",
ADMIN_RPC_SECRET: "the-same-secret-as-in-schema.sql",
```

Admin login (separate from Supabase Auth):

- Email: `admin@hackathon.com`
- Password: `admin123`

Change these in `APP_CONFIG` if you want.

## 3. Gemini API

1. Create a key in [Google AI Studio](https://aistudio.google.com/apikey).
2. Put it in `GEMINI_API_KEY`.
3. Default model: `gemini-2.5-flash-image` (image edit / cartoon). If your project cannot use that model, change `GEMINI_MODEL`. If image output fails, the app falls back to `gemini-2.0-flash` and writes a short cartoon **story** instead.

The browser calls Gemini directly. That exposes the key to anyone who opens DevTools. Fine for a demo; for production, proxy Gemini from a server.

## 4. Run locally

Serve the project root (not only `frontend/`), so `../backend/` scripts load:

```bash
npx --yes serve .
```

Then open:

- Members: `/frontend/login.html`
- Studio: `/frontend/index.html` (after approval)
- Admin: `/frontend/admin.html`

## How the approval flow works

1. User registers with email/password → Supabase Auth user + `profiles.status = pending`.
2. Login is blocked until an admin sets status to `approved`.
3. Admin is **not** a Supabase user. The admin page checks the hardcoded password, then calls `admin_list_users`, `admin_set_status`, and `admin_delete_user` with `ADMIN_RPC_SECRET`.

## Notes

- Mobile-first layout, language toggle in the header (persists in `localStorage`).
- One image at a time; **Reset** clears preview and result.
- Generated files are stored under `uploads/{userId}/` when Storage policies succeed.
