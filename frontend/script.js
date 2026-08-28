(() => {
  const I18N = {
    en: {
      "nav.brand": "Ink Studio",
      "nav.login": "Log in",
      "nav.admin": "Admin",
      "nav.logout": "Log out",
      "nav.dashboard": "Studio",
      "auth.kicker": "Member access",
      "auth.title": "Welcome back",
      "auth.subtitle": "Sign in if you are approved, or create an account and wait for an admin.",
      "auth.tabLogin": "Log in",
      "auth.tabRegister": "Register",
      "auth.email": "Email",
      "auth.password": "Password",
      "auth.loginBtn": "Log in",
      "auth.registerBtn": "Create account",
      "auth.registerHint": "After you register, an admin must approve you before you can log in.",
      "auth.pending": "Your account is waiting for admin approval.",
      "auth.rejected": "This account was rejected. Contact an admin.",
      "auth.registered": "Account created. Please wait for admin approval before logging in.",
      "auth.invalid": "Could not sign in. Check your email and password.",
      "auth.profileMissing": "Account record is missing. Try registering again.",
      "auth.emailTaken": "This email is already registered. Please log in.",
      "auth.signupDb": "Signup is blocked by the database. Re-run supabase/schema.sql in the SQL Editor.",
      "auth.weakPassword": "Password must be at least 6 characters.",
      "auth.rateLimit": "Too many attempts. Wait a minute and try again.",
      "auth.signupFailed": "Could not create the account. Try another email.",
      "dash.kicker": "Studio",
      "dash.title": "Turn a photo into a cartoon",
      "dash.subtitle": "Upload one image. Gemini redraws it as an illustration. Download it, then reset to start again.",
      "dash.uploadTitle": "Your photo",
      "dash.dropLabel": "Tap to choose an image",
      "dash.dropHint": "JPG, PNG, or WEBP. One file at a time.",
      "dash.transform": "Make cartoon",
      "dash.working": "Drawing…",
      "dash.resultTitle": "Result",
      "dash.resultEmpty": "Your cartoon will appear here.",
      "dash.download": "Download",
      "dash.reset": "Reset",
      "dash.needImage": "Choose an image first.",
      "dash.geminiMissing": "Add your Gemini API key in backend/supabase.js.",
      "dash.fail": "Could not transform this image. Try another photo.",
      "admin.kicker": "Admin",
      "admin.loginTitle": "Staff desk",
      "admin.loginSubtitle": "Separate from member accounts. Use the hardcoded admin credentials.",
      "admin.loginBtn": "Enter admin",
      "admin.badCreds": "Wrong admin email or password.",
      "admin.panelTitle": "Approvals",
      "admin.panelSubtitle": "Review pending members, then approve, reject, or delete.",
      "admin.filterPending": "Pending",
      "admin.filterAll": "All users",
      "admin.empty": "No users in this list.",
      "admin.approve": "Approve",
      "admin.reject": "Reject",
      "admin.delete": "Delete",
      "admin.confirmDelete": "Delete this account permanently?",
      "status.pending": "pending",
      "status.approved": "approved",
      "status.rejected": "rejected",
    },
    my: {
      "nav.brand": "အင့် စတူဒီယို",
      "nav.login": "အကောင့်ဝင်ရန်",
      "nav.admin": "အက်ဒမင်",
      "nav.logout": "ထွက်ရန်",
      "nav.dashboard": "စတူဒီယို",
      "auth.kicker": "အသုံးပြုသူ ဝင်ရောက်မှု",
      "auth.title": "ပြန်လည်ကြိုဆိုပါသည်",
      "auth.subtitle": "အတည်ပြုပြီးပါက ဝင်ပါ။ သို့မဟုတ် အကောင့်ဖွင့်ပြီး အက်ဒမင် စောင့်ပါ။",
      "auth.tabLogin": "ဝင်ရန်",
      "auth.tabRegister": "စာရင်းသွင်းရန်",
      "auth.email": "အီးမေးလ်",
      "auth.password": "စကားဝှက်",
      "auth.loginBtn": "အကောင့်ဝင်ရန်",
      "auth.registerBtn": "အကောင့်ဖွင့်ရန်",
      "auth.registerHint": "စာရင်းသွင်းပြီးနောက် အက်ဒမင် အတည်ပြုမှသာ ဝင်နိုင်ပါသည်။",
      "auth.pending": "သင့်အကောင့်သည် အက်ဒမင် အတည်ပြုချက် စောင့်ဆိုင်းနေပါသည်။",
      "auth.rejected": "ဤအကောင့်ကို ငြင်းပယ်ထားပါသည်။",
      "auth.registered": "အကောင့်ဖွင့်ပြီးပါပြီ။ ဝင်ရန် အက်ဒမင် အတည်ပြုချက် စောင့်ပါ။",
      "auth.invalid": "ဝင်၍မရပါ။ အီးမေးလ်နှင့် စကားဝှက်ကို စစ်ပါ။",
      "auth.profileMissing": "အကောင့်မှတ်တမ်း မတွေ့ပါ။ ပြန်လည်စာရင်းသွင်းပါ။",
      "auth.emailTaken": "ဤအီးမေးလ်ဖြင့် အကောင့်ရှိပြီးသားဖြစ်သည်။ ဝင်ရန် စမ်းပါ။",
      "auth.signupDb": "ဒေတာဘေ့စ်က ပိတ်ထားသည်။ supabase/schema.sql ကို SQL Editor တွင် ပြန် run ပါ။",
      "auth.weakPassword": "စကားဝှက် အနည်းဆုံး ၆ လုံး ထည့်ပါ။",
      "auth.rateLimit": "ခဏစောင့်ပြီး ပြန်စမ်းပါ။",
      "auth.signupFailed": "အကောင့်ဖွင့်၍မရပါ။ အခြားအီးမေးလ် စမ်းပါ။",
      "dash.kicker": "စတူဒီယို",
      "dash.title": "ဓာတ်ပုံကို ကာတွန်းပုံ ပြောင်းပါ",
      "dash.subtitle": "ပုံတစ်ပုံ တင်ပါ။ Gemini က ကာတွန်းပုံ ဆွဲပေးပါမည်။ ဒေါင်းလုဒ်လုပ်ပြီး ပြန်စတင်နိုင်ပါသည်။",
      "dash.uploadTitle": "သင့်ဓာတ်ပုံ",
      "dash.dropLabel": "ပုံရွေးရန် နှိပ်ပါ",
      "dash.dropHint": "JPG, PNG သို့မဟုတ် WEBP။ တစ်ကြိမ်လျှင် တစ်ပုံ။",
      "dash.transform": "ကာတွန်းပုံ ပြုလုပ်ရန်",
      "dash.working": "ဆွဲနေသည်…",
      "dash.resultTitle": "ရလဒ်",
      "dash.resultEmpty": "ကာတွန်းပုံ ဤနေရာတွင် ပေါ်ပါမည်။",
      "dash.download": "ဒေါင်းလုဒ်",
      "dash.reset": "ပြန်လည်စတင်ရန်",
      "dash.needImage": "ဦးစွာ ပုံတစ်ပုံ ရွေးပါ။",
      "dash.geminiMissing": "backend/supabase.js တွင် Gemini API key ထည့်ပါ။",
      "dash.fail": "ဤပုံကို ပြောင်း၍မရပါ။ အခြားပုံ စမ်းကြည့်ပါ။",
      "admin.kicker": "အက်ဒမင်",
      "admin.loginTitle": "စီမံခန့်ခွဲမှု",
      "admin.loginSubtitle": "အသုံးပြုသူ အကောင့်နှင့် သီးခြားဖြစ်သည်။ သတ်မှတ်ထားသော အက်ဒမင် အချက်အလက် သုံးပါ။",
      "admin.loginBtn": "အက်ဒမင် ဝင်ရန်",
      "admin.badCreds": "အက်ဒမင် အီးမေးလ် သို့မဟုတ် စကားဝှက် မှားနေပါသည်။",
      "admin.panelTitle": "အတည်ပြုရန် စာရင်း",
      "admin.panelSubtitle": "စောင့်ဆိုင်းနေသူများကို အတည်ပြု၊ ငြင်းပယ် သို့မဟုတ် ဖျက်ပါ။",
      "admin.filterPending": "စောင့်ဆိုင်းနေသည်",
      "admin.filterAll": "အားလုံး",
      "admin.empty": "ဤစာရင်းတွင် အသုံးပြုသူ မရှိပါ။",
      "admin.approve": "အတည်ပြုရန်",
      "admin.reject": "ငြင်းပယ်ရန်",
      "admin.delete": "ဖျက်ရန်",
      "admin.confirmDelete": "ဤအကောင့်ကို အပြီးဖျက်မည်လား။",
      "status.pending": "စောင့်ဆိုင်း",
      "status.approved": "အတည်ပြုပြီး",
      "status.rejected": "ငြင်းပယ်ပြီး",
    },
  };

  const LANG_KEY = "ink-lang";
  const ADMIN_KEY = "ink-admin";

  function getLang() {
    return localStorage.getItem(LANG_KEY) === "my" ? "my" : "en";
  }

  function t(key) {
    const lang = getLang();
    return I18N[lang][key] || I18N.en[key] || key;
  }

  function applyI18n() {
    const lang = getLang();
    document.documentElement.lang = lang === "my" ? "my" : "en";
    document.body.classList.toggle("lang-my", lang === "my");
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll(".lang-pill").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
    });
  }

  function setLang(lang) {
    localStorage.setItem(LANG_KEY, lang);
    applyI18n();
  }

  function toast(message, kind = "error") {
    let host = document.getElementById("toast-host");
    if (!host) {
      host = document.createElement("div");
      host.id = "toast-host";
      host.className = "fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md";
      document.body.appendChild(host);
    }
    const el = document.createElement("div");
    el.className =
      "toast rounded-2xl px-4 py-3 text-sm font-medium shadow-lg " +
      (kind === "ok" ? "bg-ink text-paper" : "bg-red-800 text-white");
    el.textContent = message;
    host.innerHTML = "";
    host.appendChild(el);
    setTimeout(() => el.remove(), 4200);
  }

  function renderHeader(page) {
    const mount = document.getElementById("app-header");
    if (!mount) return;
    mount.innerHTML = `
      <header class="sticky top-0 z-40 border-b border-ink/10 bg-paper/80 backdrop-blur">
        <div class="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <a href="index.html" class="display text-lg font-bold text-ink" data-i18n="nav.brand">Ink Studio</a>
          <div class="flex items-center gap-2">
            <div class="flex rounded-full border border-ink/15 bg-white/70 p-0.5">
              <button type="button" class="lang-pill rounded-full px-2.5 py-1 text-xs font-semibold" data-lang="en">EN</button>
              <button type="button" class="lang-pill rounded-full px-2.5 py-1 text-xs font-semibold" data-lang="my">မြန်မာ</button>
            </div>
            ${
              page === "dashboard"
                ? `<button id="user-logout" type="button" class="rounded-full border border-ink/15 px-3 py-1.5 text-xs font-semibold" data-i18n="nav.logout">Log out</button>`
                : page === "admin"
                  ? `<a href="login.html" class="text-xs font-semibold text-ink/70" data-i18n="nav.login">Log in</a>`
                  : `<a href="admin.html" class="text-xs font-semibold text-ink/70" data-i18n="nav.admin">Admin</a>`
            }
          </div>
        </div>
      </header>
    `;
    mount.querySelectorAll(".lang-pill").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.dataset.lang));
    });
    const logout = document.getElementById("user-logout");
    if (logout) {
      logout.addEventListener("click", async () => {
        await window.AppDB.signOut();
        window.location.href = "login.html";
      });
    }
    applyI18n();
  }

  function showFormMessage(el, text, ok = false) {
    if (!el) return;
    el.classList.remove("hidden", "bg-red-50", "text-red-800", "bg-emerald-50", "text-emerald-800");
    el.classList.add(ok ? "bg-emerald-50" : "bg-red-50", ok ? "text-emerald-800" : "text-red-800");
    el.textContent = text;
  }

  async function initLogin() {
    const session = await window.AppDB.getSession();
    if (session) {
      window.location.replace("index.html");
      return;
    }

    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const tabLogin = document.getElementById("tab-login");
    const tabRegister = document.getElementById("tab-register");
    const msg = document.getElementById("auth-message");

    function showTab(which) {
      const isLogin = which === "login";
      loginForm.classList.toggle("hidden", !isLogin);
      registerForm.classList.toggle("hidden", isLogin);
      tabLogin.classList.toggle("ink-btn", isLogin);
      tabLogin.classList.toggle("text-ink/70", !isLogin);
      tabRegister.classList.toggle("ink-btn", !isLogin);
      tabRegister.classList.toggle("text-ink/70", isLogin);
    }

    tabLogin.addEventListener("click", () => showTab("login"));
    tabRegister.addEventListener("click", () => showTab("register"));

    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = new FormData(loginForm);
      try {
        await window.AppDB.signIn(fd.get("email"), fd.get("password"));
        window.location.href = "index.html";
      } catch (err) {
        const code = err.message;
        if (code === "PENDING") showFormMessage(msg, t("auth.pending"));
        else if (code === "REJECTED") showFormMessage(msg, t("auth.rejected"));
        else if (code === "PROFILE_MISSING") showFormMessage(msg, t("auth.profileMissing"));
        else showFormMessage(msg, err.message || t("auth.invalid"));
      }
    });

    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = new FormData(registerForm);
      try {
        await window.AppDB.signUp(fd.get("email"), fd.get("password"));
        showFormMessage(msg, t("auth.registered"), true);
        showTab("login");
      } catch (err) {
        const code = err.message;
        const map = {
          EMAIL_TAKEN: "auth.emailTaken",
          SIGNUP_DB: "auth.signupDb",
          WEAK_PASSWORD: "auth.weakPassword",
          RATE_LIMIT: "auth.rateLimit",
          SIGNUP_FAILED: "auth.signupFailed",
        };
        showFormMessage(msg, map[code] ? t(map[code]) : err.message || t("auth.signupFailed"));
      }
    });
  }

  async function initDashboard() {
    const main = document.querySelector("main");
    if (main) main.classList.add("hidden");

    const session = await window.AppDB.getSession();
    if (!session) {
      window.location.replace("login.html");
      return;
    }

    const email = session.user?.email || "";
    let approved = false;
    try {
      approved = await window.AppDB.isEmailApproved(email);
    } catch (err) {
      await window.AppDB.signOut();
      window.location.replace("login.html");
      return;
    }

    const profile = await window.AppDB.getMyProfile().catch(() => null);
    if (!approved || !profile || profile.status !== "approved") {
      await window.AppDB.signOut();
      window.location.replace("login.html");
      return;
    }

    if (main) main.classList.remove("hidden");

    let selectedFile = null;
    let lastResult = null;
    const input = document.getElementById("image-input");
    const preview = document.getElementById("preview-image");
    const transformBtn = document.getElementById("transform-btn");
    const dropZone = document.getElementById("drop-zone");
    const resultEmpty = document.getElementById("result-empty");
    const resultWrap = document.getElementById("result-wrap");
    const resultImage = document.getElementById("result-image");
    const resultStory = document.getElementById("result-story");

    function setFile(file) {
      if (!file || !file.type.startsWith("image/")) {
        toast(t("dash.needImage"));
        return;
      }
      selectedFile = file;
      preview.src = URL.createObjectURL(file);
      preview.classList.remove("hidden");
      transformBtn.disabled = false;
    }

    input.addEventListener("change", () => {
      if (input.files[0]) setFile(input.files[0]);
    });

    ["dragenter", "dragover"].forEach((evt) => {
      dropZone.addEventListener(evt, (e) => {
        e.preventDefault();
        dropZone.classList.add("ring-2", "ring-marigold");
      });
    });
    ["dragleave", "drop"].forEach((evt) => {
      dropZone.addEventListener(evt, (e) => {
        e.preventDefault();
        dropZone.classList.remove("ring-2", "ring-marigold");
      });
    });
    dropZone.addEventListener("drop", (e) => {
      const file = e.dataTransfer.files[0];
      if (file) setFile(file);
    });

    function showResult(result) {
      lastResult = result;
      resultEmpty.classList.add("hidden");
      resultWrap.classList.remove("hidden");
      if (result.kind === "image" && result.resultDataUrl) {
        resultImage.classList.remove("hidden");
        resultImage.src = result.resultDataUrl;
      } else {
        resultImage.classList.add("hidden");
      }
      if (result.story) {
        resultStory.classList.remove("hidden");
        resultStory.textContent = result.story;
      } else {
        resultStory.classList.add("hidden");
      }
    }

    function resetStudio() {
      selectedFile = null;
      lastResult = null;
      input.value = "";
      preview.removeAttribute("src");
      preview.classList.add("hidden");
      transformBtn.disabled = true;
      resultWrap.classList.add("hidden");
      resultEmpty.classList.remove("hidden");
      resultStory.textContent = "";
    }

    transformBtn.addEventListener("click", async () => {
      if (!selectedFile) {
        toast(t("dash.needImage"));
        return;
      }
      transformBtn.disabled = true;
      const label = transformBtn.querySelector("[data-i18n]");
      const previous = label.textContent;
      label.textContent = t("dash.working");
      try {
        const result = await window.AppAPI.transformToCartoon(selectedFile, getLang());
        showResult(result);
        try {
          await window.AppAPI.persistResult(session.user.id, result.file, result);
        } catch (storeErr) {
          console.warn("Could not store generation:", storeErr);
        }
      } catch (err) {
        if (err.message === "GEMINI_NOT_CONFIGURED") toast(t("dash.geminiMissing"));
        else toast(err.message || t("dash.fail"));
      } finally {
        label.textContent = previous;
        transformBtn.disabled = !selectedFile;
        applyI18n();
      }
    });

    document.getElementById("download-btn").addEventListener("click", () => {
      if (!lastResult) return;
      if (lastResult.kind === "image" && lastResult.resultDataUrl) {
        window.AppAPI.downloadDataUrl(lastResult.resultDataUrl, "cartoon-illustration.png");
      } else if (lastResult.story) {
        window.AppAPI.downloadText(lastResult.story, "cartoon-story.txt");
      }
    });

    document.getElementById("reset-btn").addEventListener("click", resetStudio);
  }

  function isAdminAuthed() {
    return sessionStorage.getItem(ADMIN_KEY) === "1";
  }

  async function initAdmin() {
    const loginSection = document.getElementById("admin-login");
    const panel = document.getElementById("admin-panel");
    const list = document.getElementById("users-list");
    let filter = "pending";
    let users = [];

    function showPanel(on) {
      loginSection.classList.toggle("hidden", on);
      panel.classList.toggle("hidden", !on);
    }

    async function loadUsers() {
      users = await window.AppDB.adminListUsers();
      renderUsers();
    }

    function renderUsers() {
      const rows = filter === "pending" ? users.filter((u) => u.status === "pending") : users;
      if (!rows.length) {
        list.innerHTML = `<p class="paper-card rounded-2xl px-4 py-10 text-center text-sm text-ink/60">${t("admin.empty")}</p>`;
        return;
      }
      list.innerHTML = rows
        .map(
          (u) => `
        <article class="paper-card flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="font-semibold break-all">${escapeHtml(u.email)}</p>
            <p class="mt-1 text-xs uppercase tracking-wide text-plum">${t("status." + u.status)}</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <button data-act="approved" data-id="${u.id}" class="gold-btn rounded-xl px-3 py-2 text-xs font-semibold">${t("admin.approve")}</button>
            <button data-act="rejected" data-id="${u.id}" class="rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold">${t("admin.reject")}</button>
            <button data-act="delete" data-id="${u.id}" class="rounded-xl bg-red-800 px-3 py-2 text-xs font-semibold text-white">${t("admin.delete")}</button>
          </div>
        </article>
      `
        )
        .join("");

      list.querySelectorAll("button[data-act]").forEach((btn) => {
        btn.addEventListener("click", async () => {
          const id = btn.dataset.id;
          const act = btn.dataset.act;
          try {
            if (act === "delete") {
              if (!confirm(t("admin.confirmDelete"))) return;
              await window.AppDB.adminDeleteUser(id);
            } else {
              await window.AppDB.adminSetStatus(id, act);
            }
            await loadUsers();
          } catch (err) {
            toast(err.message);
          }
        });
      });
    }

    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        filter = btn.dataset.filter;
        document.querySelectorAll(".filter-btn").forEach((b) => {
          const on = b === btn;
          b.classList.toggle("ink-btn", on);
          b.classList.toggle("border", !on);
          b.classList.toggle("border-ink/15", !on);
        });
        renderUsers();
      });
    });

    document.getElementById("admin-login-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const email = String(fd.get("email") || "").trim().toLowerCase();
      const password = String(fd.get("password") || "");
      const cfg = window.APP_CONFIG;
      if (email === cfg.ADMIN_EMAIL.toLowerCase() && password === cfg.ADMIN_PASSWORD) {
        sessionStorage.setItem(ADMIN_KEY, "1");
        showPanel(true);
        try {
          await loadUsers();
        } catch (err) {
          toast(err.message);
        }
      } else {
        showFormMessage(document.getElementById("admin-login-message"), t("admin.badCreds"));
      }
    });

    document.getElementById("admin-logout").addEventListener("click", () => {
      sessionStorage.removeItem(ADMIN_KEY);
      showPanel(false);
    });

    if (isAdminAuthed()) {
      showPanel(true);
      try {
        await loadUsers();
      } catch (err) {
        toast(err.message);
      }
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  document.addEventListener("DOMContentLoaded", async () => {
    const page = document.body.dataset.page;
    renderHeader(page);
    try {
      if (page === "login") await initLogin();
      if (page === "dashboard") await initDashboard();
      if (page === "admin") await initAdmin();
    } catch (err) {
      toast(err.message || "Something went wrong.");
    }
  });
})();
