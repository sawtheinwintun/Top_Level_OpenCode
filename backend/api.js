/**
 * OpenRouter (Gemini) image transform + local image helpers.
 * Put your OpenRouter key in APP_CONFIG.GEMINI_API_KEY (backend/supabase.js).
 */
window.AppAPI = (() => {
  function assertGeminiKey() {
    const key = window.APP_CONFIG.GEMINI_API_KEY;
    if (!key || key.startsWith("YOUR_")) {
      throw new Error("GEMINI_NOT_CONFIGURED");
    }
    return key;
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = String(reader.result);
        const base64 = result.split(",")[1];
        resolve({ base64, dataUrl: result, mimeType: file.type || "image/jpeg" });
      };
      reader.onerror = () => reject(new Error("Could not read the image file."));
      reader.readAsDataURL(file);
    });
  }

  function resizeImage(file, maxSize = 1280) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Could not process image."));
              return;
            }
            resolve(
              new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", {
                type: "image/jpeg",
              })
            );
          },
          "image/jpeg",
          0.88
        );
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Could not load image."));
      };
      img.src = url;
    });
  }

  function dataUrlFromUnknown(url) {
    if (!url || typeof url !== "string") return null;
    if (url.startsWith("data:image/")) return url;
    if (url.startsWith("http")) return url;
    return `data:image/png;base64,${url}`;
  }

  function extractImageAndText(payload) {
    const message = payload?.choices?.[0]?.message || {};
    let text = "";
    let image = null;

    const content = message.content;
    if (typeof content === "string") {
      text += content;
    } else if (Array.isArray(content)) {
      for (const part of content) {
        if (!part) continue;
        if (part.type === "text" && part.text) text += part.text;
        const partUrl = part.image_url?.url || part.imageUrl?.url;
        if (partUrl) {
          const dataUrl = dataUrlFromUnknown(partUrl);
          image = { mimeType: "image/png", dataUrl };
        }
      }
    }

    const extraImages = message.images || [];
    for (const img of extraImages) {
      const url = img?.image_url?.url || img?.imageUrl?.url;
      if (url) {
        image = { mimeType: "image/png", dataUrl: dataUrlFromUnknown(url) };
      }
    }

    const markdownMatch = text.match(/!\[[^\]]*\]\((data:image\/[^)]+)\)/);
    if (!image && markdownMatch) {
      image = { mimeType: "image/png", dataUrl: markdownMatch[1] };
    }

    return { image, text: text.trim() };
  }

  function visionMessage(prompt, dataUrl) {
    return {
      role: "user",
      content: [
        { type: "text", text: prompt },
        { type: "image_url", image_url: { url: dataUrl } },
      ],
    };
  }

  async function chatCompletions(prompt, dataUrl, { wantImage } = {}) {
    const apiKey = assertGeminiKey();
    const cfg = window.APP_CONFIG;
    const url = cfg.OPENROUTER_URL || "https://openrouter.ai/api/v1/chat/completions";
    const body = {
      model: cfg.GEMINI_MODEL || "google/gemini-2.0-flash-exp:free",
      messages: [visionMessage(prompt, dataUrl)],
    };
    if (wantImage) {
      body.modalities = ["image", "text"];
    }

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg =
        json?.error?.message || json?.error || `OpenRouter request failed (${res.status})`;
      const err = new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
      err.status = res.status;
      err.payload = json;
      throw err;
    }
    return json;
  }

  function cartoonPrompt(lang) {
    if (lang === "my") {
      return "ဤဓာတ်ပုံကို အရောင်စုံ၊ ကြည်လင်ပြတ်သားသော ကာတွန်းပုံ (cartoon illustration) အဖြစ် ပြောင်းပါ။ မူလပုဂ္ဂိုလ်၊ ပုံစံနှင့် ဖွဲ့စည်းပုံကို ထိန်းသိမ်းပါ။ ရဲရင့်သော အနားသတ်များ၊ နွေးထွေးသော အရောင်များ သုံးပါ။ စာသား၊ လိုဂို သို့မဟုတ် ရေစာ မထည့်ပါနှင့်။ ပုံထုတ်နိုင်လျှင် ပုံပြန်ပေးပါ။";
    }
    return "Transform this photo into a vibrant, polished cartoon illustration. Keep the same subject, pose, and composition. Use bold outlines, warm colors, and a storybook look. Do not add text, logos, or watermarks. If you can return an image, return the illustration.";
  }

  function storyPrompt(lang) {
    if (lang === "my") {
      return "ဤဓာတ်ပုံကို အခြေခံပြီး ကလေးများဖတ်ရန် တိုတောင်းသော ကာတွန်းဇာတ်လမ်း (၄-၆ ကြောင်း) ရေးပါ။ မြန်မာဘာသာဖြင့် ရေးပါ။";
    }
    return "Based on this photo, write a short cartoon story (4-6 sentences) that a child could enjoy. Keep it warm and vivid.";
  }

  async function transformToCartoon(file, lang = "en") {
    const prepared = await resizeImage(file);
    const { dataUrl, mimeType } = await fileToBase64(prepared);

    try {
      const json = await chatCompletions(cartoonPrompt(lang), dataUrl, { wantImage: true });
      const extracted = extractImageAndText(json);
      if (extracted.image) {
        return {
          kind: "image",
          originalDataUrl: dataUrl,
          resultDataUrl: extracted.image.dataUrl,
          mimeType: extracted.image.mimeType,
          story: extracted.text || "",
          file: prepared,
        };
      }
    } catch (err) {
      console.warn("Image output unavailable, falling back to story:", err);
    }

    const storyJson = await chatCompletions(storyPrompt(lang), dataUrl, { wantImage: false });
    const extracted = extractImageAndText(storyJson);
    if (!extracted.text) {
      throw new Error("GEMINI_EMPTY");
    }
    return {
      kind: "story",
      originalDataUrl: dataUrl,
      resultDataUrl: null,
      mimeType,
      story: extracted.text,
      file: prepared,
    };
  }

  async function persistResult(userId, originalFile, result) {
    const stamp = Date.now();
    const originalPath = `${userId}/${stamp}-original.jpg`;
    await window.AppDB.uploadFile(originalPath, originalFile, "image/jpeg");

    let resultPath = null;
    if (result.kind === "image" && result.resultDataUrl) {
      const blob = await fetch(result.resultDataUrl).then((r) => r.blob());
      resultPath = `${userId}/${stamp}-cartoon.png`;
      await window.AppDB.uploadFile(resultPath, blob, blob.type || "image/png");
    }

    await window.AppDB.saveGeneration({
      originalPath,
      resultPath,
      resultType: result.kind,
      storyText: result.story,
    });
  }

  function downloadDataUrl(dataUrl, filename) {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function downloadText(text, filename) {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    downloadDataUrl(url, filename);
    URL.revokeObjectURL(url);
  }

  return {
    fileToBase64,
    resizeImage,
    transformToCartoon,
    persistResult,
    downloadDataUrl,
    downloadText,
  };
})();
