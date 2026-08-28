/**
 * App config + Supabase client helpers.
 * Fill in the placeholders before running the app.
 */
window.APP_CONFIG = {
  SUPABASE_URL: "https://tmyarkocndojhdtxsbns.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRteWFya29jbmRvamhkdHhzYm5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4MjY3OTIsImV4cCI6MjEwMzQwMjc5Mn0.KP8iyycJrqOUJBaE3GbRiJS1q1aRcXKrQDG6yUCbKbo",
  /** OpenRouter key (sk-or-v1-...). Used as Bearer token in backend/api.js */
  GEMINI_API_KEY: "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",
  GEMINI_MODEL: "google/gemini-2.0-flash-exp:free",
  OPENROUTER_URL: "https://openrouter.ai/api/v1/chat/completions",
  ADMIN_EMAIL: "admin@hackathon.com",
  ADMIN_PASSWORD: "admin123",
  /** Must match the secret in supabase/schema.sql */
  ADMIN_RPC_SECRET: "my_hackathon_secret_123",
  STORAGE_BUCKET: "uploads",
};

window.AppDB = (() => {
  const { createClient } = window.supabase;
  const cfg = window.APP_CONFIG;

  function client() {
    if (!cfg.SUPABASE_URL || cfg.SUPABASE_URL.startsWith("YOUR_")) {
      throw new Error("Supabase is not configured. Edit backend/supabase.js.");
    }
    if (!window.__sb) {
      window.__sb = createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
    }
    return window.__sb;
  }

  function authError(error) {
    const msg = String(error?.message || error || "");
    const low = msg.toLowerCase();
    if (low.includes("already registered") || low.includes("already been registered")) {
      return new Error("EMAIL_TAKEN");
    }
    if (low.includes("database error saving new user")) {
      return new Error("SIGNUP_DB");
    }
    if (low.includes("password")) {
      return new Error("WEAK_PASSWORD");
    }
    if (low.includes("rate limit") || low.includes("email rate")) {
      return new Error("RATE_LIMIT");
    }
    return error instanceof Error ? error : new Error(msg || "SIGNUP_FAILED");
  }

  async function signUp(email, password) {
    const { data, error } = await client().auth.signUp({
      email: String(email || "").trim(),
      password,
    });
    if (error) throw authError(error);

    const user = data.user;
    if (!user) throw new Error("SIGNUP_FAILED");

    // Supabase returns an empty identities list when the email already exists.
    if (Array.isArray(user.identities) && user.identities.length === 0) {
      if (data.session) await client().auth.signOut();
      throw new Error("EMAIL_TAKEN");
    }

    if (data.session) {
      try {
        await client().rpc("ensure_own_profile");
      } catch (_) {
        await client().from("profiles").upsert(
          { id: user.id, email: user.email || email, status: "pending" },
          { onConflict: "id" }
        );
      }
      await client().auth.signOut();
    }
    return data;
  }

  async function isEmailApproved(email) {
    const { data, error } = await client().rpc("check_user_approved", {
      p_email: String(email || "").trim(),
    });
    if (error) throw error;
    return data === true;
  }

  async function signIn(email, password) {
    const { data, error } = await client().auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    try {
      const approved = await isEmailApproved(email);
      const profile = await getMyProfile();

      if (!approved) {
        await client().auth.signOut();
        if (!profile) throw new Error("PROFILE_MISSING");
        if (profile.status === "rejected") throw new Error("REJECTED");
        throw new Error("PENDING");
      }
      if (!profile || profile.status !== "approved") {
        await client().auth.signOut();
        throw new Error("PENDING");
      }
      return { session: data.session, profile };
    } catch (err) {
      await client().auth.signOut();
      throw err;
    }
  }

  async function signOut() {
    await client().auth.signOut();
  }

  async function getSession() {
    const { data } = await client().auth.getSession();
    return data.session;
  }

  async function getMyProfile() {
    const session = await getSession();
    if (!session?.user) return null;
    const { data, error } = await client()
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .maybeSingle();
    if (error) throw error;
    return data;
  }

  async function saveGeneration({ originalPath, resultPath, resultType, storyText }) {
    const session = await getSession();
    if (!session?.user) throw new Error("Not signed in");
    const { data, error } = await client()
      .from("generations")
      .insert({
        user_id: session.user.id,
        original_path: originalPath,
        result_path: resultPath,
        result_type: resultType,
        story_text: storyText || null,
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async function uploadFile(path, fileOrBlob, contentType) {
    const { error } = await client()
      .storage.from(cfg.STORAGE_BUCKET)
      .upload(path, fileOrBlob, { contentType, upsert: true });
    if (error) throw error;
    const { data } = client().storage.from(cfg.STORAGE_BUCKET).getPublicUrl(path);
    return data.publicUrl;
  }

  async function adminListUsers() {
    const { data, error } = await client().rpc("admin_list_users", {
      p_secret: cfg.ADMIN_RPC_SECRET,
    });
    if (error) throw error;
    return data || [];
  }

  async function adminSetStatus(userId, status) {
    const { error } = await client().rpc("admin_set_status", {
      p_secret: cfg.ADMIN_RPC_SECRET,
      p_user_id: userId,
      p_status: status,
    });
    if (error) throw error;
  }

  async function adminDeleteUser(userId) {
    const { error } = await client().rpc("admin_delete_user", {
      p_secret: cfg.ADMIN_RPC_SECRET,
      p_user_id: userId,
    });
    if (error) throw error;
  }

  return {
    client,
    signUp,
    signIn,
    signOut,
    getSession,
    getMyProfile,
    isEmailApproved,
    saveGeneration,
    uploadFile,
    adminListUsers,
    adminSetStatus,
    adminDeleteUser,
  };
})();
