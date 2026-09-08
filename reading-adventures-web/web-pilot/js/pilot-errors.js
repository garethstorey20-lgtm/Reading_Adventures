/**
 * PILOT — soft error codes for classroom support.
 * Students see: "Please report error XYZ"
 * Teachers: look up the code below (or run PilotErrors.explain("XYZ") in the console).
 */
(function () {
  const CODES = {
    "RA-KEY": "Site is missing a Google Drive API key.",
    "RA-HTML": "Drive returned a web page instead of JSON (usually needs an API key or public share).",
    "RA-LIST": "Could not list JSON files in the school Drive folder.",
    "RA-FIND": "Could not look up a file by name in the Drive folder.",
    "RA-GET": "Could not download the class JSON file from Drive.",
    "RA-LOAD": "All Drive download methods failed for the class file.",
    "RA-EMPTY": "No JSON files found in the school Drive folder.",
    "RA-NAME": "The requested file name was not found in the Drive folder.",
    "RA-MISS": "No class data file could be resolved for this school link.",
    "RA-FOLDER": "This school link has no Drive folder configured.",
    "RA-SCHOOL": "Unknown school link (?t= slug not in tenants.json).",
    "RA-REG": "Could not load tenants.json from the website.",
    "RA-JSON": "Loaded file was not valid class data (missing classes).",
    "RA-PARSE": "Could not read or parse a locally selected JSON file.",
    "RA-NET": "Network request failed (offline, blocked, or CORS).",
    "RA-UNK": "Unclassified error — check the browser console for details.",
  };

  function baseCode(code) {
    const raw = String(code || "").trim().toUpperCase();
    if (!raw) return "RA-UNK";
    const parts = raw.split("-");
    if (parts.length >= 3 && /^\d+$/.test(parts[parts.length - 1])) {
      return parts.slice(0, -1).join("-");
    }
    return raw;
  }

  function explain(code) {
    const full = String(code || "").trim().toUpperCase() || "RA-UNK";
    const base = baseCode(full);
    const detail = CODES[base] || CODES["RA-UNK"];
    if (full !== base) {
      return detail + " (HTTP " + full.slice(base.length + 1) + ")";
    }
    return detail;
  }

  function make(code, message) {
    const err = new Error(message || explain(code));
    err.pilotCode = String(code || "RA-UNK").toUpperCase();
    return err;
  }

  function httpCode(prefix, status) {
    const n = Number(status);
    if (n > 0) return String(prefix).toUpperCase() + "-" + n;
    return String(prefix).toUpperCase();
  }

  function classify(err) {
    if (err && err.pilotCode) return String(err.pilotCode).toUpperCase();
    const msg = String((err && err.message) || err || "");

    if (/API key/i.test(msg) && /not configured|Add a Google API key/i.test(msg)) return "RA-KEY";
    if (/web page, not JSON/i.test(msg)) return "RA-HTML";
    if (/Drive file list HTTP\s+(\d+)/i.test(msg)) return httpCode("RA-LIST", RegExp.$1);
    if (/Drive folder lookup HTTP\s+(\d+)/i.test(msg)) return httpCode("RA-FIND", RegExp.$1);
    if (/Could not load tenants\.json \(HTTP\s+(\d+)/i.test(msg)) return httpCode("RA-REG", RegExp.$1);
    if (/^HTTP\s+(\d+)/i.test(msg)) return httpCode("RA-GET", RegExp.$1);
    if (/Could not load class data from Google Drive/i.test(msg)) return "RA-LOAD";
    if (/No JSON files found/i.test(msg)) return "RA-EMPTY";
    if (/No file named /i.test(msg)) return "RA-NAME";
    if (/No class data file found/i.test(msg)) return "RA-MISS";
    if (/no Drive folder configured|folderId/i.test(msg) && /empty|not configured/i.test(msg)) return "RA-FOLDER";
    if (/Unknown school link/i.test(msg)) return "RA-SCHOOL";
    if (/Invalid JSON|no classes|Invalid format/i.test(msg)) return "RA-JSON";
    if (/Could not read file|JSON\.parse|Unexpected token/i.test(msg)) return "RA-PARSE";
    if (/Failed to fetch|NetworkError|Load failed|TypeError:\s*Failed/i.test(msg)) return "RA-NET";
    return "RA-UNK";
  }

  function ensureStyles() {
    if (document.getElementById("pilot-error-styles")) return;
    const style = document.createElement("style");
    style.id = "pilot-error-styles";
    style.textContent =
      "#pilot-error-toast-root{position:fixed;inset:0;z-index:10050;display:flex;align-items:flex-end;justify-content:center;padding:1.25rem;pointer-events:none;}" +
      "#pilot-error-toast-root.is-open{pointer-events:auto;}" +
      "#pilot-error-toast-root .pilot-error-scrim{position:absolute;inset:0;background:rgba(15,23,42,0.28);opacity:0;transition:opacity .2s ease;}" +
      "#pilot-error-toast-root.is-open .pilot-error-scrim{opacity:1;}" +
      "#pilot-error-toast{position:relative;width:min(22rem,100%);background:#fffaf3;color:#334155;border:1px solid #f1e4d0;border-radius:1.25rem;box-shadow:0 18px 40px rgba(15,23,42,0.18);padding:1.1rem 1.2rem 1rem;text-align:center;transform:translateY(12px);opacity:0;transition:transform .22s ease,opacity .22s ease;font-family:Fredoka,system-ui,sans-serif;}" +
      "#pilot-error-toast-root.is-open #pilot-error-toast{transform:translateY(0);opacity:1;}" +
      "#pilot-error-toast .pilot-error-emoji{font-size:1.6rem;line-height:1;margin-bottom:.35rem;}" +
      "#pilot-error-toast .pilot-error-title{font-size:.95rem;font-weight:600;color:#475569;margin:0 0 .55rem;}" +
      "#pilot-error-toast .pilot-error-code{display:inline-block;font-size:1.35rem;font-weight:700;letter-spacing:.04em;color:#0f766e;background:#ecfeff;border:1px solid #a5f3fc;border-radius:.75rem;padding:.35rem .7rem;margin-bottom:.85rem;}" +
      "#pilot-error-toast .pilot-error-ok{appearance:none;border:0;cursor:pointer;background:#0d9488;color:#fff;font-weight:600;font-size:.9rem;border-radius:.85rem;padding:.55rem 1.1rem;}" +
      "#pilot-error-toast .pilot-error-ok:hover{background:#0f766e;}";
    document.head.appendChild(style);
  }

  function dismissPopup() {
    const root = document.getElementById("pilot-error-toast-root");
    if (!root) return;
    root.classList.remove("is-open");
    window.setTimeout(function () {
      if (root.parentNode) root.parentNode.removeChild(root);
    }, 220);
  }

  function showPopup(code) {
    ensureStyles();
    dismissPopup();

    const root = document.createElement("div");
    root.id = "pilot-error-toast-root";
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-label", "Please report error " + code);

    root.innerHTML =
      '<div class="pilot-error-scrim" data-pilot-error-dismiss="1"></div>' +
      '<div id="pilot-error-toast">' +
      '<div class="pilot-error-emoji" aria-hidden="true">💬</div>' +
      '<p class="pilot-error-title">Please report error</p>' +
      '<div class="pilot-error-code">' +
      String(code).replace(/</g, "&lt;") +
      "</div>" +
      '<button type="button" class="pilot-error-ok" data-pilot-error-dismiss="1">Got it</button>' +
      "</div>";

    root.addEventListener("click", function (e) {
      const t = e.target;
      if (t && t.getAttribute && t.getAttribute("data-pilot-error-dismiss")) {
        dismissPopup();
      }
    });

    document.body.appendChild(root);
    window.requestAnimationFrame(function () {
      root.classList.add("is-open");
    });
  }

  function softUploadHint(code) {
    const msg = document.getElementById("uploadMsg");
    if (!msg) return;
    msg.textContent = "Please report error " + code;
    msg.style.color = "";
  }

  /**
   * Classify an error, show a soft popup, and leave a gentle on-page hint.
   * Full technical detail goes to the console only.
   */
  function report(err, options) {
    const opts = options || {};
    const code = classify(err);
    const detail = explain(code);
    const message = String((err && err.message) || "");

    try {
      console.info("[PilotErrors]", code, detail);
      if (message) console.info("[PilotErrors] detail:", message);
      if (err && err.stack) console.debug(err);
    } catch (e) {
      /* ignore */
    }

    if (opts.popup !== false) showPopup(code);
    if (opts.hint !== false) {
      window.setTimeout(function () {
        softUploadHint(code);
      }, 0);
    }

    return code;
  }

  window.PilotErrors = {
    CODES,
    make,
    httpCode,
    classify,
    explain,
    report,
    showPopup,
    dismissPopup,
  };
})();
