/**

 * PILOT — start Reading Adventures from Google Drive or ?t=tenant

 */

(function () {

  function hasDriveContext() {

    if (window.DrivePilotLoader?.fileIdFromUrl()) return true;

    if (window.TenantRegistry?.tenantFromUrl()) return true;

    return false;

  }



  function showLoadingScreen(message) {

    const app = document.getElementById("app");

    if (!app) return;

    app.innerHTML =

      '<div class="min-h-screen flex items-center justify-center p-4">' +

      '<div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 max-w-lg w-full text-center shadow-2xl">' +

      '<div class="text-5xl mb-4 animate-pulse">☁️</div>' +

      '<h1 class="text-2xl font-bold mb-2">Loading from Google Drive</h1>' +

      '<p class="text-white/80 text-sm" id="drive-loading-msg">' +

      (message || "Fetching your class data…") +

      "</p></div></div>";

  }



  function pilotBannerShouldHide() {

    if (window.DrivePilot._bannerHidden) return true;

    try {

      if (window.state?.data?.classes && Object.keys(window.state.data.classes).length > 0) return true;

    } catch (e) {

      /* ignore */

    }

    return false;

  }



  async function applyClassDataText(text) {

    const data = JSON.parse(text);

    if (!data.classes) throw new Error("Invalid JSON: no classes");

    state.data = data;

    state.classKey = null;

    state.passwords = {};

    state.studentPoints = {};

    state.flashResults = {};

    const keys = Object.keys(data.classes);

    state.view = keys.length === 1 ? "dashboard" : "classSelect";

    if (keys.length === 1) {

      state.classKey = keys[0];

      if (typeof generatePasswords === "function") generatePasswords();

      if (typeof loadPoints === "function") loadPoints();

      if (typeof loadFlashResults === "function") loadFlashResults();

      if (typeof loadGamePlayed === "function") loadGamePlayed();

    }

    window.DrivePilot._loadedFromDrive = true;

    if (window.DrivePilot.hideBanner) window.DrivePilot.hideBanner();

    if (typeof render === "function") render();

  }



  async function loadDriveFileById(fileId, apiKey, tenantSlug) {

    const text = await window.DrivePilotLoader.loadClassDataJson(fileId, apiKey);

    if (tenantSlug && window.DrivePilotLoader.rememberFileId) {

      window.DrivePilotLoader.rememberFileId(tenantSlug, fileId);

    }

    await applyClassDataText(text);

  }



  function renderJsonFileButtons(files) {

    if (!files.length) {

      return '<p class="text-sm text-white/70">No JSON files listed yet. Ask your teacher to upload a class file to the shared Drive folder.</p>';

    }

    return files

      .map(function (f) {

        const safeName = String(f.name || "file.json").replace(/</g, "&lt;");

        return (

          '<button type="button" class="drive-file-pick w-full text-left bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-4 py-3 mb-2 transition" data-file-id="' +

          f.id +

          '">' +

          '<div class="font-semibold">📄 ' +

          safeName +

          "</div>" +

          (f.modifiedTime

            ? '<div class="text-xs text-white/60">Updated ' +

              new Date(f.modifiedTime).toLocaleString() +

              "</div>"

            : "") +

          "</button>"

        );

      })

      .join("");

  }



  async function resolveTenantContext() {

    const apiKey = await window.DrivePilotLoader.resolveApiKey();

    let fileId = window.DrivePilotLoader.fileIdFromUrl();

    let folderId = "";

    let classDataFileName = "";

    let tenantLabel = "";

    let tenantSlug = "";

    let files = [];

    let needsPicker = false;



    const slug = window.TenantRegistry?.tenantFromUrl();

    if (slug && window.TenantRegistry) {

      tenantSlug = slug;

      const row = await window.TenantRegistry.resolveTenant(slug);

      if (!row) {

        throw new Error("Unknown school link (?t=" + slug + "). Check tenants.json.");

      }

      window.DrivePilot._tenantLabel = row.label;

      tenantLabel = row.label;

      folderId = row.folderId;

      classDataFileName = row.classDataFileName || "";



      if (!fileId && row.folderId) {

        const resolved = await window.DrivePilotLoader.resolveFolderJsonFile({

          classDataFileId: row.classDataFileId,

          folderId: row.folderId,

          classDataFileName: row.classDataFileName,

          tenantSlug: slug,

          apiKey,

        });

        fileId = resolved.fileId;

        files = resolved.files;

        needsPicker = resolved.needsPicker;

      }

    }



    return { fileId, apiKey, folderId, classDataFileName, tenantLabel, tenantSlug, files, needsPicker };

  }



  async function renderDriveConnect(app, options) {

    const opts = options || {};

    const tenantSlug = window.TenantRegistry?.tenantFromUrl();

    const label =

      window.DrivePilot._tenantLabel ||

      (tenantSlug ? "School " + tenantSlug : "Google Drive");

    let ctx = null;

    let files = Array.isArray(opts.files) ? opts.files : [];

    let listError = "";

    const chooseMode = !!opts.chooseMode;



    try {

      ctx = await resolveTenantContext();

      if (!files.length && ctx.folderId && ctx.apiKey) {

        try {

          files = await window.DrivePilotLoader.listJsonFilesInFolder(

            ctx.folderId,

            ctx.apiKey

          );

        } catch (e) {

          listError = e.message;

        }

      }

    } catch (e) {

      listError = e.message;

    }



    const leadText = chooseMode

      ? "Choose your class or year group:"

      : "Load class data from your school's Google Drive folder.";

    const fileSectionTitle = chooseMode

      ? "Available class files:"

      : "Or choose a file from the Drive folder:";

    const reloadLabel = files.length === 1

      ? "Load " + files[0].name

      : "Reload latest file from Google Drive";



    app.innerHTML =

      '<div class="min-h-screen flex items-center justify-center p-4">' +

      '<div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-10 max-w-2xl w-full text-center shadow-2xl fadeIn">' +

      '<div class="text-6xl mb-4 floaty">☁️</div>' +

      '<h1 class="text-3xl md:text-4xl font-bold mb-2">Reading Adventure</h1>' +

      '<p class="text-lg text-white/80 mb-6" id="upload-lead">' +

      leadText +

      "</p>" +

      '<p class="text-sm text-white/60 mb-6">' +

      label +

      "</p>" +

      (chooseMode || files.length !== 1

        ? ""

        : '<button type="button" id="btn-drive-reload" class="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-2xl shadow-lg mb-6 transition">' +

          reloadLabel +

          "</button>") +

      '<div class="text-left mb-4">' +

      '<div class="text-sm font-semibold text-white/80 mb-2">' +

      fileSectionTitle +

      "</div>" +

      '<div id="drive-file-list">' +

      renderJsonFileButtons(files) +

      "</div></div>" +

      (chooseMode

        ? '<p class="text-xs text-white/50 mt-2">Your choice is remembered on this device next time you open this link.</p>'

        : "") +

      '<div id="uploadMsg" class="mt-2 text-yellow-200 text-sm"></div>' +

      '<details class="mt-6 text-left text-sm text-white/60">' +

      '<summary class="cursor-pointer hover:text-white">Teacher backup upload (advanced)</summary>' +

      '<label class="block mt-3">' +

      '<input type="file" accept=".json" id="fileInput" class="hidden">' +

      '<span id="dropZone" class="block cursor-pointer border border-dashed border-white/30 rounded-xl p-4 text-center text-white/70 hover:bg-white/5">Upload a JSON backup from this device</span>' +

      "</label></details></div></div>";



    const msg = document.getElementById("uploadMsg");

    if (listError && msg) msg.textContent = listError;



    const reloadBtn = document.getElementById("btn-drive-reload");

    if (reloadBtn) {

      reloadBtn.onclick = async function () {

        if (msg) msg.textContent = "Loading…";

        try {

          showLoadingScreen("Loading class file…");

          const fresh = await resolveTenantContext();

          if (!fresh.fileId) throw new Error("No class data file found in Drive.");

          await loadDriveFileById(fresh.fileId, fresh.apiKey, fresh.tenantSlug);

        } catch (err) {

          state.view = "upload";

          if (typeof render === "function") render();

          if (msg) msg.textContent = err.message;

        }

      };

    }



    app.querySelectorAll(".drive-file-pick").forEach(function (btn) {

      btn.onclick = async function () {

        const fileId = btn.getAttribute("data-file-id");

        if (!fileId) return;

        if (msg) msg.textContent = "Loading…";

        try {

          showLoadingScreen("Loading selected file…");

          const apiKey = await window.DrivePilotLoader.resolveApiKey();

          const slug = window.TenantRegistry?.tenantFromUrl() || "";

          await loadDriveFileById(fileId, apiKey, slug);

        } catch (err) {

          state.view = "upload";

          if (typeof render === "function") render();

          if (msg) msg.textContent = err.message;

        }

      };

    });



    const input = document.getElementById("fileInput");

    const dz = document.getElementById("dropZone");

    if (input && dz && typeof loadFile === "function") {

      dz.onclick = function () {

        input.click();

      };

      input.addEventListener("change", function (e) {

        loadFile(e.target.files[0]);

      });

    }

  }



  function patchRenderForDrive() {

    if (!window.render || window.DrivePilot._renderPatched) return;

    const originalRender = window.render;

    window.render = function () {

      if (state.view === "upload" && hasDriveContext()) {

        const app = document.getElementById("app");

        if (app) {

          return renderDriveConnect(app, {

            chooseMode: !!window.DrivePilot._chooseMode,

            files: window.DrivePilot._folderFiles || [],

          });

        }

      }

      return originalRender();

    };

    window.DrivePilot._renderPatched = true;

  }



  window.DrivePilot = {

    _loadedFromDrive: false,

    hasDriveContext: hasDriveContext,



    async start() {

      patchRenderForDrive();

      if (!pilotBannerShouldHide()) this.showBanner();

      if (hasDriveContext()) {

        showLoadingScreen();

        try {

          const ctx = await resolveTenantContext();

          if (ctx.fileId) {

            await loadDriveFileById(ctx.fileId, ctx.apiKey, ctx.tenantSlug);

            return;

          }

          if (ctx.needsPicker) {

            window.DrivePilot._chooseMode = true;

            window.DrivePilot._folderFiles = ctx.files;

            state.view = "upload";

            if (typeof render === "function") render();

            return;

          }

        } catch (err) {

          console.error(err);

          state.view = "upload";

          window.DrivePilot._chooseMode = false;

          if (typeof render === "function") render();

          const msg = document.getElementById("uploadMsg");

          if (msg) msg.textContent = "Could not load class data: " + err.message;

          return;

        }

      }



      if (typeof bootstrapAdventuresCore === "function") {

        await bootstrapAdventuresCore();

        return;

      }

      if (typeof render === "function") render();

    },



    async reloadFromDrive() {

      showLoadingScreen();

      const ctx = await resolveTenantContext();

      if (!ctx.fileId) throw new Error("No class data file found.");

      await loadDriveFileById(ctx.fileId, ctx.apiKey, ctx.tenantSlug);

    },



    showBanner() {

      const el = document.getElementById("drive-pilot-banner");

      if (!el) return;

      if (pilotBannerShouldHide()) {

        this.hideBanner();

        return;

      }

      document.body.classList.add("pilot-banner-visible");

      const tenant = window.TenantRegistry?.tenantFromUrl();

      const fileId = window.DrivePilotLoader?.fileIdFromUrl();

      el.style.display = "block";

      let extra = "";

      if (window.DrivePilot._tenantLabel) {

        extra = " — " + window.DrivePilot._tenantLabel;

      } else if (tenant) {

        extra = " — school " + tenant;

      } else if (fileId) {

        extra = " (file " + fileId.slice(0, 8) + "…)";

      }

      el.innerHTML = "<strong>Web</strong> — Reading Adventures from Google Drive" + extra + ' <span class="opacity-60">(pilot v3)</span>';

    },



    hideBanner() {

      window.DrivePilot._bannerHidden = true;

      const el = document.getElementById("drive-pilot-banner");

      if (el) el.style.display = "none";

      document.body.classList.remove("pilot-banner-visible");

      document.body.classList.add("pilot-app-ready");

    },

  };



  document.addEventListener("DOMContentLoaded", function () {

    if (!window.DrivePilot._bannerHidden) window.DrivePilot.showBanner();

  });

})();


