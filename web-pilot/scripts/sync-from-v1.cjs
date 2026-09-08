/**
 * PILOT ONLY — rebuild web-pilot from ReadingAdventures V1.html
 * Run again whenever you change the main app (not final until you say so).
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..");
const PILOT = path.join(__dirname, "..");
const SOURCE = path.join(ROOT, "ReadingAdventures V1.html");

const html = fs.readFileSync(SOURCE, "utf8");

const styleStart = html.indexOf("<style>") + "<style>".length;
const styleEnd = html.indexOf("</style>");
const css = html.slice(styleStart, styleEnd).trim();

const marker = "// Background stars";
const markerIdx = html.indexOf(marker);
if (markerIdx < 0) throw new Error("Could not find main script in V1 HTML");
const scriptOpen = html.lastIndexOf("<script>", markerIdx);
const scriptEnd = html.lastIndexOf("</script>");
let js = html.slice(scriptOpen + "<script>".length, scriptEnd).trim();

js = js.replace(
  /async function bootstrapAdventures\(\)/,
  "async function bootstrapAdventuresCore()"
);
js = js.replace(
  /bootstrapAdventures\(\);\s*$/,
  "if (window.DrivePilot) { DrivePilot.start(); } else { bootstrapAdventuresCore(); }"
);
js = js.replace(/src="HTML%20games\//g, 'src="../HTML games/');

fs.mkdirSync(path.join(PILOT, "css"), { recursive: true });
fs.mkdirSync(path.join(PILOT, "js"), { recursive: true });

fs.writeFileSync(path.join(PILOT, "css", "app.css"), css, "utf8");
fs.writeFileSync(path.join(PILOT, "js", "app.js"), js, "utf8");

const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Reading Adventures (Web Pilot)</title>
<link rel="icon" type="image/png" href="../Reading%20Adventures%20Logo.png" />
<script src="https://cdn.tailwindcss.com"></script>
<link rel="stylesheet" href="css/app.css" />
<style>
  #drive-pilot-banner {
    display: block;
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 9999;
    background: #fef3c7;
    color: #92400e;
    font-size: 0.8rem;
    text-align: center;
    padding: 0.35rem 0.5rem;
    border-bottom: 1px solid #fcd34d;
  }
  #drive-pilot-banner.banner-error { background: #fee2e2; color: #991b1b; border-color: #fca5a5; }
  body.pilot-banner-visible { padding-top: 1.75rem; }
  body.pilot-app-ready #drive-pilot-banner { display: none !important; }
  body.pilot-app-ready { padding-top: 0 !important; }
</style>
</head>
<body class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900 text-white pilot-banner-visible">
<div id="drive-pilot-banner">Reading Adventures web — loading…</div>
<div id="stars" class="fixed inset-0 pointer-events-none overflow-hidden no-print"></div>
<div id="app" class="relative z-10"></div>
<!-- PILOT: paths relative to TRACKER folder -->
<script src="../data/word-challenge/hw-sentence-bank.js"></script>
<script src="../data/gpc-long-vowel-lists.js"></script>
<script src="../data/master-gpc-audio.js"></script>
<script src="drive-config.js"></script>
<script src="js/pilot-errors.js"></script>
<script src="js/tenant-registry.js"></script>
<script src="js/drive-loader.js"></script>
<script src="js/pilot-bootstrap.js"></script>
<script src="js/app.js"></script>
<script>
(function () {
  function showDeployError(msg) {
    var el = document.getElementById("drive-pilot-banner");
    if (!el) return;
    el.className = "banner-error";
    el.style.display = "block";
    el.innerHTML = "<strong>Setup error</strong> — " + msg;
  }
  if (!window.DrivePilotLoader) {
    showDeployError("drive-loader.js did not load. Check web-pilot/js/ on GitHub.");
    return;
  }
  if (!window.DrivePilot) {
    showDeployError("pilot-bootstrap.js did not load. Re-upload web-pilot/js/ from reading-adventures-web.");
    return;
  }
  if (window.DrivePilot.showBanner && !window.DrivePilot._bannerHidden) window.DrivePilot.showBanner();
})();
</script>
</body>
</html>
`;

fs.writeFileSync(path.join(PILOT, "index.html"), indexHtml, "utf8");

console.log("Web pilot synced from ReadingAdventures V1.html");
console.log("  web-pilot/index.html");
console.log("  web-pilot/css/app.css");
console.log("  web-pilot/js/app.js");
console.log("Re-run after you edit the main HTML app.");
