const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const appJs = fs.readFileSync(path.join(ROOT, 'web-pilot', 'js', 'app.js'), 'utf8');
const css = fs.readFileSync(path.join(ROOT, 'web-pilot', 'css', 'app.css'), 'utf8');
const v1Path = path.join(ROOT, 'ReadingAdventures V1.html');
let out = fs.readFileSync(v1Path, 'utf8');

const start = appJs.indexOf('// ============================================================\r\n// TAG ME! MODE');
const startAlt = start < 0 ? appJs.indexOf('// ============================================================\n// TAG ME! MODE') : start;
const tagStart = startAlt >= 0 ? startAlt : appJs.indexOf('// TAG ME! MODE') - 62;
const actualStart = appJs.lastIndexOf('// ============================================================', appJs.indexOf('// TAG ME! MODE'));
const end = appJs.indexOf('window.logoutStudent = () => {', actualStart);
if (actualStart < 0 || end < 0) throw new Error('TAG ME block not found in app.js: ' + actualStart + ' ' + end);
const tagBlock = appJs.slice(actualStart, end);

const v1Marker = /  if \(diceBtn\) diceBtn\.disabled = false;\r?\n\}\r?\n\r?\nwindow\.logoutStudent = \(\) => \{/;
if (!v1Marker.test(out)) throw new Error('V1 handleBoardLanding marker not found');
if (!out.includes('// TAG ME! MODE')) {
  out = out.replace(v1Marker, (m) => m.replace('window.logoutStudent', tagBlock + 'window.logoutStudent'));
}

const showOld = `function showBoardReturnOkPrompt() {
  document.getElementById('boardReturnOkOverlay')?.remove();
  state.arcadeFromBoard = false;
  state.arcadeGame = null;
  state.view = 'adventure';`;
const showNew = `function showBoardReturnOkPrompt() {
  document.getElementById('boardReturnOkOverlay')?.remove();
  state.arcadeFromBoard = false;
  state.arcadeGame = null;
  if (state.boardReturnView === 'tagme') {
    showTagMeReturnOkPrompt();
    return;
  }
  state.view = 'adventure';`;
if (out.includes(showOld) && !out.includes("state.boardReturnView === 'tagme'")) {
  out = out.replace(showOld, showNew);
}

if (!out.includes('fromTagMe: !!opts.fromTagMe')) {
  out = out.replace(
    'fromBoard: !!opts.fromBoard, boardManual: !!opts.manual',
    'fromBoard: !!opts.fromBoard, fromTagMe: !!opts.fromTagMe, boardManual: !!opts.manual'
  );
}

const renderStart = appJs.indexOf('  const playAgainOpts = g.fromBoard');
const renderEnd = appJs.indexOf('}\n\n// ============================================================\n// THE STARCADE', renderStart);
const renderBlock = appJs.slice(renderStart, renderEnd);
const v1RenderStart = out.indexOf('  const playAgainOpts = g.fromBoard');
const v1RenderEnd = out.indexOf('}\n\n// ============================================================\n// THE STARCADE', v1RenderStart);
if (v1RenderStart >= 0 && !out.includes('Back to Tag me!')) {
  out = out.slice(0, v1RenderStart) + renderBlock + out.slice(v1RenderEnd);
}

const cssStart = css.indexOf('/* ============================================================\n   TAG ME! MODE');
const cssEnd = css.indexOf('.profile-board-words-panel {', cssStart);
const tagCss = css.slice(cssStart, cssEnd);
const cssMarker = `.board-checkin-btn--no {
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.9);
}
.profile-board-words-panel {`;
if (!out.includes('.tagme-mode-card {')) {
  out = out.replace(
    cssMarker,
    `.board-checkin-btn--no {
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.9);
}

` + tagCss + `.profile-board-words-panel {`
  );
}

out = out.replace(
  '.adventure-mode-card:not(:disabled),\n.profile-board-tab,',
  '.adventure-mode-card:not(:disabled),\n.tagme-mode-card:not(:disabled),\n.profile-board-tab,'
);

fs.writeFileSync(v1Path, out, 'utf8');
console.log('V1 updated OK');
