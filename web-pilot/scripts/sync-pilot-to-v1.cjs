/**
 * Push web-pilot app.js + app.css back into ReadingAdventures V1.html
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const v1Path = path.join(ROOT, 'ReadingAdventures V1.html');
const js = fs.readFileSync(path.join(ROOT, 'web-pilot', 'js', 'app.js'), 'utf8');
const css = fs.readFileSync(path.join(ROOT, 'web-pilot', 'css', 'app.css'), 'utf8');
let html = fs.readFileSync(v1Path, 'utf8');

const styleStart = html.indexOf('<style>') + '<style>'.length;
const styleEnd = html.indexOf('</style>');
if (styleStart < 7 || styleEnd < 0) throw new Error('style block not found');
html = html.slice(0, styleStart) + '\n' + css + '\n' + html.slice(styleEnd);

const marker = '// Background stars';
const markerIdx = html.indexOf(marker);
if (markerIdx < 0) throw new Error('script marker not found');
const scriptOpen = html.lastIndexOf('<script>', markerIdx);
const scriptEnd = html.indexOf('</script>', markerIdx);
if (scriptOpen < 0 || scriptEnd < 0) throw new Error('script block not found');
html = html.slice(0, scriptOpen + '<script>'.length) + '\n' + js + '\n' + html.slice(scriptEnd);

if (!html.trimEnd().endsWith('</html>')) {
  html = html.trimEnd() + '\n</script>\n</body>\n</html>\n';
}

fs.writeFileSync(v1Path, html, 'utf8');
console.log('Synced web-pilot -> V1 OK');
