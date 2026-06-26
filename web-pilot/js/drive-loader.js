/**

 * PILOT — load class-data.json from Google Drive (file id or folder + API key).

 */

(function () {

  const CONFIG = window.DRIVE_PILOT_CONFIG || {};



  function fileIdFromUrl() {

    const params = new URLSearchParams(window.location.search);

    return (

      params.get("dataId") ||

      params.get("driveId") ||

      params.get("id") ||

      CONFIG.fileId ||

      ""

    ).trim();

  }



  function apiKeyFromUrl() {

    const params = new URLSearchParams(window.location.search);

    return (params.get("apiKey") || CONFIG.apiKey || "").trim();

  }



  async function resolveApiKey() {

    const direct = apiKeyFromUrl();

    if (direct) return direct;

    if (window.TenantRegistry?.getDeploymentApiKey) {

      const fromRegistry = await window.TenantRegistry.getDeploymentApiKey();

      if (fromRegistry) return fromRegistry;

    }

    return "";

  }



  function exportDownloadUrl(fileId) {

    return (

      "https://drive.google.com/uc?export=download&id=" + encodeURIComponent(fileId)

    );

  }



  function apiMediaUrl(fileId, apiKey) {

    return (

      "https://www.googleapis.com/drive/v3/files/" +

      encodeURIComponent(fileId) +

      "?alt=media&key=" +

      encodeURIComponent(apiKey)

    );

  }



  function apiListUrl(folderId, apiKey, pageToken) {

    const q =

      "'" +

      folderId +

      "' in parents and trashed=false and (mimeType='application/json' or name contains '.json')";

    let url =

      "https://www.googleapis.com/drive/v3/files?q=" +

      encodeURIComponent(q) +

      "&fields=nextPageToken,files(id,name,modifiedTime,mimeType)&orderBy=modifiedTime desc&pageSize=25&supportsAllDrives=true&includeItemsFromAllDrives=true&key=" +

      encodeURIComponent(apiKey);

    if (pageToken) url += "&pageToken=" + encodeURIComponent(pageToken);

    return url;

  }



  async function findFileInFolder(folderId, fileName, apiKey) {

    if (!folderId || !apiKey) return null;

    const q =

      "'" +

      folderId +

      "' in parents and name='" +

      fileName.replace(/'/g, "\\'") +

      "' and trashed=false";

    const url =

      "https://www.googleapis.com/drive/v3/files?q=" +

      encodeURIComponent(q) +

      "&fields=files(id,name)&pageSize=5&supportsAllDrives=true&includeItemsFromAllDrives=true&key=" +

      encodeURIComponent(apiKey);

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) throw new Error("Drive folder lookup HTTP " + res.status);

    const data = await res.json();

    const files = data.files || [];

    if (!files.length) return null;

    return files[0].id;

  }



  async function listJsonFilesInFolder(folderId, apiKey) {

    if (!folderId || !apiKey) return [];

    const out = [];

    let pageToken = "";

    for (let i = 0; i < 5; i++) {

      const res = await fetch(apiListUrl(folderId, apiKey, pageToken), { cache: "no-store" });

      if (!res.ok) throw new Error("Drive file list HTTP " + res.status);

      const data = await res.json();

      out.push.apply(out, data.files || []);

      pageToken = data.nextPageToken || "";

      if (!pageToken) break;

    }

    return out;

  }



  async function fetchText(url) {

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) throw new Error("HTTP " + res.status);

    const text = await res.text();

    if (text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html")) {

      throw new Error("Drive returned a web page, not JSON. Add a Google API key.");

    }

    return text;

  }



  async function loadClassDataJson(fileId, apiKey) {

    const errors = [];

    const key = String(apiKey || "").trim();



    if (key) {

      try {

        return await fetchText(apiMediaUrl(fileId, key));

      } catch (e) {

        errors.push("Google API: " + e.message);

      }

    }



    try {

      return await fetchText(exportDownloadUrl(fileId));

    } catch (e) {

      errors.push("Drive export link: " + e.message);

    }



    throw new Error(

      "Could not load class data from Google Drive.\n" +

        errors.join("\n") +

        (key ? "" : "\n\nAdd a Google API key in drive-config.js (see README).")

    );

  }



  function fileNameFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return (params.get("file") || params.get("json") || "").trim();
  }

  function rememberedFileId(tenantSlug) {
    const key = String(tenantSlug || "").trim().toLowerCase();
    if (!key) return "";
    try {
      return localStorage.getItem("drivePilotFile_" + key) || "";
    } catch {
      return "";
    }
  }

  function rememberFileId(tenantSlug, fileId) {
    const key = String(tenantSlug || "").trim().toLowerCase();
    if (!key || !fileId) return;
    try {
      localStorage.setItem("drivePilotFile_" + key, fileId);
    } catch {
      /* ignore */
    }
  }

  function matchFileByName(files, name) {
    const wanted = String(name || "").trim();
    if (!wanted) return null;
    const withJson = wanted.endsWith(".json") ? wanted : wanted + ".json";
    return (
      files.find(function (f) {
        return f.name === wanted || f.name === withJson;
      }) || null
    );
  }

  /**
   * Resolve which JSON file to load from a Drive folder.
   * - Pinned file ID → load that file
   * - One JSON in folder → auto-load
   * - Preferred name (classDataFileName) → load if present
   * - ?file= or ?json= URL param → load matching name
   * - Remembered choice per school (?t=) → auto-load if still in folder
   * - Multiple files otherwise → needsPicker: true (show year-group list)
   */
  async function resolveFolderJsonFile(options) {
    const empty = { fileId: null, files: [], needsPicker: false };

    if (options.classDataFileId) {
      return { fileId: options.classDataFileId, files: [], needsPicker: false };
    }

    const apiKey = options.apiKey || (await resolveApiKey());

    if (options.folderId && !apiKey) {
      throw new Error(
        "This site is not configured with a Google Drive API key yet. Ask your teacher to contact support."
      );
    }

    if (!options.folderId || !apiKey) return empty;

    const files = await listJsonFilesInFolder(options.folderId, apiKey);

    if (!files.length) {
      throw new Error(
        "No JSON files found in the Google Drive folder yet. Ask your teacher to upload a class file."
      );
    }

    const preferredName = String(options.classDataFileName || "").trim();
    if (preferredName) {
      const preferred = matchFileByName(files, preferredName);
      if (preferred) return { fileId: preferred.id, files, needsPicker: false };
    }

    const urlName = fileNameFromUrl();
    if (urlName) {
      const fromUrl = matchFileByName(files, urlName);
      if (fromUrl) return { fileId: fromUrl.id, files, needsPicker: false };
      throw new Error('No file named "' + urlName + '" in the Drive folder.');
    }

    if (files.length === 1) {
      return { fileId: files[0].id, files, needsPicker: false };
    }

    const remembered = rememberedFileId(options.tenantSlug);
    if (remembered) {
      const saved = files.find(function (f) {
        return f.id === remembered;
      });
      if (saved) return { fileId: saved.id, files, needsPicker: false };
    }

    return { fileId: null, files, needsPicker: true };
  }

  /** @deprecated use resolveFolderJsonFile */
  async function resolveClassDataFileId(options) {
    const result = await resolveFolderJsonFile(options);
    if (result.fileId) return result.fileId;
    if (result.needsPicker) return null;
    return null;
  }



  window.DrivePilotLoader = {

    isPilot: true,

    fileIdFromUrl,

    apiKeyFromUrl,

    resolveApiKey,

    loadClassDataJson,

    findFileInFolder,

    listJsonFilesInFolder,

    resolveClassDataFileId,
    resolveFolderJsonFile,
    fileNameFromUrl,
    rememberFileId,

    exportDownloadUrl,

  };

})();


