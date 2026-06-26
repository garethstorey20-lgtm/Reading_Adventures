// Background stars
(function makeStars() {
  const c = document.getElementById('stars');
  for (let i=0; i<60; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    s.style.width = (Math.random()*3+1) + 'px';
    s.style.height = s.style.width;
    s.style.left = Math.random()*100 + '%';
    s.style.top = Math.random()*100 + '%';
    s.style.animationDelay = (Math.random()*3) + 's';
    c.appendChild(s);
  }
})();

const CHALLENGE_ROUNDS = 6;
const CATCH_ROUND_SEC = 7;
const CATCH_MAX_LIVES = 5;
const STARCADE_GAME_COST = 6;
const READING_TRACK_BONUS = 20;
const STARCADE_WIN_BONUS = 3;
const TREASURE_SCORE_BONUS_THRESHOLD = 150;
const READING_GAME_PERFECT_BONUS = 5;
const READING_GAME_BASE_STARS = 3;
const BOARD_MAX_PASSES = 3;
const FLASH_SET_STAR_REWARD = 2;
const FLASH_SET_MIN_SECONDS = 25;
const FLASH_AUDIO_GAP_MS = 2000;
const SOUND_BOX_AUDIO_GAP_MS = 1000;
const SOUND_BOX_BLEND_STAGGER_MS = 500;
const HW_BOX_HINT_MS = 3000;
const GAME_ANSWER_FONT = "'Andika', 'Sassoon Primary', 'Comic Sans MS', system-ui, sans-serif";
const GPC_TRACK_GAME_IDS = ['gpcMatch', 'gpcCatch', 'soundFlip', 'soundBox'];
const HW_TRACK_GAME_IDS = ['hwHunt', 'hwBlank', 'hwJumble', 'hwBoxes'];
const READING_TRACK_GAME_IDS = [...GPC_TRACK_GAME_IDS, ...HW_TRACK_GAME_IDS];
const TRACK_GAME_IDS = READING_TRACK_GAME_IDS;

const BOARD_SPACE_COUNT = 36;
const BOARD_FINISH_INDEX = 35;
const BOARD_COLS = 6;
const TAG_ME_BOARD_COLS_PORTRAIT = 6;
const TAG_ME_BOARD_COLS_LANDSCAPE = 9;
const BOARD_FINISH_BONUS = 30;
const BOARD_GAME_SEQUENCE = ['gpcMatch', 'gpcCatch', 'soundFlip', 'soundBox', 'hwHunt', 'hwBlank', 'hwJumble', 'hwBoxes'];
const BOARD_GAME_STYLE = {
  gpcMatch: { bg: '#2563eb', text: '#ffffff', border: '#93c5fd' },
  gpcCatch: { bg: '#0891b2', text: '#ffffff', border: '#67e8f9' },
  soundFlip: { bg: '#7c3aed', text: '#ffffff', border: '#c4b5fd' },
  soundBox: { bg: '#4f46e5', text: '#ffffff', border: '#a5b4fc' },
  hwHunt: { bg: '#db2777', text: '#ffffff', border: '#f9a8d4' },
  hwBlank: { bg: '#e11d48', text: '#ffffff', border: '#fda4af' },
  hwJumble: { bg: '#f43f5e', text: '#ffffff', border: '#fda4af' },
  hwBoxes: { bg: '#ea580c', text: '#ffffff', border: '#fdba74' },
  flash: { bg: '#16a34a', text: '#ffffff', border: '#86efac' },
};
const BOARD_START_STYLE = { bg: '#94a3b8', text: '#1e293b', border: '#cbd5e1', label: 'Start' };
const BOARD_FINISH_STYLE = { bg: '#ca8a04', text: '#ffffff', border: '#fde047', label: 'Finish' };
const BOARD_CONNECTOR_STYLE = { bg: '#a8a29e', border: '#78716c' };
const BOARD_BONUS_GAMES = ['ttt', 'c4', 'slime'];
const BOARD_BONUS_GAME_TITLES = { ttt: 'Tic-Tac-Toe', c4: 'Connect 4', slime: 'Treasure Hunter' };
const BOARD_BONUS_STYLE = { bg: '#6366f1', text: '#ffffff', border: '#a5b4fc' };
const GAME_BOARD_TITLES = {
  gpcMatch: 'Splat the Sound',
  gpcCatch: 'Sound Splat Challenge!',
  soundFlip: 'Sound Flip',
  soundBox: 'Sound Box',
  hwHunt: 'Splat the Word!',
  hwBlank: 'Word Challenge!',
  hwJumble: 'Word Jumble',
  hwBoxes: 'Word Box',
  flash: 'Self Check',
};
const GAME_BOARD_SHORT = {
  gpcMatch: 'Sound',
  gpcCatch: 'Catch',
  soundFlip: 'Flip',
  soundBox: 'Box',
  hwHunt: 'Word',
  hwBlank: 'Blank',
  hwJumble: 'Jumble',
  hwBoxes: 'Spell',
  flash: 'Check',
};
const BOARD_PIECES = [
  { emoji: '🐱', bg: '#f472b6' }, { emoji: '🐶', bg: '#38bdf8' }, { emoji: '🦊', bg: '#fb923c' },
  { emoji: '🐸', bg: '#4ade80' }, { emoji: '🦁', bg: '#facc15' }, { emoji: '🐼', bg: '#a78bfa' },
  { emoji: '🐧', bg: '#22d3ee' }, { emoji: '🦋', bg: '#e879f9' }, { emoji: '🚀', bg: '#6366f1' },
  { emoji: '⭐', bg: '#fde047' }, { emoji: '🌈', bg: '#f97316' }, { emoji: '🎸', bg: '#ec4899' },
  { emoji: '⚽', bg: '#14b8a6' }, { emoji: '🍕', bg: '#ef4444' }, { emoji: '🎈', bg: '#8b5cf6' },
  { emoji: '🦄', bg: '#d946ef' }, { emoji: '🐢', bg: '#10b981' }, { emoji: '🦖', bg: '#84cc16' },
  { emoji: '🎨', bg: '#0ea5e9' }, { emoji: '🍀', bg: '#22c55e' },
];
const TAG_CHASERS = [
  { id: 'lion', emoji: '🦁', name: 'Lion', bg: '#eab308', catchLine: 'I caught you with my big roar!' },
  { id: 'tiger', emoji: '🐯', name: 'Tiger', bg: '#f97316', catchLine: 'I got you with my fast stripes!' },
  { id: 'bear', emoji: '🐻', name: 'Bear', bg: '#a16207', catchLine: 'I tagged you with my big paws!' },
  { id: 'wolf', emoji: '🐺', name: 'Wolf', bg: '#64748b', catchLine: 'I found you with my sharp eyes!' },
  { id: 'ghost', emoji: '👻', name: 'Ghost', bg: '#cbd5e1', catchLine: 'Boo! I tagged you!' },
  { id: 'butterfly', emoji: '🦋', name: 'Butterfly', bg: '#e879f9', catchLine: 'I fluttered and tagged you!' },
  { id: 'fairy', emoji: '🧚', name: 'Fairy', bg: '#c084fc', catchLine: 'I sprinkled magic and got you!' },
];
const TAG_FREE_ROLLS = 2;
const TAG_FINISH_BONUS = 30;
const TAG_MODIFIER_BACK1 = new Set([8, 20, 5, 26, 29]);
const TAG_MODIFIER_BACK2 = new Set([11, 34, 30]);
const TAG_MODIFIER_FWD1 = new Set([24, 15, 27, 2, 18]);
const TAG_MODIFIER_FWD2 = new Set([23, 33, 1]);
const TAG_MODIFIER_STYLE = {
  '-1': { bg: '#dc2626', text: '#fff', border: '#fecaca', icon: '⬇️' },
  '-2': { bg: '#b91c1c', text: '#fff', border: '#fca5a5', icon: '⏬' },
  '1': { bg: '#16a34a', text: '#fff', border: '#bbf7d0', icon: '⬆️' },
  '2': { bg: '#15803d', text: '#fff', border: '#86efac', icon: '⏫' },
};
const TAG_ME_NEUTRAL_TILE = { bg: '#6366f1', text: '#ffffff', border: '#c7d2fe' };
const TAG_ME_PATH_GLOW_COLORS = [
  ['#ff00ff', 'rgba(255, 0, 255, 0.85)'],
  ['#ff6600', 'rgba(255, 102, 0, 0.85)'],
  ['#00ffff', 'rgba(0, 255, 255, 0.85)'],
  ['#ffff00', 'rgba(255, 255, 0, 0.85)'],
  ['#00ff88', 'rgba(0, 255, 136, 0.85)'],
  ['#ff3366', 'rgba(255, 51, 102, 0.85)'],
];

const state = {
  data: null,
  classKey: null,
  view: 'upload',
  selectedStudent: null,
  game: null,
  passwords: {},
  studentPoints: {},
  flashResults: {},
  flashSetProgress: {},
  flashHub: null,
  gamePlayed: {},
  teacherPassword: 'Teacher123',
  arcade: null,
  arcadeGame: null,
  wordFocus: null,
  profileRestoreScrollY: null,
  readingTrackBonusPopup: false,
  boardRolling: false,
  boardGame: {},
  tagMeGame: {},
  tagMeBoardLayout: null,
  boardReturnView: 'adventure',
  arcadeFromBoard: false,
  /** Per-student shuffle decks for answer cycling across games in one session. */
  focusCycleDecks: {},
};
window.adventuresAppState = state;

function $(id){return document.getElementById(id);}

// ============================================================
// SOUND EFFECTS (synthesised — for game button feedback only)
// ============================================================
let _audioCtx = null;
function _getAudioCtx() {
  if (_audioCtx) {
    if (_audioCtx.state === 'suspended') { try { _audioCtx.resume(); } catch(e){} }
    return _audioCtx;
  }
  try {
    _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  } catch(e) { return null; }
  return _audioCtx;
}
function sfxClick() {
  const ctx = _getAudioCtx();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'triangle';
    o.frequency.setValueAtTime(880, now);
    o.frequency.exponentialRampToValueAtTime(440, now + 0.06);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(0.07, now + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
    o.connect(g); g.connect(ctx.destination);
    o.start(now); o.stop(now + 0.12);
  } catch(e){}
}
function sfxSplat() {
  const ctx = _getAudioCtx();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const dur = 0.35;
    const bufferSize = Math.floor(ctx.sampleRate * dur);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const decay = Math.pow(1 - i/bufferSize, 1.6);
      data[i] = (Math.random() * 2 - 1) * decay;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, now);
    filter.frequency.exponentialRampToValueAtTime(120, now + dur);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.55, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
    noise.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    const o = ctx.createOscillator();
    const og = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(120, now);
    o.frequency.exponentialRampToValueAtTime(50, now + 0.2);
    og.gain.setValueAtTime(0.0001, now);
    og.gain.linearRampToValueAtTime(0.35, now + 0.01);
    og.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    o.connect(og); og.connect(ctx.destination);
    noise.start(now);
    o.start(now); o.stop(now + 0.3);
  } catch(e){}
}

// ============================================================
// AUDIO — class JSON first (personalised), then bundled master GPC library.
// ============================================================
function resolveImportedAudioEntry(entry, depth = 0, seen = null) {
  if (!entry || depth > 5) return null;
  if (typeof entry === 'string') return entry;
  if (entry.data && typeof entry.data === 'string') return entry.data;

  if (entry.ref && typeof entry.ref === 'object') {
    const ref = entry.ref;
    const refClass = ref.className;
    const refType = ref.type;
    const refLabel = ref.label;
    if (!refClass || !refType || !refLabel) return null;

    const key = `${refClass}:${refType}:${refLabel}`;
    if (!seen) seen = new Set();
    if (seen.has(key)) return null;
    seen.add(key);

    const refCls = state.data?.classes?.[refClass];
    const refMap = refCls?.audio?.[refType];
    const refEntry = refMap?.[refLabel];
    return resolveImportedAudioEntry(refEntry, depth + 1, seen);
  }

  return null;
}

function lookupClassAudioBucket(src, raw) {
  if (!src || raw == null || raw === '') return null;
  const s = String(raw);
  if (src[s]) return src[s];
  const lower = s.toLowerCase();
  if (lower !== s && src[lower]) return src[lower];
  if (!s.includes(GPC_AUDIO_SEP)) {
    const norm = normalizeGpcKey(s);
    if (norm !== s && src[norm]) return src[norm];
  }
  return null;
}

function getClassGpcAudioSource(phoneme, exampleWord) {
  if (!state.data || !state.classKey) return null;
  const cls = state.data.classes[state.classKey];
  const src = cls?.audio?.gpc;
  if (!src) return null;
  const g = String(phoneme ?? '').trim();
  if (!g) return null;
  const ex = String(exampleWord ?? '').trim();
  const keys = [
    gpcAudioStorageKey(g, ex),
    g,
  ].filter(Boolean);
  for (const raw of keys) {
    const entry = lookupClassAudioBucket(src, raw);
    if (!entry) continue;
    const resolved = resolveImportedAudioEntry(entry);
    if (resolved) return resolved;
  }
  // Assessment Buddy: one slot per phoneme may store audio under bare phoneme key.
  const compositeKey = gpcAudioStorageKey(g, ex);
  if (compositeKey) {
    const slots = collectClassGpcItems(cls).filter(x => normalizeGpcKey(x.gpc) === normalizeGpcKey(g));
    if (slots.length === 1 && gpcAudioStorageKey(slots[0].gpc, slots[0].exampleWord) === compositeKey) {
      const entry = lookupClassAudioBucket(src, g);
      if (entry) {
        const resolved = resolveImportedAudioEntry(entry);
        if (resolved) return resolved;
      }
    }
  }
  return null;
}

function getClassHwAudioSource(text) {
  if (!state.data || !state.classKey) return null;
  const cls = state.data.classes[state.classKey];
  if (!cls?.audio) return null;
  const raw = String(text ?? '').trim();
  if (!raw) return null;
  const sources = [cls.audio.hw, cls.audio.heartWords, cls.audio.heart, cls.audio.example];
  for (const src of sources) {
    const entry = lookupClassAudioBucket(src, raw);
    if (entry) {
      const resolved = resolveImportedAudioEntry(entry);
      if (resolved) return resolved;
    }
  }
  return null;
}

function normalizeMasterAudioKey(text) {
  return String(text ?? '').trim().toLowerCase()
    .replaceAll('a-e', 'a_e')
    .replaceAll('o-e', 'o_e')
    .replaceAll('i-e', 'i_e')
    .replaceAll('e-e', 'e_e')
    .replaceAll('u-e', 'u_e');
}

/** Bundled default GPC clips (data/master-gpc-audio.js). */
function getMasterGpcAudioSource(text) {
  const bank = window.__MASTER_GPC_AUDIO__;
  if (!bank) return null;
  const raw = String(text ?? '').trim();
  if (!raw) return null;
  const keys = [normalizeMasterAudioKey(raw), raw, raw.toLowerCase()];
  for (const key of keys) {
    const entry = bank[key];
    if (!entry) continue;
    if (typeof entry === 'string') return entry;
    if (entry.data && typeof entry.data === 'string') return entry.data;
  }
  return null;
}

function getGpcAudioSource(phonemeOrKey, exampleWord) {
  let phoneme = phonemeOrKey;
  let ex = exampleWord;
  if (!ex && String(phonemeOrKey ?? '').includes(GPC_AUDIO_SEP)) {
    const parsed = parseGpcStorageKey(phonemeOrKey);
    phoneme = parsed.phoneme;
    ex = parsed.exampleWord;
  }
  return getClassGpcAudioSource(phoneme, ex) || getMasterGpcAudioSource(phoneme);
}

function getHwAudioSource(text) {
  return getClassHwAudioSource(text);
}

function getGameAudioTrack(gameType) {
  if (['gpcMatch', 'gpcCatch', 'soundFlip', 'soundBox'].includes(gameType)) return 'gpc';
  if (['hwHunt', 'hwBlank', 'hwJumble', 'hwBoxes'].includes(gameType)) return 'hw';
  return null;
}

function getActiveAudioTrack() {
  const gt = state.game?.type;
  return gt ? getGameAudioTrack(gt) : null;
}

function getAudioSource(text, track) {
  const t = track ?? getActiveAudioTrack();
  if (t === 'hw') return getHwAudioSource(text);
  if (t === 'gpc') return getGpcAudioSource(text);
  return getGpcAudioSource(text) || getHwAudioSource(text);
}

function hasGpcItemAudio(item) {
  if (!item) return false;
  return !!getGpcAudioSource(item.gpc, item.exampleWord);
}
function hasAudio(text, track) { return !!getAudioSource(text, track ?? getActiveAudioTrack()); }

/** Example-word clips from class JSON audio.example (and hw/heart buckets). */
function hasExampleWordAudio(word) {
  return !!getClassHwAudioSource(String(word ?? '').trim());
}

/** Listen button — always plays when the user taps 🔊. */
function playTargetListen(text) {
  if (text) speak(text, getActiveAudioTrack());
}

/**
 * Auto-play policy (reading games): once when the target is first shown (not Word Challenge),
 * once when the learner answers correctly. Wrong/timeout does not auto-play.
 */
function playTargetOnShow(g, text) {
  if (!text || !g || g._spoken) return;
  const track = getGameAudioTrack(g.type);
  if (!hasAudio(text, track)) return;
  g._spoken = true;
  speak(text, track);
}

function playTargetOnCorrect(g, text) {
  if (!text || !g || g._spokenCorrect) return;
  const track = getGameAudioTrack(g.type);
  if (!hasAudio(text, track)) return;
  g._spokenCorrect = true;
  speak(text, track);
}

/** Self Check: wait at least 2s after previous clip before auto-playing the next card. */
function playFlashTargetOnShow(g, text) {
  if (!text || !g || g._spoken) return;
  const card = g.cards?.[g.cardIdx];
  const track = card?.type === 'hw' ? 'hw' : card?.type === 'gpc' ? 'gpc' : null;
  if (!hasAudio(text, track)) return;
  g._spoken = true;
  const gapWait = Math.max(0, _lastAudioEndAt + FLASH_AUDIO_GAP_MS - Date.now());
  const delay = Math.max(300, gapWait);
  setTimeout(() => speak(text, track), delay);
}

function getGameProgressText(g) {
  if (!g || g.finished) return '';
  if (g.type === 'flash') {
    const total = g.cards?.length || 0;
    return total ? `${g.cardIdx}/${total}` : '';
  }
  if (g.type === 'gpcCatch') {
    if (g.catchPhase !== 'play') return '';
    const total = g.correctNeeded || CHALLENGE_ROUNDS;
    const q = Math.min((g.roundIdx || 0) + 1, total);
    return `${q}/${total}`;
  }
  const total = g.totalRounds || CHALLENGE_ROUNDS;
  return `${Math.min(g.roundIdx, total)}/${total}`;
}

function renderGameProgressPill(g) {
  const text = getGameProgressText(g);
  if (!text) return '';
  return `<div class="game-progress-pill" aria-label="Progress ${text}">${text}</div>`;
}

function renderGameTopBar(g, { backOnclick = 'quitToProfile()', backLabel = '← Quit' } = {}) {
  return `<div class="game-top-bar">
    <button type="button" onclick="${backOnclick}" class="text-white/70 hover:text-white text-sm">${backLabel}</button>
    ${renderGameProgressPill(g)}
  </div>`;
}

function spawnPerfectStarBurst() {
  const cx = window.innerWidth * 0.5;
  const cy = window.innerHeight * 0.38;
  for (let i = 0; i < READING_GAME_PERFECT_BONUS; i++) {
    const el = document.createElement('div');
    el.className = 'perfect-star-burst';
    el.textContent = '⭐';
    el.style.left = `${cx + (i - 2) * 36}px`;
    el.style.top = `${cy}px`;
    el.style.animationDelay = `${i * 0.12}s`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1800);
  }
}

function resetTargetAudioFlags(g) {
  if (!g) return;
  g._spoken = false;
  g._spokenCorrect = false;
}

let _lastAudioEndAt = 0;

function speak(text, track) {
  const audioData = getAudioSource(text, track ?? getActiveAudioTrack());
  if (audioData) {
    try {
      const audio = new Audio(audioData);
      const markEnd = () => { _lastAudioEndAt = Date.now(); };
      audio.addEventListener('ended', markEnd);
      audio.addEventListener('error', markEnd);
      audio.play().catch(markEnd);
      return true;
    } catch (e) {}
  }
  return false;
}

function speakWithCallback(text, onDone, track) {
  const done = () => { if (onDone) onDone(); };
  const audioData = getAudioSource(text, track ?? getActiveAudioTrack());
  if (!audioData) { done(); return false; }
  try {
    const audio = new Audio(audioData);
    const markEnd = () => {
      _lastAudioEndAt = Date.now();
      done();
    };
    audio.addEventListener('ended', markEnd);
    audio.addEventListener('error', markEnd);
    audio.play().catch(markEnd);
    return true;
  } catch (e) {
    done();
    return false;
  }
}
function correctSound(){}
function wrongSound(){}
function celebrateSound(){}

function shuffle(arr){ const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }

// ============================================================
// HEART WORD SENTENCES
// ============================================================
const HW_SENTENCES = {
  'the': [
    {s: '_____ sun is hot.', d: ['is','am','do']},
    {s: 'Look at _____ moon.', d: ['was','go','am']},
    {s: 'I sit on _____ chair.', d: ['said','can','is']}
  ],
  'a': [
    {s: 'It is _____ dog.', d: ['said','go','was']},
    {s: 'I have _____ hat.', d: ['was','is','of']},
    {s: 'She is _____ girl.', d: ['can','was','do']}
  ],
  'I': [
    {s: '_____ am six.', d: ['the','of','and']},
    {s: '_____ can run fast.', d: ['was','the','and']},
    {s: '_____ like cake.', d: ['the','was','an']}
  ],
  'to': [
    {s: 'I am going _____ school.', d: ['is','am','was']},
    {s: 'Give it _____ me.', d: ['is','was','do']},
    {s: 'Go _____ bed now.', d: ['is','am','of']}
  ],
  'is': [
    {s: 'She _____ here.', d: ['the','and','of']},
    {s: 'It _____ red.', d: ['the','an','of']},
    {s: 'My cat _____ small.', d: ['the','and','of']}
  ],
  'and': [
    {s: 'Mum _____ dad are here.', d: ['is','was','to']},
    {s: 'Cat _____ dog play.', d: ['is','the','my']},
    {s: 'Up _____ down we go.', d: ['is','was','for']}
  ],
  'go': [
    {s: 'Let us _____ home now.', d: ['the','was','of']},
    {s: 'I will _____ to bed.', d: ['the','was','of']},
    {s: 'Can we _____ outside?', d: ['the','my','of']}
  ],
  'no': [
    {s: '_____ thank you.', d: ['is','was','for']},
    {s: 'There is _____ milk left.', d: ['is','was','for']},
    {s: 'Say _____ to him.', d: ['is','was','for']}
  ],
  'so': [
    {s: 'I am _____ happy today.', d: ['is','was','do']},
    {s: 'It was _____ cold outside.', d: ['is','and','to']},
    {s: 'You are _____ kind.', d: ['is','was','for']}
  ],
  'he': [
    {s: '_____ is my dad.', d: ['is','was','of']},
    {s: 'Where is _____?', d: ['is','was','of']},
    {s: '_____ ran fast.', d: ['is','was','of']}
  ],
  'she': [
    {s: '_____ is kind.', d: ['is','was','of']},
    {s: '_____ has a hat.', d: ['is','was','of']},
    {s: '_____ likes apples.', d: ['is','was','of']}
  ],
  'we': [
    {s: '_____ are friends.', d: ['is','was','of']},
    {s: '_____ went home.', d: ['is','was','of']},
    {s: '_____ can play now.', d: ['is','was','of']}
  ],
  'me': [
    {s: 'Come with _____.', d: ['is','was','do']},
    {s: 'Give it to _____.', d: ['is','was','do']},
    {s: 'Look at _____ now.', d: ['is','was','do']}
  ],
  'be': [
    {s: 'Try to _____ good.', d: ['the','my','of']},
    {s: 'I want to _____ tall.', d: ['the','my','of']},
    {s: "Don't _____ late.", d: ['the','my','of']}
  ],
  'my': [
    {s: 'This is _____ book.', d: ['is','was','do']},
    {s: '_____ cat is black.', d: ['is','was','do']},
    {s: 'Where is _____ bag?', d: ['is','was','do']}
  ],
  'you': [
    {s: 'How are _____?', d: ['is','was','of']},
    {s: 'I can see _____.', d: ['is','was','of']},
    {s: '_____ are very kind.', d: ['is','was','of']}
  ],
  'are': [
    {s: 'We _____ here.', d: ['the','my','of']},
    {s: 'They _____ happy.', d: ['the','my','of']},
    {s: 'You _____ smart.', d: ['the','my','of']}
  ],
  'was': [
    {s: 'It _____ fun.', d: ['the','my','and']},
    {s: 'He _____ at home.', d: ['the','my','and']},
    {s: 'The cake _____ sweet.', d: ['the','my','and']}
  ],
  'were': [
    {s: 'They _____ sad.', d: ['the','my','and']},
    {s: 'We _____ at school.', d: ['the','my','and']},
    {s: 'You _____ fast.', d: ['the','my','and']}
  ],
  'they': [
    {s: '_____ are kind.', d: ['is','was','of']},
    {s: '_____ went home.', d: ['is','was','of']},
    {s: '_____ play games.', d: ['is','was','of']}
  ],
  'have': [
    {s: 'I _____ a pet at home.', d: ['the','my','and']},
    {s: 'We _____ cake for tea.', d: ['the','my','and']},
    {s: 'You _____ a new hat.', d: ['the','my','and']}
  ],
  'has': [
    {s: 'He _____ a hat.', d: ['the','my','and']},
    {s: 'She _____ a dog.', d: ['the','my','and']},
    {s: 'It _____ a long tail.', d: ['the','my','and']}
  ],
  'said': [
    {s: 'He _____ hello to me.', d: ['the','my','and']},
    {s: 'She _____ yes please.', d: ['the','my','and']},
    {s: 'Mum _____ go to bed.', d: ['the','my','and']}
  ],
  'says': [
    {s: 'He _____ hi to us.', d: ['the','my','and']},
    {s: 'She _____ no thanks.', d: ['the','my','and']},
    {s: 'Dad _____ stop now.', d: ['the','my','and']}
  ],
  'for': [
    {s: 'This is _____ you.', d: ['is','was','do']},
    {s: 'Wait _____ me here.', d: ['is','was','do']},
    {s: 'Cake _____ tea.', d: ['is','was','do']}
  ],
  'with': [
    {s: 'Come _____ me now.', d: ['is','was','do']},
    {s: 'Play _____ us today.', d: ['is','was','do']},
    {s: 'Tea _____ milk please.', d: ['is','was','do']}
  ],
  'of': [
    {s: 'A cup _____ tea.', d: ['is','was','do']},
    {s: 'Lots _____ fun.', d: ['is','was','do']},
    {s: 'Top _____ the hill.', d: ['is','was','do']}
  ],
  'his': [
    {s: 'That is _____ hat.', d: ['is','was','do']},
    {s: '_____ dog is big.', d: ['is','was','do']},
    {s: '_____ name is Tom.', d: ['is','was','do']}
  ],
  'her': [
    {s: 'Give it to _____.', d: ['is','was','do']},
    {s: 'I see _____ book.', d: ['is','was','do']},
    {s: '_____ mum is here.', d: ['is','was','do']}
  ],
  'do': [
    {s: 'What can I _____?', d: ['is','was','the']},
    {s: '_____ you like cake?', d: ['is','was','the']},
    {s: 'I _____ not know.', d: ['is','was','the']}
  ],
  'does': [
    {s: 'He _____ his best.', d: ['is','was','the']},
    {s: '_____ it work?', d: ['is','was','the']},
    {s: 'She _____ like it.', d: ['is','was','the']}
  ],
  'put': [
    {s: '_____ it down here.', d: ['is','was','the']},
    {s: 'Where do I _____ it?', d: ['is','was','the']},
    {s: 'I _____ on a hat.', d: ['is','was','the']}
  ],
  'one': [
    {s: 'I have just _____ pet.', d: ['is','was','do']},
    {s: '_____ more sleep!', d: ['is','was','do']},
    {s: 'Just _____ ball please.', d: ['is','was','do']}
  ],
  'two': [
    {s: 'I have _____ pets.', d: ['is','was','do']},
    {s: "It is _____ o'clock.", d: ['is','was','do']},
    {s: 'I see _____ red balls.', d: ['is','was','do']}
  ],
  'all': [
    {s: '_____ done now!', d: ['is','was','the']},
    {s: 'We _____ ran fast.', d: ['is','was','the']},
    {s: '_____ the kids played.', d: ['is','was','do']}
  ],
  'who': [
    {s: '_____ are you?', d: ['is','was','the']},
    {s: '_____ is at the door?', d: ['is','was','the']},
    {s: '_____ has my hat?', d: ['is','was','the']}
  ],
  'when': [
    {s: '_____ can we go?', d: ['is','was','the']},
    {s: '_____ is dinner?', d: ['is','was','the']},
    {s: '_____ did you come?', d: ['is','was','the']}
  ],
  'where': [
    {s: '_____ are you?', d: ['is','was','the']},
    {s: '_____ is my bag?', d: ['is','was','the']},
    {s: '_____ do you live?', d: ['is','was','the']}
  ],
  'what': [
    {s: '_____ is that?', d: ['is','was','the']},
    {s: '_____ time is it?', d: ['is','was','the']},
    {s: '_____ a great day!', d: ['is','was','the']}
  ],
  'why': [
    {s: '_____ are you sad?', d: ['is','was','the']},
    {s: '_____ did it fall?', d: ['is','was','the']},
    {s: '_____ not have one?', d: ['is','was','the']}
  ],
  'come': [
    {s: 'Please _____ here.', d: ['the','my','of']},
    {s: '_____ with me now.', d: ['the','my','of']},
    {s: 'Can you _____ and play?', d: ['the','my','of']}
  ],
  'some': [
    {s: 'I want _____ cake.', d: ['is','was','do']},
    {s: 'Give me _____ please.', d: ['is','was','do']},
    {s: '_____ of them ran.', d: ['is','was','do']}
  ],
  'there': [
    {s: 'It is over _____.', d: ['is','was','do']},
    {s: 'Look _____ now!', d: ['is','was','do']},
    {s: '_____ is my hat.', d: ['is','was','do']}
  ],
  'their': [
    {s: 'That is _____ ball.', d: ['is','was','do']},
    {s: '_____ dog is big.', d: ['is','was','do']},
    {s: 'I see _____ house.', d: ['is','was','do']}
  ],
  'here': [
    {s: 'Come _____ to me.', d: ['is','was','do']},
    {s: '_____ I am, mum.', d: ['is','was','do']},
    {s: '_____ is the book.', d: ['is','was','do']}
  ],
  'like': [
    {s: 'I _____ cake.', d: ['the','my','and']},
    {s: 'They _____ to play.', d: ['the','my','and']},
    {s: 'Do you _____ pizza?', d: ['the','my','and']}
  ],
  'love': [
    {s: 'I _____ my mum.', d: ['the','my','and']},
    {s: 'We _____ pizza.', d: ['the','my','and']},
    {s: '_____ is kind.', d: ['the','my','and']}
  ],
  'see': [
    {s: 'I can _____ it.', d: ['the','my','and']},
    {s: 'Can you _____ the cat?', d: ['the','my','and']},
    {s: 'Did you _____ that?', d: ['the','my','and']}
  ],
  'play': [
    {s: 'Let us _____ now.', d: ['the','my','and']},
    {s: 'I _____ ball at home.', d: ['the','my','and']},
    {s: 'Can we _____ here?', d: ['the','my','and']}
  ],
  'on': [
    {s: 'Sit _____ the chair.', d: ['is','was','do']},
    {s: 'Put it _____ the table.', d: ['is','was','do']},
    {s: 'Get _____ the bus.', d: ['is','was','do']}
  ],
  'in': [
    {s: 'Come _____ please.', d: ['is','was','do']},
    {s: 'It is _____ the box.', d: ['is','was','do']},
    {s: 'Get _____ the car.', d: ['is','was','do']}
  ],
  'out': [
    {s: 'Get _____ of bed.', d: ['is','was','do']},
    {s: 'Go _____ to play.', d: ['is','was','do']},
    {s: 'Take it _____ please.', d: ['is','was','do']}
  ],
  'up': [
    {s: 'Look _____ at the sky!', d: ['is','was','do']},
    {s: 'Go _____ the stairs.', d: ['is','was','do']},
    {s: 'Stand _____ now.', d: ['is','was','do']}
  ],
  'down': [
    {s: 'Sit _____ here.', d: ['is','was','do']},
    {s: 'Fall _____ slowly.', d: ['is','was','do']},
    {s: 'Look _____ at the floor.', d: ['is','was','do']}
  ],
  'this': [
    {s: '_____ is fun.', d: ['and','my','for']},
    {s: 'Take _____ home.', d: ['and','my','for']},
    {s: '_____ way please.', d: ['and','my','for']}
  ],
  'that': [
    {s: '_____ is mine.', d: ['and','my','for']},
    {s: 'Look at _____.', d: ['and','my','for']},
    {s: '_____ is good.', d: ['and','my','for']}
  ],
  'then': [
    {s: 'And _____ we ran.', d: ['is','was','do']},
    {s: 'See you _____.', d: ['is','was','do']},
    {s: '_____ what happened?', d: ['is','was','do']}
  ],
  'than': [
    {s: 'Bigger _____ me.', d: ['is','was','do']},
    {s: 'More _____ five.', d: ['is','was','do']},
    {s: 'Faster _____ you.', d: ['is','was','do']}
  ],
  'into': [
    {s: 'Jump _____ the pool.', d: ['is','was','do']},
    {s: 'Look _____ the box.', d: ['is','was','do']},
    {s: 'Go _____ the room.', d: ['is','was','do']}
  ],
  'from': [
    {s: 'I am _____ here.', d: ['is','was','do']},
    {s: 'A gift _____ mum.', d: ['is','was','do']},
    {s: 'Run _____ the dog.', d: ['is','was','do']}
  ],
  'your': [
    {s: 'Where is _____ bag?', d: ['is','was','do']},
    {s: '_____ turn now.', d: ['is','was','do']},
    {s: 'Is this _____?', d: ['is','was','do']}
  ],
  'our': [
    {s: '_____ class is fun.', d: ['is','was','do']},
    {s: 'This is _____ home.', d: ['is','was','do']},
    {s: '_____ team won.', d: ['is','was','do']}
  ],
  'an': [
    {s: 'I have _____ apple.', d: ['is','was','do']},
    {s: '_____ ant ran by.', d: ['is','was','do']},
    {s: '_____ egg on toast.', d: ['is','was','do']}
  ],
  'or': [
    {s: 'Cake _____ ice cream?', d: ['the','my','do']},
    {s: 'Yes _____ no?', d: ['the','my','do']},
    {s: 'Sit _____ stand.', d: ['the','my','do']}
  ],
  'if': [
    {s: '_____ it rains, we stay in.', d: ['is','was','do']},
    {s: 'Tell me _____ you can.', d: ['is','was','do']},
    {s: 'See _____ it works.', d: ['is','was','do']}
  ],
  'because': [
    {s: 'I am happy _____ it is sunny.', d: ['the','my','was']},
    {s: 'We ran _____ we were late.', d: ['the','my','was']},
    {s: 'I sleep _____ I am tired.', d: ['the','my','was']}
  ],
};

/** Word type from CSV batches (verb/noun/adj/function/other) — used for distractor matching. */
const HW_WORD_TYPES = {};

function normalizeWordType(raw) {
  const t = String(raw ?? '').trim().toLowerCase();
  if (t === 'noun' || t === 'n') return 'noun';
  if (t === 'verb' || t === 'v') return 'verb';
  if (t === 'adj' || t === 'adjective' || t === 'ad') return 'adj';
  if (t === 'adverb' || t === 'adv') return 'adv';
  if (t === 'function' || t === 'func' || t === 'determiner' || t === 'pronoun'
    || t === 'preposition' || t === 'conjunction') return 'function';
  if (t === 'number' || t === 'num') return 'number';
  return t ? 'other' : '';
}

function getWordType(word) {
  const w = String(word).toLowerCase();
  const fromBank = normalizeWordType(HW_WORD_TYPES[w]);
  if (fromBank) return fromBank;
  const lv = LONG_VOWEL_WORD_INDEX[w];
  if (lv?.type) return normalizeWordType(lv.type);
  return '';
}

const HW_BLANK_FUNCTION_WORDS = ['the', 'and', 'is', 'was', 'are', 'to', 'a', 'he', 'she', 'we', 'you', 'they', 'it', 'my', 'our', 'in', 'on', 'at', 'for'];

/** Word Challenge distractors: other student focus words first, then common heart words. */
function pickBlankDistractors(target, pool, count = 3) {
  const t = String(target).toLowerCase();
  const targetType = getWordType(t);
  const others = shuffle(
    [...new Set(pool.map(w => String(w).toLowerCase()))].filter(w => {
      if (!w || w === t) return false;
      const wt = getWordType(w);
      if (targetType) return wt && wt !== targetType;
      return !!wt;
    })
  );
  const picks = others.slice(0, count);
  for (const f of HW_BLANK_FUNCTION_WORDS) {
    if (picks.length >= count) break;
    if (f !== t && !picks.includes(f)) picks.push(f);
  }
  return picks.slice(0, count);
}

/** Wrong answers use a different word type so they do not fit the sentence blank. */
function pickBlankDistractorsPreferType(target, pool, count = 3) {
  const t = String(target).toLowerCase();
  const targetType = getWordType(t);
  const poolWords = [...new Set(pool.map(w => String(w).toLowerCase()))].filter(w => w && w !== t && isValidGameToken(w));
  const picks = [];

  const addFrom = (words) => {
    for (const w of shuffle(words)) {
      if (picks.length >= count) break;
      if (!picks.includes(w)) picks.push(w);
    }
  };

  if (targetType) {
    addFrom(poolWords.filter(w => {
      const wt = getWordType(w);
      return wt && wt !== targetType;
    }));
    if (picks.length >= count) return picks.slice(0, count);

    const preferOrder = targetType === 'noun'
      ? ['verb', 'adj', 'function', 'adv', 'number', 'other']
      : targetType === 'verb'
        ? ['noun', 'adj', 'function', 'adv', 'number', 'other']
        : targetType === 'adj'
          ? ['noun', 'verb', 'function', 'adv', 'number', 'other']
          : ['noun', 'verb', 'adj', 'function', 'adv', 'other'];
    for (const prefer of preferOrder) {
      addFrom(poolWords.filter(w => getWordType(w) === prefer));
      if (picks.length >= count) break;
    }
    if (picks.length >= count) return picks.slice(0, count);
  }

  addFrom(HW_BLANK_FUNCTION_WORDS.filter(f => f !== t));
  if (picks.length >= count) return picks.slice(0, count);
  return pickBlankDistractors(target, pool, count);
}

/** Word Challenge option row: curated distractors + different-type fill from pool. */
function buildBlankChallengeOptions(target, curatedD, targetPool, needCount = 3) {
  const t = String(target ?? '').trim();
  if (!isValidGameToken(t)) return [];
  const tKey = t.toLowerCase();
  let distractors = uniqueValidTokens(curatedD).filter(w => w.toLowerCase() !== tKey);
  if (distractors.length < needCount) {
    for (const w of pickBlankDistractorsPreferType(t, targetPool, needCount)) {
      if (distractors.length >= needCount) break;
      const key = w.toLowerCase();
      if (key !== tKey && !distractors.map(d => d.toLowerCase()).includes(key)) distractors.push(w);
    }
  }
  const fallbacks = ['the', 'and', 'is', 'was', 'to', 'a', 'he', 'she', 'we', 'you'];
  for (const f of fallbacks) {
    if (distractors.length >= needCount) break;
    if (f !== tKey && !distractors.includes(f)) distractors.push(f);
  }
  return shuffle([t, ...distractors.slice(0, needCount)]);
}

function normalizeHwBlankSentence(s) {
  return String(s || '')
    .trim()
    .replace(/\*\*([^*]+)\*\*/gi, '_____')
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .replace(/_{2,}/g, '_____');
}

/** Merge Fry/CSV sentences into HW_SENTENCES (CSV lines first, then any embedded extras). */
function mergeHwSentenceRecords(word, sentenceStrings, typeRaw) {
  const key = String(word ?? '').trim().toLowerCase();
  if (!key) return false;
  const incoming = (sentenceStrings || [])
    .map(s => normalizeHwBlankSentence(s))
    .filter(s => s.length > 0 && /_____/.test(s));
  if (incoming.length === 0) return false;

  const existing = HW_SENTENCES[key] || [];
  const seen = new Set();
  const merged = [];
  for (const s of incoming) {
    if (seen.has(s)) continue;
    seen.add(s);
    const prev = existing.find(e => normalizeHwBlankSentence(e.s) === s);
    merged.push({ s, d: prev?.d?.length ? prev.d : null });
  }
  for (const e of existing) {
    const s = normalizeHwBlankSentence(e.s);
    if (!s || !/_____/.test(s) || seen.has(s)) continue;
    seen.add(s);
    merged.push({ s, d: e.d?.length ? e.d : null });
  }
  HW_SENTENCES[key] = merged;
  const type = normalizeWordType(typeRaw);
  if (type) HW_WORD_TYPES[key] = type;
  return true;
}

/** Parse UTF-8 CSV (quoted fields, commas inside quotes). */
function parseCsvRows(text) {
  const raw = String(text).replace(/^\uFEFF/, '');
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    const next = raw[i + 1];
    if (inQuotes) {
      if (ch === '"' && next === '"') { cell += '"'; i++; }
      else if (ch === '"') inQuotes = false;
      else cell += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n' || (ch === '\r' && next === '\n')) {
      if (ch === '\r') i++;
      row.push(cell);
      if (row.some(c => String(c).trim().length)) rows.push(row.map(c => String(c).trim()));
      row = []; cell = '';
    } else if (ch !== '\r') cell += ch;
  }
  row.push(cell);
  if (row.some(c => String(c).trim().length)) rows.push(row.map(c => String(c).trim()));
  return rows;
}

/**
 * Integrate one CSV batch into HW_SENTENCES + HW_WORD_TYPES.
 * @returns {{ added: number, updated: number, skipped: number }}
 */
function registerHwSentenceBatchCsv(csvText, batchLabel = 'batch') {
  const rows = parseCsvRows(csvText);
  if (rows.length < 2) return { added: 0, updated: 0, skipped: 0, label: batchLabel };
  const header = rows[0].map(h => h.toLowerCase().replace(/\s+/g, ''));
  const col = (name, alts = []) => {
    const keys = [name, ...alts].map(k => k.toLowerCase().replace(/\s+/g, ''));
    for (const k of keys) {
      const i = header.indexOf(k);
      if (i >= 0) return i;
    }
    return -1;
  };
  const iWord = col('word');
  const iType = col('type', ['wordtype', 'pos', 'partofspeech']);
  const iS1 = col('sentence1', ['sentence_1', 's1']);
  const iS2 = col('sentence2', ['sentence_2', 's2']);
  const iS3 = col('sentence3', ['sentence_3', 's3']);
  if (iWord < 0 || iS1 < 0) {
    console.warn('[Word Challenge] CSV missing word or sentence1 column:', batchLabel);
    return { added: 0, updated: 0, skipped: rows.length - 1, label: batchLabel };
  }
  let added = 0;
  let updated = 0;
  let skipped = 0;
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const word = String(row[iWord] || '').trim().toLowerCase();
    if (!word) { skipped++; continue; }
    const typeRaw = iType >= 0 ? String(row[iType] || '').trim() : '';
    const rawSentences = [iS1, iS2, iS3].filter(i => i >= 0).map(i => row[i]);
    const hadBefore = !!(HW_SENTENCES[word] && HW_SENTENCES[word].length);
    if (!mergeHwSentenceRecords(word, rawSentences, typeRaw)) { skipped++; continue; }
    if (hadBefore) updated++;
    else added++;
  }
  console.info(`[Word Challenge] ${batchLabel}: +${added} new, ${updated} updated, ${skipped} skipped`);
  return { added, updated, skipped, label: batchLabel };
}

function applyHwSentenceCsvBatches() {
  const list = window.__HW_BATCH_CSV_LIST__ || [];
  if (!list.length) {
    console.warn(
      '[Word Challenge] No Fry sentence bank loaded. Ensure data/word-challenge/hw-sentence-bank.js is present, ' +
      'then run: node data/word-challenge/integrate-fry-batch.js rebuild-all-fry'
    );
  }
  let total = { added: 0, updated: 0, skipped: 0 };
  list.forEach((csv, i) => {
    const stats = registerHwSentenceBatchCsv(csv, `batch-${i + 1}`);
    total.added += stats.added;
    total.updated += stats.updated;
    total.skipped += stats.skipped;
  });
  if (list.length) console.info('[Word Challenge] Fry sentence bank loaded:', total);
  return total;
}

/** US Fry spellings → British bank keys (same sentences). */
const HW_BLANK_ALIASES = { center: 'centre', toward: 'towards' };

/** Long A / E / O CSV word banks (gpc → example words, word → sentences). */
let GPC_LONG_VOWEL_BANK = { longA: {}, longE: {}, longO: {} };
let LONG_VOWEL_WORD_INDEX = {};

function longVowelSetForUnit(unitName) {
  const n = String(unitName || '').toLowerCase();
  if (n.includes('long a')) return 'longA';
  if (n.includes('long e')) return 'longE';
  if (n.includes('long o')) return 'longO';
  return null;
}

function applyLongVowelWordLists() {
  const data = window.__LONG_VOWEL_LISTS__;
  if (!data) return { words: 0 };
  GPC_LONG_VOWEL_BANK = { longA: {}, longE: {}, longO: {} };
  LONG_VOWEL_WORD_INDEX = {};
  const ingest = (setId, entries) => {
    for (const e of entries || []) {
      const word = String(e.word || '').toLowerCase();
      const gpc = String(e.gpc || '').trim();
      if (!isValidGameToken(word) || !gpc) continue;
      const gpcKey = normalizeGpcKey(gpc);
      if (!GPC_LONG_VOWEL_BANK[setId][gpcKey]) GPC_LONG_VOWEL_BANK[setId][gpcKey] = [];
      if (!GPC_LONG_VOWEL_BANK[setId][gpcKey].includes(word)) GPC_LONG_VOWEL_BANK[setId][gpcKey].push(word);
      LONG_VOWEL_WORD_INDEX[word] = { ...e, setId };
      const wType = normalizeWordType(e.type);
      if (wType) HW_WORD_TYPES[word] = wType;
      const sentences = (e.sentences || []).filter(s => s && /_____/.test(s));
      if (sentences.length && !HW_SENTENCES[word]) {
        HW_SENTENCES[word] = sentences.map(s => ({ s, d: null }));
      }
    }
  };
  ingest('longA', data.longA);
  ingest('longE', data.longE);
  ingest('longO', data.longO);
  const words = Object.keys(LONG_VOWEL_WORD_INDEX).length;
  if (words) console.info('[Long vowel lists] Loaded', words, 'words');
  return { words };
}

function normalizeGpcKey(gpc) {
  return String(gpc ?? '').trim().toLowerCase()
    .replaceAll('a-e', 'a_e')
    .replaceAll('o-e', 'o_e');
}

/** Matches Assessment Buddy export: phoneme + \u0001 + exampleWord in audio.gpc keys and game pool identity. */
const GPC_AUDIO_SEP = '\u0001';

function gpcAudioStorageKey(phoneme, exampleWord) {
  const g = String(phoneme ?? '').trim();
  const ex = String(exampleWord ?? '').trim();
  if (!g) return '';
  if (!ex) return g;
  return g + GPC_AUDIO_SEP + ex;
}

function parseGpcStorageKey(key) {
  const s = String(key ?? '');
  const i = s.indexOf(GPC_AUDIO_SEP);
  if (i < 0) return { phoneme: s, exampleWord: '' };
  return { phoneme: s.slice(0, i), exampleWord: s.slice(i + 1) };
}

function gpcDisplayPhoneme(keyOrItem) {
  if (keyOrItem && typeof keyOrItem === 'object') return String(keyOrItem.gpc ?? '').trim();
  return parseGpcStorageKey(keyOrItem).phoneme;
}

function gpcPoolKey(item) {
  if (!item) return '';
  if (item.key) return item.key;
  return gpcAudioStorageKey(item.gpc, item.exampleWord) || `${item.unitIdx}:${item.slotIdx ?? 0}`;
}

function gpcProfileLabel(item) {
  const g = String(item?.gpc ?? '').trim();
  const ex = String(item?.exampleWord ?? '').trim();
  return ex ? `${g} · ${ex}` : g;
}

function formatGpcOptionLabel(poolKey, allKeys) {
  const { phoneme, exampleWord } = parseGpcStorageKey(poolKey);
  const dupes = (allKeys || []).filter(k =>
    gpcDisplayPhoneme(k).toLowerCase() === phoneme.toLowerCase()
  );
  if (dupes.length > 1 && exampleWord) {
    return `${escapeHtmlText(phoneme)}<span class="text-base opacity-80 font-semibold"> · ${escapeHtmlText(exampleWord)}</span>`;
  }
  return escapeHtmlText(phoneme);
}

function findGpcNeedItem(gpc, needs, exampleWord) {
  const keyStr = String(gpc ?? '');
  if (keyStr.includes(GPC_AUDIO_SEP)) {
    const { phoneme, exampleWord: ex } = parseGpcStorageKey(keyStr);
    if (needs) {
      const hit = [...needs.targetGpcs, ...needs.masteredGpcs].find(x =>
        normalizeGpcKey(x.gpc) === normalizeGpcKey(phoneme) &&
        String(x.exampleWord ?? '').trim().toLowerCase() === ex.toLowerCase()
      );
      if (hit) return hit;
    }
    return findGpcInClass(phoneme, ex);
  }
  const key = normalizeGpcKey(gpc);
  if (!key || !needs) {
    const ph = gpcDisplayPhoneme(gpc);
    const ex = exampleWord || parseGpcStorageKey(gpc).exampleWord || '';
    return findGpcInClass(ph, ex);
  }
  const matches = [...needs.targetGpcs, ...needs.masteredGpcs]
    .filter(x => normalizeGpcKey(x.gpc) === key);
  if (!matches.length) {
    const ph = gpcDisplayPhoneme(gpc);
    const ex = exampleWord || parseGpcStorageKey(gpc).exampleWord || '';
    return findGpcInClass(ph, ex);
  }
  if (exampleWord) {
    const ex = String(exampleWord).trim().toLowerCase();
    const exMatch = matches.find(x => String(x.exampleWord ?? '').trim().toLowerCase() === ex);
    if (exMatch) return exMatch;
  }
  const inTargets = matches.find(x =>
    needs.targetGpcs.some(t => gpcPoolKey(t) === gpcPoolKey(x))
  );
  const withAudio = matches.find(x => hasGpcItemAudio(x));
  const item = inTargets || withAudio || matches[0];
  if (item) return item;
  const ph = gpcDisplayPhoneme(gpc);
  const ex = exampleWord || parseGpcStorageKey(gpc).exampleWord || '';
  return findGpcInClass(ph, ex);
}

function pickLongVowelGpcExample(gpc, unitName) {
  const key = normalizeGpcKey(gpc);
  if (!key) return '';
  const setId = longVowelSetForUnit(unitName);
  const banks = setId
    ? [GPC_LONG_VOWEL_BANK[setId]]
    : [GPC_LONG_VOWEL_BANK.longA, GPC_LONG_VOWEL_BANK.longE, GPC_LONG_VOWEL_BANK.longO];
  const candidates = [];
  const add = (w) => {
    const word = String(w ?? '').trim();
    if (!isValidGameToken(word) || normalizeGpcKey(word) === key) return;
    if (!candidates.includes(word)) candidates.push(word);
  };
  for (const bank of banks) {
    for (const w of bank[key] || []) add(w);
  }
  if (!candidates.length) {
    for (const [word, entry] of Object.entries(LONG_VOWEL_WORD_INDEX)) {
      if (setId && entry.setId !== setId) continue;
      if (normalizeGpcKey(entry.gpc) === key) add(word);
    }
  }
  if (!candidates.length) return '';
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function resolveGpcExampleWord(gpc) {
  if (!state.selectedStudent || !isValidGameToken(gpcDisplayPhoneme(gpc))) return '';
  if (String(gpc ?? '').includes(GPC_AUDIO_SEP)) {
    return parseGpcStorageKey(gpc).exampleWord;
  }
  const needs = state.selectedStudent ? getStudentNeeds(state.selectedStudent) : null;
  const item = findGpcNeedItem(gpc, needs);
  if (item?.exampleWord) return item.exampleWord;
  return pickLongVowelGpcExample(gpcDisplayPhoneme(gpc), item?.unit);
}

function collectHwBlankSentenceLines(word) {
  const key = getHwSentenceKey(word);
  const lower = key.toLowerCase();
  const lines = [];
  const seen = new Set();
  const addLine = (s) => {
    const norm = normalizeHwBlankSentence(s);
    if (!norm || !/_____/.test(norm) || seen.has(norm)) return;
    seen.add(norm);
    lines.push(norm);
  };

  const longEntry = LONG_VOWEL_WORD_INDEX[key] || LONG_VOWEL_WORD_INDEX[lower];
  longEntry?.sentences?.forEach(addLine);

  const curated = HW_SENTENCES[key] || HW_SENTENCES[lower];
  curated?.forEach(e => addLine(e.s));

  const numberStock = HW_NUMBER_WORD_SENTENCES[key] || HW_NUMBER_WORD_SENTENCES[lower];
  numberStock?.forEach(e => addLine(e.s));

  return { key, lines, curated };
}

/** Stock blank sentences for number words missing from Fry CSV batches (e.g. nine). */
const HW_NUMBER_WORD_SENTENCES = {
  zero: [
    { s: 'I see _____ ducks.', d: null },
    { s: 'We have _____ pets.', d: null },
    { s: 'There are _____ cats here.', d: null },
  ],
  one: [
    { s: 'I have _____ dog.', d: null },
    { s: 'Pick _____ apple, please.', d: null },
    { s: '_____ bird is on the roof.', d: null },
  ],
  two: [
    { s: 'I have _____ cats.', d: null },
    { s: 'She is _____ years old.', d: null },
    { s: '_____ birds are in the tree.', d: null },
  ],
  three: [
    { s: 'I see _____ ducks.', d: null },
    { s: 'We have _____ books.', d: null },
    { s: '_____ frogs jumped in the pond.', d: null },
  ],
  four: [
    { s: 'I ate _____ buns.', d: null },
    { s: 'There are _____ chairs.', d: null },
    { s: 'She has _____ pens.', d: null },
  ],
  five: [
    { s: 'I have _____ fingers up.', d: null },
    { s: 'We saw _____ dogs.', d: null },
    { s: '_____ stars are bright.', d: null },
  ],
  six: [
    { s: 'I am _____ years old.', d: null },
    { s: 'We have _____ eggs.', d: null },
    { s: '_____ ducks swam away.', d: null },
  ],
  seven: [
    { s: 'I see _____ birds.', d: null },
    { s: 'We have _____ days left.', d: null },
    { s: '_____ frogs are green.', d: null },
  ],
  eight: [
    { s: 'I have _____ crayons.', d: null },
    { s: 'We ate _____ apples.', d: null },
    { s: '_____ ducks are on the pond.', d: null },
  ],
  nine: [
    { s: 'I ate _____ buns.', d: null },
    { s: 'She has _____ crayons.', d: null },
    { s: 'We saw _____ birds.', d: null },
  ],
  ten: [
    { s: 'I can count to _____.', d: null },
    { s: 'We have _____ toes.', d: null },
    { s: '_____ ducks swam in a row.', d: null },
  ],
  eleven: [
    { s: 'I am _____ years old.', d: null },
    { s: 'We have _____ players.', d: null },
    { s: '_____ birds sat on the wire.', d: null },
  ],
  twelve: [
    { s: 'There are _____ months in a year.', d: null },
    { s: 'I see _____ eggs in the box.', d: null },
    { s: 'We ate _____ buns.', d: null },
  ],
};

/** Curated HW_SENTENCES (+ CSV batches); minimal fallback only when no entry exists. */
function getHwSentenceKey(word) {
  const raw = String(word ?? '').trim();
  if (!raw) return '';
  if (HW_SENTENCES[raw] || LONG_VOWEL_WORD_INDEX[raw] || HW_NUMBER_WORD_SENTENCES[raw]) return raw;
  const lower = raw.toLowerCase();
  if (HW_BLANK_ALIASES[lower]) return HW_BLANK_ALIASES[lower];
  if (HW_SENTENCES[lower] || LONG_VOWEL_WORD_INDEX[lower] || HW_NUMBER_WORD_SENTENCES[lower]) return lower;
  return lower;
}

function getHwBlankEntries(word, pool) {
  const { lines, curated } = collectHwBlankSentenceLines(word);
  if (lines.length > 0) {
    return lines.map(s => {
      const match = curated?.find(e => normalizeHwBlankSentence(e.s) === s);
      return {
        s,
        d: (match?.d && match.d.length) ? match.d : pickBlankDistractorsPreferType(word, pool, 3),
      };
    });
  }
  return [{
    s: 'Listen. The word is _____.',
    d: pickBlankDistractorsPreferType(word, pool, 3),
  }];
}

// ============================================================
// PASSWORD GENERATION
// ============================================================
const ADJECTIVES = ['Happy','Brave','Sunny','Lucky','Mighty','Swift','Cosmic','Royal','Wild','Calm','Bold','Cool','Fancy','Gentle','Jolly','Kind','Magic','Quick','Smart','Tiny','Wise','Zesty','Bright','Clever','Funny','Honest','Joyful','Loyal','Polite','Tidy','Friendly','Pink','Blue','Gold','Silver','Red','Green','Purple','Orange','Sparkly','Tall','Small','Big','Fast','Slow','Soft','Strong','Sweet','Shiny','Furry'];
const NOUNS = ['Fox','Bear','Tiger','Lion','Eagle','Wolf','Owl','Dragon','Star','Moon','Sun','Rocket','Comet','Cloud','River','Mountain','Forest','Ocean','Cat','Dog','Bird','Fish','Tree','Leaf','Rose','Apple','Berry','Crystal','Diamond','Pearl','Whale','Shark','Dolphin','Panda','Koala','Rabbit','Mouse','Elephant','Giraffe','Zebra','Monkey','Frog','Turtle','Bee','Sparrow','Robin','Cactus','Daisy','Tulip','Pony'];

function seededRandom(seed) {
  let s = 0;
  for (let i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) | 0;
  s = Math.abs(s) || 1;
  return function() { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}
function generatePasswords() {
  const cls = state.data.classes[state.classKey];
  const used = new Set();
  state.passwords = {};
  cls.students.forEach((name, idx) => {
    const rnd = seededRandom(state.classKey + '|' + name + '|' + idx);
    let pw, tries = 0;
    do {
      const adj = ADJECTIVES[Math.floor(rnd() * ADJECTIVES.length)];
      const noun = NOUNS[Math.floor(rnd() * NOUNS.length)];
      pw = `${adj} ${noun}`;
      tries++;
      if (tries > 80) { pw = `${pw} ${idx+1}`; break; }
    } while (used.has(pw));
    used.add(pw);
    state.passwords[name] = pw;
  });
}

// ============================================================
// POINTS
// ============================================================
function pointsKey(name) { return `rapoints_${state.classKey}_${name}`; }
function loadPoints() {
  if (window.isDesktopAdventures && window.AdventuresDesktop) {
    window.AdventuresDesktop.loadStudentProgressForClass(state.classKey);
    return;
  }
  state.studentPoints = {};
  try {
    const cls = state.data.classes[state.classKey];
    cls.students.forEach(name => {
      const v = localStorage.getItem(pointsKey(name));
      state.studentPoints[name] = v ? parseInt(v,10) : 0;
    });
  } catch(e) {
    const cls = state.data.classes[state.classKey];
    cls.students.forEach(name => state.studentPoints[name] = 0);
  }
}
function getPoints(name) { return state.studentPoints[name] || 0; }
function addPoints(name, n) {
  state.studentPoints[name] = (state.studentPoints[name] || 0) + n;
  if (window.isDesktopAdventures && window.AdventuresDesktop) {
    window.AdventuresDesktop.setPoints(name, state.studentPoints[name]);
    return;
  }
  try { localStorage.setItem(pointsKey(name), state.studentPoints[name]); } catch(e){}
}
function spendPoints(name, n) {
  if (getPoints(name) < n) return false;
  state.studentPoints[name] -= n;
  if (window.isDesktopAdventures && window.AdventuresDesktop) {
    window.AdventuresDesktop.setPoints(name, state.studentPoints[name]);
    return true;
  }
  try { localStorage.setItem(pointsKey(name), state.studentPoints[name]); } catch(e){}
  return true;
}

function awardStarcadeWinBonus(key) {
  const name = state.selectedStudent;
  if (!name || state.arcadeFromBoard) return;
  state.starcadeBonuses = state.starcadeBonuses || {};
  if (state.starcadeBonuses[key]) return;
  state.starcadeBonuses[key] = true;
  addPoints(name, STARCADE_WIN_BONUS);
}

function gameEndScoreTotal(g) {
  if (g.type === 'flash') return g.cards?.length || 0;
  if (g.type === 'gpcCatch') return g.attempts || g.roundIdx || CHALLENGE_ROUNDS;
  return g.totalRounds || CHALLENGE_ROUNDS;
}

function isReadingGamePerfect(g) {
  if (!g.finished) return false;
  const total = gameEndScoreTotal(g);
  if (!total) return false;
  return (g.correct || 0) === total;
}

// ============================================================
// FLASH CARD RESULTS
// ============================================================
function flashResultsKey(name) { return `raflash_${state.classKey}_${name}`; }
function loadFlashResults() {
  if (window.isDesktopAdventures && window.AdventuresDesktop) {
    window.AdventuresDesktop.loadStudentProgressForClass(state.classKey);
    return;
  }
  state.flashResults = {};
  try {
    const cls = state.data.classes[state.classKey];
    cls.students.forEach(name => {
      const v = localStorage.getItem(flashResultsKey(name));
      state.flashResults[name] = v ? JSON.parse(v) : {};
    });
  } catch(e) {
    const cls = state.data.classes[state.classKey];
    cls.students.forEach(name => state.flashResults[name] = {});
  }
}
function setFlashResult(name, word, status) {
  if (!state.flashResults[name]) state.flashResults[name] = {};
  state.flashResults[name][word] = status;
  if (window.isDesktopAdventures && window.AdventuresDesktop) {
    window.AdventuresDesktop.setFlashResults(name, state.flashResults[name]);
    return;
  }
  try { localStorage.setItem(flashResultsKey(name), JSON.stringify(state.flashResults[name])); } catch(e){}
}
function getFlashStatus(word) {
  const name = state.selectedStudent;
  if (!name || !state.flashResults[name]) return null;
  return state.flashResults[name][word] || null;
}
function flashBorderClass(word) {
  const s = getFlashStatus(word);
  if (s === 'got') return 'ring-4 ring-green-400 border-green-400';
  if (s === 'tricky') return 'ring-4 ring-orange-400 border-orange-400';
  return '';
}

// ============================================================
// FEEDBACK
// ============================================================
function pickFeedbackMessage(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const SOUND_BOX_CORRECT_FEEDBACK = [
  'Change the first sound and make a new word!',
  'Yes! You put each sound in a box. Great job!',
  'You did it! Every sound is in the right box.',
  "That's correct! You matched each sound to its box.",
  'Good job! You spelled the word sound by sound.',
];

function pickSoundBoxCorrectFeedback() {
  if (state.soundBoxFeedbackCycle == null) state.soundBoxFeedbackCycle = 0;
  const msg = SOUND_BOX_CORRECT_FEEDBACK[state.soundBoxFeedbackCycle];
  state.soundBoxFeedbackCycle = (state.soundBoxFeedbackCycle + 1) % SOUND_BOX_CORRECT_FEEDBACK.length;
  return msg;
}

/** String GPC or `{ gpc|sound, example|exampleWord }` with optional parallel gpcExamples[i]. */
function parseGpcEntry(entry, exampleFromArray) {
  if (entry && typeof entry === 'object' && !Array.isArray(entry)) {
    const sound = String(entry.gpc ?? entry.sound ?? entry.value ?? '').trim();
    const example = String(entry.example ?? entry.exampleWord ?? exampleFromArray ?? '').trim();
    return { sound, example };
  }
  return {
    sound: String(entry ?? '').trim(),
    example: String(exampleFromArray ?? '').trim()
  };
}

/** One GPC slot from class unit content (Assessment Buddy shape). */
function makeGpcItemFromUnitSlot(unit, uIdx, slotIdx) {
  const gpcExamples = Array.isArray(unit.gpcExamples) ? unit.gpcExamples : [];
  const { sound, example } = parseGpcEntry(unit.gpcs[slotIdx], gpcExamples[slotIdx]);
  if (!isValidGameToken(sound)) return null;
  const exampleWord = isValidGameToken(example) ? example : '';
  return {
    gpc: sound,
    exampleWord,
    unitIdx: uIdx,
    slotIdx,
    unit: unit.name,
    key: gpcAudioStorageKey(sound, exampleWord) || `${uIdx}:${slotIdx}`,
  };
}

/** All filled GPC slots defined in class units (source of truth for content + audio keys). */
function collectClassGpcItems(cls) {
  const items = [];
  (cls?.units || []).forEach((unit, uIdx) => {
    (unit.gpcs || []).forEach((_, slotIdx) => {
      const item = makeGpcItemFromUnitSlot(unit, uIdx, slotIdx);
      if (item) items.push(item);
    });
  });
  return items;
}

/** Lookup a GPC slot in class unit definitions (not student mastery). */
function findGpcInClass(phoneme, exampleWord) {
  const cls = state.data?.classes?.[state.classKey];
  if (!cls) return null;
  const key = normalizeGpcKey(phoneme);
  if (!key) return null;
  const items = collectClassGpcItems(cls);
  const ex = String(exampleWord ?? '').trim().toLowerCase();
  if (ex) {
    const hit = items.find(x =>
      normalizeGpcKey(x.gpc) === key &&
      String(x.exampleWord ?? '').trim().toLowerCase() === ex
    );
    if (hit) return hit;
  }
  const matches = items.filter(x => normalizeGpcKey(x.gpc) === key);
  if (matches.length === 1) return matches[0];
  const withEx = matches.find(x => String(x.exampleWord ?? '').trim());
  if (withEx) return withEx;
  return matches[0] || null;
}

function normalizeClassUnit(unit, index) {
  if (!unit.name) unit.name = 'Unit ' + (index + 1);
  if (!Array.isArray(unit.gpcs)) unit.gpcs = [];
  if (!Array.isArray(unit.heartWords)) unit.heartWords = [];
  if (!unit.carryOverUnit) {
    const gpcN = unit.gpcSlotCount != null ? unit.gpcSlotCount : unit.gpcs.length;
    const hwN = unit.hwSlotCount != null ? unit.hwSlotCount : unit.heartWords.length;
    while (unit.gpcs.length < gpcN) unit.gpcs.push('');
    while (unit.heartWords.length < hwN) unit.heartWords.push('');
    if (!Array.isArray(unit.gpcExamples)) unit.gpcExamples = unit.gpcs.map(() => '');
    while (unit.gpcExamples.length < gpcN) unit.gpcExamples.push('');
    if (unit.gpcSlotCount != null) {
      unit.gpcs.length = gpcN;
      unit.gpcExamples.length = gpcN;
    }
    if (unit.hwSlotCount != null) unit.hwSlotCount = hwN;
  } else if (!Array.isArray(unit.gpcExamples)) {
    unit.gpcExamples = unit.gpcs.map(() => '');
    while (unit.gpcExamples.length < unit.gpcs.length) unit.gpcExamples.push('');
  }
}

function syncAssessmentObjectForClass(cls, assessment) {
  if (!assessment) return;
  if (!Array.isArray(assessment.units)) assessment.units = [];
  while (assessment.units.length < (cls.units || []).length) {
    assessment.units.push({ gpcs: [], hws: [] });
  }
  assessment.units.length = (cls.units || []).length;
  (cls.units || []).forEach((unit, i) => {
    const ua = assessment.units[i];
    if (!ua) {
      assessment.units[i] = { gpcs: [], hws: [] };
      return;
    }
    if (!Array.isArray(ua.gpcs)) ua.gpcs = [];
    if (!Array.isArray(ua.hws)) ua.hws = [];
    const gpcLen = (unit.gpcs || []).length;
    const hwLen = (unit.heartWords || []).length;
    while (ua.gpcs.length < gpcLen) ua.gpcs.push(0);
    ua.gpcs.length = gpcLen;
    while (ua.hws.length < hwLen) ua.hws.push(0);
    ua.hws.length = hwLen;
  });
}

/** Align imported class with Assessment Buddy export (units, examples, assessment arrays). */
function ensureClassStructure(cls) {
  if (!cls) return;
  if (!cls.assessments) cls.assessments = { baseline: {}, checkpoints: {} };
  if (!cls.assessments.baseline) cls.assessments.baseline = {};
  if (!cls.assessments.checkpoints) cls.assessments.checkpoints = {};
  if (!Array.isArray(cls.checkpoints)) cls.checkpoints = [];
  if (!Array.isArray(cls.units)) cls.units = [];
  cls.units.forEach((u, i) => normalizeClassUnit(u, i));
  if (!cls.audio || typeof cls.audio !== 'object') cls.audio = { gpc: {}, hw: {}, example: {} };
  if (!cls.audio.gpc) cls.audio.gpc = {};
  if (!cls.audio.hw) cls.audio.hw = {};
  if (!cls.audio.example) cls.audio.example = {};
  if (!Array.isArray(cls.students) || !cls.students.length) {
    const names = new Set();
    Object.keys(cls.assessments.baseline || {}).forEach(n => names.add(n));
    Object.keys(cls.assessments.checkpoints || {}).forEach(cpId => {
      Object.keys(cls.assessments.checkpoints[cpId] || {}).forEach(n => names.add(n));
    });
    cls.students = [...names].sort((a, b) => a.localeCompare(b));
  }
  Object.keys(cls.assessments.baseline || {}).forEach(sName => {
    syncAssessmentObjectForClass(cls, cls.assessments.baseline[sName]);
  });
  Object.keys(cls.assessments.checkpoints || {}).forEach(cpId => {
    Object.keys(cls.assessments.checkpoints[cpId] || {}).forEach(sName => {
      syncAssessmentObjectForClass(cls, cls.assessments.checkpoints[cpId][sName]);
    });
  });
}

function normalizeImportedTrackerData(data) {
  if (!data || !data.classes) return data;
  for (const className of Object.keys(data.classes)) {
    ensureClassStructure(data.classes[className]);
  }
  return data;
}

function lookupGpcExampleWord(gpc) {
  return resolveGpcExampleWord(gpc);
}

function getHwContextSnippet(word) {
  const { lines } = collectHwBlankSentenceLines(word);
  const s = lines[0];
  if (!s) return '';
  return String(s).replace(/_____/g, '…').trim();
}

function renderGpcContextBar(exampleWord) {
  const ex = String(exampleWord ?? '').trim();
  if (!ex) return '';
  return `<p class="game-context-bar" aria-label="Example word ${ex}">as in <span class="game-context-word">${ex}</span></p>`;
}

/** Large top-left example hint for Splat the Sound / Sound Splat Challenge (no filled box). */
function renderGpcExampleHint(exampleWord, { flash = false } = {}) {
  const ex = String(exampleWord ?? '').trim();
  if (!ex) return '';
  const flashCls = flash ? ' gpc-example-hint--wrong' : '';
  return `<p class="gpc-example-hint${flashCls}" aria-label="Example word ${ex}"><span class="gpc-example-hint-prefix">as in</span><span class="gpc-example-hint-word">${escapeHtmlText(ex)}</span></p>`;
}

function formatGpcCatchOptionLabel(poolKey) {
  return escapeHtmlText(gpcDisplayPhoneme(poolKey));
}

function gpcSharesDisplayLetter(poolKey, targetKey) {
  const a = gpcDisplayPhoneme(poolKey).toLowerCase();
  const b = gpcDisplayPhoneme(targetKey).toLowerCase();
  return a.length > 0 && a === b;
}

function filterCatchGpcPool(pool, target) {
  const t = String(target ?? '').trim();
  return uniqueValidTokens(pool, { caseSensitive: true }).filter(w => {
    if (w === t) return false;
    if (gpcSharesDisplayLetter(w, t)) return false;
    return true;
  });
}

function buildCatchChallengeOptions(target, distractorPool, targetPool, needCount = 5, masteryStats = null) {
  return buildChallengeOptions(
    target,
    filterCatchGpcPool(distractorPool, target),
    filterCatchGpcPool(targetPool, target),
    needCount,
    'gpc',
    masteryStats
  );
}

function renderHwContextBar(word) {
  const snippet = getHwContextSnippet(word);
  if (!snippet) return '';
  return `<p class="game-context-bar game-context-sentence" aria-label="Example sentence">${snippet}</p>`;
}

function isGenericHwBlankSentence(sentence) {
  return String(sentence ?? '').trim() === 'Listen. The word is _____.';
}

/** When Word Challenge has no curated sentence, show the target word discreetly. */
function renderHwBlankWordHint(target) {
  const hint = renderGpcExampleHint(target);
  if (!hint) return '';
  return `<div class="hw-blank-sentence hw-blank-sentence--hint">${hint}</div>`;
}

function renderHwBlankSentence(sentenceHtml) {
  if (!sentenceHtml) return '';
  return `<p class="hw-blank-sentence" aria-label="Sentence">${sentenceHtml}</p>`;
}

function renderHwBlankCompletedSentence(sentence, target, blankAtStart) {
  const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
  const displayTarget = blankAtStart ? cap(target) : target;
  const safe = String(displayTarget).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const parts = String(sentence).split('_____');
  const html = parts.map((part, i) =>
    i < parts.length - 1
      ? `${part}<mark class="hw-blank-focus-word">${safe}</mark>`
      : part
  ).join('');
  return `<div class="hw-blank-complete"><p class="hw-blank-sentence hw-blank-sentence--complete" aria-label="Completed sentence">${html}</p></div>`;
}

const GAME_NEXT_DELAY_MS = 4000;
const CATCH_CORRECT_BREAK_MS = 4000;

function clearGameNextBtnTimer(g) {
  if (!g) return;
  if (g._nextBtnTimer) {
    clearTimeout(g._nextBtnTimer);
    g._nextBtnTimer = null;
  }
}

function renderGameNextButton(label, nextOnclick) {
  return `<button type="button" onclick="sfxClick(); ${nextOnclick}" class="game-next-btn game-next-btn--delayed">${label}</button>`;
}

/** Feedback row with optional Next (visible immediately; nudge after delay). */
function renderGameTopFeedback(message, correct, nextOnclick, nextLabel = 'Next') {
  if (!message) return '';
  const color = correct === false ? 'text-orange-200' : (correct === true ? 'text-green-300' : 'text-white/90');
  const btn = nextOnclick ? renderGameNextButton(nextLabel, nextOnclick) : '';
  return `<div class="game-top-feedback-row fadeIn">
    <div class="game-top-feedback-msg ${color}">${message}</div>
    ${btn}
  </div>`;
}

/** Replaces in-game titles: example/sentence on top, feedback + Next when needed. */
function renderGamePlayHeader({ contextHtml = '', feedbackMessage = null, feedbackCorrect = null, nextOnclick = null, nextLabel = 'Next' }) {
  const feedbackBlock = feedbackMessage
    ? renderGameTopFeedback(feedbackMessage, feedbackCorrect, nextOnclick, nextLabel)
    : '';
  const contextBlock = contextHtml ? `<div class="game-play-context">${contextHtml}</div>` : '';
  if (!contextBlock && !feedbackBlock) return '';
  return `<div class="game-play-header">${contextBlock}${feedbackBlock}</div>`;
}

/** Next is visible immediately; nudge animation starts after GAME_NEXT_DELAY_MS. */
function scheduleGameNextBtnArm() {
  const g = state.game;
  if (!g) return;
  clearGameNextBtnTimer(g);
  requestAnimationFrame(() => {
    const btn = document.querySelector('.game-next-btn--delayed:not(.game-next-btn--nudge)');
    if (!btn) return;
    g._nextBtnTimer = setTimeout(() => {
      btn.classList.add('game-next-btn--nudge');
      g._nextBtnTimer = null;
    }, GAME_NEXT_DELAY_MS);
  });
}

function afterGameRenderArmNext() {
  if (document.querySelector('.game-next-btn--delayed')) scheduleGameNextBtnArm();
}


function correctFeedback(target, type, gameKind) {
  if (type === 'gpc') {
    const label = gpcDisplayPhoneme(target);
    if (gameKind === 'soundBox') {
      return pickSoundBoxCorrectFeedback();
    }
    if (gameKind === 'soundFlip') {
      return pickFeedbackMessage([
        'Yes! You found the match.',
        'Right! Say the sound again.',
        'Good spot! Say it once more.'
      ]);
    }
    const ex = lookupGpcExampleWord(target);
    const exBit = ex ? ` Like in “${ex}”.` : '';
    return pickFeedbackMessage([
      `Yes! Say “${label}” again.${exBit}`,
      `Right! Find a word with “${label}”.${exBit}`,
      `Good! Say “${label}” three times.${exBit}`
    ]);
  }
  if (gameKind === 'hwBlank') {
    return pickFeedbackMessage([
      `Yes! Say “${target}” again.`,
      `Right! What does “${target}” mean?`,
      `Good! Make your own sentence with “${target}”.`,
      `Nice! Try a new sentence with “${target}”.`
    ]);
  }
  if (gameKind === 'hwJumble') {
    return pickFeedbackMessage([
      `Yes! You found the right spelling of “${target}”.`,
      `Right! Say “${target}” again.`,
      `Good! Picture how “${target}” is spelled.`,
      `Nice! Write “${target}” in the air.`
    ]);
  }
  return pickFeedbackMessage([
    `Yes! Say “${target}” again.`,
    `Right! Write “${target}” in the air.`,
    `Good! Use “${target}” in a sentence.`,
    `Nice! Picture “${target}” in your mind.`
  ]);
}

const CHALLENGE_RETRY_TYPES = new Set(['gpcMatch', 'hwHunt', 'soundFlip', 'hwBlank', 'hwJumble']);

function isChallengeRetryGame(type) {
  return CHALLENGE_RETRY_TYPES.has(type);
}

function challengeNextOnclick(g) {
  if (!g?.feedback) return null;
  if (g.feedback.correct) {
    if (g.type === 'soundFlip') return 'nextSoundFlipRound()';
    if (g.type === 'hwBlank') return 'nextBlankRound()';
    if (g.type === 'hwJumble') return 'nextHwJumbleRound()';
    return 'nextRound()';
  }
  if (isChallengeRetryGame(g.type)) return 'retryChallengeRound()';
  return null;
}

function challengeNextLabel(g) {
  if (g?.feedback && !g.feedback.correct && isChallengeRetryGame(g.type)) return 'Try again';
  return 'Next';
}

function challengeWrongFeedback(target, type, gameKind) {
  if (type === 'gpc') {
    const ex = lookupGpcExampleWord(target);
    const exBit = ex ? ` Think of “${ex}”.` : '';
    return pickFeedbackMessage([
      `Almost! You can try again — listen for “${target}”.${exBit}`,
      `Good try! Have another go and hear “${target}”.${exBit}`,
      `Not quite — keep going. Say “${target}” and pick again.${exBit}`
    ]);
  }
  if (gameKind === 'hwBlank') {
    return pickFeedbackMessage([
      `Almost! Try again — listen for “${target}”.`,
      `Good effort! You can have another go at “${target}”.`,
      `Not quite — hear the word again, then pick “${target}”.`
    ]);
  }
  return pickFeedbackMessage([
    `Almost! Try again — the word is “${target}”.`,
    `Good try! Listen once more, then pick “${target}”.`,
    `Not quite — you can redo this one. Say “${target}” slowly.`
  ]);
}

window.retryChallengeRound = () => {
  const g = state.game;
  if (!g || !isChallengeRetryGame(g.type) || !g.feedback || g.feedback.correct) return;
  clearGameNextBtnTimer(g);
  sfxClick();
  g.feedback = null;
  if (g.type === 'soundFlip') g.flipPhase = 'ready';
  if (g.type === 'hwJumble') g.jumblePhase = 'ready';
  render();
  setTimeout(() => {
    if (state.view !== 'game' || state.game !== g || g.feedback) return;
    playTargetOnShow(g, g.currentTarget);
    if (g.type === 'soundFlip') startSoundFlipPrompt();
    if (g.type === 'hwJumble') startHwJumblePrompt();
  }, 250);
};

function wrongFeedback(target, type, gameKind) {
  if (type === 'gpc') {
    const label = gpcDisplayPhoneme(target);
    const ex = lookupGpcExampleWord(target);
    const exBit = ex ? ` Try “${ex}”.` : '';
    return pickFeedbackMessage([
      `Listen again. Say “${label}”.${exBit}`,
      `Not that one. Hear “${label}” again.${exBit}`,
      `Try again. Say “${label}” out loud.${exBit}`
    ]);
  }
  if (gameKind === 'hwBlank') {
    return pickFeedbackMessage([
      `Listen again. The word was “${target}”.`,
      `Try again. Say “${target}”.`,
      `It was “${target}”. Say it slowly.`
    ]);
  }
  return pickFeedbackMessage([
    `Listen again. The word was “${target}”.`,
    `Try again. Say “${target}” slowly.`,
    `It was “${target}”. Say each sound.`
  ]);
}

// ============================================================
// STUDENT NEEDS
// ============================================================

/** True when a GPC or heart-word string is usable in games (not a padded empty JSON slot). */
function isValidGameToken(value) {
  const s = String(value ?? '').trim();
  if (!s) return false;
  if (s === '?' || s === '•') return false;
  if (s.includes(GPC_AUDIO_SEP)) return isValidGameToken(gpcDisplayPhoneme(s));
  return true;
}

function uniqueValidTokens(values, { caseSensitive = false } = {}) {
  const out = [];
  const seen = new Set();
  for (const v of values) {
    const s = String(v ?? '').trim();
    if (!isValidGameToken(s)) continue;
    const key = caseSensitive ? s : s.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(s);
  }
  return out;
}

/** Target + distractors for splat / word-challenge options; never includes blank placeholders. */
function getCombinedMasteryStats(needs) {
  const met = needs.masteredGpcs.length + needs.masteredHws.length;
  const unmet = needs.targetGpcs.length + needs.targetHws.length;
  return { met, total: met + unmet };
}

function hasGpcPracticePool(needs) {
  return needs.targetGpcs.length > 0 || needs.masteredGpcs.length > 0;
}

function hasHwPracticePool(needs) {
  return needs.targetHws.length > 0 || needs.masteredHws.length > 0;
}

function hasAnyPracticePool(needs) {
  return hasGpcPracticePool(needs) || hasHwPracticePool(needs);
}

/** Share of challenge slots drawn from already-known sounds/words (combined met ÷ total). */
function getMasteredAnswerShare(metCount, totalCount) {
  if (totalCount <= 0) return 0;
  const pct = metCount / totalCount;
  if (pct >= 1) return 1;
  if (pct >= 0.75) return 2 / 6;
  if (pct >= 0.51) return 2 / 6;
  return 1 / 6;
}

function countKnownChallengeSlots(totalSlots, metCount, totalCount) {
  if (totalCount <= 0 || metCount <= 0) return 0;
  if (metCount >= totalCount) return totalSlots;
  return Math.min(totalSlots, Math.max(0, Math.round(totalSlots * getMasteredAnswerShare(metCount, totalCount))));
}

function buildChallengeOptions(target, distractorPool, targetPool, needCount = 3, kind = 'hw', masteryStats = null) {
  const t = String(target ?? '').trim();
  if (!isValidGameToken(t)) return [];
  const tokenOpts = kind === 'hw' ? { caseSensitive: true } : { caseSensitive: true };
  const matchesTarget = (w) => String(w) === t;

  const mastered = shuffle(
    uniqueValidTokens(distractorPool, tokenOpts).filter(w => !matchesTarget(w))
  );
  const allPool = uniqueValidTokens(targetPool, tokenOpts).filter(w => !matchesTarget(w));
  const masteredSet = new Set(mastered);
  const unmet = allPool.filter(w => !masteredSet.has(w));

  const totalSlots = needCount + 1;
  const nKnownSlots = masteryStats ? countKnownChallengeSlots(totalSlots, masteryStats.met, masteryStats.total) : 0;
  const nKnownDistractors = Math.min(needCount, nKnownSlots);

  const distractors = [];
  const masteredQueue = [...mastered];
  const unmetQueue = shuffle([...unmet]);
  while (distractors.length < nKnownDistractors && masteredQueue.length) {
    distractors.push(masteredQueue.shift());
  }
  while (distractors.length < needCount && unmetQueue.length) {
    const w = unmetQueue.shift();
    if (!distractors.includes(w)) distractors.push(w);
  }
  if (distractors.length < needCount) {
    for (const w of allPool) {
      if (distractors.length >= needCount) break;
      if (!distractors.includes(w)) distractors.push(w);
    }
  }
  const fallbacks = kind === 'gpc'
    ? ['sh', 'ch', 'th', 'a', 'e', 'o', 'i', 'u']
    : ['the', 'and', 'is', 'was', 'to', 'a', 'he', 'she', 'we', 'you'];
  for (const f of fallbacks) {
    if (distractors.length >= needCount) break;
    if (!matchesTarget(f) && !distractors.includes(f)) distractors.push(f);
  }
  return shuffle([t, ...distractors.slice(0, needCount)]);
}

function isCarryOverIncluded(cls) {
  const co = cls?.yearEndCarryOver;
  return !!co && co.included !== false;
}

function getStudentCarryOverSets(cls, studentName) {
  const entry = cls?.yearEndCarryOver?.students?.[studentName];
  if (!entry) return { gpc: new Set(), hw: new Set() };
  const gpcs = (entry.gpcs || []).map(g => String(g ?? '').trim()).filter(Boolean);
  const hws = (entry.hws || []).map(w => String(w ?? '').trim()).filter(Boolean);
  return { gpc: new Set(gpcs), hw: new Set(hws) };
}

function resolveStudentAssessment(cls, studentName) {
  const cps = [...(cls.checkpoints || [])].sort((a, b) => {
    const dateDiff = new Date(b.date) - new Date(a.date);
    if (dateDiff !== 0) return dateDiff;
    return (b.units?.length || 0) - (a.units?.length || 0);
  });
  for (const cp of cps) {
    const assessment = cls.assessments?.checkpoints?.[cp.id]?.[studentName];
    if (assessment) return { assessment, label: cp.label };
  }
  const baseline = cls.assessments?.baseline?.[studentName];
  if (baseline) return { assessment: baseline, label: 'Baseline' };
  return { assessment: null, label: 'Baseline' };
}

function appendNeedsFromUnit(result, unit, uIdx, aUnit, carrySets) {
  const isCarryUnit = !!unit.carryOverUnit;
  if (isCarryUnit && (!carrySets || (!carrySets.gpc.size && !carrySets.hw.size))) return;

  const gpcMastered = (_, i) => aUnit && aUnit.gpcs && aUnit.gpcs[i] === 1;
  const hwMastered = (hw, i) => aUnit && aUnit.hws && aUnit.hws[i] === 1;

  (unit.gpcs || []).forEach((gpc, i) => {
    const item = makeGpcItemFromUnitSlot(unit, uIdx, i);
    if (!item) return;
    if (isCarryUnit && !carrySets.gpc.has(item.gpc)) return;
    if (gpcMastered(gpc, i)) result.masteredGpcs.push(item);
    else result.targetGpcs.push(item);
  });
  unit.heartWords.forEach((hw, i) => {
    const text = String(hw ?? '').trim();
    if (!isValidGameToken(text)) return;
    if (isCarryUnit && !carrySets.hw.has(text)) return;
    const item = { hw: text, unitIdx: uIdx, unit: unit.name };
    if (hwMastered(hw, i)) result.masteredHws.push(item);
    else result.targetHws.push(item);
  });
}

function getStudentNeeds(studentName) {
  const cls = state.data.classes[state.classKey];
  const { assessment, label } = resolveStudentAssessment(cls, studentName);
  const coveredUnits = (cls.units || []).map((_, i) => i);
  const carrySets = isCarryOverIncluded(cls) ? getStudentCarryOverSets(cls, studentName) : { gpc: new Set(), hw: new Set() };
  const result = { targetGpcs: [], targetHws: [], masteredGpcs: [], masteredHws: [], assessment, label, coveredUnits };
  if (!assessment) return result;

  coveredUnits.forEach(uIdx => {
    const unit = cls.units[uIdx];
    if (!unit) return;
    if (unit.carryOverUnit && !isCarryOverIncluded(cls)) return;
    const aUnit = assessment.units?.[uIdx];
    appendNeedsFromUnit(result, unit, uIdx, aUnit, unit.carryOverUnit ? carrySets : null);
  });

  const seenHw = new Set();
  result.targetHws = result.targetHws.filter(x => {
    const key = x.hw.toLowerCase();
    if (seenHw.has(key)) return false;
    seenHw.add(key);
    return true;
  });
  const seenMHw = new Set();
  result.masteredHws = result.masteredHws.filter(x => {
    const key = x.hw.toLowerCase();
    if (seenMHw.has(key)) return false;
    seenMHw.add(key);
    return true;
  });
  return result;
}

function getFocusItems(name) {
  const needs = getStudentNeeds(name);
  let items = [
    ...needs.targetGpcs.map(x => ({ type: 'gpc', value: gpcPoolKey(x), item: x })),
    ...needs.targetHws.map(x => ({ type: 'hw', value: x.hw })),
  ].filter(x => isValidGameToken(x.value));
  if (items.length === 0) {
    items = [
      ...needs.masteredGpcs.map(x => ({ type: 'gpc', value: gpcPoolKey(x), item: x })),
      ...needs.masteredHws.map(x => ({ type: 'hw', value: x.hw })),
    ].filter(x => isValidGameToken(x.value));
  }
  if (items.length === 0) {
    const catalog = state.classKey ? collectClassGpcItems(state.data.classes[state.classKey]) : [];
    if (catalog.length) {
      const first = catalog[0];
      items = [{ type: 'gpc', value: gpcPoolKey(first), item: first }];
    }
  }
  return items;
}

/** Round mix from combined mastery %: 1/6, 1/6, 2/6, 2/6, or all known. */
function getFocusRoundWeights(unmetCount, metCount) {
  const total = unmetCount + metCount;
  if (total === 0) return { unmet: 1, met: 0 };
  if (unmetCount === 0) return { unmet: 0, met: 1 };
  if (metCount === 0) return { unmet: 1, met: 0 };
  const metShare = getMasteredAnswerShare(metCount, total);
  return { unmet: 1 - metShare, met: metShare };
}

/** Shuffle-deck: exhaust every item once before any repeat (reshuffle between cycles). */
function createCycleDeck(items) {
  const raw = [...(items || [])];
  const source = raw.length && typeof raw[0] === 'string'
    ? uniqueValidTokens(raw)
    : raw.filter(x => x != null);
  let deck = [];
  let idx = 0;
  function reshuffle() {
    deck = shuffle([...source]);
    idx = 0;
  }
  function next() {
    if (source.length === 0) return null;
    if (idx >= deck.length) reshuffle();
    return deck[idx++];
  }
  if (source.length > 0) reshuffle();
  return { next, reset: reshuffle };
}

function focusPoolSignature(items, caseSensitive = false) {
  return uniqueValidTokens(items, { caseSensitive }).slice().sort((a, b) => a.localeCompare(b)).join('\x1e');
}

/**
 * Session cycle deck: same student + track keeps position across games until every
 * focus word in the pool has been used (then reshuffles for the next cycle).
 * @param {string|null} student
 * @param {'gpc'|'hw'|'mixed'} kind
 * @param {'practice'|'met'} slot
 * @param {string[]} items - tokens or item keys
 */
function getStudentCycleDeck(student, kind, slot, items) {
  const caseSensitive = kind === 'hw';
  const pool = uniqueValidTokens(items, { caseSensitive });
  if (!student || pool.length === 0) return createCycleDeck(pool);
  const sig = focusPoolSignature(pool, caseSensitive);
  const key = `${state.classKey}|${student}|${kind}|${slot}`;
  const store = state.focusCycleDecks;
  const entry = store[key];
  if (!entry || entry.signature !== sig) {
    store[key] = { signature: sig, deck: createCycleDeck(pool) };
  }
  return store[key].deck;
}

/**
 * Precompute challenge answers with weighted unmet/met slots and per-pool cycle decks.
 * @param {string[]} unmetPool - targets not yet mastered
 * @param {string[]} metPool - mastered items (review); ignored when empty
 * @param {number} count - rounds (default 6)
 */
function buildRoundTargetsFromPools(unmetPool, metPool, count = CHALLENGE_ROUNDS, kind = 'gpc', masteryStats = null) {
  const tokenOpts = { caseSensitive: true };
  const unmet = uniqueValidTokens(unmetPool, tokenOpts);
  const met = uniqueValidTokens(metPool, tokenOpts);
  const practicePool = unmet.length > 0 ? unmet : met;
  if (practicePool.length === 0) return [];

  let nMet = 0;
  if (met.length > 0 && unmet.length > 0) {
    const stats = masteryStats || { met: met.length, total: unmet.length + met.length };
    const metShare = getMasteredAnswerShare(stats.met, stats.total);
    nMet = Math.min(count, Math.max(0, Math.round(count * metShare)));
  }
  const nUnmet = count - nMet;

  const student = state.selectedStudent;
  const unmetDeck = getStudentCycleDeck(student, kind, 'practice', practicePool);
  const metDeck = met.length > 0 ? getStudentCycleDeck(student, kind, 'met', met) : null;

  const slots = [
    ...Array(nUnmet).fill('unmet'),
    ...Array(nMet).fill('met'),
  ];
  return shuffle(slots).map(slot =>
    slot === 'met' && metDeck ? metDeck.next() : unmetDeck.next()
  ).filter(Boolean);
}

function buildRoundTargets(needs, kind, count = CHALLENGE_ROUNDS) {
  const unmet = kind === 'gpc'
    ? needs.targetGpcs.map(gpcPoolKey)
    : needs.targetHws.map(x => x.hw);
  const met = kind === 'gpc'
    ? needs.masteredGpcs.map(gpcPoolKey)
    : needs.masteredHws.map(x => x.hw);
  return buildRoundTargetsFromPools(unmet, met, count, kind, getCombinedMasteryStats(needs));
}

function arcadeItemLabel(item) {
  if (!item) return '';
  if (item.type === 'gpc') {
    return String(item.item?.gpc || gpcDisplayPhoneme(item.value) || '').trim();
  }
  return String(item.value ?? '').trim();
}

function arcadeSpeakFocusItem(item) {
  if (!item?.value) return;
  if (item.type === 'gpc') {
    const ph = item.item?.gpc || gpcDisplayPhoneme(item.value);
    const ex = item.item?.exampleWord || parseGpcStorageKey(item.value).exampleWord || '';
    if (ex) {
      const audio = getGpcAudioSource(ph, ex);
      if (audio) {
        try {
          const a = new Audio(audio);
          a.play().catch(() => {});
          return;
        } catch (e) {}
      }
    }
    speak(ph, 'gpc');
    return;
  }
  speak(item.value, 'hw');
}

function enrichArcadeFocusItems(items) {
  return (items || []).map(item => ({
    type: item.type,
    value: item.value,
    label: arcadeItemLabel(item),
    exampleWord: item.item?.exampleWord || parseGpcStorageKey(item.value).exampleWord || '',
    item: item.item || null,
  }));
}

function getFlashRandomPool(needs, kind) {
  const seen = new Set();
  const out = [];
  const push = (card) => {
    const key = `${card.type}:${String(card.value).toLowerCase()}`;
    if (seen.has(key)) return;
    seen.add(key);
    out.push(card);
  };
  getFlashPoolForKind(needs, kind).forEach(push);
  if (kind === 'gpc') {
    needs.masteredGpcs.forEach(x => push({ type: 'gpc', value: gpcPoolKey(x), item: x }));
  } else {
    needs.masteredHws.forEach(x => push({ type: 'hw', value: x.hw }));
  }
  return out.filter(c => isValidGameToken(kind === 'gpc' ? c.item?.gpc : c.value));
}

function assignFocusItems(count) {
  const needs = getStudentNeeds(state.selectedStudent);
  const unmet = [
    ...needs.targetGpcs.map(x => ({ type: 'gpc', value: gpcPoolKey(x), item: x })),
    ...needs.targetHws.map(x => ({ type: 'hw', value: x.hw })),
  ].filter(x => isValidGameToken(x.value));
  const met = [
    ...needs.masteredGpcs.map(x => ({ type: 'gpc', value: gpcPoolKey(x), item: x })),
    ...needs.masteredHws.map(x => ({ type: 'hw', value: x.hw })),
  ].filter(x => isValidGameToken(x.value));
  const key = item => `${item.type}:${item.value}`;
  const practice = unmet.length > 0 ? unmet : met;
  if (practice.length === 0) return [{ type: 'gpc', value: 'a' }];

  const combined = getCombinedMasteryStats(needs);
  let nMet = 0;
  if (met.length > 0 && unmet.length > 0) {
    const metShare = getMasteredAnswerShare(combined.met, combined.total);
    nMet = Math.min(count, Math.max(0, Math.round(count * metShare)));
  }
  const nUnmet = count - nMet;

  const student = state.selectedStudent;
  const unmetDeck = getStudentCycleDeck(student, 'mixed', 'practice', practice.map(key));
  const metDeck = met.length > 0 ? getStudentCycleDeck(student, 'mixed', 'met', met.map(key)) : null;
  const byKey = new Map([...practice, ...met].map(item => [key(item), item]));

  const slots = [
    ...Array(nUnmet).fill('unmet'),
    ...Array(nMet).fill('met'),
  ];
  return shuffle(slots).map(slot => {
    const k = slot === 'met' && metDeck ? metDeck.next() : unmetDeck.next();
    return byKey.get(k) || practice[0];
  }).filter(Boolean);
}

function getFlashPoolForKind(needs, kind) {
  if (kind === 'gpc') {
    const source = needs.targetGpcs.length > 0 ? needs.targetGpcs : needs.masteredGpcs;
    return source.map(x => ({ type: 'gpc', value: gpcPoolKey(x), item: x })).filter(c => isValidGameToken(c.item?.gpc));
  }
  const source = needs.targetHws.length > 0 ? needs.targetHws : needs.masteredHws;
  return source.map(x => ({ type: 'hw', value: x.hw })).filter(c => isValidGameToken(c.value));
}

function hasFlashBeenChecked(value) {
  return !!getFlashStatus(value);
}

/** Stable sets of 5; last set is 5 + remainder (6–9 items). */
function splitIntoStaticFlashSets(items) {
  const sorted = [...items].sort((a, b) => String(a.value).localeCompare(String(b.value), undefined, { sensitivity: 'base' }));
  const sets = [];
  let i = 0;
  const n = sorted.length;
  while (i < n) {
    const left = n - i;
    if (left > 9) {
      sets.push(sorted.slice(i, i + 5));
      i += 5;
    } else {
      sets.push(sorted.slice(i));
      break;
    }
  }
  return sets;
}

function orderFlashSetForPlay(items) {
  const unchecked = items.filter(c => !hasFlashBeenChecked(c.value));
  const checked = items.filter(c => hasFlashBeenChecked(c.value));
  return [...unchecked, ...checked];
}

function flashSetProgressKey(name) { return `raflashsets_${state.classKey}_${name}`; }

function getFlashSetProgressMap(name) {
  if (!state.flashSetProgress) state.flashSetProgress = {};
  if (state.flashSetProgress[name]) return state.flashSetProgress[name];
  if (window.isDesktopAdventures && window.AdventuresDesktop) {
    window.AdventuresDesktop.loadStudentProgressForClass(state.classKey);
    state.flashSetProgress[name] = state.flashSetProgress[name] || {};
    return state.flashSetProgress[name];
  }
  try {
    const v = localStorage.getItem(flashSetProgressKey(name));
    state.flashSetProgress[name] = v ? JSON.parse(v) : {};
  } catch (e) {
    state.flashSetProgress[name] = {};
  }
  return state.flashSetProgress[name];
}

function markFlashSetAttempted(name, kind, setIndex) {
  const map = getFlashSetProgressMap(name);
  map[`${kind}:${setIndex}`] = { attempted: true };
  if (window.isDesktopAdventures && window.AdventuresDesktop) {
    window.AdventuresDesktop.setFlashSetProgress(name, map);
    return;
  }
  try { localStorage.setItem(flashSetProgressKey(name), JSON.stringify(map)); } catch (e) {}
}

function isFlashSetAttempted(name, kind, setIndex) {
  return !!getFlashSetProgressMap(name)[`${kind}:${setIndex}`]?.attempted;
}

function isFlashSetAllGot(items) {
  return items.length > 0 && items.every(c => getFlashStatus(c.value) === 'got');
}

function getFlashSetCardStatus(name, kind, setIndex, items) {
  if (!isFlashSetAttempted(name, kind, setIndex)) return '';
  if (isFlashSetAllGot(items)) return 'flash-set-card--complete';
  return 'flash-set-card--attempted';
}

function areAllFlashSetsComplete(name, kind, sets) {
  return sets.length > 0 && sets.every(items => isFlashSetAllGot(items));
}

function gamePlayedKey(name) { return `ragameplayed_${state.classKey}_${name}`; }

function loadGamePlayed() {
  if (window.isDesktopAdventures && window.AdventuresDesktop) {
    window.AdventuresDesktop.loadStudentProgressForClass(state.classKey);
    return;
  }
  state.gamePlayed = {};
  try {
    const cls = state.data.classes[state.classKey];
    cls.students.forEach(name => {
      const v = localStorage.getItem(gamePlayedKey(name));
      state.gamePlayed[name] = v ? JSON.parse(v) : {};
    });
  } catch (e) {
    const cls = state.data.classes[state.classKey];
    cls.students.forEach(name => { state.gamePlayed[name] = {}; });
  }
}

function getGamePlayedMap(name) {
  if (!state.gamePlayed[name]) state.gamePlayed[name] = {};
  return state.gamePlayed[name];
}

function saveGamePlayedMap(name, map) {
  state.gamePlayed[name] = map;
  if (window.isDesktopAdventures && window.AdventuresDesktop) {
    window.AdventuresDesktop.setGamePlayed(name, map);
    return;
  }
  try { localStorage.setItem(gamePlayedKey(name), JSON.stringify(map)); } catch (e) {}
}

function boardGameKey(name) { return `raboard_${state.classKey}_${name}`; }

function getBoardState(name) {
  if (!state.boardGame[name]) {
    try {
      const v = localStorage.getItem(boardGameKey(name));
      state.boardGame[name] = v ? JSON.parse(v) : null;
    } catch (e) { state.boardGame[name] = null; }
  }
  if (!state.boardGame[name]) {
    state.boardGame[name] = {
      pieceIndex: null, pieceIndex2: null,
      position: 0, position2: 0,
      twoPlayerMode: false, activePlayer: 1,
      playedGames: [], manualMode: false,
      lastDiceRoll: null,
      passesUsed: 0,
      awaitingTurnComplete: false,
    };
  }
  const bd = state.boardGame[name];
  if (typeof bd.position2 !== 'number') bd.position2 = 0;
  if (!bd.activePlayer) bd.activePlayer = 1;
  if (bd.twoPlayerMode == null) bd.twoPlayerMode = false;
  if (!Array.isArray(bd.playedGames)) bd.playedGames = [];
  if (typeof bd.passesUsed !== 'number') bd.passesUsed = 0;
  if (bd.awaitingTurnComplete == null) bd.awaitingTurnComplete = false;
  ensureBoardTileShuffle(bd);
  if (bd.position > BOARD_FINISH_INDEX) bd.position = 0;
  if (bd.position2 > BOARD_FINISH_INDEX) bd.position2 = 0;
  return bd;
}

function saveBoardState(name, bd) {
  state.boardGame[name] = bd;
  try { localStorage.setItem(boardGameKey(name), JSON.stringify(bd)); } catch (e) {}
}

function consumeBoardPass(name, isTagMe) {
  if (isTagMe) {
    const td = getTagMeState(name);
    if (td.passesUsed < BOARD_MAX_PASSES) {
      td.passesUsed += 1;
      saveTagMeState(name, td);
      if (state.view === 'tagme') render();
    }
    return;
  }
  const bd = getBoardState(name);
  if (bd.passesUsed < BOARD_MAX_PASSES) {
    bd.passesUsed += 1;
    saveBoardState(name, bd);
  }
}

function resetBoardPasses(name, isTagMe) {
  if (isTagMe) {
    const td = getTagMeState(name);
    td.passesUsed = 0;
    saveTagMeState(name, td);
    return;
  }
  const bd = getBoardState(name);
  bd.passesUsed = 0;
  saveBoardState(name, bd);
}

function boardPassesExhausted(name, isTagMe) {
  const used = isTagMe ? getTagMeState(name).passesUsed : getBoardState(name).passesUsed;
  return used >= BOARD_MAX_PASSES;
}

function isBoardBonusSquare(index) {
  return index > 0 && index < BOARD_FINISH_INDEX && index % 9 === 4;
}

function countBoardRegularTileSlots() {
  let count = 0;
  for (let i = 1; i < BOARD_FINISH_INDEX; i++) {
    if (!isBoardBonusSquare(i)) count++;
  }
  return count;
}

function countBoardBonusTileSlots() {
  let count = 0;
  for (let i = 1; i < BOARD_FINISH_INDEX; i++) {
    if (isBoardBonusSquare(i)) count++;
  }
  return count;
}

function buildExpandedShufflePool(basePool, slotCount) {
  const pool = [];
  while (pool.length < slotCount) pool.push(...shuffle([...basePool]));
  return pool.slice(0, slotCount);
}

function generateBoardTileShuffle() {
  const regularSlots = countBoardRegularTileSlots();
  const bonusSlots = countBoardBonusTileSlots();
  return {
    shuffledGames: buildExpandedShufflePool(BOARD_GAME_SEQUENCE, regularSlots),
    shuffledBonuses: buildExpandedShufflePool(BOARD_BONUS_GAMES, bonusSlots),
  };
}

function ensureBoardTileShuffle(boardState) {
  if (!Array.isArray(boardState.shuffledGames) || boardState.shuffledGames.length === 0) {
    const layout = generateBoardTileShuffle();
    boardState.shuffledGames = layout.shuffledGames;
    boardState.shuffledBonuses = layout.shuffledBonuses;
  }
  return boardState;
}

function resetBoardTileShuffle(boardState) {
  const layout = generateBoardTileShuffle();
  boardState.shuffledGames = layout.shuffledGames;
  boardState.shuffledBonuses = layout.shuffledBonuses;
  return boardState;
}

function getBoardBonusArcadeId(index, boardState) {
  if (!isBoardBonusSquare(index)) return null;
  if (!boardState) {
    return BOARD_BONUS_GAMES[Math.floor((index - 1) / 9) % BOARD_BONUS_GAMES.length];
  }
  ensureBoardTileShuffle(boardState);
  let bonusSlot = 0;
  for (let i = 1; i < index; i++) {
    if (isBoardBonusSquare(i)) bonusSlot++;
  }
  return boardState.shuffledBonuses[bonusSlot % boardState.shuffledBonuses.length];
}

function getBoardSpaceGameId(index, boardState) {
  if (index === 0 || index >= BOARD_FINISH_INDEX || isBoardBonusSquare(index)) return null;
  let slot = 0;
  for (let i = 1; i < index; i++) {
    if (!isBoardBonusSquare(i)) slot++;
  }
  if (!boardState) return BOARD_GAME_SEQUENCE[slot % BOARD_GAME_SEQUENCE.length];
  ensureBoardTileShuffle(boardState);
  return boardState.shuffledGames[slot % boardState.shuffledGames.length];
}

function getBoardSquareLabel(index) {
  if (index === 0) return { text: '🚩', word: false };
  if (index >= BOARD_FINISH_INDEX) return { text: '🏁', word: false };
  return { text: String(index + 1), word: false };
}

function computeBoardLayout(count = BOARD_SPACE_COUNT, cols = BOARD_COLS, opts = {}) {
  const rowGapRatio = opts.rowGapRatio ?? 0.5;
  const tileScale = opts.tileScale ?? 1;
  const boundsPadding = opts.padding ?? 1.5;
  const rows = Math.ceil(count / cols);
  const marginX = 1;
  const marginY = 1;
  const usableW = 100 - marginX * 2;
  const heightUnits = rows + (rows - 1) * rowGapRatio;
  const sW = usableW / cols;
  const sH = (100 - marginY * 2) / heightUnits;
  const s = Math.min(sW, sH);
  const gap = s * rowGapRatio;
  const rowStep = s + gap;
  const connW = s * tileScale * (opts.bridgeWidthScale ?? 0.55);
  const connH = opts.bridgeOverlap != null
    ? gap + s * opts.bridgeOverlap
    : s * tileScale * (opts.bridgeHeightScale ?? 0.55);
  const tile = s * tileScale;
  const boardWidth = cols * s;
  const offsetX = marginX + (usableW - boardWidth) / 2;
  const positions = [];

  for (let r = 0; r < rows; r++) {
    const leftToRight = r % 2 === 0;
    const y = marginY + r * rowStep + s / 2;
    for (let c = 0; c < cols; c++) {
      if (positions.length >= count) break;
      const col = leftToRight ? c : (cols - 1 - c);
      positions.push({
        x: offsetX + (col + 0.5) * s,
        y,
        w: tile,
        h: tile,
        row: r,
        col,
      });
    }
  }

  const connectors = [];
  for (let r = 0; r < rows - 1; r++) {
    const endIdx = Math.min((r + 1) * cols - 1, count - 1);
    const nextIdx = (r + 1) * cols;
    if (nextIdx >= count) continue;
    const endPos = positions[endIdx];
    const nextPos = positions[nextIdx];
    if (!endPos || !nextPos) continue;
    connectors.push({
      x: endPos.x,
      y: (endPos.y + nextPos.y) / 2,
      w: connW,
      h: connH,
    });
  }

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  positions.forEach(p => {
    const hw = p.w / 2;
    const hh = p.h / 2;
    minX = Math.min(minX, p.x - hw);
    maxX = Math.max(maxX, p.x + hw);
    minY = Math.min(minY, p.y - hh);
    maxY = Math.max(maxY, p.y + hh);
  });
  minX -= boundsPadding;
  maxX += boundsPadding;
  minY -= boundsPadding;
  maxY += boundsPadding;
  const bounds = {
    minX,
    minY,
    maxX,
    maxY,
    width: maxX - minX,
    height: maxY - minY,
    aspect: (maxX - minX) / (maxY - minY),
  };

  return { positions, connectors, s, gap, bounds, cols };
}

function normalizeBoardLayoutCoords(layout) {
  const { bounds } = layout;
  if (!bounds || bounds.width <= 0 || bounds.height <= 0) return layout;
  const mapX = v => ((v - bounds.minX) / bounds.width) * 100;
  const mapY = v => ((v - bounds.minY) / bounds.height) * 100;
  const mapW = v => (v / bounds.width) * 100;
  const mapH = v => (v / bounds.height) * 100;
  return {
    ...layout,
    positions: layout.positions.map(p => ({
      ...p,
      x: mapX(p.x),
      y: mapY(p.y),
      w: mapW(p.w),
      h: mapH(p.h),
    })),
    connectors: layout.connectors.map(c => ({
      ...c,
      x: mapX(c.x),
      y: mapY(c.y),
      w: mapW(c.w),
      h: mapH(c.h),
    })),
    bounds: { ...bounds, aspect: bounds.width / bounds.height },
  };
}

const TAG_ME_LAYOUT_OPTS = { rowGapRatio: 0.95, tileScale: 0.78, padding: 2.8 };

function computeTagMeBoardLayout() {
  const cols = getTagMeBoardCols();
  const raw = computeBoardLayout(BOARD_SPACE_COUNT, cols, TAG_ME_LAYOUT_OPTS);
  const layout = normalizeBoardLayoutCoords(raw);
  layout.cols = cols;
  state.tagMeBoardLayout = layout;
  return layout;
}

function getTagMeBoardLayout() {
  const cols = getTagMeBoardCols();
  if (state.tagMeBoardLayout?.cols === cols) return state.tagMeBoardLayout;
  return computeTagMeBoardLayout();
}

function buildTagMeSnakePath(positions) {
  if (!positions.length) return '';
  let d = `M ${positions[0].x} ${positions[0].y}`;
  for (let i = 1; i < positions.length; i++) {
    d += ` L ${positions[i].x} ${positions[i].y}`;
  }
  return d;
}

function getBoardSpacePositions(count = BOARD_SPACE_COUNT) {
  return computeBoardLayout(count).positions;
}

function buildBoardPathRows(positions, cols = BOARD_COLS) {
  const rows = Math.ceil(positions.length / cols);
  const parts = [];
  for (let r = 0; r < rows; r++) {
    const rowStart = r * cols;
    const indices = [];
    for (let c = 0; c < cols && rowStart + c < positions.length; c++) {
      indices.push(rowStart + c);
    }
    if (r % 2 === 1) indices.reverse();
    if (!indices.length) continue;
    let seg = `M ${positions[indices[0]].x} ${positions[indices[0]].y}`;
    for (let i = 1; i < indices.length; i++) {
      seg += ` L ${positions[indices[i]].x} ${positions[indices[i]].y}`;
    }
    parts.push(seg);
  }
  return parts.join(' ');
}

function getBoardGameTrack(gameId) {
  if (gameId === 'flash') return 'flash';
  if (['gpcMatch', 'gpcCatch', 'soundFlip', 'soundBox'].includes(gameId)) return 'gpc';
  return 'hw';
}

function isBoardGameAvailable(name, gameId) {
  const needs = getStudentNeeds(name);
  if (gameId === 'flash') return hasAnyPracticePool(needs);
  if (getBoardGameTrack(gameId) === 'gpc') return hasGpcPracticePool(needs);
  return hasHwPracticePool(needs);
}

function markBoardGamePlayed(name, gameId) {
  const bd = getBoardState(name);
  if (!bd.playedGames.includes(gameId)) {
    bd.playedGames.push(gameId);
    saveBoardState(name, bd);
  }
}

function buildBoardDiceCubeHtml(face = 1) {
  const pip = (n) => Array.from({ length: n }, () => '<span class="pip"></span>').join('');
  const sides = [
    [1, pip(1)], [2, pip(2)], [3, pip(3)], [4, pip(4)], [5, pip(5)], [6, pip(6)],
  ].map(([n, pips]) =>
    `<div class="profile-board-dice-side profile-board-dice-side--${n}">${pips}</div>`
  ).join('');
  return `<div class="profile-board-dice-scene"><div class="profile-board-dice-cube" id="boardDiceCube" data-face="${face}">${sides}</div></div>`;
}

function setBoardDiceFace(value) {
  const cube = document.getElementById('boardDiceCube');
  if (!cube) return;
  if (value === 'rolling') {
    cube.classList.add('profile-board-dice-cube--rolling');
    return;
  }
  cube.classList.remove('profile-board-dice-cube--rolling');
  const n = Math.max(1, Math.min(6, parseInt(value, 10) || 1));
  cube.setAttribute('data-face', String(n));
}

function flickBoardDiceFace() {
  const cube = document.getElementById('boardDiceCube');
  if (cube) cube.setAttribute('data-face', String(1 + Math.floor(Math.random() * 6)));
}

function buildBoardBridgeSvg(uid) {
  return `<svg class="profile-board-bridge-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id="bridgeWood${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#e8c896"/>
        <stop offset="30%" stop-color="#a0522d"/>
        <stop offset="65%" stop-color="#8b6914"/>
        <stop offset="100%" stop-color="#5c3d1e"/>
      </linearGradient>
      <linearGradient id="bridgeRail${uid}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#c4a574"/>
        <stop offset="100%" stop-color="#5c3d1e"/>
      </linearGradient>
      <linearGradient id="bridgeRope${uid}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#8b6914"/>
        <stop offset="50%" stop-color="#d4a574"/>
        <stop offset="100%" stop-color="#6b4423"/>
      </linearGradient>
    </defs>
    <ellipse cx="50" cy="92" rx="46" ry="6" fill="rgba(0,0,0,0.15)"/>
    <rect x="6" y="22" width="88" height="58" rx="4" fill="url(#bridgeWood${uid})" stroke="#4a2c0f" stroke-width="1.8"/>
    <line x1="10" y1="32" x2="90" y2="32" stroke="#5c3d1e" stroke-width="1" opacity="0.5"/>
    <line x1="10" y1="42" x2="90" y2="42" stroke="#3d2810" stroke-width="0.7" opacity="0.35"/>
    <line x1="10" y1="52" x2="90" y2="52" stroke="#5c3d1e" stroke-width="1" opacity="0.5"/>
    <line x1="10" y1="62" x2="90" y2="62" stroke="#3d2810" stroke-width="0.7" opacity="0.35"/>
    <line x1="10" y1="72" x2="90" y2="72" stroke="#5c3d1e" stroke-width="1" opacity="0.5"/>
    <rect x="1" y="16" width="7" height="68" rx="2" fill="url(#bridgeRail${uid})" stroke="#4a2c0f" stroke-width="1.2"/>
    <rect x="92" y="16" width="7" height="68" rx="2" fill="url(#bridgeRail${uid})" stroke="#4a2c0f" stroke-width="1.2"/>
    <path d="M5 18 Q50 8 95 18" fill="none" stroke="url(#bridgeRope${uid})" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M5 82 Q50 92 95 82" fill="none" stroke="url(#bridgeRope${uid})" stroke-width="2.2" stroke-linecap="round"/>
    <line x1="5" y1="18" x2="5" y2="82" stroke="url(#bridgeRope${uid})" stroke-width="1.8"/>
    <line x1="95" y1="18" x2="95" y2="82" stroke="url(#bridgeRope${uid})" stroke-width="1.8"/>
    <rect x="0" y="14" width="100" height="5" rx="1.5" fill="#a0522d" stroke="#4a2c0f" stroke-width="1"/>
    <rect x="0" y="81" width="100" height="5" rx="1.5" fill="#8b6914" stroke="#4a2c0f" stroke-width="1"/>
    <circle cx="5" cy="14" r="2" fill="#654321" stroke="#4a2c0f" stroke-width="0.8"/>
    <circle cx="95" cy="14" r="2" fill="#654321" stroke="#4a2c0f" stroke-width="0.8"/>
    <circle cx="5" cy="86" r="2" fill="#654321" stroke="#4a2c0f" stroke-width="0.8"/>
    <circle cx="95" cy="86" r="2" fill="#654321" stroke="#4a2c0f" stroke-width="0.8"/>
    <circle cx="50" cy="14" r="1.5" fill="#d4a574"/>
    <circle cx="50" cy="86" r="1.5" fill="#d4a574"/>
  </svg>`;
}

function buildBoardConnectorsHtml(connectors) {
  return connectors.map((conn, i) =>
    `<div class="profile-board-connector" style="left:${conn.x}%;top:${conn.y}%;width:${conn.w}%;height:${conn.h}%;">${buildBoardBridgeSvg(i)}</div>`
  ).join('');
}

function hasPlayedTrackGame(name, gameId) {
  return !!getGamePlayedMap(name)[gameId];
}

function getApplicableTrackGameIds(name) {
  const needs = getStudentNeeds(name);
  const ids = [];
  if (hasGpcPracticePool(needs)) ids.push(...GPC_TRACK_GAME_IDS);
  if (hasHwPracticePool(needs)) ids.push(...HW_TRACK_GAME_IDS);
  return ids;
}

function completeReadingTrackCycleIfReady(name) {
  const played = getGamePlayedMap(name);
  const applicable = getApplicableTrackGameIds(name);
  if (applicable.length === 0) return false;
  if (!applicable.every(id => played[id])) return false;
  applicable.forEach(id => { delete played[id]; });
  saveGamePlayedMap(name, played);
  addPoints(name, READING_TRACK_BONUS);
  return true;
}

function markTrackGamePlayed(name, gameId) {
  if (!READING_TRACK_GAME_IDS.includes(gameId)) return false;
  const applicable = getApplicableTrackGameIds(name);
  if (!applicable.includes(gameId)) return false;
  const played = getGamePlayedMap(name);
  if (!played[gameId]) {
    played[gameId] = true;
    saveGamePlayedMap(name, played);
  }
  return completeReadingTrackCycleIfReady(name);
}

function removeReadingTrackBonusOverlay() {
  document.getElementById('readingTrackBonusOverlay')?.remove();
}

function showReadingTrackBonusPopup() {
  if (!state.readingTrackBonusPopup) return;
  removeReadingTrackBonusOverlay();
  const overlay = document.createElement('div');
  overlay.id = 'readingTrackBonusOverlay';
  overlay.className = 'quit-confirm-overlay fadeIn';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'All games complete');
  overlay.innerHTML = `
    <div class="quit-confirm-panel reading-track-bonus-panel text-center">
      <div class="text-4xl mb-3" aria-hidden="true">🌟</div>
      <h2 class="text-xl font-bold mb-2 arcade-title-friendly">All games complete!</h2>
      <p class="text-white/90 mb-1 arcade-instructions">You earned <strong>+${READING_TRACK_BONUS} bonus stars</strong>.</p>
      <p class="text-white/75 text-sm mb-5 arcade-instructions">All games are ready to play again.</p>
      <button type="button" id="readingTrackBonusOk" class="w-full py-2.5 rounded-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-950">OK</button>
    </div>`;
  document.body.appendChild(overlay);
  confetti();
  overlay.querySelector('#readingTrackBonusOk').addEventListener('click', () => {
    sfxClick();
    state.readingTrackBonusPopup = false;
    removeReadingTrackBonusOverlay();
    if (state.view === 'profileReadingGames') render();
  });
}

// ============================================================
// ROUTER
// ============================================================
// ============================================================
// QUIT GAME (in-app confirm — avoids blocked browser confirm())
// ============================================================
function removeQuitConfirmOverlay() {
  const el = document.getElementById('quitConfirmOverlay');
  if (el) el.remove();
  state.quitConfirmPending = false;
  state._quitConfirmHandler = null;
}

function showTakeYourTimePopup() {
  return new Promise(resolve => {
    document.getElementById('takeYourTimeOverlay')?.remove();
    const overlay = document.createElement('div');
    overlay.id = 'takeYourTimeOverlay';
    overlay.className = 'quit-confirm-overlay fadeIn';
    overlay.innerHTML = `
      <div class="quit-confirm-panel text-center">
        <div class="text-4xl mb-3">🌱</div>
        <h2 class="text-xl font-bold mb-2 arcade-title-friendly">Take your time.</h2>
        <p class="text-white/85 mb-5 arcade-instructions">Practice makes progress!</p>
        <button type="button" id="takeYourTimeOk" class="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 px-6 py-2.5 rounded-xl font-semibold">OK</button>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('#takeYourTimeOk').addEventListener('click', () => {
      sfxClick();
      overlay.remove();
      resolve();
    });
  });
}

window.requestQuitGame = (onConfirm) => {
  sfxClick();
  removeQuitConfirmOverlay();
  state.quitConfirmPending = true;
  state._quitConfirmHandler = typeof onConfirm === 'function' ? onConfirm : null;
  const overlay = document.createElement('div');
  overlay.id = 'quitConfirmOverlay';
  overlay.className = 'quit-confirm-overlay fadeIn';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML = `
    <div class="quit-confirm-panel text-center">
      <p class="text-lg font-bold mb-2 arcade-title-friendly">Leave this game?</p>
      <p class="text-sm text-white/75 mb-5">Your progress in this round will not be saved.</p>
      <div class="flex gap-3 justify-center flex-wrap">
        <button type="button" id="quitConfirmStay" class="bg-white/15 hover:bg-white/25 px-5 py-2.5 rounded-xl font-semibold">Keep playing</button>
        <button type="button" id="quitConfirmLeave" class="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 px-5 py-2.5 rounded-xl font-semibold">Leave game</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('#quitConfirmStay').addEventListener('click', () => {
    sfxClick();
    removeQuitConfirmOverlay();
  });
  overlay.querySelector('#quitConfirmLeave').addEventListener('click', () => {
    sfxClick();
    const fn = state._quitConfirmHandler;
    removeQuitConfirmOverlay();
    if (fn) fn();
  });
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      sfxClick();
      removeQuitConfirmOverlay();
    }
  });
};

window.quitToProfile = () => {
  const g = state.game;
  const fromTagMe = !!g?.fromTagMe;
  const fromBoard = !!g?.fromBoard && !fromTagMe;
  const name = state.selectedStudent;
  if (g && !g.finished && name && (fromTagMe || fromBoard) && !g.boardManual) {
    showBoardPassQuitPrompt({
      isTagMe: fromTagMe,
      onYes: () => abandonBoardActivityAndEndTurn(name, fromTagMe),
    });
    return;
  }
  requestQuitGame(() => performQuitToProfile());
};

function cleanupActiveReadingGame() {
  const g = state.game;
  if (!g) return;
  if (g.type === 'soundFlip') cleanupSoundFlip();
  if (g.type === 'hwJumble') cleanupHwJumble();
  if (g.type === 'soundBox') cleanupSoundBox();
  if (g._timer) {
    clearTimeout(g._timer);
    g._timer = null;
  }
  clearGameNextBtnTimer(g);
  state.game = null;
}

function abandonBoardActivityAndEndTurn(name, isTagMe) {
  cleanupActiveReadingGame();
  consumeBoardPass(name, isTagMe);
  state.boardRolling = false;
  if (isTagMe) {
    const td = getTagMeState(name);
    td.awaitingTurnComplete = false;
    saveTagMeState(name, td);
    state.view = 'tagme';
    render();
    void completeTagMeUserTurn(name, td);
    return;
  }
  const bd = getBoardState(name);
  bd.awaitingTurnComplete = false;
  saveBoardState(name, bd);
  state.view = 'adventure';
  render();
}

function teardownArcadeBoardSession() {
  teardownArcadeCanvasShell();
  if (window._pongParentPointer) {
    window.removeEventListener('mousemove', window._pongParentPointer);
    window.removeEventListener('pointermove', window._pongParentPointer);
    window._pongParentPointer = null;
  }
  if (window._pongWinHandler) {
    window.removeEventListener('message', window._pongWinHandler);
    window._pongWinHandler = null;
  }
  if (window._treasureHandler) {
    window.removeEventListener('message', window._treasureHandler);
    window._treasureHandler = null;
  }
  if (window._brickBreakerHandler) {
    window.removeEventListener('message', window._brickBreakerHandler);
    window._brickBreakerHandler = null;
  }
  if (window._brickBreakerParentPointer) {
    window.removeEventListener('mousemove', window._brickBreakerParentPointer);
    window.removeEventListener('pointermove', window._brickBreakerParentPointer);
    window._brickBreakerParentPointer = null;
  }
  if (window._snakeHandler) {
    window.removeEventListener('message', window._snakeHandler);
    window._snakeHandler = null;
  }
}

function abandonBoardArcadeAndEndTurn(name, isTagMe) {
  teardownArcadeBoardSession();
  state.arcade = null;
  state.arcadeGame = null;
  state.arcadeFromBoard = false;
  state._boardArcadeReturnPending = false;
  consumeBoardPass(name, isTagMe);
  state.boardRolling = false;
  if (isTagMe) {
    const td = getTagMeState(name);
    td.awaitingTurnComplete = false;
    saveTagMeState(name, td);
    state.view = 'tagme';
    render();
    void completeTagMeUserTurn(name, td);
    return;
  }
  const bd = getBoardState(name);
  bd.awaitingTurnComplete = false;
  saveBoardState(name, bd);
  state.view = 'adventure';
  render();
}

function performQuitToProfile() {
  const fromTagMe = !!state.game?.fromTagMe;
  const fromBoard = !!state.game?.fromBoard;
  const name = state.selectedStudent;
  const shouldResumeTagMe = fromTagMe && name && getTagMeState(name).awaitingTurnComplete;
  const shouldResumeAdventure = fromBoard && !fromTagMe && name && getBoardState(name).awaitingTurnComplete;
  if (state.game) {
    if (state.game.type === 'soundFlip') cleanupSoundFlip();
    if (state.game.type === 'hwJumble') cleanupHwJumble();
    if (state.game.type === 'soundBox') cleanupSoundBox();
    if (state.game._timer) {
      clearTimeout(state.game._timer);
      state.game._timer = null;
    }
    clearGameNextBtnTimer(state.game);
  }
  const finishedGame = state.game;
  state.game = null;
  state.view = resolveProfileGameReturnView(finishedGame);
  state.boardRolling = false;
  render();
  if (shouldResumeTagMe) {
    void resumeTagMeAfterActivity();
  } else if (shouldResumeAdventure) {
    resumeAdventureAfterActivity();
  }
}

function showBoardPassQuitPrompt({ isTagMe, onYes }) {
  sfxClick();
  removeBoardPassQuitOverlay();
  const passState = isTagMe ? getTagMeState(state.selectedStudent) : getBoardState(state.selectedStudent);
  const remaining = Math.max(0, BOARD_MAX_PASSES - (passState?.passesUsed || 0));
  const overlay = document.createElement('div');
  overlay.id = 'boardPassQuitOverlay';
  overlay.className = 'tagme-pass-quit-overlay fadeIn';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML = `
    <div class="tagme-pass-quit-panel text-center">
      <div class="tagme-pass-quit-ticket" aria-hidden="true">
        <span class="tagme-pass-ticket-notch tagme-pass-ticket-notch--left"></span>
        <span class="tagme-pass-ticket-body">PASS</span>
        <span class="tagme-pass-ticket-notch tagme-pass-ticket-notch--right"></span>
      </div>
      <p class="text-xl font-bold mb-1 arcade-title-friendly">Spend 1 pass?</p>
      <p class="text-sm text-white/75 mb-5">You have <strong>${remaining}</strong> pass${remaining === 1 ? '' : 'es'} left.</p>
      <div class="flex gap-3 justify-center flex-wrap">
        <button type="button" id="boardPassQuitNo" class="bg-white/15 hover:bg-white/25 px-5 py-2.5 rounded-xl font-semibold">No — keep playing</button>
        <button type="button" id="boardPassQuitYes" class="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 px-5 py-2.5 rounded-xl font-semibold text-slate-900">Yes — spend 1 pass</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('#boardPassQuitYes').addEventListener('click', () => {
    sfxClick();
    removeBoardPassQuitOverlay();
    if (typeof onYes === 'function') onYes();
  });
  overlay.querySelector('#boardPassQuitNo').addEventListener('click', () => {
    sfxClick();
    removeBoardPassQuitOverlay();
  });
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      sfxClick();
      removeBoardPassQuitOverlay();
    }
  });
}

function removeBoardPassQuitOverlay() {
  document.getElementById('boardPassQuitOverlay')?.remove();
  document.getElementById('tagMePassQuitOverlay')?.remove();
}

window.resumeAdventureAfterActivity = () => {
  const name = state.selectedStudent;
  const bd = getBoardState(name);
  bd.awaitingTurnComplete = false;
  saveBoardState(name, bd);
  state.view = 'adventure';
  state.boardRolling = false;
  render();
};

window.backToStudentMenu = () => {
  sfxClick();
  state.view = 'profile';
  render();
};

window.backToProfileFromAdventure = () => {
  sfxClick();
  clearBoardOverlays();
  state.view = 'profile';
  state.boardRolling = false;
  render();
};

window.openAdventureMode = () => {
  sfxClick();
  state.boardReturnView = 'adventure';
  state.view = 'adventure';
  render();
};

window.openTagMeMode = () => {
  sfxClick();
  state.boardReturnView = 'tagme';
  state.view = 'tagme';
  render();
};

window.openSoundsWordsPage = () => {
  sfxClick();
  state.view = 'profileSoundsWords';
  render();
};

window.openReadingGamesPage = () => {
  sfxClick();
  state.view = 'profileReadingGames';
  render();
};

window.openWallOfFamePage = () => {
  sfxClick();
  state.view = 'profileWallOfFame';
  render();
};

window.openSelfCheckFromMenu = () => {
  startGame('flash');
};

function render(){
  const app = $('app');
  switch (state.view) {
    case 'upload': return renderUpload(app);
    case 'classSelect': return renderClassSelect(app);
    case 'dashboard': return renderDashboard(app);
    case 'teacherAuth': return renderTeacherAuth(app);
    case 'studentAuth': return renderStudentAuth(app);
    case 'passwords': return renderPasswords(app);
    case 'profile': return renderProfile(app);
    case 'profileSoundsWords': return renderProfileSoundsWords(app);
    case 'profileReadingGames': return renderProfileReadingGames(app);
    case 'profileWallOfFame': return renderProfileWallOfFame(app);
    case 'adventure': return renderAdventureMode(app);
    case 'tagme': return renderTagMeMode(app);
    case 'wordFocus': return renderWordFocus(app);
    case 'flashKind': return renderFlashKindPick(app);
    case 'flashSets': return renderFlashSetHub(app);
    case 'game': return renderGame(app);
    case 'arcade': return renderArcade(app);
  }
}

// ============================================================
// UPLOAD
// ============================================================
function renderUpload(app){
  app.innerHTML = `
    <div class="min-h-screen flex items-center justify-center p-4">
      <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 max-w-2xl w-full text-center shadow-2xl fadeIn">
        <div class="text-6xl mb-4 floaty">🚀</div>
        <h1 class="text-4xl md:text-5xl font-bold mb-3">Reading Adventure</h1>
        <p class="text-lg text-white/80 mb-8" id="upload-lead">Upload your class data to launch personalised reading games for each student.</p>
        <label class="block">
          <input type="file" accept=".json" id="fileInput" class="hidden">
          <span id="dropZone" class="block cursor-pointer border-2 border-dashed border-white/40 hover:border-white hover:bg-white/10 rounded-2xl p-10 transition">
            <div class="text-5xl mb-3">📁</div>
            <div class="font-semibold mb-1">Click to choose a JSON file</div>
            <div class="text-sm text-white/60">or drag and drop your assessment data here</div>
          </span>
        </label>
        <div id="uploadMsg" class="mt-4 text-yellow-200"></div>
      </div>
    </div>`;
  const input = $('fileInput'); const dz = $('dropZone');
  input.addEventListener('change', e => loadFile(e.target.files[0]));
  ['dragover','dragenter'].forEach(ev => dz.addEventListener(ev, e => { e.preventDefault(); dz.classList.add('bg-white/10','border-white');}));
  ['dragleave','drop'].forEach(ev => dz.addEventListener(ev, e => { e.preventDefault(); dz.classList.remove('bg-white/10','border-white');}));
  dz.addEventListener('drop', e => { if (e.dataTransfer.files[0]) loadFile(e.dataTransfer.files[0]);});
}
function loadFile(file){
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data.classes) throw new Error('Invalid format: no classes found');
      const classKeys = Object.keys(data.classes);
      if (classKeys.length === 0) throw new Error('No classes found in file');
      state.data = normalizeImportedTrackerData(data);
      // Reset any previous class selection so the picker shows
      state.classKey = null;
      state.passwords = {};
      state.studentPoints = {};
      state.flashResults = {};
      state.view = 'classSelect';
      render();
    } catch(err) {
      $('uploadMsg').textContent = 'Could not read file: ' + err.message;
    }
  };
  reader.readAsText(file);
}

// ============================================================
// CLASS SELECT (pre-landing page after JSON upload)
// ============================================================
function renderClassSelect(app) {
  const classKeys = Object.keys(state.data.classes);

  // Soft palette of gradients to differentiate class cards
  const palettes = [
    'from-pink-500 to-fuchsia-600',
    'from-cyan-500 to-blue-600',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-orange-600',
    'from-violet-500 to-purple-600',
    'from-rose-500 to-red-600',
    'from-lime-500 to-green-600',
    'from-sky-500 to-indigo-600',
  ];
  const emojis = ['🚀','🌟','🪐','🌈','🎈','🎨','🦄','🐠','🌺','⚡','🎯','🎪'];

  const cards = classKeys.map((key, i) => {
    const cls = state.data.classes[key];
    const palette = palettes[i % palettes.length];
    const emoji = emojis[i % emojis.length];
    const safeKey = key.replace(/'/g,"\\'").replace(/"/g,'&quot;');
    return `
      <button onclick="selectClass('${safeKey}')" class="text-center bg-gradient-to-br ${palette} hover:scale-105 transition transform rounded-2xl p-7 shadow-2xl border border-white/20">
        <div class="text-6xl mb-4 floaty">${emoji}</div>
        <div class="font-extrabold text-3xl md:text-4xl tracking-wide arcade-title-friendly">${key}</div>
        <div class="mt-5 inline-block bg-black/20 rounded-xl px-4 py-2 text-sm font-semibold">Open class →</div>
      </button>`;
  }).join('');

  app.innerHTML = `
    <div class="min-h-screen p-4 md:p-8 flex items-center justify-center">
      <div class="max-w-5xl w-full">
        <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
          <button onclick="state.view='upload'; render()" class="text-white/70 hover:text-white text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl">← Choose a different file</button>
          <span class="text-sm text-white/60">${classKeys.length} class${classKeys.length === 1 ? '' : 'es'} loaded</span>
        </div>
        <div class="text-center mb-8 fadeIn">
          <div class="text-5xl md:text-6xl mb-3 floaty">📂</div>
          <h1 class="text-3xl md:text-5xl font-bold mb-2">Choose your class</h1>
          <p class="text-white/75 text-lg">Pick which class you'd like to open today</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 fadeIn">${cards}</div>
      </div>
    </div>`;
}

window.selectClass = (key) => {
  if (!state.data || !state.data.classes[key]) return;
  state.classKey = key;
  generatePasswords();
  loadPoints();
  loadFlashResults();
  loadGamePlayed();
  state.view = 'dashboard';
  render();
};

// ============================================================
// DASHBOARD
// ============================================================
function renderDashboard(app){
  const cls = state.data.classes[state.classKey];
  const cards = cls.students.map(name => {
    const initials = name.replace('Student ','S');
    return `
      <button onclick="selectStudent('${name.replace(/'/g,"\\'")}')" class="bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 rounded-2xl p-5 transition shadow-lg hover:scale-105 flex flex-col items-center gap-3">
        <div class="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 flex items-center justify-center font-bold text-2xl shadow-xl">${initials}</div>
        <div class="font-semibold text-center text-lg">${name}</div>
        <div class="text-xs text-white/60 flex items-center gap-1">🔒 Password needed</div>
      </button>`;
  }).join('');

  const totalClasses = Object.keys(state.data.classes).length;

  app.innerHTML = `
    <div class="min-h-screen p-4 md:p-8">
      <header class="max-w-6xl mx-auto mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 class="text-2xl md:text-4xl font-bold">${state.classKey}</h1>
          <p class="text-white/70 text-sm">Tap your name and enter your secret password</p>
        </div>
        <div class="flex gap-2 items-center flex-wrap">
          ${totalClasses > 1 ? `<button onclick="state.view='classSelect'; render()" class="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm">🔄 Change class</button>` : ''}
          <button onclick="state.view='upload'; render()" class="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm">📁 New file</button>
          <button onclick="openTeacherAccess()" title="Teacher area" class="w-8 h-8 rounded-full bg-white/5 hover:bg-white/20 text-white/40 hover:text-white text-xs transition flex items-center justify-center">·</button>
        </div>
      </header>
      <div class="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 fadeIn">${cards}</div>
    </div>`;
}

window.openTeacherAccess = () => {
  state.view = 'teacherAuth';
  render();
};
window.selectStudent = (name) => {
  state.selectedStudent = name;
  state.view = 'studentAuth';
  render();
};

// ============================================================
// STUDENT PASSWORD GATE
// ============================================================
function renderStudentAuth(app) {
  const name = state.selectedStudent;
  const initials = name.replace('Student ','S');
  app.innerHTML = `
    <div class="min-h-screen flex items-center justify-center p-4">
      <div class="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 max-w-md w-full fadeIn">
        <button onclick="state.view='dashboard'; render()" class="text-white/60 hover:text-white text-sm mb-4">← Back</button>
        <div class="text-center mb-6">
          <div class="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 flex items-center justify-center font-bold text-2xl shadow-xl mb-3 floaty">${initials}</div>
          <h2 class="text-2xl font-bold">Hi ${name}!</h2>
          <p class="text-white/70 text-sm mt-1">🔐 Enter your secret password to play</p>
        </div>
        <input type="password" id="studentPwInput" placeholder="Your password" autocomplete="off" class="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 mb-3 text-white placeholder-white/50 focus:outline-none focus:border-white text-center text-lg">
        <div id="spwError" class="text-red-300 text-sm mb-3 hidden text-center"></div>
        <button onclick="checkStudentPw()" class="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 px-4 py-3 rounded-xl font-semibold mb-3">Enter ✨</button>
        <div class="text-xs text-white/40 text-center">Forgot your password? Ask your teacher.</div>
      </div>
    </div>`;
  setTimeout(() => {
    const i = $('studentPwInput');
    if (i) {
      i.focus();
      i.addEventListener('keypress', e => { if (e.key === 'Enter') checkStudentPw(); });
    }
  }, 0);
}

window.checkStudentPw = () => {
  const pw = $('studentPwInput').value.trim();
  const name = state.selectedStudent;
  const studentPw = state.passwords[name];
  if (pw === studentPw || pw === state.teacherPassword) {
    state.view = 'profile';
    render();
  } else {
    const err = $('spwError');
    err.textContent = 'Wrong password. Try again!';
    err.classList.remove('hidden');
    const inp = $('studentPwInput');
    if (inp) { inp.value = ''; inp.classList.add('shake'); setTimeout(() => inp.classList.remove('shake'), 400); }
  }
};

// ============================================================
// TEACHER AUTH
// ============================================================
function renderTeacherAuth(app) {
  app.innerHTML = `
    <div class="min-h-screen flex items-center justify-center p-4">
      <div class="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 max-w-md w-full fadeIn">
        <button onclick="state.view='dashboard'; render()" class="text-white/60 hover:text-white text-sm mb-4">← Back</button>
        <div class="text-center mb-6">
          <div class="text-5xl mb-2">🔐</div>
          <h2 class="text-2xl font-bold">Teacher Area</h2>
          <p class="text-white/60 text-sm mt-1">Restricted access — master password required</p>
        </div>
        <input type="password" id="teacherPwInput" placeholder="Teacher password" autocomplete="off" class="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 mb-3 text-white placeholder-white/50 focus:outline-none focus:border-white">
        <div id="pwError" class="text-red-300 text-sm mb-3 hidden"></div>
        <button onclick="checkTeacherPw()" class="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 px-4 py-3 rounded-xl font-semibold mb-3">Enter</button>
      </div>
    </div>`;
  setTimeout(() => {
    const i = $('teacherPwInput');
    if (i) {
      i.focus();
      i.addEventListener('keypress', e => { if (e.key === 'Enter') checkTeacherPw(); });
    }
  }, 0);
}
window.checkTeacherPw = () => {
  const pw = $('teacherPwInput').value;
  if (pw === state.teacherPassword) {
    state.view = 'passwords';
    render();
  } else {
    const err = $('pwError');
    err.textContent = 'Incorrect password. Try again.';
    err.classList.remove('hidden');
    const inp = $('teacherPwInput');
    if (inp) { inp.value = ''; inp.classList.add('shake'); setTimeout(() => inp.classList.remove('shake'), 400); }
  }
};

// ============================================================
// PASSWORDS LIST
// ============================================================
function renderPasswords(app) {
  const cls = state.data.classes[state.classKey];
  const cards = cls.students.map(name => {
    const pw = state.passwords[name];
    return `
      <div class="print-card border-2 border-dashed border-white/40 rounded-xl p-5">
        <div class="pw-label text-xs text-white/60 uppercase tracking-wider">${state.classKey}</div>
        <div class="pw-name font-bold text-lg mt-1">${name}</div>
        <div class="text-xs text-white/50 mt-2 mb-1">Your secret password:</div>
        <div class="pw-box text-2xl font-mono mt-1 px-4 py-3 bg-white/10 rounded-lg border border-white/20 text-center">${pw}</div>
        <div class="pw-hint text-xs text-white/50 mt-3 text-center">✂️ Cut out & keep safe</div>
      </div>`;
  }).join('');

  app.innerHTML = `
    <div class="min-h-screen p-4 md:p-8">
      <div class="max-w-5xl mx-auto">
        <div class="flex items-center justify-between mb-6 no-print flex-wrap gap-3">
          <button onclick="state.view='dashboard'; render()" class="text-white/70 hover:text-white">← Back</button>
          <div class="flex gap-2">
            <button onclick="changeTeacherPassword()" class="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm">🔑 Change password</button>
            <button onclick="regeneratePasswords()" class="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm">🔄 Regenerate</button>
            <button onclick="window.print()" class="bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition px-4 py-2 rounded-xl text-sm">🖨️ Print cards</button>
          </div>
        </div>
        <h1 class="text-3xl font-bold mb-2 no-print">Student Passwords</h1>
        <p class="text-white/70 mb-2 no-print">Cut along the dashed lines and hand each student their card.</p>
        <p class="text-yellow-200/90 text-sm mb-6 no-print">💡 Tip: The teacher password (<code class="bg-white/10 px-1 rounded">${state.teacherPassword}</code>) works as a master key — you can use it to access any student's page.</p>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4">${cards}</div>
      </div>
    </div>`;
}
window.changeTeacherPassword = () => {
  const newPw = prompt('Enter new teacher password (min 4 chars):', state.teacherPassword);
  if (newPw && newPw.length >= 4) { state.teacherPassword = newPw; alert('Password updated for this session.'); render(); }
  else if (newPw !== null) { alert('Password must be at least 4 characters.'); }
};
window.regeneratePasswords = () => {
  if (confirm('Generate new passwords for all students?')) {
    const cls = state.data.classes[state.classKey];
    const used = new Set();
    state.passwords = {};
    cls.students.forEach(name => {
      let pw, tries = 0;
      do {
        const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
        const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
        pw = `${adj} ${noun}`;
        tries++;
        if (tries > 80) { pw = `${pw} ${tries}`; break; }
      } while (used.has(pw));
      used.add(pw);
      state.passwords[name] = pw;
    });
    render();
  }
};

// ============================================================
// PROFILE
// ============================================================
window.playSound = (text, type, exampleWord) => {
  const track = type === 'hw' ? 'hw' : type === 'gpc' ? 'gpc' : null;
  if (track === 'gpc' && exampleWord) {
    const audioData = getGpcAudioSource(text, exampleWord);
    if (audioData) {
      try {
        const audio = new Audio(audioData);
        audio.play().catch(() => {});
        return;
      } catch (e) {}
    }
  }
  speak(text, track);
};

function profileTrackBannerArt(track) {
  const stroke = track === 'gpc' ? '#7dd3fc' : '#fda4af';
  const fill1 = track === 'gpc' ? '#38bdf8' : '#fb7185';
  const fill2 = track === 'gpc' ? '#6366f1' : '#e11d48';
  const fill3 = track === 'gpc' ? '#fde047' : '#fde047';
  const fill4 = track === 'gpc' ? '#22d3ee' : '#fde047';
  if (track === 'gpc') {
    return `<svg class="game-track-banner-svg" viewBox="0 0 320 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
    <path d="M8 14 Q80 8 160 14 T312 14" fill="none" stroke="${stroke}" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
    <circle cx="40" cy="14" r="8" fill="${fill1}" stroke="#fff" stroke-width="2"/>
    <text x="40" y="17.5" text-anchor="middle" font-size="10" font-weight="800" fill="#fff">1</text>
    <circle cx="120" cy="14" r="9" fill="${fill2}" stroke="#fff" stroke-width="2"/>
    <text x="120" y="18" text-anchor="middle" font-size="10" font-weight="800" fill="#fff">2</text>
    <circle cx="200" cy="14" r="9" fill="${fill3}" stroke="#fff" stroke-width="2"/>
    <text x="200" y="18" text-anchor="middle" font-size="10" font-weight="800" fill="#422006">3</text>
    <circle cx="280" cy="14" r="10" fill="${fill4}" stroke="#fff" stroke-width="2"/>
    <text x="280" y="18" text-anchor="middle" font-size="11" font-weight="800" fill="#fff">4</text>
    <polygon points="72,14 80,10 80,18" fill="${stroke}" opacity="0.85"/>
    <polygon points="152,14 160,10 160,18" fill="${stroke}" opacity="0.85"/>
    <polygon points="232,14 240,10 240,18" fill="${stroke}" opacity="0.85"/>
  </svg>`;
  }
  return `<svg class="game-track-banner-svg" viewBox="0 0 320 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
    <path d="M8 14 Q80 8 160 14 T312 14" fill="none" stroke="${stroke}" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
    <circle cx="48" cy="14" r="9" fill="${fill1}" stroke="#fff" stroke-width="2"/>
    <text x="48" y="18" text-anchor="middle" font-size="11" font-weight="800" fill="#fff">1</text>
    <circle cx="160" cy="14" r="10" fill="${fill2}" stroke="#fff" stroke-width="2"/>
    <text x="160" y="18.5" text-anchor="middle" font-size="11" font-weight="800" fill="#fff">2</text>
    <circle cx="272" cy="14" r="11" fill="${fill3}" stroke="#fff" stroke-width="2"/>
    <text x="272" y="18.5" text-anchor="middle" font-size="12" font-weight="800" fill="#422006">3</text>
    <polygon points="100,14 108,10 108,18" fill="${stroke}" opacity="0.85"/>
    <polygon points="212,14 220,10 220,18" fill="${stroke}" opacity="0.85"/>
  </svg>`;
}

function profileSectionIcon(kind) {
  const icons = {
    targets: `<svg class="profile-section-icon" viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><circle cx="16" cy="16" r="14" fill="#6366f1"/><circle cx="16" cy="16" r="9" fill="#818cf8"/><circle cx="16" cy="16" r="4" fill="#fde047"/></svg>`,
    sounds: `<svg class="profile-section-icon" viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><rect x="4" y="10" width="5" height="12" rx="2" fill="#22d3ee"/><rect x="12" y="6" width="5" height="20" rx="2" fill="#38bdf8"/><rect x="20" y="12" width="5" height="8" rx="2" fill="#0ea5e9"/></svg>`,
    words: `<svg class="profile-section-icon" viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><path d="M8 8h16v4H12v12H8V8z" fill="#fb7185"/><path d="M14 8h10v16h-4V12h-6V8z" fill="#f472b6" opacity="0.85"/></svg>`,
    games: `<svg class="profile-section-icon" viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><rect x="4" y="10" width="24" height="14" rx="6" fill="#a855f7"/><circle cx="11" cy="17" r="3" fill="#fde047"/><circle cx="21" cy="17" r="3" fill="#fde047"/></svg>`,
    collection: `<svg class="profile-section-icon" viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><path d="M16 4l3.2 6.5 7.2 1-5.2 5 1.2 7.2L16 20.8l-6.4 3.4 1.2-7.2-5.2-5 7.2-1L16 4z" fill="#fbbf24" stroke="#fef08a" stroke-width="1.5"/></svg>`,
    starcade: `<svg class="profile-section-icon" viewBox="0 0 32 32" width="56" height="56" aria-hidden="true"><path d="M16 3l4 8.2 9.2 1.3-6.7 6.5 1.6 9.2L16 23.4l-8.1 4.8 1.6-9.2-6.7-6.5 9.2-1.3L16 3z" fill="#fbbf24" stroke="#fef08a" stroke-width="1.5"/></svg>`
  };
  return icons[kind] || '';
}

function profileGpcTargetChip(item) {
  const gpcLabel = String(item.gpc ?? gpcDisplayPhoneme(gpcPoolKey(item)) ?? '').trim();
  const hasAud = hasGpcItemAudio(item);
  const borderCls = flashBorderClass(gpcPoolKey(item));
  const exampleWord = item.exampleWord || resolveGpcExampleWord(gpcPoolKey(item)) || item.gpc;
  const escWord = exampleWord.replace(/'/g, "\\'");
  const escGpc = item.gpc.replace(/'/g, "\\'");
  const escEx = String(item.exampleWord ?? '').replace(/'/g, "\\'");
  const playArgs = escEx
    ? `'${escGpc}','gpc','${escEx}'`
    : `'${escGpc}','gpc'`;
  return `<div class="inline-flex items-center gap-1 bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border-cyan-300/40 border rounded-xl px-3 py-2 ${borderCls}">
    <button type="button" class="profile-word-chip-btn" onclick="openWordFocus('${escWord}','gpc')" aria-label="Show example word for ${gpcLabel}">
      <span class="text-xl font-bold">${escapeHtmlText(gpcLabel)}</span>
    </button>
    ${hasAud ? `<button type="button" onclick="event.stopPropagation(); playSound(${playArgs})" class="ml-1 w-8 h-8 rounded-full bg-yellow-400/30 hover:bg-yellow-400/60 text-base transition transform hover:scale-110" title="Listen">🔊</button>` : ''}
  </div>`;
}

function profileTargetChip(value, type) {
  const hasAud = hasAudio(value, type === 'hw' ? 'hw' : 'gpc');
  const borderCls = flashBorderClass(value);
  const grad = type === 'gpc'
    ? 'bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border-cyan-300/40'
    : 'bg-gradient-to-br from-pink-500/30 to-rose-600/30 border-pink-300/40';
  const textCls = type === 'gpc' ? 'text-2xl' : 'text-xl';
  const focusWord = type === 'gpc' ? (resolveGpcExampleWord(value) || value) : value;
  const escWord = focusWord.replace(/'/g, "\\'");
  const escAud = value.replace(/'/g, "\\'");
  return `<div class="inline-flex items-center gap-1 ${grad} border rounded-xl px-3 py-2 ${borderCls}">
    <button type="button" class="profile-word-chip-btn" onclick="openWordFocus('${escWord}','${type}')" aria-label="Read ${focusWord}">
      <span class="${textCls} font-bold">${value}</span>
    </button>
    ${hasAud ? `<button type="button" onclick="event.stopPropagation(); playSound('${escAud}','${type}')" class="ml-1 w-8 h-8 rounded-full bg-yellow-400/30 hover:bg-yellow-400/60 text-base transition transform hover:scale-110" title="Listen">🔊</button>` : ''}
  </div>`;
}

function buildProfileSortedTargets(items, valueKey, type) {
  const got = [];
  const tricky = [];
  const unchecked = [];
  const flashValue = (item) => type === 'gpc' ? gpcPoolKey(item) : item[valueKey];
  const renderChip = (item) => type === 'gpc' ? profileGpcTargetChip(item) : profileTargetChip(item[valueKey], type);
  items.forEach(item => {
    const value = flashValue(item);
    const status = getFlashStatus(value);
    if (status === 'got') got.push(item);
    else if (status === 'tricky') tricky.push(item);
    else unchecked.push(item);
  });
  const gotHtml = got.length
    ? got.map(renderChip).join('')
    : `<span class="profile-target-empty">None yet</span>`;
  const trickyHtml = tricky.length
    ? tricky.map(renderChip).join('')
    : `<span class="profile-target-empty">None yet</span>`;
  const uncheckedHtml = unchecked.length
    ? unchecked.map(renderChip).join('')
    : '';
  const uncheckedBlock = uncheckedHtml
    ? `<div class="profile-target-unchecked"><div class="flex flex-wrap gap-2">${uncheckedHtml}</div></div>`
    : '';
  return `${uncheckedBlock}
    <div class="profile-target-col profile-target-col--got">
      <div class="profile-target-col-title"><span class="inline-block w-4 h-4 rounded ring-2 ring-green-400 bg-white/10"></span> I know it</div>
      <div class="profile-target-col-body">${gotHtml}</div>
    </div>
    <div class="profile-target-col profile-target-col--tricky">
      <div class="profile-target-col-title"><span class="inline-block w-4 h-4 rounded ring-2 ring-orange-400 bg-white/10"></span> Still learning</div>
      <div class="profile-target-col-body">${trickyHtml}</div>
    </div>`;
}

function profileTrackIllustration(track, step) {
  const badge = `<circle cx="18" cy="18" r="16" fill="rgba(255,255,255,0.92)" stroke="rgba(0,0,0,0.12)" stroke-width="2"/>
    <text x="18" y="24" text-anchor="middle" font-size="17" font-weight="800" fill="#1e293b">${step}</text>`;
  if (track === 'gpc') {
    if (step === 1) return `<svg class="game-track-svg" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      ${badge}
      <circle cx="88" cy="58" r="34" fill="#0ea5e9"/>
      <text x="88" y="68" text-anchor="middle" font-size="36" font-weight="800" fill="#fff" font-family="Andika,sans-serif">sh</text>
      <path d="M52 42 L44 58 L52 74" stroke="#fde047" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    if (step === 2) return `<svg class="game-track-svg" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      ${badge}
      <rect x="48" y="36" width="64" height="44" rx="14" fill="#22d3ee"/>
      <text x="80" y="68" text-anchor="middle" font-size="30" font-weight="800" fill="#fff" font-family="Andika,sans-serif">ch</text>
      <circle cx="118" cy="44" r="10" fill="#f472b6"/>
      <circle cx="130" cy="72" r="9" fill="#a855f7"/>
    </svg>`;
    if (step === 3) return `<svg class="game-track-svg" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      ${badge}
      <rect x="52" y="34" width="32" height="44" rx="8" fill="#38bdf8" stroke="#fff" stroke-width="2"/>
      <text x="68" y="66" text-anchor="middle" font-size="28" font-weight="800" fill="#fff" font-family="Andika,sans-serif">b</text>
      <rect x="96" y="34" width="32" height="44" rx="8" fill="#6366f1" stroke="#fff" stroke-width="2" transform="rotate(180 112 56)"/>
      <text x="112" y="66" text-anchor="middle" font-size="28" font-weight="800" fill="#e0e7ff" font-family="Andika,sans-serif" transform="rotate(180 112 56)">b</text>
    </svg>`;
    return `<svg class="game-track-svg" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      ${badge}
      <rect x="38" y="42" width="26" height="32" rx="6" fill="#38bdf8" stroke="#fff" stroke-width="2"/>
      <rect x="68" y="42" width="26" height="32" rx="6" fill="#0ea5e9" stroke="#fff" stroke-width="2"/>
      <rect x="98" y="42" width="26" height="32" rx="6" fill="#6366f1" stroke="#fff" stroke-width="2"/>
      <text x="124" y="64" text-anchor="middle" font-size="22" font-weight="800" fill="#fff" font-family="Andika,sans-serif">e</text>
      <rect x="28" y="78" width="22" height="14" rx="4" fill="#22d3ee" stroke="#fff" stroke-width="1.5"/>
      <text x="39" y="88" text-anchor="middle" font-size="9" font-weight="800" fill="#fff" font-family="Andika,sans-serif">sh</text>
      <rect x="54" y="78" width="22" height="14" rx="4" fill="#818cf8" stroke="#fff" stroke-width="1.5"/>
      <text x="65" y="88" text-anchor="middle" font-size="9" font-weight="800" fill="#fff" font-family="Andika,sans-serif">a_e</text>
      <rect x="80" y="78" width="22" height="14" rx="4" fill="#a855f7" stroke="#fff" stroke-width="1.5"/>
      <text x="91" y="88" text-anchor="middle" font-size="9" font-weight="800" fill="#fff" font-family="Andika,sans-serif">t</text>
    </svg>`;
  }
  if (track === 'heart') {
    if (step === 1) return `<svg class="game-track-svg" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      ${badge}
      <circle cx="88" cy="58" r="34" fill="#f472b6"/>
      <text x="88" y="68" text-anchor="middle" font-size="30" font-weight="800" fill="#fff" font-family="Andika,sans-serif">the</text>
      <circle cx="48" cy="46" r="12" fill="#fde047"/>
      <circle cx="42" cy="56" r="9" fill="#fb923c"/>
      <circle cx="54" cy="58" r="7" fill="#f97316"/>
    </svg>`;
    if (step === 2) return `<svg class="game-track-svg" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      ${badge}
      <rect x="46" y="38" width="72" height="44" rx="14" fill="#fb7185"/>
      <text x="62" y="68" text-anchor="middle" font-size="26" font-weight="800" fill="#fff" font-family="Andika,sans-serif">w</text>
      <rect x="78" y="52" width="22" height="8" rx="3" fill="rgba(255,255,255,0.45)"/>
      <text x="108" y="68" text-anchor="middle" font-size="26" font-weight="800" fill="#fff" font-family="Andika,sans-serif">s</text>
      <circle cx="128" cy="44" r="10" fill="#fde047"/>
      <circle cx="138" cy="72" r="9" fill="#e11d48"/>
    </svg>`;
    if (step === 3) return `<svg class="game-track-svg" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      ${badge}
      <rect x="44" y="40" width="72" height="40" rx="12" fill="#f43f5e"/>
      <text x="58" y="68" text-anchor="middle" font-size="24" font-weight="800" fill="#fff" font-family="Andika,sans-serif">t</text>
      <text x="80" y="68" text-anchor="middle" font-size="24" font-weight="800" fill="#fecdd3" font-family="Andika,sans-serif">e</text>
      <text x="102" y="68" text-anchor="middle" font-size="24" font-weight="800" fill="#fff" font-family="Andika,sans-serif">h</text>
      <path d="M118 48 L126 56 L118 64" stroke="#fde047" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    return `<svg class="game-track-svg" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      ${badge}
      <rect x="52" y="40" width="22" height="32" rx="6" fill="#fda4af" stroke="#fff" stroke-width="2"/>
      <text x="63" y="64" text-anchor="middle" font-size="22" font-weight="800" fill="#fff" font-family="Andika,sans-serif">c</text>
      <rect x="78" y="40" width="22" height="32" rx="6" fill="#f472b6" stroke="#fff" stroke-width="2"/>
      <text x="89" y="64" text-anchor="middle" font-size="22" font-weight="800" fill="#fff" font-family="Andika,sans-serif">a</text>
      <rect x="104" y="40" width="22" height="32" rx="6" fill="#e11d48" stroke="#fff" stroke-width="2"/>
      <text x="115" y="64" text-anchor="middle" font-size="22" font-weight="800" fill="#fff" font-family="Andika,sans-serif">t</text>
      <line x1="48" y1="76" x2="130" y2="76" stroke="#fecdd3" stroke-width="3" stroke-linecap="round"/>
    </svg>`;
  }
  return '';
}

function profileFlashIllustration() {
  return `<svg class="game-track-svg" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="36" y="22" width="44" height="56" rx="8" fill="#4ade80" stroke="#fff" stroke-width="3"/>
    <rect x="80" y="30" width="44" height="48" rx="8" fill="#fb923c" stroke="#fff" stroke-width="3" transform="rotate(8 102 54)"/>
    <path d="M48 42 L56 50 L68 36" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="102" y="58" text-anchor="middle" font-size="28" font-weight="800" fill="#fff">?</text>
    <path d="M72 78 L80 58 L88 78 L76 66 Z" fill="#fde047" stroke="#fbbf24" stroke-width="2"/>
  </svg>`;
}

function readingGameCabinetCard({ id, track, title, desc, emoji, disabled, played }) {
  const dis = disabled ? ' disabled' : '';
  const lockedClass = disabled ? ' arcade-cabinet-card--locked' : '';
  const footer = disabled
    ? '<div class="arcade-cabinet-cost">No targets yet</div>'
    : played
      ? '<div class="arcade-cabinet-cost arcade-cabinet-cost--done">✓ Played</div>'
      : '<div class="arcade-cabinet-cost">Play</div>';
  return `
    <button type="button" data-start-game="${id}"${dis}
      class="arcade-cabinet-card arcade-cabinet-card--reading arcade-cabinet-card--${track}${lockedClass}"
      aria-label="${title}${played ? ' — played' : ''}${disabled ? ' — unavailable' : ''}">
      <div class="arcade-cabinet-marquee-trim arcade-cabinet-marquee-trim--${track}" aria-hidden="true"></div>
      <div class="arcade-marquee">
        <div class="arcade-marquee-screen">
          <span class="arcade-marquee-icon" aria-hidden="true">${emoji}</span>
        </div>
        <h3 class="arcade-marquee-title arcade-title-friendly">${title}</h3>
      </div>
      <div class="arcade-cabinet-body arcade-cabinet-body--reading">
        <p class="arcade-cabinet-desc arcade-instructions">${desc}</p>
        ${footer}
      </div>
    </button>`;
}

function profileTrackCard({ id, track, step, title, disabled, played }) {
  const dis = disabled ? 'disabled' : '';
  const check = played ? '<span class="game-track-check" aria-hidden="true">✓</span>' : '';
  return `<button type="button" data-start-game="${id}" ${dis}
    class="game-track-card game-track-${track} game-track-step-${step} relative"
    aria-label="${title}${played ? ' — played' : ''}">
    ${check}
    <div class="game-track-visual">${profileTrackIllustration(track, step)}</div>
    <h3 class="game-track-title arcade-title-friendly">${title}</h3>
  </button>`;
}

function buildBoardSpacesHtml(name, bd, positions, pieceSelected) {
  const activePlayer = bd.activePlayer || 1;
  return positions.map((pos, i) => {
    const isStart = i === 0;
    const isFinish = i >= BOARD_FINISH_INDEX;
    const bonusId = getBoardBonusArcadeId(i, bd);
    const gameId = getBoardSpaceGameId(i, bd);
    const disabled = gameId && !isBoardGameAvailable(name, gameId);
    const played = gameId && bd.playedGames.includes(gameId);
    const currentP1 = pieceSelected && bd.position === i;
    const currentP2 = pieceSelected && bd.twoPlayerMode && bd.pieceIndex2 != null && bd.position2 === i;
    const label = getBoardSquareLabel(i);
    let style = BOARD_START_STYLE;
    let title = 'Start';
    if (isFinish) {
      style = BOARD_FINISH_STYLE;
      title = 'Finish';
    } else if (bonusId) {
      style = BOARD_BONUS_STYLE;
      title = BOARD_BONUS_GAME_TITLES[bonusId] + ' (Starcade bonus)';
    } else if (gameId) {
      style = BOARD_GAME_STYLE[gameId] || { bg: '#64748b', text: '#fff', border: '#cbd5e1' };
      title = GAME_BOARD_TITLES[gameId] || gameId;
    }
    let cls = 'profile-board-space';
    if (isStart) cls += ' profile-board-space--start';
    else if (isFinish) cls += ' profile-board-space--finish';
    else if (bonusId) cls += ' profile-board-space--bonus';
    else if (gameId) cls += ` profile-board-space--game-${gameId}`;
    if (disabled) cls += ' profile-board-space--disabled';
    if (played) cls += ' profile-board-space--played';
    if (currentP1 && (!bd.twoPlayerMode || activePlayer === 1)) cls += ' profile-board-space--current';
    if (currentP2 && activePlayer === 2) cls += ' profile-board-space--current';
    const labelCls = label.word ? ' profile-board-space-label--word' : '';
    const showPattern = !!(gameId || isStart || isFinish || bonusId);
    return `<div class="${cls}"
      style="left:${pos.x}%;top:${pos.y}%;width:${pos.w}%;--tile-bg:${style.bg};--tile-fg:${style.text};--tile-border:${style.border};"
      title="${title}" aria-label="Square ${i + 1}, ${label.text}${title ? ', ' + title : ''}">
      <div class="profile-board-space-spotlight" aria-hidden="true"></div>
      <div class="profile-board-space-tile">
        ${showPattern ? '<div class="profile-board-space-pattern"></div>' : ''}
        <span class="profile-board-space-label${labelCls}">${label.text}</span>
      </div>
    </div>`;
  }).join('');
}

function buildBoardLegendHtml() {
  const rows = BOARD_GAME_SEQUENCE.map(id => {
    const st = BOARD_GAME_STYLE[id];
    return `<div class="profile-board-legend-row">
      <span class="profile-board-legend-swatch" style="background:${st.bg};border-color:${st.border};"></span>
      <span class="profile-board-legend-name">${GAME_BOARD_TITLES[id]}</span>
    </div>`;
  }).join('');
  return `<div class="profile-board-legend">
    <div class="profile-board-legend-row">
      <span class="profile-board-legend-swatch" style="background:${BOARD_START_STYLE.bg};border-color:${BOARD_START_STYLE.border};"></span>
      <span class="profile-board-legend-name">Start 🚩</span>
    </div>
    ${rows}
    <div class="profile-board-legend-row">
      <span class="profile-board-legend-swatch" style="background:${BOARD_BONUS_STYLE.bg};border-color:${BOARD_BONUS_STYLE.border};"></span>
      <span class="profile-board-legend-name">Starcade bonus 🎮</span>
    </div>
    <div class="profile-board-legend-row">
      <span class="profile-board-legend-swatch" style="background:${BOARD_FINISH_STYLE.bg};border-color:${BOARD_FINISH_STYLE.border};"></span>
      <span class="profile-board-legend-name">Finish 🏁</span>
    </div>
  </div>`;
}

function getBoardPiecePickPhase(bd) {
  if (bd.pieceIndex == null) return 'p1';
  if (bd.twoPlayerMode && bd.pieceIndex2 == null) return 'p2';
  return null;
}

function removeBoardGamePrompt() {
  document.getElementById('boardGamePromptOverlay')?.remove();
}

function clearBoardOverlays() {
  removeBoardGamePrompt();
  removeBoardPassQuitOverlay();
  document.getElementById('boardCheckInOverlay')?.remove();
  document.getElementById('boardReturnOkOverlay')?.remove();
}

function showBoardGamePrompt(gameId, squareIndex, boardPlayer = 1) {
  removeBoardGamePrompt();
  const st = BOARD_GAME_STYLE[gameId] || { bg: '#64748b', text: '#fff', border: '#cbd5e1' };
  const title = GAME_BOARD_TITLES[gameId] || gameId;
  const funNote = boardPlayer === 2 ? '<p class="text-xs text-white/60 mb-2">Player 2 — playing for fun (no stars)</p>' : '';
  const overlay = document.createElement('div');
  overlay.id = 'boardGamePromptOverlay';
  overlay.className = 'profile-board-piece-overlay fadeIn';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', title);
  overlay.innerHTML = `
    <div class="board-game-prompt-panel">
      <div class="board-game-prompt-card" style="background:${st.bg};color:${st.text};border-color:${st.border}">
        <h2 class="board-game-prompt-title">${escapeHtmlText(title)}</h2>
      </div>
      ${funNote}
      <p class="board-game-prompt-hint">Press Go when ready!</p>
      <button type="button" class="board-game-prompt-go" id="boardGamePromptGo">Go!</button>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('#boardGamePromptGo').addEventListener('click', () => {
    sfxClick();
    removeBoardGamePrompt();
    const name = state.selectedStudent;
    const bd = getBoardState(name);
    bd.awaitingTurnComplete = true;
    saveBoardState(name, bd);
    startGame(gameId, { fromBoard: true, boardSquare: squareIndex, boardPlayer });
  });
}

function showBoardBonusPrompt(arcadeId, squareIndex, boardPlayer = 1) {
  removeBoardGamePrompt();
  const title = BOARD_BONUS_GAME_TITLES[arcadeId] || 'Starcade game';
  const st = BOARD_BONUS_STYLE;
  const overlay = document.createElement('div');
  overlay.id = 'boardGamePromptOverlay';
  overlay.className = 'profile-board-piece-overlay fadeIn';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', title);
  overlay.innerHTML = `
    <div class="board-game-prompt-panel">
      <div class="board-game-prompt-card" style="background:${st.bg};color:${st.text};border-color:${st.border}">
        <h2 class="board-game-prompt-title">🎮 ${escapeHtmlText(title)}</h2>
        <p class="text-sm mt-1 opacity-90">Free Starcade bonus!</p>
      </div>
      <p class="board-game-prompt-hint">Press Go when ready!</p>
      <button type="button" class="board-game-prompt-go" id="boardBonusPromptGo">Go!</button>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('#boardBonusPromptGo').addEventListener('click', () => {
    sfxClick();
    removeBoardGamePrompt();
    const name = state.selectedStudent;
    const bd = getBoardState(name);
    bd.awaitingTurnComplete = true;
    saveBoardState(name, bd);
    launchArcadeFromBoard(arcadeId);
  });
}

function showBoardReturnOkPrompt() {
  document.getElementById('boardReturnOkOverlay')?.remove();
  state.arcadeFromBoard = false;
  state.arcadeGame = null;
  if (state.boardReturnView === 'tagme') {
    showTagMeReturnOkPrompt();
    return;
  }
  state.view = 'adventure';
  const overlay = document.createElement('div');
  overlay.id = 'boardReturnOkOverlay';
  overlay.className = 'profile-board-piece-overlay fadeIn';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML = `
    <div class="profile-board-piece-panel">
      <div class="game-end-board-celebrate mb-2" aria-hidden="true">🎉✨🌟</div>
      <h2 class="arcade-title-friendly text-xl font-bold mb-1">Great game!</h2>
      <p class="text-sm text-white/85 mb-3 arcade-instructions">Good try! Practice makes progress!</p>
      <p class="board-game-prompt-hint mb-4">Press OK to return to the board</p>
      <button type="button" class="board-game-prompt-go" id="boardReturnOkBtn">OK</button>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('#boardReturnOkBtn').addEventListener('click', () => {
    sfxClick();
    overlay.remove();
    resumeAdventureAfterActivity();
  });
}

function initArcadeGameState(gameId) {
  if (gameId === 'ttt') {
    state.arcade = {
      board: Array(9).fill(null),
      cellItems: assignFocusItems(9),
      playerTurn: true, winner: null, finished: false, winLine: null, endPopupReady: false,
    };
  } else if (gameId === 'c4') {
    state.arcade = {
      board: Array(6).fill(null).map(() => Array(7).fill(null)),
      cellItems: Array(6).fill(null).map(() => assignFocusItems(7)),
      playerTurn: true, winner: null, finished: false, winCells: null, lastMove: null, endPopupReady: false,
    };
  } else if (gameId === 'slime') {
    state.arcade = { finished: false, score: 0, allFound: false, endPopupReady: false };
  } else if (gameId === 'pong') {
    state.arcade = { finished: false, winner: null, endPopupReady: false };
  } else if (gameId === 'brickbreaker' || gameId === 'snake') {
    state.arcade = { finished: false, won: false, score: 0, endPopupReady: false };
  } else {
    state.arcade = null;
  }
  state.starcadeBonuses = {};
  state.arcadeGame = gameId;
  state._boardArcadeReturnPending = false;
}

window.launchArcadeFromBoard = (gameId) => {
  sfxClick();
  initArcadeGameState(gameId);
  state.arcadeFromBoard = true;
  state.view = 'arcade';
  render();
};

window.returnToBoardFromArcade = () => {
  const name = state.selectedStudent;
  const isTagMe = state.boardReturnView === 'tagme';
  if (!state.arcadeFromBoard || !state.arcade) {
    exitArcadeGame();
    return;
  }
  if (state.arcade.finished) {
    teardownArcadeBoardSession();
    showBoardReturnOkPrompt();
    return;
  }
  if (!name) {
    teardownArcadeBoardSession();
    state.arcade = null;
    state.arcadeGame = null;
    state.arcadeFromBoard = false;
    state.view = isTagMe ? 'tagme' : 'adventure';
    render();
    return;
  }
  showBoardPassQuitPrompt({
    isTagMe,
    onYes: () => abandonBoardArcadeAndEndTurn(name, isTagMe),
  });
};

function scheduleArcadeEndPopup() {
  const a = state.arcade;
  if (!a) return;
  a.endPopupReady = false;
  setTimeout(() => {
    if (!state.arcade || state.arcade !== a || !a.finished) return;
    a.endPopupReady = true;
    render();
    maybeShowBoardArcadeReturnPrompt();
  }, 3000);
}

function maybeShowBoardArcadeReturnPrompt() {
  if (!state.arcadeFromBoard || state._boardArcadeReturnPending) return;
  state._boardArcadeReturnPending = true;
  setTimeout(() => showBoardReturnOkPrompt(), 500);
}

function resetBoardToStart(name) {
  const bd = getBoardState(name);
  bd.position = 0;
  bd.passesUsed = 0;
  saveBoardState(name, bd);
}

function promptBoardCheckIn(name) {
  return new Promise(resolve => {
    const overlay = document.createElement('div');
    overlay.id = 'boardCheckInOverlay';
    overlay.className = 'profile-board-piece-overlay fadeIn';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Check in');
    overlay.innerHTML = `
      <div class="profile-board-piece-panel">
        <h2 class="arcade-title-friendly text-xl font-bold mb-1">Do you want to check in?</h2>
        <p class="text-sm text-white/70 mb-3">Try Self Check with your reading targets.</p>
        <div class="board-checkin-btns">
          <button type="button" class="board-checkin-btn board-checkin-btn--yes" id="boardCheckInYes">Yes please!</button>
          <button type="button" class="board-checkin-btn board-checkin-btn--no" id="boardCheckInNo">Not now</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('#boardCheckInYes').addEventListener('click', () => {
      sfxClick();
      overlay.remove();
      resetBoardToStart(name);
      startGame('flash', { fromBoard: true, fromCheckIn: true });
      resolve(true);
    });
    overlay.querySelector('#boardCheckInNo').addEventListener('click', () => {
      sfxClick();
      overlay.remove();
      resetBoardToStart(name);
      if (state.view === 'adventure') render();
      resolve(false);
    });
  });
}

async function celebrateBoardFinish(name) {
  const bonus = boardPassesExhausted(name, false) ? 0 : BOARD_FINISH_BONUS;
  if (bonus > 0) addPoints(name, bonus);
  resetBoardPasses(name, false);
  for (let i = 0; i < 6; i++) setTimeout(() => confetti(), i * 220);
  const overlay = document.createElement('div');
  overlay.className = 'board-finish-overlay fadeIn';
  const starsLine = bonus > 0
    ? `<p class="board-finish-sub">+${bonus} Starcade stars!</p>`
    : `<p class="board-finish-sub board-finish-sub--muted">You used all ${BOARD_MAX_PASSES} passes — no bonus stars this time.</p>`;
  overlay.innerHTML = `
    <div class="board-finish-panel">
      <div class="board-finish-emoji">👑🎉</div>
      <p class="board-finish-title">You reached the finish!</p>
      ${starsLine}
    </div>`;
  document.body.appendChild(overlay);
  await new Promise(r => setTimeout(r, 3200));
  overlay.remove();
  await promptBoardCheckIn(name);
}

function buildProfilePageData(name) {
  if (state.classKey && state.gamePlayed[name] === undefined) {
    try {
      const v = localStorage.getItem(gamePlayedKey(name));
      state.gamePlayed[name] = v ? JSON.parse(v) : {};
    } catch (e) { state.gamePlayed[name] = {}; }
  }
  const needs = getStudentNeeds(name);
  const points = getPoints(name);
  const hasGpcTargets = needs.targetGpcs.length > 0;
  const hasHwTargets = needs.targetHws.length > 0;
  const hasGpcPractice = hasGpcPracticePool(needs);
  const hasHwPractice = hasHwPracticePool(needs);
  const hasAnyTargets = hasGpcTargets || hasHwTargets;
  const hasAnyPractice = hasAnyPracticePool(needs);
  const playedMap = getGamePlayedMap(name);
  const flashPlayed = !!playedMap.flash;

  const gpcTargetsHtml = needs.targetGpcs.length
    ? `<div class="profile-target-columns">${buildProfileSortedTargets(needs.targetGpcs, 'gpc', 'gpc')}</div>`
    : `<div class="text-white/50 italic text-sm">Great work — no sounds to practise right now!</div>`;

  const hwTargetsHtml = needs.targetHws.length
    ? `<div class="profile-target-columns">${buildProfileSortedTargets(needs.targetHws, 'hw', 'hw')}</div>`
    : `<div class="text-white/50 italic text-sm">Great work — no words to practise right now!</div>`;

  const flashMap = state.flashResults[name] || {};
  const hasFlashMarks = Object.keys(flashMap).length > 0;

  const wallOfFameSeen = new Set();
  const wallOfFameItems = [];
  const pushWallOfFameItem = (value, type, item = null) => {
    const key = type === 'gpc' && item
      ? `gpc:${item.unitIdx}:${item.slotIdx}`
      : `${type}:${String(value).toLowerCase()}`;
    if (wallOfFameSeen.has(key)) return;
    wallOfFameSeen.add(key);
    wallOfFameItems.push({ value, type, item });
  };
  needs.masteredGpcs.forEach(x => pushWallOfFameItem(gpcPoolKey(x), 'gpc', x));
  needs.masteredHws.forEach(x => pushWallOfFameItem(x.hw, 'hw', x));
  const collectionHtml = wallOfFameItems.length
    ? wallOfFameItems.map(({ value, type, item }) => {
        if (type === 'gpc' && item) return profileGpcTargetChip(item);
        const kind = type;
        const hasAud = hasAudio(value, kind);
        const borderCls = flashBorderClass(value);
        const focusWord = value;
        const escFocus = focusWord.replace(/'/g, "\\'");
        const escAud = value.replace(/'/g, "\\'");
        return `<span class="inline-flex items-center gap-1 px-2 py-1 bg-yellow-400/20 border border-yellow-300/30 rounded-md text-sm ${borderCls}">
          <button type="button" class="profile-word-chip-btn text-sm" onclick="openWordFocus('${escFocus}','${kind}')" aria-label="Read ${focusWord}">${escapeHtmlText(value)}</button>
          ${hasAud ? `<button type="button" onclick="event.stopPropagation(); playSound('${escAud}','${kind}')" class="w-5 h-5 rounded-full bg-yellow-400/30 hover:bg-yellow-400/60 text-xs transition" title="Listen">🔊</button>` : ''}
        </span>`;
      }).join(' ')
    : `<div class="text-white/50 italic text-sm">Master sounds and words in games to fill your Wall of Fame!</div>`;

  return {
    name,
    needs,
    points,
    hasGpcTargets,
    hasHwTargets,
    hasGpcPractice,
    hasHwPractice,
    hasAnyTargets,
    hasAnyPractice,
    playedMap,
    flashPlayed,
    gpcTargetsHtml,
    hwTargetsHtml,
    hasFlashMarks,
    collectionHtml,
  };
}

function renderStudentSubpageTopbar(title, points) {
  return `
    <header class="student-subpage-topbar fadeIn">
      <button type="button" onclick="backToStudentMenu()" class="student-menu-back">← Menu</button>
      <h1 class="student-subpage-title">${title}</h1>
      <div class="student-menu-stars" aria-label="Stars earned">⭐ ${points}</div>
    </header>`;
}

function renderSignpostIcon(kind) {
  const s = 'currentColor';
  const w = 2;
  const icons = {
    sounds: `<span class="signpost-sign-icons" aria-hidden="true">
      <svg class="signpost-sign-icon" viewBox="0 0 24 24" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
      <svg class="signpost-sign-icon" viewBox="0 0 24 24" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 8.5a6.5 6.5 0 0 1 13 0c0 6-6 6-6 10a3.5 3.5 0 0 1-7 0"/>
        <path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 0 1 0 4"/>
      </svg>
    </span>`,
    fame: `<svg class="signpost-sign-icon" viewBox="0 0 24 24" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M7 9H5a2 2 0 0 0 0 4h2"/>
      <path d="M17 9h2a2 2 0 0 1 0 4h-2"/>
      <path d="M8 7h8"/>
      <path d="M8 7v2.5c0 2.8 1.8 5 4 5s4-2.2 4-5V7"/>
      <path d="M12 14.5v3"/>
      <path d="M8 18.5h8"/>
      <path d="M9 20.5h6"/>
    </svg>`,
    adventure: `<svg class="signpost-sign-icon" viewBox="0 0 24 24" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M3 9h18"/>
      <path d="M9 3v18"/>
      <circle cx="15" cy="15" r="1.5" fill="${s}" stroke="none"/>
      <circle cx="7" cy="7" r="1" fill="${s}" stroke="none"/>
    </svg>`,
    tagme: `<svg class="signpost-sign-icon signpost-sign-icon--filled" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
      <circle cx="14.2" cy="4.4" r="2.2"/>
      <path d="M11.2 8.2h3.6c.35 0 .65.22.78.55l.85 2.55c.12.36-.02.75-.35.95l-1.65 1.05 1.05 4.35c.12.48-.18.96-.66 1.08-.48.12-.96-.18-1.08-.66l-.95-4.05-2.15 3.65c-.25.42-.78.56-1.2.31l-1.25-.72c-.42-.24-.56-.77-.31-1.19l2.45-4.15-1.55-1.18c-.32-.24-.42-.68-.28-1.04l.48-1.42c.14-.42.54-.68.98-.68h.82l.22-.95c.12-.52.58-.88 1.12-.88z"/>
    </svg>`,
    check: `<svg class="signpost-sign-icon" viewBox="0 0 24 24" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="3"/>
      <path d="M8 18c0-2.2 1.8-4 4-4s4 1.8 4 4"/>
      <path d="M19 6a7 7 0 1 1-2.05 4.95"/>
      <polyline points="17 6 19 6 19 4"/>
    </svg>`,
    starcade: `<svg class="signpost-sign-icon" viewBox="0 0 24 24" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18.5 5.5 22 7 14.5 2 9.5 9 9"/>
    </svg>`,
    soundgames: `<svg class="signpost-sign-icon" viewBox="0 0 24 24" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="12" rx="3"/>
      <path d="M6 11h2v2H6z"/>
      <path d="M10 10h2v4h-2z"/>
      <path d="M14 9h2v6h-2z"/>
      <path d="M18 11h2v2h-2z"/>
      <path d="M8 7V5a4 4 0 0 1 8 0v2"/>
    </svg>`,
  };
  return icons[kind] || '';
}

function renderSignpostSign({ label, side, tone, slot, icon, onclick, disabled, ariaLabel, point = 'out' }) {
  const dis = disabled ? ' disabled' : '';
  const action = disabled ? '' : ` onclick="${onclick}"`;
  const iconHtml = renderSignpostIcon(icon);
  const content = side === 'left'
    ? `<span class="signpost-sign-text">${label}</span>${iconHtml}`
    : `${iconHtml}<span class="signpost-sign-text">${label}</span>`;
  const pointCls = point && point !== 'out' ? ` signpost-sign--point-${point}` : '';
  return `
    <button type="button" class="signpost-sign signpost-sign--${side} signpost-sign--${tone} signpost-sign--slot-${slot}${pointCls}"${action}${dis}
      aria-label="${ariaLabel || label}">
      <span class="signpost-sign-content">${content}</span>
      <span class="signpost-sign-nail" aria-hidden="true"></span>
    </button>`;
}

function renderProfile(app) {
  const { name, points, hasAnyPractice } = buildProfilePageData(state.selectedStudent);
  const displayName = name.replace(/^Student\s+/i, '');

  const leftSigns = [
    renderSignpostSign({
      label: 'Sounds and Words',
      side: 'left',
      tone: 'sounds',
      slot: 1,
      icon: 'sounds',
      point: 'arm',
      onclick: 'openSoundsWordsPage()',
      ariaLabel: 'Sounds and Words — my reading targets',
    }),
    renderSignpostSign({
      label: 'Play games',
      side: 'left',
      tone: 'soundgames',
      slot: 3,
      icon: 'soundgames',
      point: 'arm',
      onclick: 'openReadingGamesPage()',
      ariaLabel: 'Play games — sound and word reading games',
    }),
    renderSignpostSign({
      label: 'Adventure Board',
      side: 'left',
      tone: 'adventure',
      slot: 5,
      icon: 'adventure',
      point: 'arm',
      onclick: 'openAdventureMode()',
      disabled: !hasAnyPractice,
      ariaLabel: 'Adventure Board — roll the dice on the reading board',
    }),
    renderSignpostSign({
      label: 'Check yourself',
      side: 'left',
      tone: 'check',
      slot: 7,
      icon: 'check',
      point: 'arm',
      onclick: 'openSelfCheckFromMenu()',
      disabled: !hasAnyPractice,
      ariaLabel: 'Check yourself — self check with your reading targets',
    }),
  ].join('');

  const rightSigns = [
    renderSignpostSign({
      label: 'Wall of Fame',
      side: 'right',
      tone: 'fame',
      slot: 2,
      icon: 'fame',
      point: 'arm',
      onclick: 'openWallOfFamePage()',
      ariaLabel: 'Wall of Fame — mastered sounds and words',
    }),
    renderSignpostSign({
      label: 'Tag Me!',
      side: 'right',
      tone: 'tagme',
      slot: 6,
      icon: 'tagme',
      point: 'arm',
      onclick: 'openTagMeMode()',
      disabled: !hasAnyPractice,
      ariaLabel: 'Tag Me — race to the finish',
    }),
    renderSignpostSign({
      label: 'Starcade!',
      side: 'right',
      tone: 'starcade',
      slot: 8,
      icon: 'starcade',
      point: 'arm',
      onclick: 'openArcadeMenu()',
      ariaLabel: 'Starcade — spend stars on bonus games',
    }),
  ].join('');

  app.innerHTML = `
    <div class="student-menu-screen student-friendly fadeIn">
      <header class="student-menu-topbar">
        <div class="student-menu-topbar-left">
          <button type="button" onclick="logoutStudent()" class="student-menu-back">← Back to class</button>
          <h1 class="student-menu-name">${escapeHtmlText(displayName)}</h1>
        </div>
        <div class="student-menu-stars" aria-label="Stars earned">⭐ ${points}</div>
      </header>
      <main class="student-menu-main">
        <div class="student-menu-sky" aria-hidden="true">
          <span class="student-menu-cloud student-menu-cloud--1"></span>
          <span class="student-menu-cloud student-menu-cloud--2"></span>
          <span class="student-menu-cloud student-menu-cloud--3"></span>
          <span class="student-menu-cloud student-menu-cloud--4"></span>
        </div>
        <nav class="signpost" aria-label="Choose where to go">
          <div class="signpost-col signpost-col--left">${leftSigns}</div>
          <div class="signpost-pole-col" aria-hidden="true">
            <div class="signpost-pole-cap"></div>
            <div class="signpost-pole"></div>
          </div>
          <div class="signpost-col signpost-col--right">${rightSigns}</div>
        </nav>
      </main>
    </div>`;
}

function resolveProfileGameReturnView(g) {
  if (g?.fromTagMe) return 'tagme';
  if (g?.fromBoard) return 'adventure';
  return g?.readingReturnView || 'profileReadingGames';
}

function profileGameBackLabel(view) {
  if (view === 'tagme') return 'Back to Tag Me!';
  if (view === 'adventure') return 'Back to adventure';
  if (view === 'profileSoundsWords') return 'Back to Sounds and Words';
  return 'Back to reading games';
}

function getHtmlGameEmbedUrl(fileName) {
  const base = fileName.split('?')[0];
  const qs = fileName.includes('?') ? fileName.slice(fileName.indexOf('?')) : '?embed=1';
  const pathPart = (window.location.pathname || '').replace(/\\/g, '/');
  const href = (window.location.href || '').replace(/\\/g, '/');
  const inWebPilot = /\/web-pilot(?:\/|$)/.test(pathPart) || /\/web-pilot\//.test(href);
  const folder = inWebPilot ? '../HTML games/' : 'HTML games/';
  return encodeURI(folder + base) + qs;
}

function renderProfileSoundsWords(app) {
  const data = buildProfilePageData(state.selectedStudent);
  const {
    hasFlashMarks,
    points,
    gpcTargetsHtml,
    hwTargetsHtml,
  } = data;

  app.innerHTML = `
    <div class="student-subpage student-friendly">
      ${renderStudentSubpageTopbar('Sounds and Words', points)}
      <div class="student-subpage-body">
        <div class="profile-targets-details bg-gradient-to-br from-indigo-600/30 to-purple-700/30 backdrop-blur border border-indigo-300/40 rounded-2xl p-6 fadeIn mb-4">
          <div class="profile-heading-row mb-4">
            ${profileSectionIcon('targets')}<span class="text-xl font-bold">My Reading Targets</span>
          </div>
          <div class="profile-targets-body">
            ${hasFlashMarks ? `
              <div class="profile-flash-legend">
                <span class="inline-flex items-center gap-1"><span class="inline-block w-4 h-4 rounded ring-2 ring-green-400 bg-white/10"></span> I know it</span>
                <span class="inline-flex items-center gap-1"><span class="inline-block w-4 h-4 rounded ring-2 ring-orange-400 bg-white/10"></span> Still learning</span>
              </div>
            ` : ''}
            <div class="mb-5">
              <h3 class="font-semibold text-cyan-200 mb-2 profile-heading-row">${profileSectionIcon('sounds')}<span>Sounds</span></h3>
              ${gpcTargetsHtml}
            </div>
            <div>
              <h3 class="font-semibold text-pink-200 mb-2 profile-heading-row">${profileSectionIcon('words')}<span>Words</span></h3>
              ${hwTargetsHtml}
            </div>
          </div>
        </div>
      </div>
    </div>`;
  restoreProfileScrollIfNeeded();
}

function renderProfileReadingGames(app) {
  const name = state.selectedStudent;
  if (completeReadingTrackCycleIfReady(name)) {
    state.readingTrackBonusPopup = true;
  }
  const data = buildProfilePageData(name);
  const {
    hasGpcPractice,
    hasHwPractice,
    playedMap,
    points,
  } = data;

  const soundGames = [
    { id: 'gpcMatch', title: 'Splat the Sound', emoji: '🎯', desc: 'Tap the sound that matches.' },
    { id: 'gpcCatch', title: 'Sound Splat Challenge!', emoji: '⚡', desc: 'Catch the right sounds.' },
    { id: 'soundFlip', title: 'Sound Flip', emoji: '🔄', desc: 'Flip cards to find sounds.' },
    { id: 'soundBox', title: 'Sound Box', emoji: '📦', desc: 'Sort sounds into boxes.' },
  ];
  const wordGames = [
    { id: 'hwHunt', title: 'Splat the Word!', emoji: '🔍', desc: 'Find your tricky words.' },
    { id: 'hwBlank', title: 'Word Challenge!', emoji: '✏️', desc: 'Fill in the missing letters.' },
    { id: 'hwJumble', title: 'Word Jumble', emoji: '🔀', desc: 'Unjumble the word.' },
    { id: 'hwBoxes', title: 'Word Box', emoji: '📦', desc: 'Sort words into boxes.' },
  ];

  const gpcCards = soundGames.map(g => readingGameCabinetCard({
    ...g,
    track: 'gpc',
    disabled: !hasGpcPractice,
    played: !!playedMap[g.id],
  })).join('');

  const hwCards = wordGames.map(g => readingGameCabinetCard({
    ...g,
    track: 'heart',
    disabled: !hasHwPractice,
    played: !!playedMap[g.id],
  })).join('');

  app.innerHTML = `
    <div class="student-subpage student-friendly reading-games-page">
      ${renderStudentSubpageTopbar('Play games', points)}
      <div class="student-subpage-body">
        <p class="arcade-instructions text-center text-white/85 mb-6 max-w-xl mx-auto">Practise your reading targets with these games.</p>

        <section class="reading-games-section fadeIn" aria-label="Sound games">
          <h2 class="reading-games-section-title reading-games-section-title--gpc arcade-title-friendly">Sound games</h2>
          <div class="arcade-menu-grid reading-games-grid">${gpcCards}</div>
        </section>

        <section class="reading-games-section reading-games-section--heart fadeIn mt-8" aria-label="Word games">
          <h2 class="reading-games-section-title reading-games-section-title--heart arcade-title-friendly">Word games</h2>
          <div class="arcade-menu-grid reading-games-grid">${hwCards}</div>
        </section>
      </div>
    </div>`;
  bindProfileGameCards(app);
  restoreProfileScrollIfNeeded();
  if (state.readingTrackBonusPopup) {
    requestAnimationFrame(() => showReadingTrackBonusPopup());
  }
}

function renderProfileWallOfFame(app) {
  const { collectionHtml, points } = buildProfilePageData(state.selectedStudent);

  app.innerHTML = `
    <div class="student-subpage student-friendly">
      ${renderStudentSubpageTopbar('Wall of Fame', points)}
      <div class="student-subpage-body fadeIn">
        <div class="bg-white/10 backdrop-blur border border-yellow-300/30 rounded-2xl p-6 md:p-8">
          <div class="profile-heading-row mb-4">
            ${profileSectionIcon('collection')}<span class="text-xl font-bold">Your mastered sounds and words</span>
          </div>
          <div class="flex flex-wrap gap-2">${collectionHtml}</div>
        </div>
      </div>
    </div>`;
}

function restoreProfileScrollIfNeeded() {
  if (state.profileRestoreScrollY == null) return;
  if (state.view !== 'profileSoundsWords' && state.view !== 'profileReadingGames') return;
  const y = state.profileRestoreScrollY;
  state.profileRestoreScrollY = null;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.scrollTo(0, y);
    });
  });
}

function bindProfileGameCards(app) {
  app.querySelectorAll('[data-start-game]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.disabled) return;
      const id = btn.getAttribute('data-start-game');
      if (!id) return;
      e.preventDefault();
      startGame(id);
    });
  });
}

function renderAdventureMode(app) {
  const name = state.selectedStudent;
  const needs = getStudentNeeds(name);
  const hasAnyPractice = hasAnyPracticePool(needs);
  const bd = getBoardState(name);
  const layout = computeBoardLayout(BOARD_SPACE_COUNT, BOARD_COLS, {
    bridgeWidthScale: 0.72,
    bridgeOverlap: 0.42,
  });
  const { positions, connectors } = layout;
  const pathD = buildBoardPathRows(positions);
  const pickPhase = getBoardPiecePickPhase(bd);
  const pieceSelected = pickPhase == null;
  const tokenPos1 = positions[bd.position] || positions[0];
  const tokenPos2 = positions[bd.position2] || positions[0];
  const piece1 = bd.pieceIndex != null ? BOARD_PIECES[bd.pieceIndex] : null;
  const piece2 = bd.pieceIndex2 != null ? BOARD_PIECES[bd.pieceIndex2] : null;
  const activePlayer = bd.activePlayer || 1;
  const spacesHtml = buildBoardSpacesHtml(name, bd, positions, pieceSelected);
  const connectorsHtml = buildBoardConnectorsHtml(connectors);
  const manualListHtml = bd.playedGames.length
    ? bd.playedGames.map(id => {
        const st = BOARD_GAME_STYLE[id];
        return `<li><button type="button" onclick="launchManualBoardGame('${id}')"><span class="profile-board-legend-swatch inline-block align-middle mr-1" style="background:${st?.bg || '#64748b'}"></span>${GAME_BOARD_TITLES[id] || id}</button></li>`;
      }).join('')
    : `<li class="profile-board-manual-empty">Roll the dice and play games to unlock replay here.</li>`;

  const p2Pieces = pickPhase === 'p2'
    ? BOARD_PIECES.map((p, i) => i !== bd.pieceIndex
      ? `<button type="button" class="profile-board-piece-btn" style="background:${p.bg}" data-board-piece2="${i}" aria-label="Player 2 piece ${i + 1}">${p.emoji}</button>`
      : '').join('')
    : BOARD_PIECES.map((p, i) => `<button type="button" class="profile-board-piece-btn" style="background:${p.bg}" data-board-piece="${i}" aria-label="Piece ${i + 1}">${p.emoji}</button>`).join('');

  const pieceOverlay = pickPhase ? `
    <div class="profile-board-piece-overlay fadeIn" role="dialog" aria-modal="true" aria-label="Choose game pieces">
      <div class="profile-board-piece-panel">
        <h2 class="text-xl font-bold mb-1">${pickPhase === 'p2' ? 'Player 2: pick a token!' : 'Player 1: pick your token!'}</h2>
        <p class="text-sm text-white/70 mb-2">${pickPhase === 'p2' ? 'Choose a different piece for your parent or sibling.' : bd.twoPlayerMode ? 'You go first. Stars you earn count toward Starcade.' : 'Choose one token to play on the board.'}</p>
        <div class="profile-board-piece-grid">${p2Pieces}</div>
      </div>
    </div>` : '';

  const turnBadge = bd.twoPlayerMode && pieceSelected ? `
    <div class="profile-board-turn-badge" aria-live="polite">
      <span class="profile-board-turn-dot" style="background:${activePlayer === 1 ? piece1?.bg : piece2?.bg}"></span>
      <span>${activePlayer === 1 ? 'Player 1' : 'Player 2'}&rsquo;s turn</span>
    </div>` : '';

  const diceDisabled = !pieceSelected || state.boardRolling || !hasAnyPractice || bd.awaitingTurnComplete;

  app.innerHTML = `
    <div class="profile-fs student-friendly fadeIn">
      <header class="profile-fs-topbar">
        <button type="button" class="profile-fs-back" onclick="backToProfileFromAdventure()">← Menu</button>
        <div class="profile-fs-greeting">Adventure Mode</div>
        <div class="profile-fs-stars" aria-label="Stars">⭐ ${getPoints(name)}</div>
      </header>
      <div class="profile-fs-body">
        <div class="profile-fs-board-area">
          <div class="profile-board-arena profile-board-arena--path" aria-label="Reading adventure board">
            <div class="profile-board-surface">
              <div class="profile-board-surface-vignette" aria-hidden="true"></div>
              <svg class="profile-board-path-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <path class="profile-board-path--shadow" d="${pathD}"/>
                <path class="profile-board-path--glow" d="${pathD}"/>
                <path class="profile-board-path--trail" d="${pathD}"/>
              </svg>
              ${connectorsHtml}
              ${spacesHtml}
              ${piece1 ? `<div id="boardToken1" class="profile-board-token${bd.twoPlayerMode && activePlayer !== 1 ? ' profile-board-token--inactive' : ''}" style="left:${tokenPos1.x}%;top:${tokenPos1.y}%;background:${piece1.bg}">${piece1.emoji}</div>` : ''}
              ${piece2 ? `<div id="boardToken2" class="profile-board-token profile-board-token--p2${bd.twoPlayerMode && activePlayer !== 2 ? ' profile-board-token--inactive' : ''}" style="left:${tokenPos2.x}%;top:${tokenPos2.y}%;background:${piece2.bg}">${piece2.emoji}</div>` : ''}
            </div>
          </div>
        </div>
        <aside class="profile-fs-panel profile-fs-panel--adventure" aria-label="Game controls">
          <div class="profile-fs-panel-section">
            <div class="profile-fs-panel-label">Players</div>
            <div class="profile-board-player-toggle" role="group" aria-label="Number of players">
              <button type="button" class="profile-board-player-toggle-btn${!bd.twoPlayerMode ? ' profile-board-player-toggle-btn--active' : ''}" onclick="setBoardPlayerMode(false)" aria-pressed="${!bd.twoPlayerMode}">1 player</button>
              <button type="button" class="profile-board-player-toggle-btn${bd.twoPlayerMode ? ' profile-board-player-toggle-btn--active' : ''}" onclick="setBoardPlayerMode(true)" aria-pressed="${bd.twoPlayerMode}">2 players</button>
            </div>
          </div>
          <div class="profile-fs-panel-section">
            <div class="profile-fs-panel-label">Roll</div>
            ${turnBadge}
            <button type="button" id="boardDiceBtn" class="profile-board-dice" onclick="rollBoardDice()" ${diceDisabled ? 'disabled' : ''} aria-label="Roll dice">
              ${buildBoardDiceCubeHtml(bd.lastDiceRoll || 1)}
              <span>Roll dice</span>
            </button>
            <p id="boardMsg" class="profile-board-msg" role="status"></p>
          </div>
          <button type="button" class="profile-fs-panel-btn${bd.manualMode ? ' profile-fs-panel-btn--active' : ''}" onclick="toggleBoardManualMode()" aria-pressed="${bd.manualMode}">
            <span class="profile-board-side-icon">📋</span>
            <span>Manual mode</span>
          </button>
          ${bd.manualMode ? `
          <div class="profile-fs-panel-section">
            <div class="profile-fs-panel-label">Played games</div>
            <ul class="profile-board-manual-list">${manualListHtml}</ul>
          </div>` : ''}
          <button type="button" class="profile-board-restart-btn" onclick="restartAdventureBoard()">
            <span class="profile-board-side-icon">↻</span>
            <span>Restart board</span>
          </button>
        </aside>
      </div>
      ${pieceOverlay}
    </div>`;

  if (pickPhase === 'p1') {
    document.querySelectorAll('[data-board-piece]').forEach(el => {
      el.addEventListener('click', () => selectBoardPiece(parseInt(el.dataset.boardPiece, 10)));
    });
  } else if (pickPhase === 'p2') {
    document.querySelectorAll('[data-board-piece2]').forEach(el => {
      el.addEventListener('click', () => selectBoardPiece2(parseInt(el.dataset.boardPiece2, 10)));
    });
  }
}

window.setProfileTab = (tab) => {
  sfxClick();
  if (tab === 'board') openAdventureMode();
};

window.selectBoardPiece = (index) => {
  sfxClick();
  const name = state.selectedStudent;
  const bd = getBoardState(name);
  bd.pieceIndex = index;
  if (!bd.twoPlayerMode) bd.pieceIndex2 = null;
  saveBoardState(name, bd);
  render();
};

window.selectBoardPiece2 = (index) => {
  sfxClick();
  const name = state.selectedStudent;
  const bd = getBoardState(name);
  if (index === bd.pieceIndex) return;
  bd.pieceIndex2 = index;
  bd.activePlayer = 1;
  saveBoardState(name, bd);
  render();
};

window.setBoardPlayerMode = (twoPlayer) => {
  sfxClick();
  const name = state.selectedStudent;
  const bd = getBoardState(name);
  const mode = !!twoPlayer;
  if (bd.twoPlayerMode === mode && bd.pieceIndex != null && (!mode || bd.pieceIndex2 != null)) return;
  bd.twoPlayerMode = mode;
  bd.pieceIndex = null;
  bd.pieceIndex2 = null;
  bd.position = 0;
  bd.position2 = 0;
  bd.activePlayer = 1;
  saveBoardState(name, bd);
  render();
};

window.restartAdventureBoard = () => {
  sfxClick();
  const name = state.selectedStudent;
  const bd = getBoardState(name);
  bd.pieceIndex = null;
  bd.pieceIndex2 = null;
  bd.position = 0;
  bd.position2 = 0;
  bd.activePlayer = 1;
  bd.playedGames = [];
  bd.manualMode = false;
  bd.twoPlayerMode = false;
  bd.lastDiceRoll = null;
  bd.awaitingTurnComplete = false;
  resetBoardTileShuffle(bd);
  saveBoardState(name, bd);
  clearBoardOverlays();
  state.boardRolling = false;
  render();
};

window.toggleBoardManualMode = () => {
  sfxClick();
  const name = state.selectedStudent;
  const bd = getBoardState(name);
  bd.manualMode = !bd.manualMode;
  saveBoardState(name, bd);
  render();
};

window.launchManualBoardGame = (gameId) => {
  sfxClick();
  if (!isBoardGameAvailable(state.selectedStudent, gameId)) {
    alert('This game is not available with your current reading targets.');
    return;
  }
  startGame(gameId, { fromBoard: true, manual: true });
};

window.rollBoardDice = async () => {
  const name = state.selectedStudent;
  const bd = getBoardState(name);
  if (bd.pieceIndex == null || state.boardRolling) return;
  if (bd.twoPlayerMode && bd.pieceIndex2 == null) return;
  if (!hasAnyPracticePool(getStudentNeeds(name))) return;

  const player = bd.twoPlayerMode ? (bd.activePlayer || 1) : 1;
  const posKey = player === 2 ? 'position2' : 'position';
  const currentPos = bd[posKey];

  if (currentPos >= BOARD_FINISH_INDEX) {
    bd[posKey] = 0;
    saveBoardState(name, bd);
    render();
    return;
  }

  state.boardRolling = true;
  sfxClick();
  const roll = 1 + Math.floor(Math.random() * 6);
  const diceBtn = document.getElementById('boardDiceBtn');
  const boardMsg = document.getElementById('boardMsg');
  if (boardMsg) { boardMsg.textContent = ''; boardMsg.classList.remove('visible'); }
  if (diceBtn) diceBtn.disabled = true;
  setBoardDiceFace('rolling');

  for (let i = 0; i < 14; i++) {
    flickBoardDiceFace();
    await new Promise(r => setTimeout(r, 55 + i * 6));
  }
  setBoardDiceFace(roll);
  bd.lastDiceRoll = roll;

  const positions = getBoardSpacePositions();
  const tokenId = player === 2 ? 'boardToken2' : 'boardToken1';
  const token = document.getElementById(tokenId);
  const endPos = Math.min(currentPos + roll, BOARD_FINISH_INDEX);
  const steps = endPos - currentPos;

  for (let step = 1; step <= steps; step++) {
    const posIdx = currentPos + step;
    const pos = positions[posIdx];
    if (token && pos) {
      token.classList.remove('profile-board-token--hop');
      void token.offsetWidth;
      token.classList.add('profile-board-token--hop');
      token.style.left = pos.x + '%';
      token.style.top = pos.y + '%';
    }
    await new Promise(r => setTimeout(r, 280));
  }

  bd[posKey] = endPos;
  if (bd.twoPlayerMode) bd.activePlayer = player === 1 ? 2 : 1;
  saveBoardState(name, bd);
  state.boardRolling = false;

  await handleBoardLanding(name, bd, endPos, player, diceBtn);
};

async function handleBoardLanding(name, bd, endPos, player, diceBtn) {
  if (endPos >= BOARD_FINISH_INDEX) {
    if (player === 1) {
      await celebrateBoardFinish(name);
    } else {
      const overlay = document.createElement('div');
      overlay.className = 'board-finish-overlay fadeIn';
      overlay.style.pointerEvents = 'auto';
      overlay.innerHTML = `
        <div class="board-finish-panel">
          <div class="board-finish-emoji">🎉</div>
          <p class="board-finish-title">Player 2 reached the finish!</p>
          <p class="board-finish-sub">Great teamwork — playing for fun!</p>
        </div>`;
      document.body.appendChild(overlay);
      await new Promise(r => setTimeout(r, 2200));
      overlay.remove();
      bd.position2 = 0;
      saveBoardState(name, bd);
      if (state.view === 'adventure') render();
    }
    if (diceBtn) diceBtn.disabled = false;
    return;
  }

  const bonusId = getBoardBonusArcadeId(endPos, bd);
  if (bonusId) {
    showBoardBonusPrompt(bonusId, endPos, player);
    return;
  }

  const gameId = getBoardSpaceGameId(endPos, bd);
  if (gameId && isBoardGameAvailable(name, gameId)) {
    showBoardGamePrompt(gameId, endPos, player);
    return;
  }

  const boardMsg = document.getElementById('boardMsg');
  if (boardMsg && gameId) {
    boardMsg.textContent = `${GAME_BOARD_TITLES[gameId]} needs more targets. Roll again!`;
    boardMsg.classList.add('visible');
  }
  if (diceBtn) diceBtn.disabled = false;
}

// ============================================================
// TAG ME! MODE
// ============================================================
function tagMeGameKey(name) { return `ratag_${state.classKey}_${name}`; }

function getTagMeState(name) {
  if (!state.tagMeGame[name]) {
    try {
      const v = localStorage.getItem(tagMeGameKey(name));
      state.tagMeGame[name] = v ? JSON.parse(v) : null;
    } catch (e) { state.tagMeGame[name] = null; }
  }
  if (!state.tagMeGame[name]) {
    state.tagMeGame[name] = {
      pieceIndex: null,
      chaserIndex: null,
      position: 0,
      chaserPosition: 0,
      userTurnCount: 0,
      chaseActive: false,
      playedGames: [],
      manualMode: false,
      lastDiceRoll: null,
      lastChaserRoll: null,
      awaitingTurnComplete: false,
      chaseIntroShown: false,
      passesUsed: 0,
      chaserTurnActive: false,
    };
  }
  const td = state.tagMeGame[name];
  if (!Array.isArray(td.playedGames)) td.playedGames = [];
  if (typeof td.chaserPosition !== 'number') td.chaserPosition = 0;
  if (typeof td.userTurnCount !== 'number') td.userTurnCount = 0;
  if (td.chaseIntroShown == null) td.chaseIntroShown = false;
  if (typeof td.passesUsed !== 'number') td.passesUsed = 0;
  if (td.chaserTurnActive == null) td.chaserTurnActive = false;
  ensureBoardTileShuffle(td);
  if (td.position > BOARD_FINISH_INDEX) td.position = 0;
  return td;
}

function saveTagMeState(name, td) {
  state.tagMeGame[name] = td;
  try { localStorage.setItem(tagMeGameKey(name), JSON.stringify(td)); } catch (e) {}
}

function markTagMeGamePlayed(name, gameId) {
  const td = getTagMeState(name);
  if (!td.playedGames.includes(gameId)) {
    td.playedGames.push(gameId);
    saveTagMeState(name, td);
  }
}

function getTagMePickPhase(td) {
  if (td.pieceIndex == null) return 'piece';
  if (td.chaserIndex == null) return 'chaser';
  return null;
}

function cancelTagMePendingTurn(name) {
  const td = getTagMeState(name);
  if (td.awaitingTurnComplete) {
    td.awaitingTurnComplete = false;
    saveTagMeState(name, td);
  }
}

function updateTagMePositionHud(playerPos, chaserPos) {
  const p = document.getElementById('tagMeHudPlayerPos');
  const c = document.getElementById('tagMeHudChaserPos');
  if (p) p.textContent = String(playerPos + 1);
  if (c) c.textContent = String(chaserPos + 1);
}

function updateTagMeTokenBadges(playerPos, chaserPos) {
  const pt = document.getElementById('tagMePlayerBadge');
  const ct = document.getElementById('tagMeChaserBadge');
  if (pt) pt.textContent = String(playerPos + 1);
  if (ct) ct.textContent = String(chaserPos + 1);
}

function updateTagMeGapHud(playerPos, chaserPos) {
  const gap = document.getElementById('tagMeHudGap');
  if (gap) gap.textContent = String(Math.max(0, playerPos - chaserPos));
}

function scrollTagMeBoardToSquare(index) {
  const el = document.querySelector(`[data-tag-square="${index}"]`);
  const viewport = document.getElementById('tagMeBoardViewport');
  if (!el || !viewport) return;
  const elRect = el.getBoundingClientRect();
  const vpRect = viewport.getBoundingClientRect();
  const targetLeft = viewport.scrollLeft + (elRect.left + elRect.width / 2) - (vpRect.left + vpRect.width / 2);
  const targetTop = viewport.scrollTop + (elRect.top + elRect.height / 2) - (vpRect.top + vpRect.height / 2);
  viewport.scrollTo({
    left: Math.max(0, targetLeft),
    top: Math.max(0, targetTop),
    behavior: 'smooth',
  });
}

function isTagMeLandscapeMode() {
  return window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)').matches;
}

function getTagMeBoardCols() {
  return isTagMeLandscapeMode() ? TAG_ME_BOARD_COLS_LANDSCAPE : TAG_ME_BOARD_COLS_PORTRAIT;
}

function getTagMeBoardAspect() {
  const layout = getTagMeBoardLayout();
  return layout.bounds?.aspect || (isTagMeLandscapeMode() ? 1.65 : 0.72);
}

function fitTagMeBoardToViewport() {
  const viewport = document.getElementById('tagMeBoardViewport');
  const arena = document.getElementById('tagMeBoardArena');
  if (!viewport || !arena) return;
  const layout = getTagMeBoardLayout();
  const aspect = layout.bounds?.aspect || getTagMeBoardAspect();
  const pad = 12;
  const availW = viewport.clientWidth - pad;
  const availH = viewport.clientHeight - pad;
  let boardW = availW;
  let boardH = boardW / aspect;
  if (boardH > availH) {
    boardH = availH;
    boardW = boardH * aspect;
  }
  const minW = isTagMeLandscapeMode() ? 560 : 300;
  boardW = Math.max(minW, Math.floor(boardW));
  boardH = Math.floor(boardW / aspect);
  arena.style.width = `${boardW}px`;
  arena.style.height = `${boardH}px`;
}

function buildTagMeSceneryHtml(chaser) {
  const huntEmoji = chaser?.emoji || '🐾';
  return `
    <div class="tagme-scenery" aria-hidden="true">
      <div class="tagme-scenery-cloud tagme-scenery-cloud--1">☁️</div>
      <div class="tagme-scenery-cloud tagme-scenery-cloud--2">☁️</div>
      <div class="tagme-scenery-sun">🌤️</div>
      <div class="tagme-scenery-tree tagme-scenery-tree--1">🌳</div>
      <div class="tagme-scenery-tree tagme-scenery-tree--2">🌲</div>
      <div class="tagme-scenery-tree tagme-scenery-tree--3">🌴</div>
      <div class="tagme-scenery-bush tagme-scenery-bush--1">🌿</div>
      <div class="tagme-scenery-bush tagme-scenery-bush--2">🍃</div>
      <div class="tagme-scenery-rock">🪨</div>
      <div class="tagme-scenery-flower tagme-scenery-flower--1">🌸</div>
      <div class="tagme-scenery-flower tagme-scenery-flower--2">🌺</div>
      <div class="tagme-scenery-mushroom">🍄</div>
      <div class="tagme-scenery-footprints">👣 👣 👣</div>
      <div class="tagme-scenery-hunt">${huntEmoji}</div>
      <div class="tagme-scenery-banner tagme-scenery-banner--start">START</div>
      <div class="tagme-scenery-banner tagme-scenery-banner--finish">FINISH 🏁</div>
    </div>`;
}

function buildTagMePassesHudHtml(td) {
  const used = td.passesUsed || 0;
  const remaining = Math.max(0, BOARD_MAX_PASSES - used);
  const tickets = Array.from({ length: BOARD_MAX_PASSES }, (_, i) => {
    const spent = i < used;
    return `<span class="tagme-pass-ticket${spent ? ' tagme-pass-ticket--spent' : ''}" aria-hidden="true">
      <span class="tagme-pass-ticket-notch tagme-pass-ticket-notch--left"></span>
      <span class="tagme-pass-ticket-body">🎟️</span>
      <span class="tagme-pass-ticket-notch tagme-pass-ticket-notch--right"></span>
    </span>`;
  }).join('');
  return `
    <div class="tagme-passes-hud" aria-label="${remaining} of ${BOARD_MAX_PASSES} passes left">
      <span class="tagme-passes-label">Passes</span>
      <div class="tagme-passes-tickets">${tickets}</div>
    </div>`;
}

function buildTagMePositionHudHtml(td, piece, chaser) {
  return `
    <div class="tagme-top-hud">
      <div class="tagme-pos-hud" aria-live="polite">
        <div class="tagme-pos-card tagme-pos-card--you">
          <span class="tagme-pos-card-emoji" style="background:${piece?.bg || '#2dd4bf'}">${piece?.emoji || '🏃'}</span>
          <div class="tagme-pos-card-text">
            <span class="tagme-pos-card-label">You</span>
            <span class="tagme-pos-card-num" id="tagMeHudPlayerPos">${td.position + 1}</span>
          </div>
        </div>
        <div class="tagme-pos-card tagme-pos-card--gap" aria-hidden="true">
          <span class="tagme-pos-gap-label">gap</span>
          <span class="tagme-pos-gap-num" id="tagMeHudGap">${Math.max(0, td.position - td.chaserPosition)}</span>
        </div>
        <div class="tagme-pos-card tagme-pos-card--chaser">
          <span class="tagme-pos-card-emoji" style="background:${chaser?.bg || '#f43f5e'}">${chaser?.emoji || '👣'}</span>
          <div class="tagme-pos-card-text">
            <span class="tagme-pos-card-label">${chaser?.name || 'Chaser'}</span>
            <span class="tagme-pos-card-num" id="tagMeHudChaserPos">${td.chaserPosition + 1}</span>
          </div>
        </div>
      </div>
      <div class="tagme-top-hud-divider" aria-hidden="true"></div>
      ${buildTagMePassesHudHtml(td)}
    </div>`;
}

function clearTagMeOverlays() {
  removeBoardGamePrompt();
  removeBoardPassQuitOverlay();
  document.getElementById('tagMeChaseOverlay')?.remove();
  document.getElementById('tagMeGameOverOverlay')?.remove();
}

window.backToProfileFromTagMe = () => {
  sfxClick();
  clearTagMeOverlays();
  state.view = 'profile';
  state.boardRolling = false;
  render();
};

function buildTagMeDiceCubeHtml(face = 1, cubeId = 'tagMeDiceCube') {
  const pip = (n) => Array.from({ length: n }, () => '<span class="pip"></span>').join('');
  const sides = [
    [1, pip(1)], [2, pip(2)], [3, pip(3)], [4, pip(4)], [5, pip(5)], [6, pip(6)],
  ].map(([n, pips]) =>
    `<div class="profile-board-dice-side profile-board-dice-side--${n}">${pips}</div>`
  ).join('');
  return `<div class="profile-board-dice-scene"><div class="profile-board-dice-cube" id="${cubeId}" data-face="${face}">${sides}</div></div>`;
}

function setTagMeDiceFace(value, cubeId = 'tagMeDiceCube') {
  const cube = document.getElementById(cubeId);
  if (!cube) return;
  if (value === 'rolling') {
    cube.classList.add('profile-board-dice-cube--rolling');
    return;
  }
  cube.classList.remove('profile-board-dice-cube--rolling');
  const n = Math.max(1, Math.min(6, parseInt(value, 10) || 1));
  cube.setAttribute('data-face', String(n));
}

function flickTagMeDiceFace(cubeId = 'tagMeDiceCube') {
  const cube = document.getElementById(cubeId);
  if (cube) cube.setAttribute('data-face', String(1 + Math.floor(Math.random() * 6)));
}

function getTagMeModifier(index) {
  if (index <= 0 || index >= BOARD_FINISH_INDEX || isBoardBonusSquare(index)) return 0;
  if (TAG_MODIFIER_BACK2.has(index)) return -2;
  if (TAG_MODIFIER_BACK1.has(index)) return -1;
  if (TAG_MODIFIER_FWD2.has(index)) return 2;
  if (TAG_MODIFIER_FWD1.has(index)) return 1;
  return 0;
}

function tagMeClearPathGlow(posIdx) {
  if (posIdx == null || posIdx < 0) return;
  const sq = document.querySelector(`[data-tag-square="${posIdx}"]`);
  if (!sq) return;
  sq.classList.remove('tagme-board-space--path-glow');
  const tile = sq.querySelector('.tagme-board-space-tile');
  tile?.style.removeProperty('--path-glow-ring');
  tile?.style.removeProperty('--path-glow-shadow');
}

function tagMeSetPathGlow(posIdx, colorIndex) {
  const sq = document.querySelector(`[data-tag-square="${posIdx}"]`);
  if (!sq) return;
  const tile = sq.querySelector('.tagme-board-space-tile');
  const colors = TAG_ME_PATH_GLOW_COLORS[colorIndex % TAG_ME_PATH_GLOW_COLORS.length];
  if (tile && colors) {
    tile.style.setProperty('--path-glow-ring', colors[0]);
    tile.style.setProperty('--path-glow-shadow', colors[1]);
  }
  sq.classList.add('tagme-board-space--path-glow');
}

function formatTagMeTileLabel(index, mod) {
  const num = index + 1;
  if (!mod) {
    return { html: escapeHtmlText(String(num)), modBadge: '' };
  }
  const modText = mod > 0 ? `+${mod}` : String(mod);
  const modCls = mod > 0 ? 'tagme-board-space-mod-outside--plus' : 'tagme-board-space-mod-outside--minus';
  return {
    html: escapeHtmlText(String(num)),
    modBadge: `<span class="tagme-board-space-mod-outside ${modCls}">${escapeHtmlText(modText)}</span>`,
  };
}

async function animateTagMeTokenMove(tokenId, fromPos, toPos, onStep) {
  if (fromPos === toPos) return;
  const positions = getTagMeBoardLayout().positions;
  const token = document.getElementById(tokenId);
  const stepDir = toPos > fromPos ? 1 : -1;
  const steps = Math.abs(toPos - fromPos);
  let lastGlow = fromPos;
  for (let step = 1; step <= steps; step++) {
    const posIdx = fromPos + step * stepDir;
    const pos = positions[posIdx];
    tagMeClearPathGlow(lastGlow);
    if (token && pos) {
      token.classList.remove('tagme-board-token--hop');
      void token.offsetWidth;
      token.classList.add('tagme-board-token--hop');
      token.style.left = pos.x + '%';
      token.style.top = pos.y + '%';
    }
    tagMeSetPathGlow(posIdx, step - 1);
    lastGlow = posIdx;
    if (onStep) onStep(posIdx);
    scrollTagMeBoardToSquare(posIdx);
    await new Promise(r => setTimeout(r, 340));
  }
  tagMeClearPathGlow(lastGlow);
}

async function applyTagMeModifierIfAny(name, td, who, landingPos) {
  const mod = getTagMeModifier(landingPos);
  if (!mod) return landingPos;

  const isPlayer = who === 'player';
  const posKey = isPlayer ? 'position' : 'chaserPosition';
  const tokenId = isPlayer ? 'tagPlayerToken' : 'tagChaserToken';
  const newPos = Math.max(0, Math.min(BOARD_FINISH_INDEX, landingPos + mod));
  if (newPos === landingPos) return landingPos;

  const chaser = TAG_CHASERS[td.chaserIndex];
  const whoLabel = isPlayer ? 'You' : (chaser?.name || 'Chaser');
  const msgEl = document.getElementById('tagMeMsg');
  const sq = document.querySelector(`[data-tag-square="${landingPos}"]`);
  if (sq) {
    sq.classList.add(mod > 0 ? 'tagme-board-space--modifier-boost' : 'tagme-board-space--modifier-slip');
  }
  if (msgEl) {
    msgEl.textContent = mod > 0
      ? `${whoLabel} hit a boost! +${mod} square${mod === 1 ? '' : 's'}`
      : `${whoLabel} hit a slip! ${mod} square${mod === -1 ? '' : 's'}`;
    msgEl.classList.add('visible');
  }
  await new Promise(r => setTimeout(r, 450));

  await animateTagMeTokenMove(tokenId, landingPos, newPos, (posIdx) => {
    if (isPlayer) {
      updateTagMePositionHud(posIdx, td.chaserPosition);
      updateTagMeTokenBadges(posIdx, td.chaserPosition);
      updateTagMeGapHud(posIdx, td.chaserPosition);
    } else {
      updateTagMePositionHud(td.position, posIdx);
      updateTagMeTokenBadges(td.position, posIdx);
      updateTagMeGapHud(td.position, posIdx);
    }
  });

  if (sq) sq.classList.remove('tagme-board-space--modifier-boost', 'tagme-board-space--modifier-slip');
  td[posKey] = newPos;
  saveTagMeState(name, td);
  return newPos;
}

function buildTagMeSpacesHtml(name, td, positions, pieceSelected) {
  return positions.map((pos, i) => {
    const bonusId = getBoardBonusArcadeId(i, td);
    const gameId = getBoardSpaceGameId(i, td);
    const disabled = gameId && !isBoardGameAvailable(name, gameId);
    const played = gameId && td.playedGames.includes(gameId);
    const currentPlayer = pieceSelected && td.position === i;
    const currentChaser = pieceSelected && td.chaseActive && td.chaserPosition === i;
    const mod = getTagMeModifier(i);
    const label = formatTagMeTileLabel(i, mod);
    let style = TAG_ME_NEUTRAL_TILE;
    let title = `Square ${i + 1}`;
    if (mod) {
      style = TAG_MODIFIER_STYLE[String(mod)];
      title = `Square ${i + 1}, ${mod > 0 ? `+${mod}` : mod}`;
    }
    let cls = 'tagme-board-space';
    if (mod) cls += mod > 0 ? ' tagme-board-space--boost' : ' tagme-board-space--slip';
    if (disabled) cls += ' tagme-board-space--disabled';
    if (played) cls += ' tagme-board-space--played';
    if (currentPlayer) cls += ' tagme-board-space--current';
    if (currentChaser) cls += ' tagme-board-space--chaser-here';
    return `<div class="${cls}" data-tag-square="${i}"
      style="left:${pos.x}%;top:${pos.y}%;width:${pos.w}%;height:${pos.h}%;--tile-bg:${style.bg};--tile-fg:${style.text};--tile-border:${style.border};"
      title="${title}" aria-label="${title}">
      <div class="tagme-board-space-spotlight" aria-hidden="true"></div>
      <div class="tagme-board-space-tile">
        <span class="tagme-board-space-label">${label.html}</span>
      </div>
      ${label.modBadge}
    </div>`;
  }).join('');
}

function buildTagMeLegendHtml() {
  const rows = BOARD_GAME_SEQUENCE.map(id => {
    const st = BOARD_GAME_STYLE[id];
    return `<div class="tagme-board-legend-row">
      <span class="tagme-board-legend-swatch" style="background:${st.bg};border-color:${st.border};"></span>
      <span class="tagme-board-legend-name">${GAME_BOARD_TITLES[id]}</span>
    </div>`;
  }).join('');
  return `<div class="tagme-board-legend">
    <div class="tagme-board-legend-row">
      <span class="tagme-board-legend-swatch" style="background:${BOARD_START_STYLE.bg};border-color:${BOARD_START_STYLE.border};"></span>
      <span class="tagme-board-legend-name">Start 🚩</span>
    </div>
    ${rows}
    <div class="tagme-board-legend-row">
      <span class="tagme-board-legend-swatch" style="background:${BOARD_BONUS_STYLE.bg};border-color:${BOARD_BONUS_STYLE.border};"></span>
      <span class="tagme-board-legend-name">Starcade bonus 🎮</span>
    </div>
    <div class="tagme-board-legend-row">
      <span class="tagme-board-legend-swatch" style="background:${BOARD_FINISH_STYLE.bg};border-color:${BOARD_FINISH_STYLE.border};"></span>
      <span class="tagme-board-legend-name">Finish 🏁</span>
    </div>
  </div>`;
}

function showTagMeGamePrompt(gameId, squareIndex) {
  removeBoardGamePrompt();
  const st = BOARD_GAME_STYLE[gameId] || { bg: '#64748b', text: '#fff', border: '#cbd5e1' };
  const title = GAME_BOARD_TITLES[gameId] || gameId;
  const overlay = document.createElement('div');
  overlay.id = 'boardGamePromptOverlay';
  overlay.className = 'profile-board-piece-overlay fadeIn';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', title);
  overlay.innerHTML = `
    <div class="board-game-prompt-panel">
      <div class="board-game-prompt-card tagme-game-prompt-card" style="background:${st.bg};color:${st.text};border-color:${st.border}">
        <h2 class="board-game-prompt-title">${escapeHtmlText(title)}</h2>
      </div>
      <p class="board-game-prompt-hint">Press Go when ready!</p>
      <button type="button" class="board-game-prompt-go tagme-game-prompt-go" id="boardGamePromptGo">Go!</button>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('#boardGamePromptGo').addEventListener('click', () => {
    sfxClick();
    removeBoardGamePrompt();
    const diceBtn = document.getElementById('tagMeDiceBtn');
    if (diceBtn) diceBtn.disabled = true;
    const name = state.selectedStudent;
    const td = getTagMeState(name);
    td.awaitingTurnComplete = true;
    saveTagMeState(name, td);
    startGame(gameId, { fromBoard: true, fromTagMe: true, boardSquare: squareIndex, boardPlayer: 1 });
  });
}

function showTagMeBonusPrompt(arcadeId, squareIndex) {
  removeBoardGamePrompt();
  const title = BOARD_BONUS_GAME_TITLES[arcadeId] || 'Starcade game';
  const st = BOARD_BONUS_STYLE;
  const overlay = document.createElement('div');
  overlay.id = 'boardGamePromptOverlay';
  overlay.className = 'profile-board-piece-overlay fadeIn';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', title);
  overlay.innerHTML = `
    <div class="board-game-prompt-panel">
      <div class="board-game-prompt-card tagme-game-prompt-card" style="background:${st.bg};color:${st.text};border-color:${st.border}">
        <h2 class="board-game-prompt-title">🎮 ${escapeHtmlText(title)}</h2>
        <p class="text-sm mt-1 opacity-90">Free Starcade bonus!</p>
      </div>
      <p class="board-game-prompt-hint">Press Go when ready!</p>
      <button type="button" class="board-game-prompt-go tagme-game-prompt-go" id="boardBonusPromptGo">Go!</button>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('#boardBonusPromptGo').addEventListener('click', () => {
    sfxClick();
    removeBoardGamePrompt();
    const name = state.selectedStudent;
    const td = getTagMeState(name);
    td.awaitingTurnComplete = true;
    saveTagMeState(name, td);
    launchArcadeFromBoard(arcadeId);
  });
}

function showTagMeReturnOkPrompt() {
  document.getElementById('boardReturnOkOverlay')?.remove();
  state.arcadeFromBoard = false;
  state.arcadeGame = null;
  state.view = 'tagme';
  const overlay = document.createElement('div');
  overlay.id = 'boardReturnOkOverlay';
  overlay.className = 'profile-board-piece-overlay fadeIn';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML = `
    <div class="profile-board-piece-panel tagme-piece-panel">
      <div class="game-end-board-celebrate mb-2" aria-hidden="true">🎉✨🌟</div>
      <h2 class="arcade-title-friendly text-xl font-bold mb-1">Great game!</h2>
      <p class="text-sm text-white/85 mb-3 arcade-instructions">Good try! Practice makes progress!</p>
      <p class="board-game-prompt-hint mb-4">Press OK to return to the track</p>
      <button type="button" class="board-game-prompt-go tagme-game-prompt-go" id="boardReturnOkBtn">OK</button>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('#boardReturnOkBtn').addEventListener('click', () => {
    sfxClick();
    overlay.remove();
    resumeTagMeAfterActivity();
  });
}

window.resumeTagMeAfterActivity = async () => {
  const name = state.selectedStudent;
  const td = getTagMeState(name);
  if (!td.awaitingTurnComplete) {
    if (state.view === 'tagme') render();
    return;
  }
  td.awaitingTurnComplete = false;
  saveTagMeState(name, td);
  if (state.view !== 'tagme') {
    state.view = 'tagme';
    render();
  }
  await completeTagMeUserTurn(name, td);
};

async function celebrateTagMeFinish(name) {
  const bonus = boardPassesExhausted(name, true) ? 0 : TAG_FINISH_BONUS;
  if (bonus > 0) addPoints(name, bonus);
  resetBoardPasses(name, true);
  for (let i = 0; i < 12; i++) setTimeout(() => confetti(), i * 160);
  const overlay = document.createElement('div');
  overlay.className = 'tagme-finish-overlay fadeIn';
  const starsLine = bonus > 0
    ? `<p class="tagme-finish-stars">+${bonus} Starcade stars!</p>`
    : `<p class="tagme-finish-stars tagme-finish-stars--muted">You used all ${BOARD_MAX_PASSES} passes — no bonus stars this time.</p>`;
  overlay.innerHTML = `
    <div class="tagme-finish-panel">
      <div class="tagme-finish-sparkles" aria-hidden="true">✨🎊✨</div>
      <div class="tagme-finish-emoji tagme-finish-emoji--bounce">🏆🎉</div>
      <p class="tagme-finish-title">You escaped!</p>
      <p class="tagme-finish-sub">You reached the finish without being caught!</p>
      ${starsLine}
    </div>`;
  document.body.appendChild(overlay);
  await new Promise(r => setTimeout(r, 4200));
  overlay.remove();
  const td = getTagMeState(name);
  td.position = 0;
  td.chaserPosition = 0;
  td.userTurnCount = 0;
  td.chaseActive = false;
  td.chaseIntroShown = false;
  td.lastDiceRoll = null;
  td.lastChaserRoll = null;
  saveTagMeState(name, td);
  if (state.view === 'tagme') render();
}

async function showTagMeHeadStartPopup(chaser) {
  const overlay = document.createElement('div');
  overlay.id = 'tagMeHeadStartOverlay';
  overlay.className = 'tagme-chase-banner-overlay fadeIn';
  overlay.innerHTML = `
    <div class="tagme-chase-banner tagme-chase-banner--headstart">
      <span class="tagme-chase-banner-emoji tagme-chase-banner-emoji--wiggle">${chaser.emoji}</span>
      <p class="tagme-chase-banner-name">${escapeHtmlText(chaser.name)}</p>
      <p class="tagme-chase-banner-text">You get a head start, but I will get you!</p>
    </div>`;
  document.body.appendChild(overlay);
  await new Promise(r => setTimeout(r, 2800));
  overlay.remove();
}

async function showTagMeCatchFlash(squareIndex) {
  const sq = document.querySelector(`[data-tag-square="${squareIndex}"]`);
  if (!sq) {
    await new Promise(r => setTimeout(r, 700));
    return;
  }
  sq.classList.add('tagme-board-space--caught-burst');
  const burst = document.createElement('div');
  burst.className = 'tagme-catch-explosion';
  burst.setAttribute('aria-hidden', 'true');
  burst.innerHTML = '<span class="tagme-catch-explosion-ring"></span><span class="tagme-catch-explosion-icon">💥</span>';
  sq.appendChild(burst);
  const chaserToken = document.getElementById('tagChaserToken');
  if (chaserToken) chaserToken.classList.add('tagme-board-token--caught');
  await new Promise(r => setTimeout(r, 950));
  burst.remove();
  sq.classList.remove('tagme-board-space--caught-burst');
  if (chaserToken) chaserToken.classList.remove('tagme-board-token--caught');
}

async function showTagMeCaught(name, chaser) {
  const catchLine = chaser.catchLine || 'Got you!';
  const overlay = document.createElement('div');
  overlay.id = 'tagMeChaseOverlay';
  overlay.className = 'tagme-chase-banner-overlay fadeIn';
  overlay.innerHTML = `
    <div class="tagme-chase-banner tagme-chase-banner--caught">
      <span class="tagme-chase-banner-emoji">${chaser.emoji}</span>
      <p class="tagme-chase-banner-text">${escapeHtmlText(catchLine)}</p>
    </div>`;
  document.body.appendChild(overlay);
  await new Promise(r => setTimeout(r, 2200));
  overlay.remove();

  const gameOver = document.createElement('div');
  gameOver.id = 'tagMeGameOverOverlay';
  gameOver.className = 'tagme-gameover-overlay fadeIn';
  gameOver.setAttribute('role', 'dialog');
  gameOver.setAttribute('aria-modal', 'true');
  gameOver.innerHTML = `
    <div class="tagme-gameover-panel">
      <div class="tagme-gameover-chaser" style="background:${chaser.bg}">${chaser.emoji}</div>
      <p class="tagme-gameover-title">The ${escapeHtmlText(chaser.name)} caught you!</p>
      <p class="tagme-gameover-sub">${escapeHtmlText(catchLine)}</p>
      <div class="tagme-gameover-btns">
        <button type="button" class="tagme-gameover-btn tagme-gameover-btn--retry" id="tagMeRetryBtn">Try again</button>
        <button type="button" class="tagme-gameover-btn tagme-gameover-btn--quit" id="tagMeQuitBtn">My page</button>
      </div>
    </div>`;
  document.body.appendChild(gameOver);
  await new Promise(resolve => {
    gameOver.querySelector('#tagMeRetryBtn').addEventListener('click', () => {
      sfxClick();
      gameOver.remove();
      restartTagMeBoard();
      resolve();
    });
    gameOver.querySelector('#tagMeQuitBtn').addEventListener('click', () => {
      sfxClick();
      gameOver.remove();
      backToProfileFromTagMe();
      resolve();
    });
  });
}

async function runTagMeChasePhase(name, td) {
  const chaser = TAG_CHASERS[td.chaserIndex];
  if (!chaser) return false;

  td.chaserTurnActive = true;
  saveTagMeState(name, td);
  if (state.view === 'tagme') render();

  try {
  if (!td.chaseIntroShown) {
    const banner = document.createElement('div');
    banner.id = 'tagMeChaseOverlay';
    banner.className = 'tagme-chase-banner-overlay fadeIn';
    banner.innerHTML = `
      <div class="tagme-chase-banner">
        <span class="tagme-chase-banner-emoji tagme-chase-banner-emoji--wiggle">${chaser.emoji}</span>
        <p class="tagme-chase-banner-text">Ready or not, here I come!</p>
      </div>`;
    document.body.appendChild(banner);
    await new Promise(r => setTimeout(r, 2400));
    banner.remove();
    td.chaseIntroShown = true;
    saveTagMeState(name, td);
  }

  await new Promise(r => setTimeout(r, 1000));

  const msgEl = document.getElementById('tagMeMsg');
  const chaserDiceWrap = document.getElementById('tagMeChaserDiceWrap');
  if (chaserDiceWrap) chaserDiceWrap.classList.add('tagme-chaser-dice-wrap--active');

  setTagMeDiceFace('rolling', 'tagMeChaserDiceCube');
  for (let i = 0; i < 14; i++) {
    flickTagMeDiceFace('tagMeChaserDiceCube');
    await new Promise(r => setTimeout(r, 55 + i * 6));
  }
  const roll = 1 + Math.floor(Math.random() * 6);
  setTagMeDiceFace(roll, 'tagMeChaserDiceCube');
  td.lastChaserRoll = roll;
  saveTagMeState(name, td);
  if (chaserDiceWrap) chaserDiceWrap.classList.remove('tagme-chaser-dice-wrap--active');

  if (msgEl) {
    msgEl.textContent = `${chaser.name} rolls ${roll}!`;
    msgEl.classList.add('visible');
  }
  await new Promise(r => setTimeout(r, 700));

  const currentChaserPos = td.chaserPosition;
  const playerPos = td.position;
  let endPos = Math.min(currentChaserPos + roll, BOARD_FINISH_INDEX, playerPos);

  await animateTagMeTokenMove('tagChaserToken', currentChaserPos, endPos, (posIdx) => {
    updateTagMePositionHud(playerPos, posIdx);
    updateTagMeTokenBadges(playerPos, posIdx);
    updateTagMeGapHud(playerPos, posIdx);
  });

  td.chaserPosition = endPos;
  saveTagMeState(name, td);
  updateTagMePositionHud(playerPos, endPos);
  updateTagMeTokenBadges(playerPos, endPos);
  updateTagMeGapHud(playerPos, endPos);

  let caught = endPos >= playerPos;

  if (!caught) {
    endPos = await applyTagMeModifierIfAny(name, td, 'chaser', endPos);
    td.chaserPosition = endPos;
    saveTagMeState(name, td);
    updateTagMePositionHud(playerPos, endPos);
    updateTagMeTokenBadges(playerPos, endPos);
    updateTagMeGapHud(playerPos, endPos);
    if (endPos >= playerPos) {
      td.chaserPosition = playerPos;
      saveTagMeState(name, td);
      caught = true;
    }
  }

  if (caught) {
    td.chaserPosition = playerPos;
    saveTagMeState(name, td);
    if (msgEl) { msgEl.textContent = ''; msgEl.classList.remove('visible'); }
    await showTagMeCatchFlash(playerPos);
    await showTagMeCaught(name, chaser);
    return true;
  }

  if (msgEl) {
    msgEl.textContent = `${chaser.name} is on square ${endPos + 1}. Keep going!`;
    msgEl.classList.add('visible');
  }
  return false;
  } finally {
    td.chaserTurnActive = false;
    saveTagMeState(name, td);
  }
}

async function completeTagMeUserTurn(name, td) {
  td.userTurnCount += 1;
  if (td.userTurnCount >= TAG_FREE_ROLLS) td.chaseActive = true;
  saveTagMeState(name, td);

  if (td.chaseActive) {
    if (state.view === 'tagme') {
      render();
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    }
    const caught = await runTagMeChasePhase(name, td);
    if (caught) return;
  }

  const diceBtn = document.getElementById('tagMeDiceBtn');
  if (diceBtn) diceBtn.disabled = false;
  if (state.view === 'tagme') render();
}

async function handleTagMeLanding(name, td, endPos, diceBtn) {
  if (endPos >= BOARD_FINISH_INDEX) {
    await celebrateTagMeFinish(name);
    if (diceBtn) diceBtn.disabled = false;
    return;
  }

  const bonusId = getBoardBonusArcadeId(endPos, td);
  if (bonusId) {
    showTagMeBonusPrompt(bonusId, endPos);
    return;
  }

  const gameId = getBoardSpaceGameId(endPos, td);
  if (gameId && isBoardGameAvailable(name, gameId)) {
    showTagMeGamePrompt(gameId, endPos);
    return;
  }

  const msgEl = document.getElementById('tagMeMsg');
  if (msgEl && gameId) {
    msgEl.textContent = `${GAME_BOARD_TITLES[gameId]} needs more targets. Roll again!`;
    msgEl.classList.add('visible');
  }
  await completeTagMeUserTurn(name, td);
}

function renderTagMeMode(app) {
  const name = state.selectedStudent;
  const needs = getStudentNeeds(name);
  const hasAnyPractice = hasAnyPracticePool(needs);
  const td = getTagMeState(name);
  const layout = computeTagMeBoardLayout();
  const boardCols = layout.cols;
  const { positions, connectors } = layout;
  const pathD = buildTagMeSnakePath(positions);
  const pickPhase = getTagMePickPhase(td);
  const pieceSelected = pickPhase == null;
  const tokenPos = positions[td.position] || positions[0];
  const chaserPos = positions[td.chaserPosition] || positions[0];
  const piece = td.pieceIndex != null ? BOARD_PIECES[td.pieceIndex] : null;
  const chaser = td.chaserIndex != null ? TAG_CHASERS[td.chaserIndex] : null;
  const spacesHtml = buildTagMeSpacesHtml(name, td, positions, pieceSelected);
  const connectorsHtml = buildBoardConnectorsHtml(connectors).replace(/profile-board-connector/g, 'tagme-board-connector');
  const manualListHtml = td.playedGames.length
    ? td.playedGames.map(id => {
        const st = BOARD_GAME_STYLE[id];
        return `<li><button type="button" onclick="launchManualTagMeGame('${id}')"><span class="tagme-board-legend-swatch inline-block align-middle mr-1" style="background:${st?.bg || '#64748b'}"></span>${GAME_BOARD_TITLES[id] || id}</button></li>`;
      }).join('')
    : `<li class="tagme-board-manual-empty">Roll the dice and play games to unlock replay here.</li>`;

  const rollsLeft = Math.max(0, TAG_FREE_ROLLS - td.userTurnCount);
  const chaseStatus = !td.chaseActive
    ? (rollsLeft > 0 ? `<span class="tagme-chase-status tagme-chase-status--safe">🛡️ ${rollsLeft} safe roll${rollsLeft === 1 ? '' : 's'} left</span>` : '')
    : `<span class="tagme-chase-status tagme-chase-status--active">⚡ ${chaser?.emoji || ''} ${chaser?.name || 'Chaser'} is chasing!</span>`;

  let pieceOverlay = '';
  if (pickPhase === 'piece') {
    const pieceBtns = BOARD_PIECES.map((p, i) =>
      `<button type="button" class="tagme-board-piece-btn" style="background:${p.bg}" data-tag-piece="${i}" aria-label="Piece ${i + 1}">${p.emoji}</button>`
    ).join('');
    pieceOverlay = `
      <div class="profile-board-piece-overlay fadeIn" role="dialog" aria-modal="true" aria-label="Choose your token">
        <div class="profile-board-piece-panel tagme-piece-panel">
          <h2 class="text-xl font-bold mb-1">Pick your runner!</h2>
          <p class="text-sm text-white/70 mb-2">Choose a token to race along the track.</p>
          <div class="tagme-board-piece-grid">${pieceBtns}</div>
        </div>
      </div>`;
  } else if (pickPhase === 'chaser') {
    const chaserBtns = TAG_CHASERS.map((c, i) =>
      `<button type="button" class="tagme-chaser-btn" style="background:${c.bg}" data-tag-chaser="${i}" aria-label="${c.name}">${c.emoji}<span>${c.name}</span></button>`
    ).join('');
    pieceOverlay = `
      <div class="profile-board-piece-overlay fadeIn" role="dialog" aria-modal="true" aria-label="Choose your chaser">
        <div class="profile-board-piece-panel tagme-piece-panel">
          <h2 class="text-xl font-bold mb-1">Who is chasing you?</h2>
          <p class="text-sm text-white/70 mb-2">Pick the chaser — they will hunt you after your first ${TAG_FREE_ROLLS} rolls!</p>
          <div class="tagme-chaser-grid">${chaserBtns}</div>
        </div>
      </div>`;
  }

  const diceDisabled = !pieceSelected || state.boardRolling || !hasAnyPractice || td.awaitingTurnComplete || td.chaserTurnActive;
  const sceneryHtml = buildTagMeSceneryHtml(chaser);
  const posHudHtml = pieceSelected ? buildTagMePositionHudHtml(td, piece, chaser) : '';
  const layoutModeClass = isTagMeLandscapeMode() ? ' tagme-landscape' : ' tagme-portrait';

  app.innerHTML = `
    <div class="profile-fs profile-fs--tagme student-friendly fadeIn${layoutModeClass}">
      <header class="profile-fs-topbar tagme-topbar">
        <button type="button" class="profile-fs-back tagme-back" onclick="backToProfileFromTagMe()">← Menu</button>
        <div class="profile-fs-greeting tagme-greeting">🏃 Tag me!</div>
        <div class="profile-fs-stars tagme-stars" aria-label="Stars">⭐ ${getPoints(name)}</div>
      </header>
      <div class="profile-fs-body tagme-body">
        <div class="profile-fs-board-area tagme-board-area">
          ${posHudHtml}
          <div id="tagMeBoardViewport" class="tagme-board-viewport">
            <div id="tagMeBoardArena" class="tagme-board-arena" aria-label="Tag me chase track">
              <div class="tagme-board-frame">
                ${sceneryHtml}
                <div class="tagme-board-surface">
                  <div class="tagme-board-surface-vignette" aria-hidden="true"></div>
                  <svg class="tagme-board-path-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    <path class="tagme-board-path--shadow" d="${pathD}"/>
                    <path class="tagme-board-path--glow" d="${pathD}"/>
                    <path class="tagme-board-path--trail" d="${pathD}"/>
                  </svg>
                  ${connectorsHtml}
                  ${spacesHtml}
                  ${piece ? `<div id="tagPlayerToken" class="tagme-board-token tagme-board-token--player" style="left:${tokenPos.x}%;top:${tokenPos.y}%;background:${piece.bg}">${piece.emoji}<span class="tagme-token-badge" id="tagMePlayerBadge">${td.position + 1}</span></div>` : ''}
                  ${chaser && pieceSelected ? `<div id="tagChaserToken" class="tagme-board-token tagme-board-token--chaser${td.chaseActive ? ' tagme-board-token--chaser-active' : ''}" style="left:${chaserPos.x}%;top:${chaserPos.y}%;background:${chaser.bg}">${chaser.emoji}<span class="tagme-token-badge tagme-token-badge--chaser" id="tagMeChaserBadge">${td.chaserPosition + 1}</span></div>` : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside class="profile-fs-panel tagme-panel" aria-label="Game controls">
          <div class="tagme-panel-row">
            <div class="profile-fs-panel-section tagme-panel-section tagme-panel-section--chaser">
              <div class="profile-fs-panel-label">Chaser</div>
              ${chaser ? `<div class="tagme-chaser-card" style="border-color:${chaser.bg}">
                <span class="tagme-chaser-card-emoji" style="background:${chaser.bg}">${chaser.emoji}</span>
                <span class="tagme-chaser-card-name">${chaser.name}</span>
              </div>` : '<p class="tagme-chaser-pick-hint">Pick a chaser to start</p>'}
              ${chaseStatus}
              ${chaser ? `
              <div id="tagMeChaserDiceWrap" class="tagme-chaser-dice-wrap${td.chaseActive ? '' : ' tagme-chaser-dice-wrap--hidden'}" aria-label="${chaser.name} dice">
                <span class="tagme-chaser-dice-label">${chaser.emoji} Roll</span>
                ${buildTagMeDiceCubeHtml(td.lastChaserRoll || 1, 'tagMeChaserDiceCube')}
              </div>` : ''}
            </div>
            <div class="profile-fs-panel-section tagme-panel-section tagme-panel-section--roll">
              <div class="profile-fs-panel-label">Roll</div>
              <button type="button" id="tagMeDiceBtn" class="tagme-board-dice" onclick="rollTagMeDice()" ${diceDisabled ? 'disabled' : ''} aria-label="Roll dice">
                ${buildTagMeDiceCubeHtml(td.lastDiceRoll || 1)}
                <span>Roll dice</span>
              </button>
              <p id="tagMeMsg" class="tagme-board-msg" role="status"></p>
            </div>
            <div class="tagme-panel-actions">
              <button type="button" class="profile-fs-panel-btn tagme-panel-btn${td.manualMode ? ' profile-fs-panel-btn--active' : ''}" onclick="toggleTagMeManualMode()" aria-pressed="${td.manualMode}">
                <span class="profile-board-side-icon">📋</span>
                <span>Manual</span>
              </button>
              <button type="button" class="tagme-board-restart-btn" onclick="restartTagMeBoard()">
                <span class="profile-board-side-icon">↻</span>
                <span>Restart</span>
              </button>
            </div>
          </div>
          ${td.manualMode ? `
          <div class="profile-fs-panel-section tagme-panel-section tagme-panel-section--manual">
            <div class="profile-fs-panel-label">Played games</div>
            <ul class="tagme-board-manual-list">${manualListHtml}</ul>
          </div>` : ''}
        </aside>
      </div>
      ${pieceOverlay}
    </div>`;

  if (pickPhase === 'piece') {
    document.querySelectorAll('[data-tag-piece]').forEach(el => {
      el.addEventListener('click', () => selectTagMePiece(parseInt(el.dataset.tagPiece, 10)));
    });
  } else if (pickPhase === 'chaser') {
    document.querySelectorAll('[data-tag-chaser]').forEach(el => {
      el.addEventListener('click', () => selectTagMeChaser(parseInt(el.dataset.tagChaser, 10)));
    });
  }

  if (pieceSelected) {
    if (state._tagMeResizeHandler) window.removeEventListener('resize', state._tagMeResizeHandler);
    state._tagMeResizeHandler = () => {
      if (state.view !== 'tagme') return;
      const cols = getTagMeBoardCols();
      if (cols !== state._tagMeLastCols) {
        state._tagMeLastCols = cols;
        render();
        return;
      }
      const root = document.querySelector('.profile-fs--tagme');
      if (root) {
        root.classList.toggle('tagme-landscape', isTagMeLandscapeMode());
        root.classList.toggle('tagme-portrait', !isTagMeLandscapeMode());
      }
      fitTagMeBoardToViewport();
    };
    state._tagMeLastCols = boardCols;
    window.addEventListener('resize', state._tagMeResizeHandler);
    requestAnimationFrame(() => {
      fitTagMeBoardToViewport();
      scrollTagMeBoardToSquare(td.position);
    });
  }
}

window.selectTagMePiece = (index) => {
  sfxClick();
  const name = state.selectedStudent;
  const td = getTagMeState(name);
  td.pieceIndex = index;
  saveTagMeState(name, td);
  render();
};

window.selectTagMeChaser = async (index) => {
  sfxClick();
  const name = state.selectedStudent;
  const td = getTagMeState(name);
  td.chaserIndex = index;
  td.chaserPosition = 0;
  saveTagMeState(name, td);
  render();
  const chaser = TAG_CHASERS[index];
  if (chaser) await showTagMeHeadStartPopup(chaser);
};

window.restartTagMeBoard = () => {
  sfxClick();
  const name = state.selectedStudent;
  const td = getTagMeState(name);
  td.pieceIndex = null;
  td.chaserIndex = null;
  td.position = 0;
  td.chaserPosition = 0;
  td.userTurnCount = 0;
  td.chaseActive = false;
  td.playedGames = [];
  td.manualMode = false;
  td.lastDiceRoll = null;
  td.lastChaserRoll = null;
  td.awaitingTurnComplete = false;
  td.chaseIntroShown = false;
  td.chaserTurnActive = false;
  td.passesUsed = 0;
  resetBoardTileShuffle(td);
  saveTagMeState(name, td);
  clearTagMeOverlays();
  state.boardRolling = false;
  render();
};

window.toggleTagMeManualMode = () => {
  sfxClick();
  const name = state.selectedStudent;
  const td = getTagMeState(name);
  td.manualMode = !td.manualMode;
  saveTagMeState(name, td);
  render();
};

window.launchManualTagMeGame = (gameId) => {
  sfxClick();
  if (!isBoardGameAvailable(state.selectedStudent, gameId)) {
    alert('This game is not available with your current reading targets.');
    return;
  }
  startGame(gameId, { fromBoard: true, fromTagMe: true, manual: true });
};

window.rollTagMeDice = async () => {
  const name = state.selectedStudent;
  const td = getTagMeState(name);
  if (td.pieceIndex == null || td.chaserIndex == null || state.boardRolling || td.chaserTurnActive) return;
  if (!hasAnyPracticePool(getStudentNeeds(name))) return;

  const currentPos = td.position;
  if (currentPos >= BOARD_FINISH_INDEX) {
    td.position = 0;
    saveTagMeState(name, td);
    render();
    return;
  }

  state.boardRolling = true;
  sfxClick();
  const roll = 1 + Math.floor(Math.random() * 6);
  const diceBtn = document.getElementById('tagMeDiceBtn');
  const msgEl = document.getElementById('tagMeMsg');
  if (msgEl) { msgEl.textContent = ''; msgEl.classList.remove('visible'); }
  if (diceBtn) diceBtn.disabled = true;
  setTagMeDiceFace('rolling');

  for (let i = 0; i < 14; i++) {
    flickTagMeDiceFace();
    await new Promise(r => setTimeout(r, 55 + i * 6));
  }
  setTagMeDiceFace(roll);
  td.lastDiceRoll = roll;
  saveTagMeState(name, td);

  let endPos = Math.min(currentPos + roll, BOARD_FINISH_INDEX);

  await animateTagMeTokenMove('tagPlayerToken', currentPos, endPos, (posIdx) => {
    updateTagMePositionHud(posIdx, td.chaserPosition);
    updateTagMeTokenBadges(posIdx, td.chaserPosition);
    updateTagMeGapHud(posIdx, td.chaserPosition);
  });

  td.position = endPos;
  saveTagMeState(name, td);
  updateTagMePositionHud(endPos, td.chaserPosition);
  updateTagMeTokenBadges(endPos, td.chaserPosition);
  updateTagMeGapHud(endPos, td.chaserPosition);

  endPos = await applyTagMeModifierIfAny(name, td, 'player', endPos);
  td.position = endPos;
  saveTagMeState(name, td);

  if (endPos >= BOARD_FINISH_INDEX) {
    await celebrateTagMeFinish(name);
    if (diceBtn) diceBtn.disabled = false;
    state.boardRolling = false;
    return;
  }

  await handleTagMeLanding(name, td, endPos, diceBtn);
  state.boardRolling = false;
};

window.logoutStudent = () => {
  state.view = 'dashboard';
  render();
};

function escapeHtmlText(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getProfileWordExampleHtml(word) {
  const { lines } = collectHwBlankSentenceLines(word);
  const key = getHwSentenceKey(word);
  let s = lines[0] || '';
  if (!s) return '';
  let html = escapeHtmlText(s);
  html = html.replace(/\*\*([^*]+)\*\*/g, (_, w) => `<span class="word-focus-em">${escapeHtmlText(w)}</span>`);
  html = html.replace(/____/g, `<span class="word-focus-em">${escapeHtmlText(key)}</span>`);
  return html;
}

window.openWordFocus = (word, kind) => {
  sfxClick();
  const w = String(word ?? '').trim();
  if (!w) return;
  if (state.view === 'profileSoundsWords' || state.view === 'profileReadingGames' || state.view === 'profileWallOfFame') {
    state.profileRestoreScrollY = window.scrollY || document.documentElement.scrollTop || 0;
    state.wordFocusReturnView = state.view;
  }
  state.wordFocus = { word: w, kind: kind || 'hw' };
  state.view = 'wordFocus';
  render();
};

window.closeWordFocus = () => {
  state.view = state.wordFocusReturnView || 'profileSoundsWords';
  state.wordFocus = null;
  state.wordFocusReturnView = null;
  render();
};

function renderWordFocus(app) {
  const wf = state.wordFocus;
  const word = String(wf?.word ?? '').trim();
  if (!word) {
    state.view = state.wordFocusReturnView || 'profileSoundsWords';
    state.wordFocusReturnView = null;
    if (state.view === 'profileSoundsWords') return renderProfileSoundsWords(app);
    if (state.view === 'profileReadingGames') return renderProfileReadingGames(app);
    if (state.view === 'profileWallOfFame') return renderProfileWallOfFame(app);
    return renderProfile(app);
  }
  const sentenceHtml = getProfileWordExampleHtml(word);
  app.innerHTML = `
    <div class="word-focus-screen">
      <div class="word-focus-inner">
        <button type="button" class="word-focus-back" onclick="closeWordFocus()">← Back</button>
        <h1 class="word-focus-word">${escapeHtmlText(word)}</h1>
        ${sentenceHtml
          ? `<p class="word-focus-sentence">${sentenceHtml}</p>`
          : `<p class="word-focus-lead">Read the word aloud.</p>`}
      </div>
    </div>`;
}

window.openArcadeMenu = () => {
  state.arcadeGame = 'menu';
  state.view = 'arcade';
  render();
};

// ============================================================
// READING GAMES
// ============================================================
window.startGame = (g, boardOpts) => {
  sfxClick();
  const opts = boardOpts && typeof boardOpts === 'object' ? boardOpts : {};
  if (g === 'flash') {
    const needs = getStudentNeeds(state.selectedStudent);
    const gpcPool = getFlashPoolForKind(needs, 'gpc');
    const hwPool = getFlashPoolForKind(needs, 'hw');
    if (gpcPool.length === 0 && hwPool.length === 0) {
      state.game = { type: 'flash', empty: true, pointsAwarded: false, trackMarked: false, fromBoard: !!opts.fromBoard };
      state.view = 'game';
      render();
      return;
    }
    state.flashHub = { needs, gpcCount: gpcPool.length, hwCount: hwPool.length, fromBoard: !!opts.fromBoard };
    state.view = 'flashKind';
    render();
    return;
  }
  state.game = { type: g, score: 0, attempts: 0, correct: 0, history: [], roundIdx: 0, totalRounds: CHALLENGE_ROUNDS, roundHadError: false, pointsAwarded: false, trackMarked: false, fromBoard: !!opts.fromBoard, fromTagMe: !!opts.fromTagMe, boardManual: !!opts.manual, boardSquare: opts.boardSquare ?? null, boardPlayer: opts.boardPlayer || 1, readingReturnView: opts.readingReturnView || (!opts.fromBoard && !opts.fromTagMe ? (state.view === 'profileSoundsWords' ? 'profileSoundsWords' : 'profileReadingGames') : null) };
  state.view = 'game';
  initGame();
  render();
};

window.pickFlashKind = (kind) => {
  sfxClick();
  const hub = state.flashHub;
  if (!hub) return;
  const pool = getFlashPoolForKind(hub.needs, kind);
  if (pool.length === 0) return;
  hub.kind = kind;
  hub.sets = splitIntoStaticFlashSets(pool);
  state.view = 'flashSets';
  render();
};

window.beginFlashSet = (setIndex) => {
  sfxClick();
  const hub = state.flashHub;
  if (!hub || !hub.sets || !hub.sets[setIndex]) return;
  const cards = orderFlashSetForPlay(hub.sets[setIndex]);
  state.game = {
    type: 'flash',
    score: 0,
    attempts: 0,
    correct: 0,
    history: [],
    cardIdx: 0,
    cards,
    totalRounds: cards.length,
    flashSetRef: { kind: hub.kind, setIndex },
    flashFlipped: false,
    pointsAwarded: false,
    trackMarked: false,
    fromBoard: !!hub.fromBoard,
    startedAt: Date.now(),
  };
  state.view = 'game';
  render();
};

window.beginFlashRandomSet = () => {
  sfxClick();
  const hub = state.flashHub;
  if (!hub) return;
  const pool = getFlashRandomPool(hub.needs, hub.kind);
  if (pool.length === 0) return;
  const cards = shuffle([...pool]).slice(0, Math.min(10, pool.length));
  state.game = {
    type: 'flash',
    score: 0,
    attempts: 0,
    correct: 0,
    history: [],
    cardIdx: 0,
    cards,
    totalRounds: cards.length,
    flashSetRef: { kind: hub.kind, random: true },
    flashFlipped: false,
    pointsAwarded: false,
    trackMarked: false,
    fromBoard: !!hub.fromBoard,
    startedAt: Date.now(),
  };
  state.view = 'game';
  render();
};

function finishFlashSetAndReturn() {
  state.game = null;
  state.view = 'flashSets';
  render();
}

async function completeFlashSet() {
  const g = state.game;
  const name = state.selectedStudent;
  if (g?.flashSetRef && name) {
    const setKey = g.flashSetRef.random ? 'random' : g.flashSetRef.setIndex;
    markFlashSetAttempted(name, g.flashSetRef.kind, setKey);
  }
  if (g?.finished && name) {
    const elapsed = (Date.now() - (g.startedAt || Date.now())) / 1000;
    if (elapsed >= FLASH_SET_MIN_SECONDS) {
      addPoints(name, FLASH_SET_STAR_REWARD);
    } else {
      await showTakeYourTimePopup();
    }
  }
  finishFlashSetAndReturn();
}
function initGame(){
  const needs = getStudentNeeds(state.selectedStudent);
  const g = state.game;
  if (g.type === 'gpcMatch') {
    g.roundTargets = buildRoundTargets(needs, 'gpc', CHALLENGE_ROUNDS);
    g.targetPool = uniqueValidTokens([...needs.targetGpcs.map(gpcPoolKey), ...needs.masteredGpcs.map(gpcPoolKey)], { caseSensitive: true });
    g.distractorPool = uniqueValidTokens(needs.masteredGpcs.map(gpcPoolKey), { caseSensitive: true });
    g.masteryStats = getCombinedMasteryStats(needs);
    g.totalRounds = CHALLENGE_ROUNDS;
    if (g.roundTargets.length === 0) g.empty = true;
  } else if (g.type === 'hwHunt') {
    g.roundTargets = buildRoundTargets(needs, 'hw', CHALLENGE_ROUNDS);
    g.targetPool = uniqueValidTokens([...needs.targetHws.map(x => x.hw), ...needs.masteredHws.map(x => x.hw)], { caseSensitive: true });
    g.distractorPool = uniqueValidTokens(needs.masteredHws.map(x => x.hw), { caseSensitive: true });
    g.masteryStats = getCombinedMasteryStats(needs);
    g.totalRounds = CHALLENGE_ROUNDS;
    if (g.roundTargets.length === 0) g.empty = true;
  } else if (g.type === 'flash') {
    if (!g.cards) g.cards = [];
    g.cardIdx = g.cardIdx || 0;
    g.totalRounds = g.cards.length;
  } else if (g.type === 'gpcCatch') {
    initCatchSound(needs);
    return;
  } else if (g.type === 'soundFlip') {
    initSoundFlip(needs);
    return;
  } else if (g.type === 'soundBox') {
    initSoundBox(needs);
    return;
  } else if (g.type === 'hwBlank') {
    initHwBlank(needs);
    return;
  } else if (g.type === 'hwJumble') {
    initHwJumble(needs);
    return;
  } else if (g.type === 'hwBoxes') {
    initHwBoxes(needs);
    return;
  }
  if (g.targetPool && g.targetPool.length === 0) g.empty = true;
  if (g.cards && g.cards.length === 0) g.empty = true;
  if (!g.empty) newRound();
}
function newRound(){
  const g = state.game;
  if (!g.targetPool && !g.roundTargets) return;
  if (g.roundIdx >= g.totalRounds) { g.finished = true; return; }
  const target = g.roundTargets
    ? g.roundTargets[g.roundIdx]
    : g.targetPool[g.roundIdx % g.targetPool.length];
  const kind = g.type === 'gpcMatch' ? 'gpc' : 'hw';
  g.currentTarget = String(target ?? '').trim();
  g.currentOptions = buildChallengeOptions(g.currentTarget, g.distractorPool, g.targetPool, 3, kind, g.masteryStats);
  if (!isValidGameToken(gpcDisplayPhoneme(g.currentTarget)) || g.currentOptions.length < 2) {
    g.roundIdx++;
    if (g.roundIdx >= g.totalRounds) g.finished = true;
    else newRound();
    return;
  }
  g.currentExampleWord = kind === 'gpc' ? resolveGpcExampleWord(g.currentTarget) : '';
  g.currentHwContext = kind === 'hw' ? getHwContextSnippet(g.currentTarget) : '';
  g.feedback = null;
  g.roundHadError = false;
  resetTargetAudioFlags(g);
}
function renderGame(app){
  const g = state.game;
  if (g.empty) {
    app.innerHTML = `<div class="min-h-screen flex items-center justify-center p-4">
      <div class="bg-white/10 backdrop-blur rounded-2xl p-8 text-center max-w-md">
        <div class="text-5xl mb-3">🎉</div>
        <h2 class="text-2xl font-bold mb-2">Nothing to practise!</h2>
        <p class="text-white/70 mb-4">You've mastered everything in this category.</p>
        <button onclick="state.view='${resolveProfileGameReturnView(g)}'; render()" class="bg-white/20 hover:bg-white/30 px-5 py-2 rounded-xl">Back</button>
      </div></div>`;
    return;
  }
  if (g.finished && g.type === 'flash' && g.flashSetRef) {
    completeFlashSet();
    return;
  }
  if (g.finished) return renderGameEnd(app);
  if (g.type === 'gpcMatch') return renderSoundPlanets(app);
  if (g.type === 'hwHunt') return renderHeartWordHunt(app);
  if (g.type === 'flash') return renderFlashGame(app);
  if (g.type === 'gpcCatch') return renderCatchSound(app);
  if (g.type === 'soundFlip') return renderSoundFlip(app);
  if (g.type === 'soundBox') return renderSoundBox(app);
  if (g.type === 'hwBlank') return renderHwBlank(app);
  if (g.type === 'hwJumble') return renderHwJumble(app);
  if (g.type === 'hwBoxes') return renderHwBoxes(app);
}
function renderSoundPlanets(app) {
  const g = state.game;
  const exampleWord = g.currentExampleWord || resolveGpcExampleWord(g.currentTarget);
  const exampleFlash = !!(g.feedback && !g.feedback.correct);
  const exampleHint = g.feedback?.correct
    ? ''
    : renderGpcExampleHint(exampleWord, { flash: exampleFlash });
  const playHeader = renderGamePlayHeader({
    feedbackMessage: g.feedback?.message,
    feedbackCorrect: g.feedback?.correct,
    nextOnclick: challengeNextOnclick(g),
    nextLabel: challengeNextLabel(g),
  });
  const listenBtn = (!g.feedback && hasAudio(g.currentTarget))
    ? `<button type="button" id="listenBtn" class="gpc-splat-listen gpc-splat-listen--lg gpc-splat-listen-corner">🔊 Listen</button>`
    : '';
  const optionsHtml = g.currentOptions.map(opt => {
    let cls = `optionBtn bg-gradient-to-br from-cyan-400 to-blue-600 splat aspect-square flex items-center justify-center text-3xl md:text-5xl font-bold cursor-pointer transition transform hover:scale-105 shadow-2xl`;
    if (g.feedback) {
      if (opt === g.currentTarget) cls += ' ring-4 ring-green-400 scale-110';
      else if (g.feedback.picked === opt) cls += ' ring-4 ring-red-400 opacity-50 shake';
      else cls += ' opacity-30';
    }
    const optEsc = String(opt).replace(/"/g, '&quot;');
    return `<button class="${cls}" data-option="${optEsc}">${formatGpcOptionLabel(opt, g.currentOptions)}</button>`;
  }).join('');

  app.innerHTML = `
    <div class="gpc-splat-screen gpc-splat-screen--match p-4 md:p-8">
      <div class="max-w-4xl mx-auto relative w-full">
        ${renderGameTopBar(g)}
        <div class="gpc-splat-top-bar">
          ${exampleHint ? `<div class="gpc-example-corner">${exampleHint}</div>` : ''}
          ${listenBtn}
        </div>
        <div class="flex-shrink-0">${playHeader}</div>
        <div class="gpc-splat-area">
          <div class="gpc-splat-grid-wrap max-w-4xl w-full mx-auto">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 fadeIn">${optionsHtml}</div>
          </div>
        </div>
      </div>
    </div>`;
  attachMatchHandlers('gpc');
}

function renderHeartWordHunt(app) {
  const g = state.game;
  const playHeader = renderGamePlayHeader({
    contextHtml: renderHwContextBar(g.currentHwContext || g.currentTarget),
    feedbackMessage: g.feedback?.message,
    feedbackCorrect: g.feedback?.correct,
    nextOnclick: challengeNextOnclick(g),
    nextLabel: challengeNextLabel(g),
  });
  const optionsHtml = g.currentOptions.map(opt => {
    let cls = `optionBtn bg-gradient-to-br from-pink-400 to-rose-600 splat-soft py-8 px-4 flex items-center justify-center text-3xl md:text-4xl font-bold cursor-pointer transition transform hover:scale-105 shadow-2xl`;
    if (g.feedback) {
      if (opt === g.currentTarget) cls += ' ring-4 ring-green-400 scale-110';
      else if (g.feedback.picked === opt) cls += ' ring-4 ring-red-400 opacity-50 shake';
      else cls += ' opacity-30';
    }
    return `<button class="${cls}" data-option="${opt}">${opt}</button>`;
  }).join('');

  app.innerHTML = `
    <div class="min-h-screen p-4 md:p-8">
      <div class="max-w-4xl mx-auto">
        ${renderGameTopBar(g)}
        ${playHeader}
        <div class="text-center mb-6">
          <button id="listenBtn" class="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white font-bold px-8 py-4 rounded-2xl text-xl shadow-2xl transform hover:scale-105 transition">🔊 Listen</button>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 fadeIn">${optionsHtml}</div>
      </div>
    </div>`;
  attachMatchHandlers('hw');
}

function attachMatchHandlers(type) {
  const g = state.game;
  setTimeout(() => {
    document.querySelectorAll('.optionBtn').forEach(btn => {
      btn.addEventListener('click', () => { sfxClick(); pickOption(btn.getAttribute('data-option'), type); });
    });
    const listenBtn = $('listenBtn');
    if (listenBtn) listenBtn.addEventListener('click', () => playTargetListen(g.currentTarget));
    if (!g.feedback) setTimeout(() => playTargetOnShow(g, g.currentTarget), 400);
    afterGameRenderArmNext();
  }, 0);
}
window.pickOption = (opt, type) => {
  const g = state.game;
  if (g.feedback) return;
  if (!isValidGameToken(opt)) return;
  const correct = opt === g.currentTarget;
  const gameKind = g.type;
  const retryRound = isChallengeRetryGame(gameKind);
  if (correct) {
    g.attempts++;
    if (!g.roundHadError) g.correct++;
    confetti();
    g.feedback = { picked: opt, correct: true, message: correctFeedback(g.currentTarget, type, gameKind) };
    playTargetOnCorrect(g, g.currentTarget);
    g.history.push({ target: g.currentTarget, picked: opt, correct: !g.roundHadError, type });
    g.roundHadError = false;
  } else if (retryRound) {
    g.roundHadError = true;
    g.feedback = { picked: opt, correct: false, message: challengeWrongFeedback(g.currentTarget, type, gameKind) };
  } else {
    g.attempts++;
    g.feedback = { picked: opt, correct: false, message: wrongFeedback(g.currentTarget, type, gameKind) };
    g.history.push({ target: g.currentTarget, picked: opt, correct, type });
  }
  render();
};
window.nextRound = () => {
  clearGameNextBtnTimer(state.game);
  state.game.roundIdx++;
  newRound();
  render();
};

// ============================================================
// SELF CHECK (flash cards)
// ============================================================
function renderFlashKindPick(app) {
  const hub = state.flashHub;
  if (!hub) {
    state.view = 'profile';
    render();
    return;
  }
  const gpcDisabled = hub.gpcCount === 0;
  const hwDisabled = hub.hwCount === 0;

  app.innerHTML = `
    <div class="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center">
      <div class="max-w-lg w-full bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-center fadeIn">
        <button type="button" onclick="state.flashHub=null; backToStudentMenu()" class="text-white/60 hover:text-white text-sm mb-4 block mx-auto">← Back</button>
        <h2 class="text-2xl font-bold mb-2 arcade-title-friendly">Self Check</h2>
        <p class="text-white/80 mb-6 text-sm leading-relaxed">What would you like to check?</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <button type="button" onclick="pickFlashKind('gpc')" ${gpcDisabled ? 'disabled' : ''}
            class="bg-cyan-500/35 hover:bg-cyan-500/50 border-2 border-cyan-300/60 px-6 py-4 rounded-xl font-semibold text-lg flex-1 disabled:opacity-40">
            Sounds<span class="block text-sm font-normal mt-1 text-white/75">${hub.gpcCount} to check</span>
          </button>
          <button type="button" onclick="pickFlashKind('hw')" ${hwDisabled ? 'disabled' : ''}
            class="bg-pink-500/35 hover:bg-pink-500/50 border-2 border-pink-300/60 px-6 py-4 rounded-xl font-semibold text-lg flex-1 disabled:opacity-40">
            Words<span class="block text-sm font-normal mt-1 text-white/75">${hub.hwCount} to check</span>
          </button>
        </div>
      </div>
    </div>`;
}

function renderFlashSetHub(app) {
  const hub = state.flashHub;
  if (!hub || !hub.sets) {
    state.view = 'flashKind';
    render();
    return;
  }
  const name = state.selectedStudent;
  const kindLabel = hub.kind === 'gpc' ? 'Sounds' : 'Words';
  const cardsHtml = hub.sets.map((items, idx) => {
    const status = getFlashSetCardStatus(name, hub.kind, idx, items);
    return `<button type="button" onclick="beginFlashSet(${idx})" class="flash-set-card ${status}">
      <div class="flash-set-card-title">Set ${idx + 1}</div>
    </button>`;
  }).join('');
  const randomLabel = hub.kind === 'gpc' ? 'sounds' : 'words';
  const randomBtn = areAllFlashSetsComplete(name, hub.kind, hub.sets)
    ? `<button type="button" onclick="beginFlashRandomSet()" class="flash-set-card flash-set-card--random">
        <div class="flash-set-card-title">Random Set</div>
        <div class="text-xs text-white/70 mt-1">10 random ${randomLabel}</div>
      </button>`
    : '';

  app.innerHTML = `
    <div class="min-h-screen p-4 md:p-8">
      <div class="max-w-2xl mx-auto fadeIn">
        <button type="button" onclick="state.view='flashKind'; render()" class="text-white/60 hover:text-white text-sm mb-4">← ${kindLabel}</button>
        <h2 class="text-2xl font-bold mb-1 arcade-title-friendly">Self Check — ${kindLabel}</h2>
        <p class="text-white/70 text-sm mb-5">Each set stays the same. Pick a set to check. Orange = started; green = all marked “I know it”.</p>
        <div class="flash-set-grid">${cardsHtml}${randomBtn}</div>
      </div>
    </div>`;
}

function renderFlashGame(app){
  const g = state.game;
  if (g.cardIdx >= g.cards.length) {
    g.finished = true;
    render();
    return;
  }
  const card = g.cards[g.cardIdx];
  const flashTrack = card.type === 'hw' ? 'hw' : 'gpc';
  const audioOk = hasAudio(card.value, flashTrack);
  const colorClass = card.type === 'gpc' ? 'from-cyan-400 to-blue-600' : 'from-pink-400 to-rose-600';
  const typeLabel = card.type === 'gpc' ? 'sound' : 'word';
  const flipped = !!g.flashFlipped;

  const cardLabel = card.type === 'gpc' && card.item
    ? String(card.item.gpc || gpcDisplayPhoneme(card.value)).trim()
    : (card.type === 'gpc' ? gpcDisplayPhoneme(card.value) : card.value);
  const flashContext = flipped
    ? ''
    : (card.type === 'hw' ? renderHwContextBar(card.value) : '');
  const playHeader = renderGamePlayHeader({ contextHtml: flashContext });

  const cardFaceHtml = flipped
    ? `<div class="flash-card-back"><span class="text-5xl md:text-6xl font-bold text-white/90">?</span><p class="mt-4 text-sm text-white/75 max-w-xs">Spell it aloud, then flip to check</p></div>`
    : `<div class="text-7xl md:text-9xl font-bold">${escapeHtmlText(cardLabel)}</div>`;

  const listenBtn = audioOk
    ? `<button type="button" id="flashListenBtn" class="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white font-bold px-6 py-3 rounded-2xl text-lg shadow-lg">🔊 Listen</button>`
    : '';
  const flipBtn = card.type === 'hw'
    ? `<button type="button" onclick="flashFlipCard()" class="bg-white/15 hover:bg-white/25 border-2 border-white/30 text-white font-semibold px-6 py-3 rounded-2xl text-lg">${flipped ? 'Show word' : 'Flip'}</button>`
    : '';

  app.innerHTML = `
    <div class="min-h-screen p-4 md:p-8 flex flex-col">
      ${renderGameTopBar(g, { backOnclick: g.flashSetRef ? 'finishFlashSetAndReturn()' : 'quitToProfile()', backLabel: g.flashSetRef ? '← Sets' : '← Quit' })}
      <p class="text-center text-white/75 text-sm mb-3 max-w-3xl mx-auto w-full">Do you know this ${typeLabel}?</p>
      <div class="max-w-3xl mx-auto w-full">${playHeader}</div>
      <div class="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full">
        <div class="flex flex-wrap gap-3 justify-center mb-5 w-full">
          ${listenBtn}
          ${flipBtn}
        </div>
        <div class="bg-gradient-to-br ${colorClass} rounded-3xl p-12 md:p-16 mb-6 shadow-2xl floaty w-full max-w-lg">
          <div class="flash-card-face">${cardFaceHtml}</div>
        </div>
        <div class="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center">
          <button onclick="sfxClick(); flashAnswer(false)" class="bg-orange-500/40 hover:bg-orange-500/60 border-2 border-orange-300 px-6 py-3 rounded-xl font-semibold text-lg flex-1">Still learning</button>
          <button onclick="sfxClick(); flashAnswer(true)" class="bg-green-500/40 hover:bg-green-500/60 border-2 border-green-300 px-6 py-3 rounded-xl font-semibold text-lg flex-1">I know it</button>
        </div>
      </div>
    </div>`;
  setTimeout(() => {
    document.getElementById('flashListenBtn')?.addEventListener('click', () => flashListen());
  }, 0);
}

window.flashFlipCard = () => {
  const g = state.game;
  if (!g || g.type !== 'flash' || g.cards[g.cardIdx]?.type !== 'hw') return;
  sfxClick();
  g.flashFlipped = !g.flashFlipped;
  render();
};

window.flashListen = () => {
  const g = state.game;
  if (!g || g.type !== 'flash') return;
  const card = g.cards[g.cardIdx];
  const track = card.type === 'hw' ? 'hw' : 'gpc';
  if (!hasAudio(card.value, track)) return;
  sfxClick();
  speak(card.value, track);
};

window.flashAnswer = (got) => {
  const g = state.game;
  const card = g.cards[g.cardIdx];
  setFlashResult(state.selectedStudent, card.value, got ? 'got' : 'tricky');
  g.history.push({ target: card.value, type: card.type, correct: got });
  g.attempts++;
  if (got) g.correct++;
  g.flashFlipped = false;
  g.cardIdx++;
  resetTargetAudioFlags(g);
  if (g.cardIdx >= g.cards.length) g.finished = true;
  render();
};

// ============================================================
// SOUND FLIP
// ============================================================
function isMultiLetterGpc(gpc) {
  return String(gpc).length >= 2;
}

/** Letters where mirror / 180° often look the same as upright (o, l, c, …). */
function isAmbiguousFlipChar(c) {
  const ch = String(c).toLowerCase();
  return 'o0celisvxzw'.includes(ch) || ch === 'i' || ch === 'l' || ch === '1' || ch === '|';
}

function getSoundFlipAmbiguity(gpc) {
  const chars = [...String(gpc)];
  if (chars.length === 0) return 'high';
  const ambiguous = chars.filter(isAmbiguousFlipChar).length;
  const ratio = ambiguous / chars.length;
  if (ratio >= 0.5 || chars.every(isAmbiguousFlipChar)) return 'high';
  if (ambiguous > 0) return 'medium';
  return 'low';
}

/** Only transforms that clearly change how the grapheme looks (no position-only tricks). */
function getWholeWordFlipPool(gpc) {
  const level = getSoundFlipAmbiguity(gpc);
  const sideways = [
    { id: 'r90', transform: 'rotate(90deg)' },
    { id: 'r270', transform: 'rotate(-90deg)' }
  ];
  const diagonal = [
    { id: 'r45', transform: 'rotate(45deg)' },
    { id: 'r135', transform: 'rotate(-45deg)' }
  ];
  const strong = [
    { id: 'r180', transform: 'rotate(180deg)' },
    { id: 'mirrorX', transform: 'scaleX(-1)' },
    { id: 'mirrorY', transform: 'scaleY(-1)' },
    ...sideways,
    { id: 'flipBoth', transform: 'scale(-1, -1)' }
  ];
  if (level === 'high') return [...sideways, ...diagonal];
  if (level === 'medium') return [...sideways, ...diagonal, { id: 'r180', transform: 'rotate(180deg)' }];
  return strong;
}

/** Every incorrect letter must be rotated — never upright in the box. */
function sidewaysLetterTilts(count) {
  const tilts = ['rotate(90deg)', 'rotate(-90deg)'];
  return Array.from({ length: count }, (_, i) => tilts[i % 2]);
}

function buildJumbleVariant(gpc, id) {
  const letters = gpc.split('');
  let shuffled = shuffle([...letters]);
  let guard = 0;
  while (shuffled.join('') === gpc && guard++ < 12) shuffled = shuffle([...letters]);
  if (shuffled.join('') === gpc) shuffled = [...letters].reverse();
  const tilts = sidewaysLetterTilts(shuffled.length);
  return {
    id,
    type: 'letters',
    letters: shuffled.map((c, i) => ({ c, t: tilts[i] }))
  };
}

function buildPerLetterTiltVariant(gpc, id) {
  const tilts = sidewaysLetterTilts(gpc.length);
  return {
    id,
    type: 'letters',
    letters: gpc.split('').map((c, i) => ({ c, t: tilts[i] }))
  };
}

/** Digraph option: each letter mirrored horizontally but still adjacent. */
function buildMirrorDigraphVariant(gpc, id) {
  return {
    id,
    type: 'letters',
    letters: gpc.split('').map(c => ({ c, t: 'scaleX(-1)' }))
  };
}

function buildSoundFlipVariants(gpc) {
  const correct = { id: 'correct', isCorrect: true, transform: 'none' };
  const incorrect = [];
  const wholePool = getWholeWordFlipPool(gpc);

  wholePool.forEach(v => incorrect.push(v));

  if (isMultiLetterGpc(gpc)) {
    incorrect.push(buildJumbleVariant(gpc, 'jumble'));
    incorrect.push(buildPerLetterTiltVariant(gpc, 'tilt'));
    incorrect.push(buildMirrorDigraphVariant(gpc, 'mirrorPair'));
  }

  const seen = new Set();
  const unique = incorrect.filter(v => {
    const key = v.type === 'letters'
      ? v.id + ':' + v.letters.map(l => l.c + l.t).join('|')
      : v.id + ':' + (v.transform || '');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  let picked = shuffle(unique).slice(0, 4);
  const fallbacks = getWholeWordFlipPool(gpc);
  for (const fb of fallbacks) {
    if (picked.length >= 4) break;
    if (!picked.some(p => p.id === fb.id && !p.type)) picked.push(fb);
  }
  while (picked.length < 4 && isMultiLetterGpc(gpc)) {
    const extra = buildPerLetterTiltVariant(gpc, 'tilt' + picked.length);
    if (!picked.some(p => p.id === extra.id)) picked.push(extra);
    else break;
  }

  return shuffle([correct, ...picked.slice(0, 4)]);
}

function renderSoundFlipGlyph(gpc, variant) {
  if (variant.isCorrect) {
    return `<span class="sound-flip-glyph-cell"><span class="sound-flip-letter">${gpc}</span></span>`;
  }
  if (variant.type === 'letters' && variant.letters) {
    const parts = variant.letters.map(l =>
      `<span class="sound-flip-letter-slot"><span class="sound-flip-letter" style="transform:${l.t}">${l.c}</span></span>`
    ).join('');
    return `<span class="sound-flip-glyph-cell"><span class="inline-flex items-center justify-center gap-2 sm:gap-3">${parts}</span></span>`;
  }
  const t = variant.transform && variant.transform !== 'none' ? variant.transform : 'rotate(90deg)';
  return `<span class="sound-flip-glyph-cell"><span class="sound-flip-letter" style="transform:${t}">${gpc}</span></span>`;
}

function initSoundFlip(needs) {
  const g = state.game;
  g.roundTargets = buildRoundTargets(needs, 'gpc', CHALLENGE_ROUNDS);
  g.targetPool = [...new Set([...needs.targetGpcs.map(gpcPoolKey), ...needs.masteredGpcs.map(gpcPoolKey)])];
  g.totalRounds = CHALLENGE_ROUNDS;
  if (g.roundTargets.length === 0) { g.empty = true; return; }
  newSoundFlipRound();
}

function newSoundFlipRound() {
  const g = state.game;
  if (g.roundIdx >= g.totalRounds) { g.finished = true; return; }
  g.currentTarget = g.roundTargets[g.roundIdx];
  g.currentExampleWord = resolveGpcExampleWord(g.currentTarget);
  g.currentOptions = buildSoundFlipVariants(gpcDisplayPhoneme(g.currentTarget));
  g.feedback = null;
  g.flipPhase = 'prompt';
  g.roundHadError = false;
  resetTargetAudioFlags(g);
  if (g._flipReadyTimer) { clearTimeout(g._flipReadyTimer); g._flipReadyTimer = null; }
  if (g._promptAudio) {
    try { g._promptAudio.pause(); } catch (e) {}
    g._promptAudio = null;
  }
}

function startSoundFlipPrompt() {
  const g = state.game;
  if (!g || g.type !== 'soundFlip' || g.flipPhase !== 'prompt' || g._spoken || g.feedback) return;
  g._spoken = true;

  const goReady = () => {
    if (state.game !== g || g.flipPhase !== 'prompt' || g.feedback) return;
    if (g._flipReadyTimer) { clearTimeout(g._flipReadyTimer); g._flipReadyTimer = null; }
    g.flipPhase = 'ready';
    render();
  };

  const audioData = getAudioSource(g.currentTarget, 'gpc');
  if (audioData) {
    try {
      const audio = new Audio(audioData);
      g._promptAudio = audio;
      audio.onended = goReady;
      audio.onerror = () => { g._flipReadyTimer = setTimeout(goReady, 450); };
      audio.play().catch(() => { g._flipReadyTimer = setTimeout(goReady, 500); });
      g._flipReadyTimer = setTimeout(goReady, 5000);
    } catch (e) {
      g._flipReadyTimer = setTimeout(goReady, 550);
    }
  } else {
    g._flipReadyTimer = setTimeout(goReady, 750);
  }
}

function renderSoundFlip(app) {
  const g = state.game;
  const audioOk = hasAudio(g.currentTarget);
  const canPick = g.flipPhase === 'ready' && !g.feedback;
  const modelGlow = g.flipPhase === 'prompt';

  const optionsHtml = g.currentOptions.map(opt => {
    let cls = 'sound-flip-option sound-flip-font rounded-2xl px-3 py-4 sm:px-4 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl font-bold cursor-pointer transition transform hover:scale-105 hover:bg-white/10';
    if (!canPick && !g.feedback) cls += ' opacity-70';
    if (g.feedback) {
      if (opt.isCorrect) cls += ' ring-4 ring-green-400 scale-105 bg-green-500/20';
      else if (g.feedback.picked === opt.id) cls += ' ring-4 ring-red-400 opacity-60 shake';
      else cls += ' opacity-35';
    }
    return `<button type="button" class="${cls}" data-flip-id="${opt.id}" ${!canPick ? 'disabled' : ''}>${renderSoundFlipGlyph(gpcDisplayPhoneme(g.currentTarget), opt)}</button>`;
  }).join('');

  const playHeader = renderGamePlayHeader({
    feedbackMessage: g.feedback?.message,
    feedbackCorrect: g.feedback?.correct,
    nextOnclick: challengeNextOnclick(g),
    nextLabel: challengeNextLabel(g),
  });

  app.innerHTML = `
    <div class="sound-flip-screen p-4 md:p-8">
      <div class="sound-flip-screen-inner">
        ${renderGameTopBar(g)}
        ${playHeader}
        <div class="sound-flip-main fadeIn">
          <div class="flex flex-col items-center">
            <div class="sound-flip-model sound-flip-font rounded-2xl px-8 py-10 sm:px-10 sm:py-12 flex items-center justify-center text-5xl sm:text-6xl md:text-7xl font-bold min-w-[8rem] ${modelGlow ? 'prompt-glow' : ''}">
              ${escapeHtmlText(gpcDisplayPhoneme(g.currentTarget))}
            </div>
            ${audioOk ? `<button type="button" id="soundFlipListen" class="mt-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white font-bold px-5 py-2 rounded-xl text-sm shadow-lg">🔊 Listen</button>` : ''}
          </div>
          <div class="sound-flip-options-wrap">${optionsHtml}</div>
        </div>
      </div>
    </div>`;

  setTimeout(() => {
    document.querySelectorAll('[data-flip-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        sfxClick();
        pickSoundFlip(btn.getAttribute('data-flip-id'));
      });
    });
    const flipListen = document.getElementById('soundFlipListen');
    if (flipListen) flipListen.addEventListener('click', () => playTargetListen(g.currentTarget));
    if (!g.feedback) startSoundFlipPrompt();
    afterGameRenderArmNext();
  }, 0);
}

function cleanupSoundFlip() {
  const g = state.game;
  if (!g) return;
  if (g._flipReadyTimer) { clearTimeout(g._flipReadyTimer); g._flipReadyTimer = null; }
  if (g._promptAudio) {
    try { g._promptAudio.pause(); } catch (e) {}
    g._promptAudio = null;
  }
}

window.pickSoundFlip = (optionId) => {
  const g = state.game;
  if (!g || g.type !== 'soundFlip' || g.feedback || g.flipPhase !== 'ready') return;
  const opt = g.currentOptions.find(o => o.id === optionId);
  if (!opt) return;
  const correct = !!opt.isCorrect;
  if (correct) {
    g.attempts++;
    if (!g.roundHadError) g.correct++;
    confetti();
    g.feedback = { picked: optionId, correct: true, message: correctFeedback(g.currentTarget, 'gpc', 'soundFlip') };
    playTargetOnCorrect(g, g.currentTarget);
    g.history.push({ target: g.currentTarget, picked: optionId, correct: !g.roundHadError, type: 'gpc' });
    g.roundHadError = false;
  } else {
    g.roundHadError = true;
    g.feedback = { picked: optionId, correct: false, message: challengeWrongFeedback(g.currentTarget, 'gpc', 'soundFlip') };
  }
  render();
};

window.nextSoundFlipRound = () => {
  const g = state.game;
  clearGameNextBtnTimer(g);
  g.roundIdx++;
  if (g.roundIdx >= g.totalRounds) {
    g.finished = true;
    cleanupSoundFlip();
    render();
    return;
  }
  newSoundFlipRound();
  render();
};

// ============================================================
// WORD JUMBLE
// ============================================================
function jumbleWordLetters(word) {
  const w = String(word ?? '');
  if (w.length <= 1) return w;
  if (w.length === 2) return w[1] + w[0];
  let attempts = 0;
  while (attempts++ < 50) {
    const shuffled = shuffle(w.split('')).join('');
    if (shuffled.toLowerCase() !== w.toLowerCase()) return shuffled;
  }
  const chars = w.split('');
  return chars[chars.length - 1] + chars.slice(1, -1).join('') + chars[0];
}

/** All unique letter orderings except the correct spelling. */
function allWordAnagramVariants(word) {
  const w = String(word ?? '').trim();
  if (w.length <= 1) return [];
  const lower = w.toLowerCase();
  const results = new Set();
  const permute = (chars, prefix = '') => {
    if (!chars.length) {
      if (prefix.toLowerCase() !== lower) results.add(prefix);
      return;
    }
    const seen = new Set();
    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];
      if (seen.has(ch)) continue;
      seen.add(ch);
      permute(chars.slice(0, i).concat(chars.slice(i + 1)), prefix + ch);
    }
  };
  permute(w.split(''));
  return [...results];
}

/** Incorrect spellings: all letter orders first, then doubled-letter variants. */
function buildWordJumbleIncorrectSpellings(word) {
  const w = String(word ?? '').trim();
  if (!w) return [];
  const lower = w.toLowerCase();
  const variants = new Set();
  const add = (v) => {
    const s = String(v ?? '');
    if (s && s.toLowerCase() !== lower) variants.add(s);
  };

  for (const a of shuffle(allWordAnagramVariants(w))) {
    add(a);
    if (variants.size >= 8) return [...variants];
  }

  if (w.length === 2) add(w[1] + w[0]);
  for (let i = 0; i < w.length; i++) {
    add(w.slice(0, i) + w[i] + w.slice(i));
  }
  for (let i = 0; i < w.length; i++) {
    add(w[i] + w);
    add(w + w[i]);
  }

  let guard = 0;
  while (variants.size < 8 && guard++ < 20) add(jumbleWordLetters(w));

  return [...variants];
}

function buildWordJumbleVariants(word, distractorPool) {
  const correct = String(word).trim();
  const lowerCorrect = correct.toLowerCase();
  const incorrect = new Set();

  for (const v of buildWordJumbleIncorrectSpellings(correct)) {
    if (incorrect.size >= 3) break;
    incorrect.add(v);
  }

  const pool = uniqueValidTokens(distractorPool || []);
  for (const d of shuffle(pool)) {
    if (incorrect.size >= 3) break;
    if (d.toLowerCase() !== lowerCorrect && !incorrect.has(d)) incorrect.add(d);
  }

  for (const v of buildWordJumbleIncorrectSpellings(correct)) {
    if (incorrect.size >= 3) break;
    incorrect.add(v);
  }
  while (incorrect.size < 3) {
    const extra = jumbleWordLetters(correct + incorrect.size);
    if (extra.toLowerCase() !== lowerCorrect) incorrect.add(extra);
    else incorrect.add(correct.split('').reverse().join(''));
  }
  const options = [
    { id: 'correct', spelling: correct, isCorrect: true },
    ...[...incorrect].slice(0, 3).map((sp, i) => ({ id: `j${i}`, spelling: sp, isCorrect: false }))
  ];
  return shuffle(options);
}

function initHwJumble(needs) {
  const g = state.game;
  g.roundTargets = buildRoundTargets(needs, 'hw', CHALLENGE_ROUNDS);
  g.targetPool = uniqueValidTokens([...needs.targetHws.map(x => x.hw), ...needs.masteredHws.map(x => x.hw)], { caseSensitive: true });
  g.distractorPool = uniqueValidTokens(needs.masteredHws.map(x => x.hw), { caseSensitive: true });
  g.totalRounds = CHALLENGE_ROUNDS;
  if (g.roundTargets.length === 0) { g.empty = true; return; }
  newHwJumbleRound();
}

function newHwJumbleRound() {
  const g = state.game;
  if (g.roundIdx >= g.totalRounds) { g.finished = true; return; }
  g.currentTarget = String(g.roundTargets[g.roundIdx] ?? '').trim();
  if (!isValidGameToken(g.currentTarget)) {
    g.roundIdx++;
    if (g.roundIdx >= g.totalRounds) { g.finished = true; return; }
    newHwJumbleRound();
    return;
  }
  g.currentHwContext = getHwContextSnippet(g.currentTarget);
  g.currentOptions = buildWordJumbleVariants(g.currentTarget, g.distractorPool);
  g.feedback = null;
  g.jumblePhase = 'prompt';
  g.roundHadError = false;
  resetTargetAudioFlags(g);
  if (g._jumbleReadyTimer) { clearTimeout(g._jumbleReadyTimer); g._jumbleReadyTimer = null; }
  if (g._jumblePromptAudio) {
    try { g._jumblePromptAudio.pause(); } catch (e) {}
    g._jumblePromptAudio = null;
  }
  if (g._hintTimer) { clearTimeout(g._hintTimer); g._hintTimer = null; }
}

function startHwJumblePrompt() {
  const g = state.game;
  if (!g || g.type !== 'hwJumble' || g.jumblePhase !== 'prompt' || g._spoken || g.feedback) return;
  g._spoken = true;

  const goReady = () => {
    if (state.game !== g || g.jumblePhase !== 'prompt' || g.feedback) return;
    if (g._jumbleReadyTimer) { clearTimeout(g._jumbleReadyTimer); g._jumbleReadyTimer = null; }
    g.jumblePhase = 'ready';
    render();
  };

  const audioData = getAudioSource(g.currentTarget, 'hw');
  if (audioData) {
    try {
      const audio = new Audio(audioData);
      g._jumblePromptAudio = audio;
      audio.onended = goReady;
      audio.onerror = () => { g._jumbleReadyTimer = setTimeout(goReady, 450); };
      audio.play().catch(() => { g._jumbleReadyTimer = setTimeout(goReady, 500); });
      g._jumbleReadyTimer = setTimeout(goReady, 5000);
    } catch (e) {
      g._jumbleReadyTimer = setTimeout(goReady, 550);
    }
  } else {
    g._jumbleReadyTimer = setTimeout(goReady, 750);
  }
}

function cleanupHwJumble() {
  const g = state.game;
  if (!g) return;
  if (g._jumbleReadyTimer) { clearTimeout(g._jumbleReadyTimer); g._jumbleReadyTimer = null; }
  if (g._jumblePromptAudio) {
    try { g._jumblePromptAudio.pause(); } catch (e) {}
    g._jumblePromptAudio = null;
  }
  if (g._hintTimer) { clearTimeout(g._hintTimer); g._hintTimer = null; }
}

window.hwJumbleShowHint = () => {
  const g = state.game;
  if (!g || g.type !== 'hwJumble' || g.jumblePhase === 'hint' || g.feedback) return;
  sfxClick();
  if (g._hintTimer) { clearTimeout(g._hintTimer); g._hintTimer = null; }
  g.jumblePhase = 'hint';
  render();
  g._hintTimer = setTimeout(() => {
    if (state.game !== g || g.jumblePhase !== 'hint') return;
    g.jumblePhase = 'ready';
    g._hintTimer = null;
    render();
  }, HW_BOX_HINT_MS);
};

window.pickHwJumble = (optionId) => {
  const g = state.game;
  if (!g || g.type !== 'hwJumble' || g.feedback || g.jumblePhase !== 'ready') return;
  const opt = g.currentOptions.find(o => o.id === optionId);
  if (!opt) return;
  sfxClick();
  if (opt.isCorrect) {
    g.attempts++;
    if (!g.roundHadError) g.correct++;
    confetti();
    g.feedback = { picked: optionId, correct: true, message: correctFeedback(g.currentTarget, 'hw', 'hwJumble') };
    playTargetOnCorrect(g, g.currentTarget);
    g.history.push({ target: g.currentTarget, picked: optionId, correct: !g.roundHadError, type: 'hw' });
    g.roundHadError = false;
  } else {
    g.roundHadError = true;
    g.feedback = { picked: optionId, correct: false, message: challengeWrongFeedback(g.currentTarget, 'hw', 'hwJumble') };
  }
  render();
};

window.nextHwJumbleRound = () => {
  const g = state.game;
  clearGameNextBtnTimer(g);
  g.roundIdx++;
  if (g.roundIdx >= g.totalRounds) {
    g.finished = true;
    cleanupHwJumble();
    render();
    return;
  }
  newHwJumbleRound();
  render();
};

function renderHwJumble(app) {
  const g = state.game;
  const audioOk = hasAudio(g.currentTarget);
  const canPick = g.jumblePhase === 'ready' && !g.feedback;
  const showHintBtn = !g.feedback && g.jumblePhase !== 'hint';

  const optionsHtml = g.currentOptions.map(opt => {
    let cls = 'word-jumble-option';
    if (!canPick && !g.feedback) cls += ' opacity-70';
    if (g.feedback) {
      if (opt.isCorrect) cls += ' ring-4 ring-green-400 scale-105';
      else if (g.feedback.picked === opt.id) cls += ' ring-4 ring-red-400 opacity-60 shake';
      else cls += ' opacity-35';
    }
    return `<button type="button" class="${cls}" data-jumble-id="${opt.id}" ${!canPick ? 'disabled' : ''}>${escapeHtmlText(opt.spelling)}</button>`;
  }).join('');

  const playHeader = renderGamePlayHeader({
    contextHtml: '',
    feedbackMessage: g.feedback?.message,
    feedbackCorrect: g.feedback?.correct,
    nextOnclick: challengeNextOnclick(g),
    nextLabel: challengeNextLabel(g),
  });

  app.innerHTML = `
    <div class="word-jumble-screen p-4 md:p-8">
      <div class="word-jumble-screen-inner">
        ${renderGameTopBar(g)}
        ${playHeader}
        <div class="word-jumble-main fadeIn">
          <div class="word-jumble-controls">
            ${audioOk ? `<button type="button" id="hwJumbleListen" class="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white font-bold px-5 py-2 rounded-xl text-sm shadow-lg">🔊 Listen</button>` : ''}
            <button type="button" id="hwJumbleHint" class="hw-box-hint-btn${showHintBtn ? '' : ' hw-box-hint-btn--placeholder'}" aria-label="Show the word briefly" title="Show the word briefly" ${showHintBtn ? '' : 'tabindex="-1"'}>💡</button>
          </div>
          <div class="word-jumble-options-wrap">${optionsHtml}</div>
        </div>
      </div>
      ${g.jumblePhase === 'hint' ? `
        <div class="hw-box-hint-overlay" role="dialog" aria-label="Hint">
          <div class="hw-box-hint-bar-wrap" style="--hw-hint-ms:${HW_BOX_HINT_MS}ms"><div class="hw-box-hint-bar"></div></div>
          <div class="word-jumble-hint-word">${escapeHtmlText(g.currentTarget)}</div>
        </div>
      ` : ''}
    </div>`;

  setTimeout(() => {
    document.querySelectorAll('[data-jumble-id]').forEach(btn => {
      btn.addEventListener('click', () => pickHwJumble(btn.getAttribute('data-jumble-id')));
    });
    document.getElementById('hwJumbleListen')?.addEventListener('click', () => playTargetListen(g.currentTarget));
    document.getElementById('hwJumbleHint')?.addEventListener('click', () => hwJumbleShowHint());
    if (!g.feedback && g.jumblePhase === 'prompt') startHwJumblePrompt();
    afterGameRenderArmNext();
  }, 0);
}

// ============================================================
// SOUND BOX
// ============================================================
const SOUND_BOX_COMMON_GPCS = [
  'a_e', 'e_e', 'i_e', 'o_e', 'u_e',
  'igh', 'tion', 'sion', 'tch', 'dge', 'ng', 'ck', 'qu',
  'sh', 'ch', 'th', 'wh', 'ph',
  'ai', 'ay', 'ee', 'ea', 'oa', 'oo', 'ow', 'ou', 'oi', 'oy', 'ue', 'ew',
  'ir', 'er', 'ur', 'ar', 'or', 'au', 'aw', 'ie', 'ei',
  'bl', 'br', 'cl', 'cr', 'dr', 'fl', 'fr', 'gl', 'gr', 'pl', 'pr', 'sc', 'sk', 'sl', 'sm', 'sn', 'sp', 'st', 'sw', 'tr', 'tw',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];
const SOUND_BOX_BLEND_GPCS = new Set([
  'bl', 'br', 'cl', 'cr', 'dr', 'fl', 'fr', 'gl', 'gr', 'pl', 'pr', 'sc', 'sk', 'sl', 'sm', 'sn', 'sp', 'st', 'sw', 'tr', 'tw'
]);

function buildGpcSegmentPatternList(needs) {
  const set = new Set(SOUND_BOX_COMMON_GPCS.map(normalizeGpcKey));
  const cls = state.data?.classes?.[state.classKey];
  if (cls) {
    for (const item of collectClassGpcItems(cls)) {
      const key = normalizeGpcKey(item.gpc);
      if (key) set.add(key);
    }
  }
  if (needs) {
    for (const item of [...needs.targetGpcs, ...needs.masteredGpcs]) {
      const key = normalizeGpcKey(item.gpc);
      if (key) set.add(key);
    }
  }
  return [...set].sort((a, b) => b.length - a.length);
}

function isSoundBoxConsonant(ch) {
  return /[bcdfghjklmnpqrstvwxyz]/.test(String(ch ?? '').toLowerCase());
}

function makeSoundBoxSlot(expectedGpc, idx, opts = {}) {
  return {
    idx,
    expectedGpc: normalizeGpcKey(expectedGpc),
    filled: null,
    wrong: false,
    geminate: !!opts.geminate,
    geminateDisplay: opts.geminateDisplay || '',
  };
}

function isMagicEGpcKey(gpc) {
  return /^[aeiou]_e$/.test(normalizeGpcKey(gpc));
}

/** GPC chip shown in bank for a slot (magic-e vowel slots use o_e etc., not the bare vowel). */
function soundBoxSlotBankGpc(slot) {
  return slot.magicVowelSlot ? slot.magicGpc : slot.expectedGpc;
}

/** Audio label for a slot during the left-to-right sequence. */
function soundBoxSlotAudioGpc(slot) {
  return slot.magicVowelSlot ? slot.magicGpc : slot.expectedGpc;
}

function soundBoxAudioContext(g) {
  return {
    exampleWord: g?.currentExampleWord || resolveGpcExampleWord(g?.currentTarget) || '',
    focusKey: g?.currentTarget || '',
    needs: state.selectedStudent ? getStudentNeeds(state.selectedStudent) : null,
  };
}

/** Class / master GPC clip for Sound Box — uses example word like Assessment Buddy (e.g. a in lady). */
function resolveSoundBoxGpcAudio(phoneme, ctx) {
  const g = normalizeGpcKey(phoneme);
  if (!g) return null;
  const roundEx = String(ctx?.exampleWord ?? '').trim();
  const needs = ctx?.needs;
  const focusKey = String(ctx?.focusKey ?? '');

  if (roundEx) {
    const hit = getGpcAudioSource(g, roundEx);
    if (hit) return hit;
  }

  if (focusKey.includes(GPC_AUDIO_SEP) || focusKey) {
    const focusPh = normalizeGpcKey(gpcDisplayPhoneme(focusKey));
    const focusEx = parseGpcStorageKey(focusKey).exampleWord;
    if (focusPh === g && focusEx) {
      const hit = getGpcAudioSource(g, focusEx);
      if (hit) return hit;
    }
  }

  if (needs) {
    const item = findGpcNeedItem(g, needs, roundEx) || findGpcNeedItem(g, needs);
    if (item) {
      const hit = getGpcAudioSource(item.gpc, item.exampleWord);
      if (hit) return hit;
    }
  }

  const classItem = findGpcInClass(g, roundEx) || findGpcInClass(g);
  if (classItem) {
    const hit = getGpcAudioSource(classItem.gpc, classItem.exampleWord);
    if (hit) return hit;
  }

  return getGpcAudioSource(g) || null;
}

/** Resolve clip plan for a slot: exact bank match, or split consonant blends. */
function resolveSoundBoxSlotAudioClips(slot, ctx) {
  const primary = normalizeGpcKey(soundBoxSlotAudioGpc(slot));
  if (!primary) return [];

  const pushClip = (label, staggerMs) => {
    const audioData = resolveSoundBoxGpcAudio(label, ctx);
    return audioData ? { label, staggerMs, audioData } : null;
  };

  if (SOUND_BOX_BLEND_GPCS.has(primary) && primary.length === 2) {
    const clips = [];
    const c1 = pushClip(primary[0], 0);
    const c2 = pushClip(primary[1], SOUND_BOX_BLEND_STAGGER_MS);
    if (c1) clips.push(c1);
    if (c2) clips.push(c2);
    if (clips.length) return clips;
  }

  const single = pushClip(primary, 0);
  return single ? [single] : [];
}

function soundBoxSlotHasAudio(slot, ctx) {
  return resolveSoundBoxSlotAudioClips(slot, ctx).length > 0;
}

/** Value placed in a box when the learner taps a GPC chip. */
function soundBoxResolveFill(gpc, slot) {
  const key = normalizeGpcKey(gpc);
  if (slot.magicVowelSlot && isMagicEGpcKey(key)) {
    return key.replace('_e', '');
  }
  return key;
}

function greedySegmentSoundBox(text, patterns) {
  const slots = [];
  let pos = 0;
  const lower = String(text ?? '').toLowerCase();
  while (pos < lower.length) {
    let matched = null;
    for (const pat of patterns) {
      if (/_e$/.test(pat)) continue;
      if (lower.startsWith(pat, pos)) { matched = pat; break; }
    }
    if (!matched) matched = lower[pos];
    if (
      matched.length === 1 &&
      isSoundBoxConsonant(matched) &&
      lower[pos + 1] === matched
    ) {
      slots.push(makeSoundBoxSlot(matched, slots.length, {
        geminate: true,
        geminateDisplay: matched + matched,
      }));
      pos += 2;
      continue;
    }
    slots.push(makeSoundBoxSlot(matched, slots.length));
    pos += matched.length;
  }
  return slots;
}

function detectMagicEGpc(word, focusGpc) {
  const w = String(word ?? '').trim().toLowerCase();
  const focusKey = normalizeGpcKey(gpcDisplayPhoneme(focusGpc));
  const lvEntry = LONG_VOWEL_WORD_INDEX[w];
  if (lvEntry?.gpc && /_e$/.test(normalizeGpcKey(lvEntry.gpc))) {
    return normalizeGpcKey(lvEntry.gpc);
  }
  if (w.length < 3 || !w.endsWith('e')) return null;
  const prefix = w.slice(0, -1);
  if (focusKey && /_e$/.test(focusKey)) {
    const magicVowel = focusKey.replace('_e', '');
    if (prefix.toLowerCase().includes(magicVowel)) return focusKey;
    return null;
  }
  if (!/[aeiou]/.test(prefix)) return null;
  const m = prefix.match(/^(.+)([aeiou])([^aeiou])$/i);
  if (!m) return null;
  return `${m[2].toLowerCase()}_e`;
}

function segmentWordForSoundBox(word, needs, focusGpc) {
  const w = String(word ?? '').trim().toLowerCase();
  const patterns = buildGpcSegmentPatternList(needs);
  const magicGpc = detectMagicEGpc(w, focusGpc);
  if (magicGpc && w.endsWith('e')) {
    const prefix = w.slice(0, -1);
    const magicVowel = magicGpc.replace('_e', '');
    const slots = [];
    const vce = prefix.match(/^(.+)([aeiou])([^aeiou])$/i);
    if (vce && vce[2].toLowerCase() === magicVowel) {
      const [, pre, vowel, post] = vce;
      if (pre) slots.push(...greedySegmentSoundBox(pre, patterns));
      const vowelSlot = makeSoundBoxSlot(vowel, slots.length);
      vowelSlot.magicVowelSlot = true;
      vowelSlot.magicGpc = magicGpc;
      slots.push(vowelSlot);
      if (post) slots.push(...greedySegmentSoundBox(post, patterns));
    } else {
      const raw = greedySegmentSoundBox(prefix, patterns);
      let marked = false;
      for (const s of raw) {
        if (!marked && s.expectedGpc === magicVowel) {
          s.magicVowelSlot = true;
          s.magicGpc = magicGpc;
          marked = true;
        }
        slots.push(s);
      }
    }
    slots.forEach((s, i) => { s.idx = i; });
    return { slots, magicSuffix: 'e' };
  }
  const slots = greedySegmentSoundBox(w, patterns);
  slots.forEach((s, i) => { s.idx = i; });
  return { slots, magicSuffix: '' };
}

function buildSoundBoxBank(expectedGpcs, gpcPool) {
  const needed = [...new Set(expectedGpcs.map(normalizeGpcKey).filter(Boolean))];
  const needSet = new Set(needed);
  const distractors = shuffle(
    uniqueValidTokens(gpcPool).filter(g => !needSet.has(normalizeGpcKey(g)))
  );
  const extraCount = Math.max(2, Math.min(4, 8 - needed.length));
  return shuffle([...needed, ...distractors.slice(0, extraCount)]);
}

function initSoundBox(needs) {
  const g = state.game;
  g.roundTargets = buildRoundTargets(needs, 'gpc', CHALLENGE_ROUNDS);
  g.targetPool = uniqueValidTokens([...needs.targetGpcs.map(x => x.gpc), ...needs.masteredGpcs.map(x => x.gpc)]);
  g.totalRounds = CHALLENGE_ROUNDS;
  g.roundIdx = 0;
  g.correct = 0;
  g.attempts = 0;
  if (g.roundTargets.length === 0) { g.empty = true; return; }
  newSoundBoxRound(needs);
}

function newSoundBoxRound(needs) {
  const g = state.game;
  g.roundHadError = false;
  g.roundMistakeLogged = false;
  if (g.roundIdx >= g.totalRounds) { g.finished = true; return; }
  g.currentTarget = String(g.roundTargets[g.roundIdx] ?? '').trim();
  if (!isValidGameToken(g.currentTarget)) {
    g.roundIdx++;
    if (g.roundIdx >= g.totalRounds) { g.finished = true; return; }
    newSoundBoxRound(needs);
    return;
  }
  const studentNeeds = needs || getStudentNeeds(state.selectedStudent);
  g.currentExampleWord = resolveGpcExampleWord(g.currentTarget);
  const word = g.currentExampleWord || g.currentTarget;
  const seg = segmentWordForSoundBox(word, studentNeeds, g.currentTarget);
  g.slots = seg.slots;
  g.magicSuffix = seg.magicSuffix;
  g.bank = buildSoundBoxBank(g.slots.map(soundBoxSlotBankGpc), g.targetPool);
  g.phase = 'intro';
  g.feedback = null;
  g._introPlayed = false;
  g._sbSuccessComplete = false;
  resetTargetAudioFlags(g);
  cleanupSoundBox();
}

function soundBoxNextEmptySlotIndex(g) {
  return g.slots.findIndex(s => s.filled == null);
}

function soundBoxAllFilled(g) {
  return g.slots.every(s => s.filled != null);
}

function validateSoundBox(g) {
  const wrongIndices = [];
  g.slots.forEach((slot, i) => {
    const exp = normalizeGpcKey(slot.expectedGpc);
    const got = normalizeGpcKey(slot.filled || '');
    if (got !== exp) wrongIndices.push(i);
  });
  return { ok: wrongIndices.length === 0, wrongIndices };
}

function markSoundBoxWrongSlots(g, wrongIndices) {
  g.slots.forEach(s => { s.wrong = false; });
  wrongIndices.forEach(i => { if (g.slots[i]) g.slots[i].wrong = true; });
}

function soundBoxCanInteract(g) {
  return g.phase === 'intro' || g.phase === 'spell' || g.phase === 'retry';
}

function soundBoxEnterValidate() {
  const g = state.game;
  if (!g || g.type !== 'soundBox' || !soundBoxCanInteract(g) || !soundBoxAllFilled(g)) return;
  g.attempts++;
  const result = validateSoundBox(g);
  if (result.ok) {
    if (!g.roundHadError) g.correct++;
    confetti();
    g.feedback = { correct: true, message: correctFeedback(g.currentTarget, 'gpc', 'soundBox') };
    g.history.push({ target: g.currentTarget, correct: !g.roundHadError, type: 'gpc' });
    g.roundHadError = false;
    g.roundMistakeLogged = false;
    g.phase = 'roundEnd';
    g._sbSuccessComplete = false;
    g._spokenCorrect = false;
  } else {
    markSoundBoxWrongSlots(g, result.wrongIndices);
    g.roundHadError = true;
    if (!g.roundMistakeLogged) {
      g.history.push({ target: g.currentTarget, correct: false, type: 'gpc' });
      g.roundMistakeLogged = true;
    }
    g.feedback = { correct: false, message: 'Try again.' };
    g.phase = 'retry';
  }
  render();
}

function soundBoxPickGpc(gpc) {
  const g = state.game;
  if (!g || g.type !== 'soundBox' || !soundBoxCanInteract(g)) return;
  const slotIdx = soundBoxNextEmptySlotIndex(g);
  if (slotIdx < 0) return;
  sfxClick();
  const slot = g.slots[slotIdx];
  slot.filled = soundBoxResolveFill(gpc, slot);
  slot.wrong = false;
  if (g.phase === 'intro') g.phase = 'spell';
  if (g.phase === 'retry') g.feedback = null;
  if (soundBoxAllFilled(g)) {
    setTimeout(() => {
      if (state.game === g && soundBoxCanInteract(g) && soundBoxAllFilled(g)) {
        soundBoxEnterValidate();
      }
    }, 350);
  }
  render();
}

function renderSoundBoxBankChip(gpc) {
  const key = normalizeGpcKey(gpc);
  if (isMagicEGpcKey(key)) return escapeHtmlText(key);
  return escapeHtmlText(gpc);
}

function soundBoxMagicSuffixHtml(g) {
  if (!g.magicSuffix) return '';
  const magicSlot = g.slots.find(s => s.magicVowelSlot);
  const placed = magicSlot && magicSlot.filled != null;
  if (placed) {
    return `<span id="soundBoxMagicE" class="sound-box-magic-e" aria-label="silent e">${g.magicSuffix}</span>`;
  }
  return `<span id="soundBoxMagicE" class="sound-box-magic-e-line" aria-hidden="true"></span>`;
}

window.soundBoxShowHint = () => {
  const g = state.game;
  if (!g || g.type !== 'soundBox' || g.phase === 'hint' || g.phase === 'roundEnd' || !soundBoxCanInteract(g)) return;
  sfxClick();
  if (g._hintTimer) { clearTimeout(g._hintTimer); g._hintTimer = null; }
  g.phase = 'hint';
  render();
  g._hintTimer = setTimeout(() => {
    if (state.game !== g || g.phase !== 'hint') return;
    g.phase = g.feedback ? 'retry' : 'spell';
    g._hintTimer = null;
    render();
  }, HW_BOX_HINT_MS);
};

function soundBoxClearSlot(slotIdx) {
  const g = state.game;
  if (!g || g.type !== 'soundBox' || !soundBoxCanInteract(g)) return;
  const slot = g.slots[slotIdx];
  if (!slot || slot.filled == null) return;
  sfxClick();
  slot.filled = null;
  slot.wrong = false;
  g.phase = 'spell';
  g.feedback = null;
  render();
}

function soundBoxHideExampleWordReveal() {
  const el = document.getElementById('soundBoxExampleReveal');
  if (!el) return;
  el.textContent = '';
  el.classList.remove('sound-box-example-reveal--visible');
  el.setAttribute('aria-hidden', 'true');
}

function soundBoxShowExampleWordReveal(word) {
  const el = document.getElementById('soundBoxExampleReveal');
  if (!el || !word) return;
  el.textContent = word;
  el.classList.add('sound-box-example-reveal--visible');
  el.setAttribute('aria-hidden', 'false');
}

function cleanupSoundBox() {
  const g = state.game;
  soundBoxClearPlayingHighlight();
  soundBoxHideExampleWordReveal();
  if (!g) return;
  if (g._hintTimer) { clearTimeout(g._hintTimer); g._hintTimer = null; }
  if (g._sbSeqTimer) { clearTimeout(g._sbSeqTimer); g._sbSeqTimer = null; }
  if (g._sbSeqClipTimers) {
    g._sbSeqClipTimers.forEach(t => clearTimeout(t));
    g._sbSeqClipTimers = null;
  }
  if (g._sbSeqAudios?.length) {
    g._sbSeqAudios.forEach(a => { try { a.pause(); } catch (e) {} });
    g._sbSeqAudios = null;
  }
  if (g._sbSeqAudio) {
    try { g._sbSeqAudio.pause(); } catch (e) {}
    g._sbSeqAudio = null;
  }
}

function soundBoxHighlightSlot(g, slotIdx) {
  const slot = g?.slots?.[slotIdx];
  const flashMagicE = !!slot?.magicVowelSlot;
  document.querySelectorAll('[data-sb-slot]').forEach(btn => {
    const idx = parseInt(btn.getAttribute('data-sb-slot'), 10);
    btn.classList.toggle('sound-box-cell--playing', idx === slotIdx);
  });
  const magicE = document.getElementById('soundBoxMagicE');
  if (magicE) magicE.classList.toggle('sound-box-magic-e--playing', flashMagicE);
}

function soundBoxClearPlayingHighlight() {
  document.querySelectorAll('.sound-box-cell--playing').forEach(el => {
    el.classList.remove('sound-box-cell--playing');
  });
  document.getElementById('soundBoxMagicE')?.classList.remove('sound-box-magic-e--playing');
}

function playSoundBoxSlotClips(g, clips, slotIdx, onSlotDone, { staggerScale = 1 } = {}) {
  if (!clips.length) { onSlotDone(); return; }
  g._sbSeqAudios = g._sbSeqAudios || [];
  g._sbSeqClipTimers = g._sbSeqClipTimers || [];
  let pending = clips.length;
  let highlighted = false;

  const finishClip = () => {
    pending--;
    if (pending <= 0) {
      soundBoxClearPlayingHighlight();
      _lastAudioEndAt = Date.now();
      onSlotDone();
    }
  };

  clips.forEach(clip => {
    const staggerMs = Math.round((clip.staggerMs || 0) * staggerScale);
    const t = setTimeout(() => {
      if (state.game !== g) return;
      const audioData = clip.audioData || resolveSoundBoxGpcAudio(clip.label, soundBoxAudioContext(g));
      if (!audioData) { finishClip(); return; }
      if (!highlighted) {
        highlighted = true;
        soundBoxHighlightSlot(g, slotIdx);
      }
      try {
        const audio = new Audio(audioData);
        g._sbSeqAudios.push(audio);
        g._sbSeqAudio = audio;
        const onEnd = () => {
          const i = g._sbSeqAudios.indexOf(audio);
          if (i >= 0) g._sbSeqAudios.splice(i, 1);
          finishClip();
        };
        audio.addEventListener('ended', onEnd);
        audio.addEventListener('error', onEnd);
        audio.play().catch(onEnd);
      } catch (e) {
        finishClip();
      }
    }, staggerMs);
    g._sbSeqClipTimers.push(t);
  });
}

function playSoundBoxSlotSequence(g, {
  gapMs = SOUND_BOX_AUDIO_GAP_MS,
  initialDelayMs = 400,
  thenPlayWord = '',
  markSpoken = false,
  revealWordOnPlay = false,
  keepWordVisibleAfterPlay = false,
  clipStaggerScale = 1,
  onComplete = null
} = {}) {
  if (!g || g.type !== 'soundBox') return false;
  const audioCtx = soundBoxAudioContext(g);
  const slotPlans = g.slots.map((slot, slotIdx) => ({
    slotIdx,
    clips: resolveSoundBoxSlotAudioClips(slot, audioCtx)
  })).filter(p => p.clips.length);
  const word = String(thenPlayWord ?? '').trim();
  if (!slotPlans.length && !(word && hasExampleWordAudio(word))) return false;

  cleanupSoundBox();
  if (markSpoken) g._spoken = true;

  let planIdx = 0;
  let isFirstSlot = true;

  const finishAll = () => {
    soundBoxClearPlayingHighlight();
    if (word && hasExampleWordAudio(word)) {
      speakWithCallback(word, () => {
        if (revealWordOnPlay) soundBoxShowExampleWordReveal(word);
        if (onComplete) onComplete();
      }, 'hw');
      return;
    }
    if (revealWordOnPlay && word) soundBoxShowExampleWordReveal(word);
    if (onComplete) onComplete();
  };

  const playNextSlot = () => {
    if (planIdx >= slotPlans.length || state.game !== g) {
      finishAll();
      return;
    }
    const { slotIdx, clips } = slotPlans[planIdx++];
    let delay = 0;
    if (isFirstSlot) {
      delay = initialDelayMs;
    } else if (gapMs > 0) {
      delay = Math.max(300, _lastAudioEndAt + gapMs - Date.now());
    }
    isFirstSlot = false;
    g._sbSeqTimer = setTimeout(() => {
      if (state.game !== g) return;
      playSoundBoxSlotClips(g, clips, slotIdx, playNextSlot, { staggerScale: clipStaggerScale });
    }, delay);
  };

  if (slotPlans.length) playNextSlot();
  else finishAll();
  return true;
}

function playSoundBoxSequenceOnShow(g) {
  if (!g || g.type !== 'soundBox' || g._introPlayed || g.feedback) return;
  const exampleWord = g.currentExampleWord || resolveGpcExampleWord(g.currentTarget);
  const started = playSoundBoxSlotSequence(g, {
    gapMs: SOUND_BOX_AUDIO_GAP_MS,
    initialDelayMs: 400,
    thenPlayWord: exampleWord && hasExampleWordAudio(exampleWord) ? exampleWord : '',
    onComplete: () => {
      if (state.game !== g || g.phase !== 'intro') return;
      g.phase = 'spell';
      render();
    }
  });
  g._introPlayed = true;
  if (!started) {
    g.phase = 'spell';
    render();
  }
}

function playSoundBoxListen(g, exampleWord) {
  if (!g || g.type !== 'soundBox') return;
  const word = exampleWord && hasExampleWordAudio(exampleWord) ? exampleWord : '';
  playSoundBoxSlotSequence(g, {
    gapMs: 0,
    initialDelayMs: 0,
    thenPlayWord: word,
  });
}

function playSoundBoxSlotTap(g, slotIdx) {
  if (!g || g.type !== 'soundBox') return;
  const slot = g.slots?.[slotIdx];
  if (!slot || slot.filled != null) return;
  const clips = resolveSoundBoxSlotAudioClips(slot, soundBoxAudioContext(g));
  if (!clips.length) return;
  sfxClick();
  cleanupSoundBox();
  playSoundBoxSlotClips(g, clips, slotIdx, () => soundBoxClearPlayingHighlight());
}

function playSoundBoxSuccessSequence(g) {
  if (!g || g.type !== 'soundBox' || g.phase !== 'roundEnd' || !g.feedback?.correct || g._spokenCorrect) return;
  g._spokenCorrect = true;
  const exampleWord = g.currentExampleWord || resolveGpcExampleWord(g.currentTarget);
  const finishSuccess = () => {
    if (state.game !== g || g.phase !== 'roundEnd') return;
    g._sbSuccessComplete = true;
    render();
  };
  const started = playSoundBoxSlotSequence(g, {
    gapMs: SOUND_BOX_AUDIO_GAP_MS * 0.5,
    clipStaggerScale: 0.5,
    initialDelayMs: 200,
    thenPlayWord: exampleWord && hasExampleWordAudio(exampleWord) ? exampleWord : '',
    onComplete: finishSuccess,
  });
  if (started) return;
  if (exampleWord && hasExampleWordAudio(exampleWord)) {
    speakWithCallback(exampleWord, finishSuccess, 'hw');
    return;
  }
  finishSuccess();
}

window.nextSoundBoxRound = () => {
  sfxClick();
  const g = state.game;
  clearGameNextBtnTimer(g);
  g.roundIdx++;
  if (g.roundIdx >= g.totalRounds) {
    g.finished = true;
    cleanupSoundBox();
    render();
    return;
  }
  newSoundBoxRound();
  render();
};

function renderSoundBox(app) {
  const g = state.game;
  const exampleWord = g.currentExampleWord || resolveGpcExampleWord(g.currentTarget);
  const showBank = soundBoxCanInteract(g);
  const showHintBtn = showBank;

  const boxesHtml = g.slots.map(slot => {
    let cls = 'sound-box-cell';
    if (slot.filled) cls += ' filled';
    if (slot.wrong) cls += ' wrong-slot';
    const label = slot.filled
      ? (slot.geminate ? slot.geminateDisplay : slot.filled)
      : '';
    return `<div class="sound-box-slot"><button type="button" class="${cls}" data-sb-slot="${slot.idx}">${label}</button></div>`;
  }).join('');

  const magicHtml = soundBoxMagicSuffixHtml(g);

  const bankHtml = showBank
    ? g.bank.map(gpc =>
        `<button type="button" class="sound-box-bank-chip" data-sb-gpc="${gpc.replace(/"/g, '&quot;')}">${renderSoundBoxBankChip(gpc)}</button>`
      ).join('')
    : '';

  const playHeader = renderGamePlayHeader({
    contextHtml: '',
    feedbackMessage: g.phase === 'retry' && g.feedback ? g.feedback.message : (g.phase === 'roundEnd' && g.feedback ? g.feedback.message : null),
    feedbackCorrect: g.phase === 'roundEnd' ? true : (g.phase === 'retry' ? false : null),
    nextOnclick: null,
  });

  const roundEndPanel = (g.phase === 'roundEnd' && g.feedback) ? `
    <div class="sound-box-round-end fadeIn">
      ${g._sbSuccessComplete ? renderGameNextButton('Next', 'nextSoundBoxRound()') : ''}
    </div>` : '';

  const showExampleWord = g.phase === 'roundEnd' && g.feedback?.correct && g._sbSuccessComplete;
  const exampleRevealHtml = `<div id="soundBoxExampleReveal" class="sound-box-example-reveal${showExampleWord ? ' sound-box-example-reveal--visible' : ''}" aria-hidden="${showExampleWord ? 'false' : 'true'}">${showExampleWord ? escapeHtmlText(exampleWord || g.currentTarget) : ''}</div>`;

  const bottomPanel = showBank
    ? `<div class="sound-box-bank-grid" id="soundBoxBank">${bankHtml}</div>`
    : (g.phase === 'roundEnd' && g.feedback?.correct && !g._sbSuccessComplete
      ? `<div class="sound-box-bank-pending" aria-live="polite">Listen to each sound…</div>`
      : roundEndPanel);

  app.innerHTML = `
    <div class="sound-box-screen">
      <div class="sound-box-layout">
        ${renderGameTopBar(g)}
        ${playHeader}
        <div class="sound-box-playfield">
          <button type="button" id="soundBoxListen" class="sound-box-listen-btn bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white font-bold px-6 py-3 rounded-2xl text-lg shadow-lg">🔊 Listen</button>
          <div class="sound-box-spell-wrap">
            <div class="sound-box-spell-row">
              <div class="sound-box-word-row" aria-label="Sound boxes">
                ${boxesHtml}${magicHtml}
              </div>
              <button type="button" id="soundBoxHint" class="hw-box-hint-btn sound-box-hint-btn${showHintBtn ? '' : ' hw-box-hint-btn--placeholder'}" aria-label="Show the word briefly" title="Show the word briefly" ${showHintBtn ? '' : 'tabindex="-1"'}>💡</button>
            </div>
            ${exampleRevealHtml}
          </div>
          <div class="sound-box-bottom-slot">
            ${bottomPanel}
          </div>
        </div>
      </div>
      ${g.phase === 'hint' ? `
        <div class="hw-box-hint-overlay" role="dialog" aria-label="Hint">
          <div class="hw-box-hint-bar-wrap" style="--hw-hint-ms:${HW_BOX_HINT_MS}ms"><div class="hw-box-hint-bar"></div></div>
          <div class="sound-box-hint-word">${escapeHtmlText(exampleWord || g.currentTarget)}</div>
        </div>
      ` : ''}
    </div>`;

  setTimeout(() => {
    attachSoundBoxHandlers(g, exampleWord);
    if (g.phase !== 'roundEnd' || g._sbSuccessComplete) afterGameRenderArmNext();
  }, 0);
}

function attachSoundBoxHandlers(g, exampleWord) {
  document.getElementById('soundBoxListen')?.addEventListener('click', () => {
    playSoundBoxListen(g, exampleWord);
  });
  document.getElementById('soundBoxHint')?.addEventListener('click', () => soundBoxShowHint());
  if (g.phase === 'intro' && !g._introPlayed) {
    setTimeout(() => playSoundBoxSequenceOnShow(g), 400);
  }
  if (g.phase === 'roundEnd' && g.feedback?.correct && !g._spokenCorrect) {
    setTimeout(() => playSoundBoxSuccessSequence(g), 400);
  }
  if (soundBoxCanInteract(g)) {
    document.querySelectorAll('[data-sb-slot]').forEach(btn => {
      const slotIdx = parseInt(btn.getAttribute('data-sb-slot'), 10);
      btn.addEventListener('click', () => {
        if (g.slots[slotIdx]?.filled != null) {
          soundBoxClearSlot(slotIdx);
        } else if (g.slots[slotIdx]?.filled == null) {
          playSoundBoxSlotTap(g, slotIdx);
        }
      });
    });
    document.querySelectorAll('[data-sb-gpc]').forEach(btn => {
      btn.addEventListener('click', () => soundBoxPickGpc(btn.getAttribute('data-sb-gpc')));
    });
  }
}

function showBankPhase(g) {
  return soundBoxCanInteract(g);
}

// ============================================================
// CATCH THE SOUND
// ============================================================
function initCatchSound(needs) {
  const g = state.game;
  const targets = needs.targetGpcs.map(gpcPoolKey);
  const mastered = needs.masteredGpcs.map(gpcPoolKey);
  g.roundTargets = buildRoundTargets(needs, 'gpc', CHALLENGE_ROUNDS);
  g.targetPool = uniqueValidTokens([...targets, ...mastered], { caseSensitive: true });
  g.distractorPool = uniqueValidTokens(mastered.length > 0 ? mastered : targets, { caseSensitive: true });
  g.masteryStats = getCombinedMasteryStats(needs);
  if (g.roundTargets.length === 0) { g.empty = true; return; }
  g.lives = 5;
  g.maxLives = 5;
  g.correctNeeded = CHALLENGE_ROUNDS;
  g.roundIdx = 0;
  g.attempts = 0;
  g.correct = 0;
  g.won = false;
  g.catchPhase = 'play';
  g.catchFrozen = false;
  newCatchRound();
}

window.catchToggleFreeze = () => {
  const g = state.game;
  if (!g || g.type !== 'gpcCatch' || g.catchPhase === 'break' || g.finished) return;
  sfxClick();
  g.catchFrozen = !g.catchFrozen;
  render();
};

function startCatchBreak() {
  const g = state.game;
  if (g._timer) { clearTimeout(g._timer); g._timer = null; }
  g.catchPhase = 'break';
  g.feedback = null;
  const target = String(g.roundTargets[g.roundIdx] ?? '').trim();
  if (!isValidGameToken(target)) {
    g.roundIdx++;
    if (g.roundIdx >= g.roundTargets.length) { g.finished = true; return; }
    startCatchBreak();
    return;
  }
  g.breakExampleWord = resolveGpcExampleWord(target);
}

function advanceCatchAfterRound() {
  const g = state.game;
  if (g.correct >= g.correctNeeded) { g.finished = true; g.won = true; render(); return; }
  if (g.lives <= 0) { g.finished = true; g.won = false; render(); return; }
  g.roundIdx++;
  if (g.roundIdx >= g.roundTargets.length) {
    g.finished = true;
    g.won = g.correct >= g.correctNeeded;
    render();
    return;
  }
  startCatchBreak();
  render();
}

function newCatchRound() {
  const g = state.game;
  const target = String(g.roundTargets[g.roundIdx] ?? '').trim();
  if (!isValidGameToken(target)) {
    g.roundIdx++;
    if (g.roundIdx >= g.totalRounds) { g.finished = true; return; }
    newCatchRound();
    return;
  }
  g.currentTarget = target;
  g.currentExampleWord = resolveGpcExampleWord(target);
  g.currentOptions = buildCatchChallengeOptions(target, g.distractorPool, g.targetPool, 5, g.masteryStats);
  g.feedback = null;
  resetTargetAudioFlags(g);
  startCatchTimer(g);
}

function startCatchTimer(g) {
  if (g._timer) { clearTimeout(g._timer); g._timer = null; }
  g._timer = setTimeout(() => {
    if (state.view !== 'game' || state.game !== g || g.finished || g.feedback) return;
    g.lives--;
    g.attempts++;
    g.feedback = {
      timeout: true,
      picked: null,
      correct: false,
      message: pickFeedbackMessage([
        "Time's up! Say the sound.",
        `Say "${gpcDisplayPhoneme(g.currentTarget)}". Try again.`
      ])
    };
    render();
    setTimeout(() => {
      if (state.view !== 'game' || state.game !== g) return;
      advanceCatchAfterRound();
    }, 1600);
  }, CATCH_ROUND_SEC * 1000);
}

window.catchPick = (opt) => {
  const g = state.game;
  if (g.catchPhase === 'break' || g.feedback || g.finished) return;
  if (!isValidGameToken(opt)) return;
  if (g._timer) { clearTimeout(g._timer); g._timer = null; }
  sfxClick();
  const correct = opt === g.currentTarget;
  g.attempts++;
  g.feedback = {
    picked: opt,
    correct,
    message: correct
      ? correctFeedback(g.currentTarget, 'gpc', 'gpcCatch')
      : wrongFeedback(g.currentTarget, 'gpc', 'gpcCatch')
  };
  if (correct) {
    g.correct++;
    confetti();
    playTargetOnCorrect(g, g.currentTarget);
  } else {
    g.lives--;
  }
  render();
  setTimeout(() => {
    if (state.view !== 'game' || state.game !== g) return;
    advanceCatchAfterRound();
  }, correct ? CATCH_CORRECT_BREAK_MS : 1400);
};

window.catchGo = () => {
  sfxClick();
  const g = state.game;
  if (!g || g.type !== 'gpcCatch' || g.catchPhase !== 'break') return;
  g.catchPhase = 'play';
  newCatchRound();
  render();
};

window.catchQuit = () => {
  quitToProfile();
};

function renderCatchBreak(app) {
  const g = state.game;
  const word = String(g.breakExampleWord ?? '').trim();
  const livesHtml = Array.from({ length: g.maxLives }, (_, i) =>
    `<span class="text-xl">${i < g.lives ? '❤️' : '🤍'}</span>`
  ).join('');

  app.innerHTML = `
    <div class="flex flex-col p-2 sm:p-3" style="height:100vh; max-height:100vh; overflow:hidden;">
      <div class="max-w-3xl mx-auto w-full flex flex-col flex-1 min-h-0">
        <div class="game-top-bar mb-1">
          <button type="button" onclick="catchQuit()" class="text-white/70 hover:text-white text-xs sm:text-sm bg-white/5 px-2 py-1 rounded-lg">← Quit</button>
          <div class="flex gap-2 items-center text-xs sm:text-sm">
            <span class="bg-white/10 px-2 py-1 rounded-full">${livesHtml}</span>
          </div>
        </div>
        <div class="catch-break-screen">
          <div class="flex-1 flex items-center justify-center px-4">
            ${word ? `<p class="catch-break-word-wrap" aria-label="Next example word ${word}"><span class="catch-break-next-label">next</span><span class="catch-break-word">${word}</span></p>` : ''}
          </div>
          <div class="catch-break-go-wrap">
            <button type="button" onclick="catchGo()" class="game-next-btn catch-go-btn">GO!</button>
          </div>
        </div>
      </div>
    </div>`;
}

function renderCatchSound(app) {
  const g = state.game;
  if (g.catchPhase === 'break') return renderCatchBreak(app);
  const livesHtml = Array.from({length: g.maxLives}, (_, i) =>
    `<span class="text-xl">${i < g.lives ? '❤️' : '🤍'}</span>`
  ).join('');

  const driftClasses = shuffle(['drift1','drift2','drift3','drift4','drift5','drift6']);

  const optionsHtml = g.currentOptions.map((opt, i) => {
    const drift = driftClasses[i % driftClasses.length];
    let cls = `catchBubble ${drift} bg-gradient-to-br from-emerald-400 to-teal-600 splat w-full aspect-square flex items-center justify-center font-bold cursor-pointer shadow-2xl select-none`;
    if (g.catchFrozen) cls += ' catch-frozen';
    if (g.feedback) {
      if (opt === g.currentTarget) cls += ' ring-4 ring-green-400';
      else if (g.feedback.picked === opt) cls += ' ring-4 ring-red-400 opacity-50';
      else cls += ' opacity-30';
    }
    return `<div class="flex items-center justify-center p-1"><button class="${cls}" style="font-size: clamp(1.5rem, 5vw, 2.75rem);" data-option="${opt.replace(/"/g, '&quot;')}">${formatGpcCatchOptionLabel(opt)}</button></div>`;
  }).join('');

  const timerBar = !g.feedback
    ? `<div class="w-full bg-white/10 rounded-full h-2.5 overflow-hidden"><div class="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500" style="animation: countdownBar ${CATCH_ROUND_SEC}s linear forwards;"></div></div>`
    : `<div class="h-2.5"></div>`;
  const exampleWord = g.currentExampleWord || resolveGpcExampleWord(g.currentTarget);
  const exampleHint = g.feedback ? '' : renderGpcExampleHint(exampleWord);
  const playHeader = renderGamePlayHeader({
    feedbackMessage: g.feedback?.message,
    feedbackCorrect: g.feedback?.correct,
  });

  app.innerHTML = `
    <div class="gpc-splat-screen flex flex-col p-2 sm:p-3" style="height:100vh; max-height:100vh; overflow:hidden;">
      <div class="max-w-3xl mx-auto w-full flex flex-col flex-1 min-h-0 relative">
        <div class="game-top-bar mb-1 relative z-10">
          <button type="button" onclick="catchQuit()" class="text-white/70 hover:text-white text-xs sm:text-sm bg-white/5 px-2 py-1 rounded-lg">← Quit</button>
          <div class="flex gap-2 items-center">
            ${renderGameProgressPill(g)}
            <span class="bg-white/10 px-2 py-1 rounded-full text-xs sm:text-sm">${livesHtml}</span>
          </div>
        </div>
        ${exampleHint ? `<div class="gpc-example-corner">${exampleHint}</div>` : ''}
        ${playHeader}
        <div class="gpc-catch-timer flex-shrink-0">${timerBar}</div>
        <div class="gpc-splat-area flex-1 min-h-0 flex items-center justify-center w-full relative">
          <button type="button" onclick="catchToggleFreeze()" class="gpc-catch-freeze-btn${g.catchFrozen ? ' is-frozen' : ''}" title="${g.catchFrozen ? 'Resume bubble movement' : 'Freeze bubble movement'}">${g.catchFrozen ? '▶' : '⏸'}</button>
          <div class="gpc-splat-grid-wrap w-full" style="max-width: 480px;">
            <div class="grid grid-cols-3 gap-1 sm:gap-2 w-full pt-1 pr-1">
              ${optionsHtml}
            </div>
          </div>
        </div>
      </div>
    </div>`;

  setTimeout(() => {
    document.querySelectorAll('.catchBubble').forEach(btn => {
      btn.addEventListener('click', () => catchPick(btn.getAttribute('data-option')));
    });
    if (!g.feedback) setTimeout(() => playTargetOnShow(g, g.currentTarget), 400);
  }, 0);
}

// ============================================================
// WORD BOX (heart word spelling / Elkonin boxes)
// ============================================================
/* Tall / Short / Tail — single source of truth for Word Box letter zones */
const ELKONIN_TALL = new Set(['b', 'd', 'f', 'h', 'i', 'k', 'l', 't']); /* top line → baseline */
const ELKONIN_SHORT = new Set(['a', 'c', 'e', 'm', 'n', 'o', 'r', 's', 'u', 'v', 'w', 'x', 'z']); /* midline → baseline */
const ELKONIN_TAIL = new Set(['g', 'j', 'p', 'q', 'y']); /* body mid→base; tail in descender zone */

function getLetterBoxMeta(letter) {
  const c = String(letter).toLowerCase();
  if (ELKONIN_TAIL.has(c)) return { shape: 'descender', baseline: 'descend', dotted: c === 'j' };
  if (ELKONIN_TALL.has(c)) return { shape: 'tall', baseline: 'on', dotted: c === 'i' };
  if (ELKONIN_SHORT.has(c)) return { shape: 'short', baseline: 'on', dotted: false };
  return { shape: 'short', baseline: 'on', dotted: false };
}

/** Read handwriting zone heights from .elkonin-page CSS variables (stable before layout). */
function elkoninZoneHeights(box) {
  const page = box?.closest('.elkonin-page');
  const src = page || box || document.documentElement;
  const cs = getComputedStyle(src);
  const num = (name, fallback) => {
    const v = parseFloat(cs.getPropertyValue(name));
    return Number.isFinite(v) && v > 0 ? v : fallback;
  };
  return {
    x: num('--elkonin-x-h', 45),
    asc: num('--elkonin-asc-h', 37),
    desc: num('--elkonin-desc-h', 45)
  };
}

const ELKONIN_FONT_STACK = "'Andika', 'Sassoon Primary', 'Comic Sans MS', system-ui, sans-serif";
const ELKONIN_GLYPH_LINE_HEIGHT = 0.88; /* matches tall letters */
const ELKONIN_SHORT_SCALE = 1.3475; /* 0.98 × 1.25 × 1.10 — short letters fill mid→base */
const ELKONIN_DOTTED_I_SCALE = 0.5625; /* dotted i only; other tall letters unchanged */
const ELKONIN_TAIL_LIFT_RATIO = 0.10; /* tail glyphs nudged up within box, not slot */
const ELKONIN_FONT_WEIGHT_SHORT = 175; /* 75% less bold than 700 — matches tall letters */
const ELKONIN_FONT_WEIGHT_TALL = 175; /* tall + tail share weight and fit strategy */
let _elkoninMeasureCanvas;

function elkoninMeasureCanvas() {
  return _elkoninMeasureCanvas || (_elkoninMeasureCanvas = document.createElement('canvas'));
}

/** Font ink metrics for fitting letters to handwriting zones (Andika). */
function elkoninMeasureLetter(letter, fontSizePx, fontWeight) {
  const ctx = elkoninMeasureCanvas().getContext('2d');
  ctx.font = `${fontWeight} ${fontSizePx}px ${ELKONIN_FONT_STACK}`;
  const m = ctx.measureText(letter);
  const ascent = m.actualBoundingBoxAscent ?? fontSizePx * 0.72;
  const descent = m.actualBoundingBoxDescent ?? fontSizePx * 0.2;
  const width = m.width ?? fontSizePx * 0.55;
  return { ascent, descent, width, height: ascent + descent };
}

/** Largest size so tall letter fills sky line → base line. */
function elkoninFitTallSize(letter, maxH, maxW) {
  let lo = 6;
  let hi = maxH * 2.5;
  let best = lo;
  for (let i = 0; i < 52; i++) {
    const mid = (lo + hi) / 2;
    const ink = elkoninMeasureLetter(letter, mid, ELKONIN_FONT_WEIGHT_TALL);
    if (ink.height <= maxH && ink.width <= maxW) {
      best = mid;
      lo = mid;
    } else hi = mid;
  }
  return best;
}

/** Largest size so letter body fills short box (mid-line → base line) and fits width. */
function elkoninFitShortSize(letter, maxH, maxW) {
  let lo = 6;
  let hi = maxH * 2.5;
  let best = lo;
  for (let i = 0; i < 52; i++) {
    const mid = (lo + hi) / 2;
    const ink = elkoninMeasureLetter(letter, mid, ELKONIN_FONT_WEIGHT_SHORT);
    if (ink.ascent <= maxH && ink.width <= maxW) {
      best = mid;
      lo = mid;
    } else hi = mid;
  }
  return best;
}

function elkoninGlyphWeight(shape) {
  if (shape === 'tall' || shape === 'descender') return ELKONIN_FONT_WEIGHT_TALL;
  return ELKONIN_FONT_WEIGHT_SHORT;
}

/** Tall/short/tail: canvas descent lifts line box so ink baseline sits on target line. */
function elkoninPlaceGlyphOnBaseline(glyph, box, shape) {
  const lh = ELKONIN_GLYPH_LINE_HEIGHT;
  const letter = glyph.textContent.trim();
  const fs = parseFloat(glyph.style.fontSize) || parseFloat(getComputedStyle(glyph).fontSize);
  if (!fs) return;
  const m = elkoninMeasureLetter(letter, fs, elkoninGlyphWeight(shape));
  const descentPx = m.descent * lh;
  glyph.style.lineHeight = String(lh);
  glyph.style.position = 'absolute';
  glyph.style.left = '50%';
  glyph.style.margin = '0';
  glyph.style.padding = '0';
  glyph.style.maxWidth = '90%';
  glyph.style.visibility = 'visible';
  glyph.style.opacity = '1';
  glyph.style.transformOrigin = 'bottom center';
  glyph.style.transform = 'translateX(-50%)';
  if (shape === 'descender') {
    const tail = box.querySelector('.elkonin-zone-desc');
    const zones = elkoninZoneHeights(box);
    const tailH = tail?.offsetHeight > 2 ? tail.offsetHeight : zones.desc;
    const boxH = box.clientHeight > 2 ? box.clientHeight : zones.x + zones.desc;
    const liftPx = boxH * ELKONIN_TAIL_LIFT_RATIO;
    glyph.style.bottom = `calc(${tailH}px - ${descentPx}px)`;
    glyph.style.transform = `translateX(-50%) translateY(-${liftPx}px)`;
    return;
  }
  glyph.style.bottom = `calc(0px - ${descentPx}px)`;
}

function fitElkoninGlyphs() {
  if (state.game?.type !== 'hwBoxes') return;
  const page = document.querySelector('.elkonin-page');
  if (!page) return;
  const pad = 4;
  const lh = ELKONIN_GLYPH_LINE_HEIGHT;

  page.querySelectorAll('.elkonin-box.tall.filled').forEach(box => {
    const glyph = box.querySelector('.elkonin-glyph');
    if (!glyph) return;
    const letter = glyph.textContent.trim();
    if (!letter) return;
    const maxH = box.clientHeight - pad;
    const maxW = box.clientWidth - pad;
    if (maxH < 8 || maxW < 8) return;
    const size = elkoninFitTallSize(letter, maxH / lh, maxW);
    glyph.style.fontSize = `${size}px`;
    elkoninPlaceGlyphOnBaseline(glyph, box, 'tall');
    elkoninVerifyTallGlyph(glyph, box);
    if (letter === 'i') {
      glyph.style.fontSize = `${parseFloat(glyph.style.fontSize) * ELKONIN_DOTTED_I_SCALE}px`;
      elkoninPlaceGlyphOnBaseline(glyph, box, 'tall');
    }
  });

  page.querySelectorAll('.elkonin-box.short.filled').forEach(box => {
    const glyph = box.querySelector('.elkonin-glyph');
    if (!glyph) return;
    const letter = glyph.textContent.trim();
    if (!letter) return;
    const maxH = box.clientHeight - pad;
    const maxW = box.clientWidth - pad;
    if (maxH < 8 || maxW < 8) return;
    const size = elkoninFitShortSize(letter, maxH / lh, maxW) * ELKONIN_SHORT_SCALE;
    glyph.style.fontSize = `${size}px`;
    elkoninPlaceGlyphOnBaseline(glyph, box, 'short');
    elkoninVerifyShortGlyph(glyph, box);
  });

  page.querySelectorAll('.elkonin-box.descender.filled, .elkonin-box.desc.filled').forEach(box => {
    const glyph = box.querySelector('.elkonin-glyph');
    if (!glyph) return;
    const letter = glyph.textContent.trim();
    if (!letter) return;
    const maxH = box.clientHeight - pad;
    const maxW = box.clientWidth - pad;
    if (maxH < 8 || maxW < 8) return;
    const size = elkoninFitTallSize(letter, maxH / lh, maxW);
    glyph.style.fontSize = `${size}px`;
    elkoninPlaceGlyphOnBaseline(glyph, box, 'descender');
    elkoninVerifyTailGlyph(glyph, box);
  });
}

/** Short letter: body between mid and base; baseline on base line. */
function elkoninVerifyShortGlyph(glyph, box) {
  const pad = 1;
  let size = parseFloat(glyph.style.fontSize);
  const boxRect = box.getBoundingClientRect();
  for (let i = 0; i < 10; i++) {
    elkoninPlaceGlyphOnBaseline(glyph, box, 'short');
    const ink = elkoninInkRect(glyph);
    if (!ink) break;
    const gapTop = ink.top - boxRect.top;
    const gapBottom = boxRect.bottom - ink.bottom;
    if (gapTop < -pad) size *= 0.96;
    else if (gapBottom > pad + 2) size *= 0.97;
    else if (gapTop > pad && gapBottom <= pad + 2) size *= 1.04;
    else if (gapTop <= pad && gapBottom <= pad + 2) break;
    glyph.style.fontSize = `${size}px`;
  }
  elkoninPlaceGlyphOnBaseline(glyph, box, 'short');
}

/** Tall letter: top touches sky line (box top), baseline on base line (box bottom). */
function elkoninVerifyTallGlyph(glyph, box) {
  const pad = 2;
  const dotted = box.closest('.elkonin-slot')?.classList.contains('shape-dotted');
  let size = parseFloat(glyph.style.fontSize);
  const boxRect = box.getBoundingClientRect();
  for (let i = 0; i < 10; i++) {
    elkoninPlaceGlyphOnBaseline(glyph, box, 'tall');
    const ink = elkoninInkRect(glyph);
    if (!ink) break;
    const gapTop = ink.top - boxRect.top;
    const gapBottom = boxRect.bottom - ink.bottom;
    if (gapTop > pad + 2 || gapBottom > pad + 2) size *= 0.97;
    else if (!dotted && gapTop < -pad - 1) size *= 0.96;
    else if (gapTop > pad + 1 && gapBottom <= pad + 2) size *= 1.03;
    else if (gapTop <= pad + 1 && gapBottom <= pad + 2) break;
    glyph.style.fontSize = `${size}px`;
  }
  elkoninPlaceGlyphOnBaseline(glyph, box, 'tall');
}

/** Tail letter: body fills mid→base like tall fills sky→base; descender stays in tail zone. */
function elkoninVerifyTailGlyph(glyph, box) {
  const pad = 2;
  const body = box.querySelector('.elkonin-zone-body');
  if (!body) return;
  let size = parseFloat(glyph.style.fontSize);
  const boxRect = box.getBoundingClientRect();
  const bodyRect = body.getBoundingClientRect();
  for (let i = 0; i < 10; i++) {
    elkoninPlaceGlyphOnBaseline(glyph, box, 'descender');
    const ink = elkoninInkRect(glyph);
    if (!ink) break;
    const gapTop = ink.top - bodyRect.top;
    const gapBaseline = bodyRect.bottom - ink.bottom;
    const gapBottom = boxRect.bottom - ink.bottom;
    if (gapTop > pad + 2 || gapBaseline > pad + 2) size *= 0.97;
    else if (gapTop < -pad - 1 || gapBottom < -pad) size *= 0.96;
    else if (gapTop > pad + 1 && gapBaseline <= pad + 2) size *= 1.03;
    else if (gapTop <= pad + 1 && gapBaseline <= pad + 2 && gapBottom >= -pad) break;
    glyph.style.fontSize = `${size}px`;
  }
  elkoninPlaceGlyphOnBaseline(glyph, box, 'descender');
}

function elkoninInkRect(glyph) {
  try {
    const range = document.createRange();
    range.selectNodeContents(glyph);
    const r = range.getBoundingClientRect();
    return r.width > 0 && r.height > 0 ? r : null;
  } catch (_) {
    return glyph.getBoundingClientRect();
  }
}

function scheduleElkoninGlyphFit() {
  const run = () => fitElkoninGlyphs();
  const prep = () => {
    if (document.fonts?.load) {
      return Promise.all([
        document.fonts.load(`700 40px ${ELKONIN_FONT_STACK}`),
        document.fonts.load(`400 40px ${ELKONIN_FONT_STACK}`),
        document.fonts.load(`${ELKONIN_FONT_WEIGHT_SHORT} 40px ${ELKONIN_FONT_STACK}`),
        document.fonts.load(`${ELKONIN_FONT_WEIGHT_TALL} 40px ${ELKONIN_FONT_STACK}`)
      ]).then(run).catch(run);
    }
    run();
  };
  requestAnimationFrame(() => requestAnimationFrame(prep));
  if (document.fonts?.ready) document.fonts.ready.then(prep);
}

function buildElkoninSlots(word) {
  return [...word].map((ch, idx) => ({
    idx,
    expected: ch,
    filled: null,
    wrong: false,
    ...getLetterBoxMeta(ch)
  }));
}

const ELKONIN_BANK_ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

function buildElkoninBank() {
  const tiles = [];
  let id = 0;
  for (const row of ELKONIN_BANK_ROWS) {
    for (const ch of row) tiles.push({ id: id++, letter: ch });
  }
  return tiles;
}

function renderElkoninBankGrid() {
  return ELKONIN_BANK_ROWS.map(row =>
    `<div class="elkonin-bank-row">${[...row].map(ch =>
      `<button type="button" class="elkonin-bank-tile" data-bank-letter="${ch}">${ch}</button>`
    ).join('')}</div>`
  ).join('');
}

function hwBoxesSpelledWord(g) {
  return g.slots.map(s => s.filled || '').join('');
}

function hwBoxesAllFilled(g) {
  return g.slots.every(s => s.filled);
}

function validateHwBoxesSpelling(g) {
  const target = g.currentTarget;
  const spelled = hwBoxesSpelledWord(g);
  const wrongIndices = [];
  const norm = (s) => String(s).toLowerCase();
  const t = norm(target);
  const s = norm(spelled);
  if (s === t) return { ok: true, wrongIndices };
  for (let i = 0; i < g.slots.length; i++) {
    const slot = g.slots[i];
    const exp = norm(slot.expected);
    const got = norm(slot.filled || '');
    if (got !== exp) wrongIndices.push(i);
  }
  if (wrongIndices.length === 0 && s !== t) {
    for (let i = 0; i < g.slots.length; i++) wrongIndices.push(i);
  }
  return { ok: false, wrongIndices };
}

function markHwBoxesWrongSlots(g, wrongIndices) {
  g.slots.forEach(s => { s.wrong = false; });
  wrongIndices.forEach(i => { if (g.slots[i]) g.slots[i].wrong = true; });
}

function renderElkoninBoxInner(letter, shape) {
  const glyph = letter ? `<span class="elkonin-glyph">${letter}</span>` : '';
  if (shape === 'tall') {
    return `<div class="elkonin-box-stack">
      <div class="elkonin-zone-asc" aria-hidden="true"></div>
      <div class="elkonin-zone-body" aria-hidden="true"></div>
    </div>${glyph || ''}`;
  }
  if (shape === 'descender') {
    return `<div class="elkonin-box-stack">
      <div class="elkonin-zone-body" aria-hidden="true"></div>
      <div class="elkonin-zone-desc" aria-hidden="true"></div>
    </div>${glyph || ''}`;
  }
  return `<div class="elkonin-box-stack"><div class="elkonin-zone-body" aria-hidden="true"></div></div>${glyph || ''}`;
}

function hwBoxesLowFeedback(word) {
  return pickFeedbackMessage([
    `Yes! Say “${word}” again.`,
    `Good! Write “${word}” in the air.`,
    `Right! That is “${word}”.`
  ]);
}

const WORD_BOX_CONTEXT = {
  'too': ['It is ____ hot!', 'That is ____ big!', 'I am ____ tired.'],
  'the': ['Look at ____ sun.', 'The ____ cat is soft.'],
  'to': ['Go ____ bed now.', 'I walk ____ school.'],
  'said': ['She ____ hello.', 'Dad ____ stop.'],
  'was': ['It ____ fun.', 'He ____ here.'],
  'you': ['I see ____.', 'How are ____?'],
  'are': ['We ____ here.', 'They ____ kind.'],
  'all': ['We are ____ done!', 'We ____ ran.'],
};

function isWordBoxBlankNotFirst(sentence) {
  const first = String(sentence).trim().split(/\s+/)[0] || '';
  return first !== '____' && !/^_____?$/.test(first);
}

function getWordBoxContextSentence(word, g) {
  const entries = getHwBlankEntries(word, g?.targetPool || []);
  const valid = entries
    .map(e => e.s.replace(/_____/g, '____'))
    .filter(isWordBoxBlankNotFirst);
  if (!valid.length) return '';
  const key = getHwSentenceKey(word);
  if (g) {
    if (!g.contextDecks) g.contextDecks = {};
    if (!g.contextDecks[key]) g.contextDecks[key] = createCycleDeck(valid);
    const next = g.contextDecks[key].next();
    if (next) return next;
  }
  return valid[Math.floor(Math.random() * valid.length)];
}

function initHwBoxes(needs) {
  const g = state.game;
  g.roundTargets = buildRoundTargets(needs, 'hw', CHALLENGE_ROUNDS);
  g.targetPool = uniqueValidTokens([...needs.targetHws.map(x => x.hw), ...needs.masteredHws.map(x => x.hw)], { caseSensitive: true });
  g.contextDecks = {};
  g.totalRounds = CHALLENGE_ROUNDS;
  g.roundIdx = 0;
  g.correct = 0;
  g.attempts = 0;
  if (g.roundTargets.length === 0) { g.empty = true; return; }
  newHwBoxesRound();
}

function newHwBoxesRound() {
  const g = state.game;
  if (g._hintTimer) { clearTimeout(g._hintTimer); g._hintTimer = null; }
  g.roundHadError = false;
  g.roundMistakeLogged = false;
  if (g.roundIdx >= g.totalRounds) { g.finished = true; return; }
  g.currentTarget = String(g.roundTargets[g.roundIdx] ?? '').trim();
  if (!isValidGameToken(g.currentTarget)) {
    g.roundIdx++;
    if (g.roundIdx >= g.totalRounds) { g.finished = true; return; }
    newHwBoxesRound();
    return;
  }
  g.contextSentence = getWordBoxContextSentence(g.currentTarget, g);
  g.slots = buildElkoninSlots(g.currentTarget);
  g.bank = buildElkoninBank();
  g.phase = 'spell';
  g.feedback = null;
  resetTargetAudioFlags(g);
}

function hwBoxesNextEmptySlotIndex(g) {
  return g.slots.findIndex(s => s.filled == null);
}

function hwBoxesPickLetter(letter) {
  const g = state.game;
  if (g.phase !== 'spell' && g.phase !== 'retry') return;
  const slotIdx = hwBoxesNextEmptySlotIndex(g);
  if (slotIdx < 0) return;
  sfxClick();
  hwBoxesPlaceInSlot(slotIdx, letter);
}

window.hwBoxesShowHint = () => {
  const g = state.game;
  if (!g || g.type !== 'hwBoxes' || g.phase === 'hint' || g.phase === 'roundEnd' || g.phase === 'review') return;
  sfxClick();
  if (g._hintTimer) { clearTimeout(g._hintTimer); g._hintTimer = null; }
  g.phase = 'hint';
  render();
  g._hintTimer = setTimeout(() => {
    if (state.game !== g || g.phase !== 'hint') return;
    g.phase = 'spell';
    g._hintTimer = null;
    render();
  }, HW_BOX_HINT_MS);
};

function hwBoxesEnterReview() {
  const g = state.game;
  if ((g.phase !== 'spell' && g.phase !== 'retry') || !hwBoxesAllFilled(g)) return;
  g.phase = 'review';
  g.feedback = null;
  render();
}

function hwBoxesPlaceInSlot(slotIdx, letter) {
  const g = state.game;
  if (g.phase !== 'spell' && g.phase !== 'retry') return;
  const slot = g.slots[slotIdx];
  const ch = String(letter || '').toLowerCase();
  if (!slot || !ch) return;

  slot.filled = ch;
  slot.wrong = false;
  if (g.phase === 'retry') g.feedback = null;

  if (hwBoxesAllFilled(g)) {
    setTimeout(() => {
      if (state.game === g && (g.phase === 'spell' || g.phase === 'retry') && hwBoxesAllFilled(g)) {
        hwBoxesEnterReview();
      }
    }, 350);
  }
  render();
}

function hwBoxesClearSlot(slotIdx) {
  const g = state.game;
  if (g.phase !== 'spell' && g.phase !== 'retry') return;
  const slot = g.slots[slotIdx];
  if (!slot || slot.filled == null) return;
  slot.filled = null;
  slot.wrong = false;
  g.phase = 'spell';
  render();
}

window.hwBoxesReviewAnswer = (looksOk) => {
  const g = state.game;
  if (!g || g.type !== 'hwBoxes' || g.phase !== 'review') return;
  sfxClick();
  const result = validateHwBoxesSpelling(g);

  if (looksOk && result.ok) {
    if (!g.roundHadError) g.correct++;
    confetti();
    g.feedback = { correct: true, message: hwBoxesLowFeedback(g.currentTarget) };
    playTargetOnCorrect(g, g.currentTarget);
    g.history.push({ target: g.currentTarget, correct: !g.roundHadError, type: 'hw' });
    g.roundHadError = false;
    g.roundMistakeLogged = false;
    g.phase = 'roundEnd';
    render();
    return;
  }

  if (!looksOk) {
    g.feedback = null;
    g.phase = 'spell';
    render();
    return;
  }

  markHwBoxesWrongSlots(g, result.wrongIndices);
  g.roundHadError = true;
  if (!g.roundMistakeLogged) {
    g.history.push({ target: g.currentTarget, correct: false, type: 'hw' });
    g.roundMistakeLogged = true;
  }
  g.feedback = { correct: false, message: 'Try again.' };
  g.phase = 'retry';
  render();
};

window.nextHwBoxesRound = () => {
  sfxClick();
  const g = state.game;
  clearGameNextBtnTimer(g);
  g.roundIdx++;
  if (g.roundIdx >= g.totalRounds) {
    g.finished = true;
    render();
    return;
  }
  newHwBoxesRound();
  render();
};

function renderHwBoxes(app) {
  const g = state.game;
  const audioOk = hasAudio(g.currentTarget);
  const useSpellLayout = g.phase === 'spell' || g.phase === 'retry' || g.phase === 'review' || g.phase === 'roundEnd';
  const showBank = g.phase === 'spell' || g.phase === 'retry';
  const showLine = g.phase === 'spell' || g.phase === 'retry' || g.phase === 'review';

  const boxesHtml = g.slots.map(slot => {
    let cls = `elkonin-box ${slot.shape}`;
    if (slot.dotted) cls += ' shape-dotted';
    if (slot.filled) cls += ' filled';
    if (slot.wrong) cls += ' wrong-slot';
    const inner = renderElkoninBoxInner(slot.filled, slot.shape);
    return `<div class="elkonin-slot shape-${slot.shape}${slot.dotted ? ' shape-dotted' : ''}">
      <div class="elkonin-pad-top" aria-hidden="true"></div>
      <div class="${cls}" data-slot-idx="${slot.idx}" draggable="false">${inner}</div>
      <div class="elkonin-pad-bottom" aria-hidden="true"></div>
    </div>`;
  }).join('');

  const bankHtml = renderElkoninBankGrid();

  const contextHtml = showLine && g.contextSentence && g.phase !== 'roundEnd'
    ? `<p class="hw-box-sentence game-context-sentence" aria-label="Example sentence">${g.contextSentence}</p>`
    : '';
  const playHeader = renderGamePlayHeader({
    contextHtml,
    feedbackMessage: g.phase === 'retry' && g.feedback ? g.feedback.message : null,
    feedbackCorrect: g.phase === 'retry' ? false : null,
    nextOnclick: null,
  });

  const reviewPanel = g.phase === 'review' ? `
      <div class="hw-box-review-panel fadeIn">
        <p class="hw-box-review-prompt">Does it look OK?</p>
        <div class="flex gap-4 justify-center flex-wrap">
          <button type="button" id="hwBoxesYes" class="bg-green-500/50 hover:bg-green-500/70 border-2 border-green-300 w-16 h-16 rounded-2xl text-3xl font-bold" aria-label="Yes">✓</button>
          <button type="button" id="hwBoxesNo" class="bg-orange-500/40 hover:bg-orange-500/60 border-2 border-orange-300 w-16 h-16 rounded-2xl text-3xl font-bold" aria-label="Try again">✗</button>
        </div>
      </div>` : '';

  const roundEndPanel = (g.phase === 'roundEnd' && g.feedback) ? `
      <div class="hw-box-review-panel hw-box-round-end-panel fadeIn">
        <p class="hw-box-review-prompt text-green-300">${g.feedback.message}</p>
        ${renderGameNextButton('Next', 'nextHwBoxesRound()')}
      </div>` : '';

  const bottomPanel = showBank
    ? `<div class="hw-box-bottom-dock"><div class="elkonin-bank-grid" id="elkoninBankGrid">${bankHtml}</div></div>`
    : `<div class="hw-box-bottom-dock">${reviewPanel || roundEndPanel}</div>`;

  app.innerHTML = `
    <div class="hw-box-screen min-h-screen p-4 md:p-8">
      <div class="max-w-4xl mx-auto">
        ${renderGameTopBar(g)}
        ${playHeader}
        <div class="flex justify-center mb-4">
          <button type="button" id="hwBoxesListen" class="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white font-bold px-6 py-3 rounded-2xl text-lg shadow-lg">🔊 Listen</button>
        </div>

        ${useSpellLayout ? `
        <div class="hw-box-spell-area">
        <div class="hw-box-spell-row">
          <p class="hw-box-context" aria-hidden="true"></p>
          <div class="hw-box-elkonin-wrap">
        <div class="elkonin-page mb-0">
          <div class="elkonin-line-wrap">
            <div class="elkonin-handwriting-guides" aria-hidden="true">
              <div class="elkonin-guide elkonin-guide-sky"></div>
              <div class="elkonin-guide elkonin-guide-mid"></div>
              <div class="elkonin-guide elkonin-guide-base"></div>
              <div class="elkonin-guide elkonin-guide-worm"></div>
            </div>
            <div class="elkonin-boxes-row" id="elkoninBoxesRow">${boxesHtml}</div>
          </div>
        </div>
          </div>
          <button type="button" id="hwBoxesHint" class="hw-box-hint-btn${showBank ? '' : ' hw-box-hint-btn--placeholder'}" aria-label="Show the word briefly" title="Show the word briefly" ${showBank ? '' : 'tabindex="-1"'}>💡</button>
        </div>
          ${bottomPanel}
        </div>
        ` : `
        <div class="elkonin-page mb-4 opacity-90">
          <div class="elkonin-line-wrap">
            <div class="elkonin-handwriting-guides" aria-hidden="true">
              <div class="elkonin-guide elkonin-guide-sky"></div>
              <div class="elkonin-guide elkonin-guide-mid"></div>
              <div class="elkonin-guide elkonin-guide-base"></div>
              <div class="elkonin-guide elkonin-guide-worm"></div>
            </div>
            <div class="elkonin-boxes-row" id="elkoninBoxesRow">${boxesHtml}</div>
          </div>
        </div>
        `}
      </div>
      ${g.phase === 'hint' ? `
        <div class="hw-box-hint-overlay" role="dialog" aria-label="Hint">
          <div class="hw-box-hint-bar-wrap" style="--hw-hint-ms:${HW_BOX_HINT_MS}ms"><div class="hw-box-hint-bar"></div></div>
          <div class="hw-box-hint-word">${g.currentTarget}</div>
        </div>
      ` : ''}
    </div>`;

  setTimeout(() => {
    attachHwBoxesHandlers(g);
    scheduleElkoninGlyphFit();
    afterGameRenderArmNext();
  }, 0);
}

function attachHwBoxesHandlers(g) {
  const listenBtn = document.getElementById('hwBoxesListen');
  if (listenBtn) listenBtn.addEventListener('click', () => playTargetListen(g.currentTarget));
  document.getElementById('hwBoxesHint')?.addEventListener('click', () => hwBoxesShowHint());

  if (g.phase === 'spell') setTimeout(() => playTargetOnShow(g, g.currentTarget), 400);

  if (g.phase === 'review') {
    document.getElementById('hwBoxesYes')?.addEventListener('click', () => hwBoxesReviewAnswer(true));
    document.getElementById('hwBoxesNo')?.addEventListener('click', () => hwBoxesReviewAnswer(false));
    return;
  }

  if (g.phase !== 'spell' && g.phase !== 'retry') return;

  document.querySelectorAll('.elkonin-bank-tile').forEach(tile => {
    const letter = tile.getAttribute('data-bank-letter');
    tile.addEventListener('click', () => hwBoxesPickLetter(letter));
  });

  document.querySelectorAll('.elkonin-box').forEach(box => {
    const slotIdx = parseInt(box.getAttribute('data-slot-idx'), 10);
    box.addEventListener('click', () => {
      if (g.slots[slotIdx].filled == null) return;
      sfxClick();
      hwBoxesClearSlot(slotIdx);
    });
  });

  scheduleElkoninGlyphFit();
}

// ============================================================
// FILL IN THE BLANK
// ============================================================
function initHwBlank(needs) {
  const g = state.game;
  g.roundTargets = buildRoundTargets(needs, 'hw', CHALLENGE_ROUNDS);
  g.targetPool = uniqueValidTokens([
    ...needs.targetHws.map(x => x.hw),
    ...needs.masteredHws.map(x => x.hw),
  ], { caseSensitive: true });
  g.sentenceDecks = {};
  g.contextDecks = {};
  if (g.roundTargets.length === 0) { g.empty = true; return; }
  g.totalRounds = CHALLENGE_ROUNDS;
  g.roundIdx = 0;
  g.attempts = 0;
  g.correct = 0;
  newBlankRound();
}

function newBlankRound() {
  const g = state.game;
  if (g.roundIdx >= g.totalRounds) { g.finished = true; return; }
  const target = String(g.roundTargets[g.roundIdx] ?? '').trim();
  if (!isValidGameToken(target)) {
    g.roundIdx++;
    if (g.roundIdx >= g.totalRounds) { g.finished = true; return; }
    newBlankRound();
    return;
  }
  const key = getHwSentenceKey(target);
  const entries = getHwBlankEntries(target, g.targetPool);
  if (!g.sentenceDecks[key]) g.sentenceDecks[key] = createCycleDeck(entries);
  const entry = g.sentenceDecks[key].next();
  if (!entry || !entry.s) {
    g.roundIdx++;
    if (g.roundIdx >= g.totalRounds) { g.finished = true; return; }
    newBlankRound();
    return;
  }
  const curatedD = entry.d ? uniqueValidTokens(entry.d) : [];
  g.currentTarget = target;
  g.currentSentence = entry.s;
  g.currentOptions = buildBlankChallengeOptions(target, curatedD, g.targetPool, 3);
  g.feedback = null;
  g.roundHadError = false;
  resetTargetAudioFlags(g);
}

window.blankPick = (opt) => {
  const g = state.game;
  if (g.feedback) return;
  if (!isValidGameToken(opt)) return;
  sfxClick();
  const correct = opt.toLowerCase() === g.currentTarget.toLowerCase();
  if (correct) {
    g.attempts++;
    g.feedback = {
      picked: opt,
      correct: true,
      message: correctFeedback(g.currentTarget, 'hw', 'hwBlank')
    };
    if (!g.roundHadError) g.correct++;
    confetti();
    playTargetOnCorrect(g, g.currentTarget);
    g.history.push({ target: g.currentTarget, picked: opt, correct: !g.roundHadError, type: 'hw' });
    g.roundHadError = false;
  } else {
    g.roundHadError = true;
    g.feedback = {
      picked: opt,
      correct: false,
      message: challengeWrongFeedback(g.currentTarget, 'hw', 'hwBlank')
    };
  }
  render();
};

window.nextBlankRound = () => {
  clearGameNextBtnTimer(state.game);
  state.game.roundIdx++;
  newBlankRound();
  render();
};

function renderHwBlank(app) {
  const g = state.game;
  const blankAudioOk = hasAudio(g.currentTarget);
  const sentenceParts = g.currentSentence.split('_____');
  const blankAtStart = (sentenceParts[0] || '').trim().length === 0;
  const cap = (s) => s ? (s.charAt(0).toUpperCase() + s.slice(1)) : s;
  const answeredCorrect = !!(g.feedback && g.feedback.correct);

  const sentenceHtml = sentenceParts.map((part, i) =>
    i < sentenceParts.length - 1
      ? `${part}<span class="hw-blank-gap">?</span>`
      : part
  ).join('');

  const noExampleSentence = isGenericHwBlankSentence(g.currentSentence);
  const contextHtml = answeredCorrect ? '' : (
    noExampleSentence ? '' : renderHwBlankSentence(sentenceHtml)
  );
  const playHeader = renderGamePlayHeader({
    contextHtml,
    feedbackMessage: g.feedback?.message,
    feedbackCorrect: g.feedback?.correct,
    nextOnclick: challengeNextOnclick(g),
    nextLabel: challengeNextLabel(g),
  });

  let mainPanel = '';
  if (answeredCorrect) {
    mainPanel = renderHwBlankCompletedSentence(g.currentSentence, g.currentTarget, blankAtStart);
  } else {
    const optionsHtml = g.currentOptions.map((opt) => {
      const displayOpt = blankAtStart ? cap(opt) : opt;
      let cls = 'blankOption bg-gradient-to-br from-fuchsia-400 to-purple-600 rounded-2xl py-5 px-4 flex items-center justify-center gap-3 text-2xl md:text-3xl font-bold cursor-pointer transition transform hover:scale-105 shadow-xl';
      if (g.feedback) {
        if (opt.toLowerCase() === g.currentTarget.toLowerCase()) cls += ' ring-4 ring-green-400 scale-105';
        else if (g.feedback.picked === opt) cls += ' ring-4 ring-red-400 opacity-50 shake';
        else cls += ' opacity-30';
      }
      return `<button class="${cls}" data-option="${opt.replace(/"/g,'&quot;')}">${displayOpt}</button>`;
    }).join('');
    const listenBlock = blankAudioOk
      ? `<div class="text-center mb-6"><button type="button" id="blankListenBtn" class="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white font-bold px-8 py-4 rounded-2xl text-xl shadow-2xl transform hover:scale-105 transition">🔊 Listen</button></div>`
      : '<div class="mb-6"></div>';
    mainPanel = `${listenBlock}<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">${optionsHtml}</div>`;
  }

  app.innerHTML = `
    <div class="hw-blank-screen min-h-screen p-4 md:p-8${answeredCorrect ? ' hw-blank-screen--success' : ''}">
      <div class="max-w-4xl mx-auto hw-blank-screen-inner">
        ${renderGameTopBar(g)}
        ${playHeader}
        ${mainPanel}
      </div>
    </div>`;

  setTimeout(() => {
    if (!answeredCorrect) {
      document.querySelectorAll('.blankOption').forEach(btn => {
        btn.addEventListener('click', () => blankPick(btn.getAttribute('data-option')));
      });
      const blankListen = document.getElementById('blankListenBtn');
      if (blankListen) blankListen.addEventListener('click', () => playTargetListen(g.currentTarget));
      if (!g.feedback && isGenericHwBlankSentence(g.currentSentence)) {
        setTimeout(() => playTargetOnShow(g, g.currentTarget), 400);
      }
    }
    afterGameRenderArmNext();
  }, 0);
}

// ============================================================
// GAME END SCREEN
// ============================================================
function gameEndCorrectFraction(g) {
  return `${g.correct || 0}/${gameEndScoreTotal(g)}`;
}

function calcReadingGameStars(g) {
  if (!g.finished) return 0;
  return READING_GAME_BASE_STARS;
}

function renderGameEnd(app){
  const g = state.game;
  const scoreY = gameEndScoreTotal(g);
  const scoreX = g.correct || 0;
  const isPerfect = isReadingGamePerfect(g);

  let starsAwarded = 0;
  let perfectBonus = 0;
  const forFun = g.boardPlayer === 2;
  const isBoardActivity = !!(g.fromBoard || g.fromTagMe);
  if (!forFun && !g.pointsAwarded && !isBoardActivity) {
    starsAwarded = calcReadingGameStars(g);
    if (isPerfect) {
      perfectBonus = READING_GAME_PERFECT_BONUS;
      starsAwarded += perfectBonus;
    }
    if (starsAwarded > 0) addPoints(state.selectedStudent, starsAwarded);
    g.pointsAwarded = true;
    g.perfectBonusAwarded = perfectBonus;
  } else if (g.pointsAwarded) {
    starsAwarded = calcReadingGameStars(g);
    if (g.perfectBonusAwarded) starsAwarded += g.perfectBonusAwarded;
  }
  let trackBonusAwarded = false;
  if (!forFun && !g.trackMarked && READING_TRACK_GAME_IDS.includes(g.type)) {
    trackBonusAwarded = markTrackGamePlayed(state.selectedStudent, g.type);
    g.trackMarked = true;
    if (trackBonusAwarded && !g.fromBoard && !g.fromTagMe) {
      state.readingTrackBonusPopup = true;
    }
  }
  if (!forFun && g.fromBoard && g.type) {
    markBoardGamePlayed(state.selectedStudent, g.type);
    if (g.fromTagMe) markTagMeGamePlayed(state.selectedStudent, g.type);
  }

  const perfectBonusShown = g.perfectBonusAwarded || 0;
  let headlineHtml = '';
  let boardCelebrateHtml = '';
  if (isBoardActivity && !forFun) {
    boardCelebrateHtml = `<div class="game-end-board-celebrate fadeIn mb-3" aria-hidden="true">🎉✨🌟</div>`;
    headlineHtml = `<p class="text-xl font-semibold mb-4 arcade-instructions text-white/95">Good try! Practice makes progress!</p>`;
    setTimeout(() => confetti(), 150);
    if (isPerfect) setTimeout(() => confetti(), 450);
  } else if (isPerfect && !forFun && !isBoardActivity) {
    headlineHtml = `<div class="game-end-perfect-bonus fadeIn mb-4">
        <div class="game-end-perfect-bonus-title">Perfect score!</div>
        <div class="game-end-perfect-bonus-sub">+${perfectBonusShown} bonus stars</div>
      </div>`;
    spawnPerfectStarBurst();
    for (let i = 0; i < 3; i++) setTimeout(() => confetti(), i * 280);
  } else if (!forFun) {
    headlineHtml = `<p class="text-xl font-semibold mb-4 arcade-instructions text-white/95">Good try! Practice makes progress!</p>`;
  }

  const forFunNote = forFun ? '<p class="text-yellow-200/90 text-sm mb-4 arcade-instructions">Player 2 — playing for fun (no stars this turn)</p>' : '';
  const boardActivityNote = isBoardActivity && !forFun
    ? '<p class="text-white/75 text-sm mb-4 arcade-instructions">Board games don\'t award stars — reach the finish for a bonus!</p>'
    : '';
  const starsEarnedVal = forFun || isBoardActivity ? '—' : `+${starsAwarded}`;
  const playAgainOpts = g.fromBoard
    ? `{ fromBoard: true${g.fromTagMe ? ', fromTagMe: true' : ''}, boardPlayer: ${g.boardPlayer || 1}${g.boardSquare != null ? ', boardSquare: ' + g.boardSquare : ''} }`
    : `{ readingReturnView: '${g.readingReturnView || 'profileReadingGames'}' }`;
  const boardBackView = resolveProfileGameReturnView(g);
  const boardBackLabel = profileGameBackLabel(boardBackView);
  const boardBackAction = g.fromTagMe
    ? `sfxClick(); state.view='tagme'; resumeTagMeAfterActivity()`
    : (g.fromBoard ? `sfxClick(); resumeAdventureAfterActivity()` : `sfxClick(); state.view='${boardBackView}'; render()`);

  const trackBonusHtml = trackBonusAwarded
    ? `<p class="mt-4 text-yellow-200 font-semibold fadeIn arcade-instructions">🌟 All sound and word games complete! +${READING_TRACK_BONUS} bonus stars — ready to play again!</p>`
    : '';
  if (trackBonusAwarded) setTimeout(() => confetti(), 400);

  app.innerHTML = `
    <div class="min-h-screen flex items-center justify-center p-4">
      <div class="bg-white/10 backdrop-blur border border-white/20 rounded-3xl p-8 max-w-lg w-full text-center fadeIn">
        ${forFunNote}
        ${boardActivityNote}
        ${boardCelebrateHtml}
        ${headlineHtml}
        <div class="grid grid-cols-2 gap-3 mb-6 max-w-xs mx-auto">
          <div class="bg-white/10 rounded-xl p-4"><div class="text-3xl font-bold">${gameEndCorrectFraction(g)}</div><div class="text-xs text-white/70 mt-1">score</div></div>
          <div class="bg-yellow-400/20 rounded-xl p-4"><div class="text-3xl font-bold">${starsEarnedVal}</div><div class="text-xs text-white/70 mt-1">${forFun ? 'for fun' : 'stars earned'}</div></div>
        </div>
        ${trackBonusHtml}
        <div class="flex gap-3 justify-center flex-wrap${trackBonusAwarded ? ' mt-4' : ''}">
          ${forFun ? '' : `<button onclick="sfxClick(); startGame('${g.type}'${playAgainOpts ? ', ' + playAgainOpts : ''})" class="bg-white/20 hover:bg-white/30 px-5 py-2 rounded-xl">Play again</button>`}
          <button onclick="${boardBackAction}" class="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 px-5 py-2 rounded-xl font-semibold">${boardBackLabel}</button>
        </div>
      </div>
    </div>`;
}

// ============================================================
// THE STARCADE
// ============================================================
function renderArcade(app) {
  if (state.arcadeGame === 'menu' || !state.arcadeGame) return renderArcadeMenu(app);
  if (state.arcadeGame === 'ttt') return renderTTT(app);
  if (state.arcadeGame === 'c4') return renderC4(app);
  if (state.arcadeGame === 'slime') return renderTreasureHunter(app);
  if (state.arcadeGame === 'pong') return renderPong(app);
  if (state.arcadeGame === 'brickbreaker') return renderBrickBreaker(app);
  if (state.arcadeGame === 'snake') return renderSnake(app);
}

function renderArcadeMenu(app) {
  const points = getPoints(state.selectedStudent);
  const games = [
    { id: 'ttt', name: 'Tic-Tac-Toe', emoji: '⭕', desc: 'Three in a row. You vs the computer.', cost: STARCADE_GAME_COST, accent: 'ttt' },
    { id: 'c4', name: 'Connect 4', emoji: '🔴', desc: 'Drop your pieces. Get four in a row.', cost: STARCADE_GAME_COST, accent: 'c4' },
    { id: 'slime', name: 'Treasure Hunter', emoji: '🏴‍☠️', desc: 'Say each word, find treasures, and grab ⭐ bonus tiles for +3 clicks.', cost: STARCADE_GAME_COST, accent: 'slime' },
    { id: 'pong', name: 'Pong', emoji: '🏓', desc: 'Move your paddle. Hit power-ups. First to 3 wins.', cost: STARCADE_GAME_COST, accent: 'pong' },
    { id: 'brickbreaker', name: 'Brick Breaker', emoji: '🧱', desc: 'Break the brick wall. Catch power-ups. 3 lives to clear every block.', cost: STARCADE_GAME_COST, accent: 'brickbreaker' },
    { id: 'snake', name: 'Snake', emoji: '🐍', desc: 'Eat words and sounds to grow. Wrap around the edges. Don\'t bite yourself!', cost: STARCADE_GAME_COST, accent: 'snake' },
  ];
  const cards = games.map(g => {
    const canAfford = points >= g.cost;
    const lockedClass = canAfford ? '' : ' arcade-cabinet-card--locked';
    const menuStars = [12, 68, 124, 180].map((left, i) =>
      `<span class="arcade-menu-star" style="left:${left}px;top:${18 + i * 14}px;animation-delay:${i * 0.7}s">✦</span>`
    ).join('');
    return `
      <button type="button" onclick="${canAfford ? `launchArcadeGame('${g.id}', ${g.cost})` : ''}" ${!canAfford ? 'disabled' : ''} class="arcade-cabinet-card arcade-cabinet-card--${g.accent}${lockedClass}" aria-label="${g.name}, ${canAfford ? g.cost + ' stars' : 'need more stars'}">
        <div class="arcade-menu-stars" aria-hidden="true">${menuStars}</div>
        <div class="arcade-cabinet-marquee-trim" aria-hidden="true"></div>
        <div class="arcade-marquee">
          <div class="arcade-marquee-screen">
            <span class="arcade-marquee-icon" aria-hidden="true">${g.emoji}</span>
          </div>
          <h3 class="arcade-marquee-title arcade-title-friendly">${g.name}</h3>
        </div>
        <div class="arcade-cabinet-body">
          <p class="arcade-cabinet-desc arcade-instructions">${g.desc}</p>
          <div class="arcade-cabinet-panel" aria-hidden="true">
            <span class="arcade-cabinet-joystick"></span>
            <span class="arcade-cabinet-btn arcade-cabinet-btn--a"></span>
            <span class="arcade-cabinet-btn arcade-cabinet-btn--b"></span>
          </div>
          <div class="arcade-cabinet-cost">
            ${canAfford ? `Play (${g.cost} ⭐)` : `Need ${g.cost - points} more ⭐`}
          </div>
        </div>
        <div class="arcade-cabinet-plinth" aria-hidden="true"></div>
      </button>`;
  }).join('');

  app.innerHTML = `
    <div class="min-h-screen p-4 md:p-8">
      <div class="max-w-5xl mx-auto">
        <div class="flex justify-between items-center mb-6">
          <button onclick="sfxClick(); backToStudentMenu()" class="text-white/70 hover:text-white text-sm">← Back to menu</button>
          <span class="bg-yellow-400/20 px-4 py-2 rounded-full font-bold">⭐ ${points} stars</span>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-center mb-2 arcade-title-friendly">🌟 The Starcade</h1>
        <p class="arcade-instructions text-center text-white/85 mb-2">Use your stars to play fun games.</p>
        <div class="arcade-menu-grid fadeIn">${cards}</div>
      </div>
    </div>`;
}

window.launchArcadeGame = (gameId, cost) => {
  sfxClick();
  const name = state.selectedStudent;
  if (!spendPoints(name, cost)) {
    alert(`You need ${cost} ⭐ to play. You have ${getPoints(name)}.`);
    return;
  }
  state.arcadeFromBoard = false;
  initArcadeGameState(gameId);
  state.view = 'arcade';
  render();
};

window.exitArcadeGame = () => {
  sfxClick();
  if (state.arcadeFromBoard) {
    returnToBoardFromArcade();
    return;
  }
  teardownArcadeBoardSession();
  state.arcadeGame = 'menu';
  render();
};

function getArcadeExitHandler() {
  return state.arcadeFromBoard ? 'returnToBoardFromArcade()' : 'exitArcadeGame()';
}

function getArcadeEndSummary(gameId, a) {
  if (!a) return { title: 'Game over', statLine: '', detail: '' };
  if (gameId === 'ttt') {
    const title = a.winner === 'X' ? 'You won!' : a.winner === 'O' ? 'Computer won' : 'Draw';
    const moves = a.board.filter(c => c === 'X').length;
    const detail = a.winner === 'X' ? `+${STARCADE_WIN_BONUS} bonus stars` : '';
    return { title, statLine: `Your moves: ${moves}`, detail };
  }
  if (gameId === 'c4') {
    const title = a.winner === 'X' ? 'You won!' : a.winner === 'O' ? 'Computer won' : 'Draw';
    const pieces = a.board.flat().filter(c => c === 'X').length;
    const detail = a.winner === 'X' ? `+${STARCADE_WIN_BONUS} bonus stars` : '';
    return { title, statLine: `Pieces placed: ${pieces}`, detail };
  }
  if (gameId === 'slime') {
    const title = a.allFound ? 'All treasure found!' : 'Game over';
    const detail = (a.score || 0) > TREASURE_SCORE_BONUS_THRESHOLD ? `+${STARCADE_WIN_BONUS} bonus stars` : '';
    return { title, statLine: `Score: ${a.score || 0}`, detail };
  }
  if (gameId === 'pong') {
    const title = a.winner === 'player' ? 'You won!' : 'You lost';
    const detail = a.winner === 'player' ? `+${STARCADE_WIN_BONUS} bonus stars` : '';
    return { title, statLine: '', detail };
  }
  if (gameId === 'brickbreaker') {
    const title = a.won ? 'You won!' : 'Game over';
    const detail = a.won ? `+${STARCADE_WIN_BONUS} bonus stars` : '';
    return { title, statLine: a.won ? 'All bricks cleared!' : '', detail };
  }
  if (gameId === 'snake') {
    const title = 'Game over';
    const detail = (a.score || 0) >= 500 ? `+${STARCADE_WIN_BONUS} bonus stars` : '';
    return { title, statLine: `Score: ${a.score || 0}`, detail };
  }
  return { title: 'Game over', statLine: '', detail: '' };
}

function renderArcadeFinishedDock(gameId) {
  if (state.arcadeFromBoard) {
    return `<div class="game-end-board-celebrate mb-2" aria-hidden="true">🎉✨🌟</div>
      <p class="arcade-instructions text-white/90 text-sm mb-3">Good try! Practice makes progress!</p>
      <button type="button" onclick="showBoardReturnOkPrompt()" class="board-game-prompt-go" style="font-size:1rem;padding:0.65rem 1.75rem">OK</button>`;
  }
  const a = state.arcade;
  const points = getPoints(state.selectedStudent);
  const cost = STARCADE_GAME_COST;
  const summary = getArcadeEndSummary(gameId, a);
  const againBtn = points >= cost
    ? `<button type="button" onclick="launchArcadeGame('${gameId}', ${cost})" class="bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition px-5 py-2 rounded-xl font-semibold w-full max-w-xs">Play again (${cost} ⭐)</button>`
    : `<p class="arcade-instructions text-white/70 text-sm">Earn more stars by playing reading games</p>`;
  return `<div class="arcade-end-popup" role="dialog" aria-label="Game over">
    <div class="arcade-end-popup-inner">
      <p class="arcade-end-popup-title arcade-title-friendly">${summary.title}</p>
      ${summary.statLine ? `<p class="arcade-end-popup-stat">${summary.statLine}</p>` : ''}
      ${summary.detail ? `<p class="arcade-end-popup-detail">${summary.detail}</p>` : ''}
      <p class="arcade-instructions text-white/70 text-sm mb-3">You have ⭐ ${points}</p>
      <div class="arcade-end-popup-actions">
        ${againBtn}
        <button type="button" onclick="exitArcadeGame()" class="bg-white/10 hover:bg-white/20 px-5 py-2 rounded-xl w-full max-w-xs">Return to Starcade</button>
      </div>
    </div>
  </div>`;
}

// ============================================================
// PONG (embedded canvas game)
// ============================================================
function arcadeCanvasExitLabel() {
  return state.arcadeFromBoard ? 'Board' : 'Starcade';
}

function buildArcadeCanvasShellMarkup(frameId, frameSrc, frameTitle, dockHtml) {
  const exitLabel = arcadeCanvasExitLabel();
  return `
    <div class="arcade-canvas-shell" id="arcadeCanvasShell">
      <div class="arcade-canvas-stage flex flex-col">
        <div class="arcade-canvas-toolbar">
          <button type="button" onclick="exitArcadeGame()" class="arcade-pong-exit">← ${exitLabel}</button>
          <button type="button" onclick="toggleArcadeCanvasFullscreen()" class="arcade-canvas-fullscreen-btn" title="Toggle fullscreen" aria-label="Toggle fullscreen" aria-pressed="false">⛶</button>
        </div>
        <iframe id="${frameId}" src="${frameSrc}" class="arcade-pong-frame flex-1 w-full" title="${frameTitle}" allow="autoplay"></iframe>
      </div>
      ${dockHtml ? `<div class="arcade-play-dock arcade-pong-status text-center flex gap-2 justify-center flex-wrap items-center">${dockHtml}</div>` : ''}
    </div>`;
}

function getArcadeCanvasShell() {
  return document.getElementById('arcadeCanvasShell');
}

function requestArcadeCanvasFullscreen() {
  const shell = getArcadeCanvasShell();
  if (!shell) return;
  const active = document.fullscreenElement || document.webkitFullscreenElement;
  if (active === shell) return;
  const fn = shell.requestFullscreen || shell.webkitRequestFullscreen;
  if (fn) fn.call(shell).catch(() => {});
}

function exitArcadeCanvasFullscreen() {
  const active = document.fullscreenElement || document.webkitFullscreenElement;
  if (!active) return;
  const fn = document.exitFullscreen || document.webkitExitFullscreen;
  if (fn) fn.call(document).catch(() => {});
}

window.toggleArcadeCanvasFullscreen = () => {
  const shell = getArcadeCanvasShell();
  if (!shell) return;
  const active = document.fullscreenElement || document.webkitFullscreenElement;
  if (active === shell) exitArcadeCanvasFullscreen();
  else requestArcadeCanvasFullscreen();
};

function mountArcadeCanvasShell() {
  const shell = getArcadeCanvasShell();
  if (!shell) return;
  document.body.classList.add('arcade-canvas-active');
  if (!window._arcadeCanvasOnFsChange) {
    window._arcadeCanvasOnFsChange = () => {
      const s = getArcadeCanvasShell();
      const btn = s?.querySelector('.arcade-canvas-fullscreen-btn');
      if (!btn) return;
      const on = (document.fullscreenElement || document.webkitFullscreenElement) === s;
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    };
    document.addEventListener('fullscreenchange', window._arcadeCanvasOnFsChange);
    document.addEventListener('webkitfullscreenchange', window._arcadeCanvasOnFsChange);
  }
  if (!state.arcade?.finished) {
    requestArcadeCanvasFullscreen();
    requestAnimationFrame(() => requestArcadeCanvasFullscreen());
  }
}

function teardownArcadeCanvasShell() {
  document.body.classList.remove('arcade-canvas-active');
  exitArcadeCanvasFullscreen();
  if (window._arcadeCanvasOnFsChange) {
    document.removeEventListener('fullscreenchange', window._arcadeCanvasOnFsChange);
    document.removeEventListener('webkitfullscreenchange', window._arcadeCanvasOnFsChange);
    window._arcadeCanvasOnFsChange = null;
  }
}

function sendPongFocusWords() {
  const frame = document.getElementById('pongFrame');
  if (!frame || !frame.contentWindow) return;
  try {
    frame.contentWindow.postMessage({
      type: 'pong-focus-words',
      words: enrichArcadeFocusItems(getFocusItems(state.selectedStudent))
    }, '*');
  } catch (e) {}
}

function renderPong(app) {
  if (window._pongWinHandler) {
    window.removeEventListener('message', window._pongWinHandler);
  }
  window._pongWinHandler = (e) => {
    if (!e.data || !e.data.type) return;
    if (e.data.type === 'pong-game-over') {
      if (!state.arcade) state.arcade = { finished: false, endPopupReady: false };
      state.arcade.finished = true;
      state.arcade.winner = e.data.won ? 'player' : 'ai';
      state.arcade.endPopupReady = false;
      if (e.data.won) {
        confetti();
        awardStarcadeWinBonus('pong-win');
      }
      scheduleArcadeEndPopup();
      render();
    }
    if (e.data.type === 'pong-speak') {
      if (e.data.item) arcadeSpeakFocusItem(e.data.item);
      else if (e.data.word) speak(e.data.word);
    }
    if (e.data.type === 'pong-ready') sendPongFocusWords();
  };
  window.addEventListener('message', window._pongWinHandler);

  const a = state.arcade;
  const fromBoard = state.arcadeFromBoard;
  const dockHtml = (a && a.finished && a.endPopupReady)
    ? (fromBoard
      ? `<button type="button" onclick="showBoardReturnOkPrompt()" class="board-game-prompt-go" style="font-size:0.95rem;padding:0.55rem 1.5rem">OK</button>`
      : renderArcadeFinishedDock('pong'))
    : '';

  app.innerHTML = buildArcadeCanvasShellMarkup(
    'pongFrame',
    getHtmlGameEmbedUrl('PONG.html'),
    'Pong game',
    dockHtml
  );

  mountArcadeCanvasShell();
  const frame = document.getElementById('pongFrame');
  if (frame) frame.onload = () => sendPongFocusWords();

  if (window._pongParentPointer) {
    window.removeEventListener('mousemove', window._pongParentPointer);
    window.removeEventListener('pointermove', window._pongParentPointer);
  }
  window._pongParentPointer = (e) => {
    if (state.arcadeGame !== 'pong') return;
    const pongFrame = document.getElementById('pongFrame');
    if (!pongFrame?.contentWindow) return;
    const rect = pongFrame.getBoundingClientRect();
    try {
      pongFrame.contentWindow.postMessage({
        type: 'pong-pointer-y',
        clientY: e.clientY,
        frameTop: rect.top,
        frameHeight: rect.height
      }, '*');
    } catch (err) {}
  };
  window.addEventListener('mousemove', window._pongParentPointer, { passive: true });
  window.addEventListener('pointermove', window._pongParentPointer, { passive: true });
}

// ============================================================
// BRICK BREAKER (embedded canvas game)
// ============================================================
const BRICKBREAKER_BRICK_COUNT = 51;

function sendBrickBreakerFocusWords() {
  const frame = document.getElementById('brickBreakerFrame');
  if (!frame || !frame.contentWindow) return;
  try {
    frame.contentWindow.postMessage({
      type: 'brickbreaker-focus-words',
      words: enrichArcadeFocusItems(assignFocusItems(BRICKBREAKER_BRICK_COUNT))
    }, '*');
  } catch (e) {}
}

function renderBrickBreaker(app) {
  if (window._brickBreakerHandler) {
    window.removeEventListener('message', window._brickBreakerHandler);
  }
  window._brickBreakerHandler = (e) => {
    if (!e.data || !e.data.type) return;
    if (e.data.type === 'brickbreaker-game-over') {
      if (!state.arcade) state.arcade = { finished: false, endPopupReady: false };
      state.arcade.finished = true;
      state.arcade.won = !!e.data.won;
      state.arcade.endPopupReady = false;
      if (e.data.won) {
        confetti();
        awardStarcadeWinBonus('brickbreaker-win');
      }
      scheduleArcadeEndPopup();
      render();
    }
    if (e.data.type === 'brickbreaker-speak') arcadeSpeakFocusItem(e.data.item);
    if (e.data.type === 'brickbreaker-ready') sendBrickBreakerFocusWords();
  };
  window.addEventListener('message', window._brickBreakerHandler);

  const a = state.arcade;
  const fromBoard = state.arcadeFromBoard;
  const dockHtml = (a && a.finished && a.endPopupReady)
    ? (fromBoard
      ? `<button type="button" onclick="showBoardReturnOkPrompt()" class="board-game-prompt-go" style="font-size:0.95rem;padding:0.55rem 1.5rem">OK</button>`
      : renderArcadeFinishedDock('brickbreaker'))
    : '';

  app.innerHTML = buildArcadeCanvasShellMarkup(
    'brickBreakerFrame',
    getHtmlGameEmbedUrl('BRICKBREAKER.html'),
    'Brick Breaker game',
    dockHtml
  );

  mountArcadeCanvasShell();
  const frame = document.getElementById('brickBreakerFrame');
  if (frame) frame.onload = () => sendBrickBreakerFocusWords();

  if (window._brickBreakerParentPointer) {
    window.removeEventListener('mousemove', window._brickBreakerParentPointer);
    window.removeEventListener('pointermove', window._brickBreakerParentPointer);
  }
  window._brickBreakerParentPointer = (e) => {
    if (state.arcadeGame !== 'brickbreaker') return;
    const brickFrame = document.getElementById('brickBreakerFrame');
    if (!brickFrame?.contentWindow) return;
    const rect = brickFrame.getBoundingClientRect();
    try {
      brickFrame.contentWindow.postMessage({
        type: 'brickbreaker-pointer-x',
        clientX: e.clientX,
        frameLeft: rect.left,
        frameWidth: rect.width
      }, '*');
    } catch (err) {}
  };
  window.addEventListener('mousemove', window._brickBreakerParentPointer, { passive: true });
  window.addEventListener('pointermove', window._brickBreakerParentPointer, { passive: true });
}

// ============================================================
// SNAKE (embedded canvas game)
// ============================================================
function sendSnakeFocusWords() {
  const frame = document.getElementById('snakeFrame');
  if (!frame || !frame.contentWindow) return;
  try {
    frame.contentWindow.postMessage({
      type: 'snake-focus-words',
      words: enrichArcadeFocusItems(assignFocusItems(50))
    }, '*');
  } catch (e) {}
}

function renderSnake(app) {
  if (window._snakeHandler) {
    window.removeEventListener('message', window._snakeHandler);
  }
  window._snakeHandler = (e) => {
    if (!e.data || !e.data.type) return;
    if (e.data.type === 'snake-game-over') {
      if (!state.arcade) state.arcade = { finished: false, endPopupReady: false };
      state.arcade.finished = true;
      state.arcade.score = typeof e.data.score === 'number' ? e.data.score : 0;
      state.arcade.endPopupReady = false;
      if (state.arcade.score >= 500) {
        confetti();
        awardStarcadeWinBonus('snake-score');
      }
      scheduleArcadeEndPopup();
      render();
    }
    if (e.data.type === 'snake-speak') arcadeSpeakFocusItem(e.data.item);
    if (e.data.type === 'snake-ready') sendSnakeFocusWords();
  };
  window.addEventListener('message', window._snakeHandler);

  const a = state.arcade;
  const fromBoard = state.arcadeFromBoard;
  const dockHtml = (a && a.finished && a.endPopupReady)
    ? (fromBoard
      ? `<button type="button" onclick="showBoardReturnOkPrompt()" class="board-game-prompt-go" style="font-size:0.95rem;padding:0.55rem 1.5rem">OK</button>`
      : renderArcadeFinishedDock('snake'))
    : '';

  app.innerHTML = buildArcadeCanvasShellMarkup(
    'snakeFrame',
    getHtmlGameEmbedUrl('SNAKE.html'),
    'Snake game',
    dockHtml
  );

  mountArcadeCanvasShell();
  const frame = document.getElementById('snakeFrame');
  if (frame) frame.onload = () => sendSnakeFocusWords();
}

// ============================================================
// TIC-TAC-TOE
// ============================================================
window.tttMove = (idx) => {
  const a = state.arcade;
  if (a.finished || a.board[idx] || !a.playerTurn) return;
  sfxClick();
  if (a.cellItems[idx]) arcadeSpeakFocusItem(a.cellItems[idx]);

  a.board[idx] = 'X';
  a.playerTurn = false;
  const winInfo = tttCheckWin(a.board);
  if (winInfo || !a.board.includes(null)) {
    if (winInfo) {
      a.winner = winInfo.player; a.winLine = winInfo.line;
      if (winInfo.player === 'X') { setTimeout(()=>{ confetti(); }, 400); awardStarcadeWinBonus('ttt-win'); }
    }
    a.finished = true; render(); maybeShowBoardArcadeReturnPrompt(); return;
  }
  render();
  setTimeout(() => {
    const aiMove = tttAIMove(a.board);
    if (aiMove !== -1) {
      a.board[aiMove] = 'O';
      if (a.cellItems[aiMove]) arcadeSpeakFocusItem(a.cellItems[aiMove]);
    }
    const w2 = tttCheckWin(a.board);
    if (w2 || !a.board.includes(null)) {
      if (w2) {
        a.winner = w2.player; a.winLine = w2.line;
        if (w2.player === 'X') awardStarcadeWinBonus('ttt-win');
      }
      a.finished = true;
    }
    a.playerTurn = true;
    render();
    if (a.finished) maybeShowBoardArcadeReturnPrompt();
  }, 2000);
};
function tttCheckWin(b) {
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for (const line of lines) {
    const [x,y,z] = line;
    if (b[x] && b[x] === b[y] && b[x] === b[z]) return { player: b[x], line };
  }
  return null;
}
function tttAIMove(board) {
  if (Math.random() < 0.35) {
    const empty = board.map((v,i) => v ? null : i).filter(i => i !== null);
    return empty.length ? empty[Math.floor(Math.random() * empty.length)] : -1;
  }
  for (let i = 0; i < 9; i++) { if (!board[i]) { const t = [...board]; t[i] = 'O'; if (tttCheckWin(t)) return i; } }
  for (let i = 0; i < 9; i++) { if (!board[i]) { const t = [...board]; t[i] = 'X'; if (tttCheckWin(t)) return i; } }
  if (!board[4]) return 4;
  const corners = [0,2,6,8].filter(i => !board[i]);
  if (corners.length) return corners[Math.floor(Math.random()*corners.length)];
  const empty = board.map((v,i) => v ? null : i).filter(i => i !== null);
  return empty.length ? empty[Math.floor(Math.random() * empty.length)] : -1;
}
function renderTTT(app) {
  const a = state.arcade;
  const fromBoard = state.arcadeFromBoard;
  let resultMessage = '';
  if (a.finished) {
    if (a.winner === 'X') resultMessage = `<div class="text-2xl font-bold text-yellow-300 mb-2 arcade-title-friendly">🎉 You won!</div>`;
    else if (a.winner === 'O') resultMessage = `<div class="text-xl font-bold text-white/80 mb-2 arcade-instructions">The computer won. Try again!</div>`;
    else resultMessage = `<div class="text-xl font-bold text-white/80 mb-2 arcade-instructions">It is a draw! 🤝</div>`;
  }
  const board = a.board.map((cell, i) => {
    const inWinLine = a.winLine && a.winLine.includes(i);
    const item = a.cellItems[i];
    const itemType = item.type;
    const itemLabel = arcadeItemLabel(item);
    const highlight = inWinLine ? 'ring-4 ring-yellow-400 bg-yellow-400/30' : (cell ? 'bg-white/20' : 'bg-white/10 hover:bg-white/25');
    const disabled = a.finished || cell || !a.playerTurn;

    let content = '';
    if (cell === 'X') {
      content = `<div class="relative flex flex-col items-center justify-center">
        <span class="text-4xl md:text-5xl text-pink-300 font-bold leading-none">✕</span>
        <span class="text-xs md:text-sm text-white/80 mt-1">${itemLabel}</span>
      </div>`;
    } else if (cell === 'O') {
      content = `<div class="relative flex flex-col items-center justify-center">
        <span class="text-4xl md:text-5xl text-cyan-300 font-bold leading-none">○</span>
        <span class="text-xs md:text-sm text-white/80 mt-1">${itemLabel}</span>
      </div>`;
    } else {
      const colorClass = itemType === 'gpc' ? 'text-cyan-200' : 'text-pink-200';
      content = `<span class="${colorClass} text-3xl md:text-4xl font-bold">${itemLabel}</span>`;
    }
    return `<button onclick="tttMove(${i})" ${disabled ? 'disabled' : ''} class="aspect-square min-h-[4.5rem] sm:min-h-[5.5rem] ${highlight} disabled:hover:bg-white/20 rounded-2xl flex items-center justify-center transition shadow-lg" title="${itemLabel}">${content}</button>`;
  }).join('');

  app.innerHTML = `
    <div class="arcade-screen p-1 sm:p-2 flex flex-col">
      <div class="arcade-wrap max-w-2xl mx-auto w-full arcade-play-shell">
        <div class="arcade-play-chrome">
          <div class="flex justify-between items-center mb-0.5">
            <button onclick="${getArcadeExitHandler()}" class="text-white/70 hover:text-white text-sm">${fromBoard ? '← Board' : '← The Starcade'}</button>
            <span class="text-xs sm:text-sm font-bold arcade-title-friendly">⭕ Tic-Tac-Toe</span>
          </div>
          <details class="arcade-howto-details">
            <summary>How to play ▾</summary>
            <p class="arcade-instructions text-white/85 text-center px-1">You are <strong>X</strong>. Computer is <strong>O</strong>. Tap a square and say it. Get <strong>3 in a row</strong>.</p>
          </details>
        </div>

        <div class="arcade-playfield">
          <div class="arcade-board w-full" style="width:min(96vw, calc(100dvh - 9rem)); max-width:520px;">
            <div class="grid grid-cols-3 gap-2 w-full mx-auto" style="max-height:min(82dvh, calc(100dvh - 10rem));">${board}</div>
          </div>
        </div>

        <div class="arcade-play-dock text-center">
          ${resultMessage ? `<div class="arcade-toast">${resultMessage}</div>` : ''}
          ${a.finished ? renderArcadeFinishedDock('ttt')
          : `<p class="arcade-instructions text-white/85 text-sm">${a.playerTurn ? 'Your turn. Tap a square.' : 'Wait. The computer is playing...'}</p>`}
        </div>
      </div>
    </div>`;
}

// ============================================================
// CONNECT 4
// ============================================================
const C4_ROWS = 6, C4_COLS = 7;

function c4DropRow(board, col) {
  for (let r = C4_ROWS - 1; r >= 0; r--) {
    if (!board[r][col]) return r;
  }
  return -1;
}
function c4CheckWin(board, player) {
  const dirs = [[0,1],[1,0],[1,1],[1,-1]];
  for (let r = 0; r < C4_ROWS; r++) {
    for (let c = 0; c < C4_COLS; c++) {
      if (board[r][c] !== player) continue;
      for (const [dr, dc] of dirs) {
        const cells = [[r,c]];
        for (let k = 1; k < 4; k++) {
          const nr = r + dr*k, nc = c + dc*k;
          if (nr < 0 || nr >= C4_ROWS || nc < 0 || nc >= C4_COLS) break;
          if (board[nr][nc] !== player) break;
          cells.push([nr,nc]);
        }
        if (cells.length === 4) return cells;
      }
    }
  }
  return null;
}
function c4BoardFull(board) { return board[0].every(c => c !== null); }
function c4Copy(board) { return board.map(r => [...r]); }

function c4AIMove(board) {
  for (let c = 0; c < C4_COLS; c++) {
    const r = c4DropRow(board, c);
    if (r === -1) continue;
    const test = c4Copy(board); test[r][c] = 'O';
    if (c4CheckWin(test, 'O')) return c;
  }
  for (let c = 0; c < C4_COLS; c++) {
    const r = c4DropRow(board, c);
    if (r === -1) continue;
    const test = c4Copy(board); test[r][c] = 'X';
    if (c4CheckWin(test, 'X')) return c;
  }
  if (Math.random() < 0.3) {
    const valid = [];
    for (let c = 0; c < C4_COLS; c++) if (c4DropRow(board, c) !== -1) valid.push(c);
    return valid.length ? valid[Math.floor(Math.random() * valid.length)] : -1;
  }
  const order = [3, 2, 4, 1, 5, 0, 6];
  for (const c of order) {
    if (c4DropRow(board, c) !== -1) {
      const r = c4DropRow(board, c);
      const test = c4Copy(board); test[r][c] = 'O';
      let bad = false;
      for (let c2 = 0; c2 < C4_COLS; c2++) {
        const r2 = c4DropRow(test, c2);
        if (r2 === -1) continue;
        const t2 = c4Copy(test); t2[r2][c2] = 'X';
        if (c4CheckWin(t2, 'X')) { bad = true; break; }
      }
      if (!bad) return c;
    }
  }
  for (const c of order) if (c4DropRow(board, c) !== -1) return c;
  return -1;
}

window.c4Drop = (col) => {
  const a = state.arcade;
  if (a.finished || !a.playerTurn) return;
  const row = c4DropRow(a.board, col);
  if (row === -1) return;
  sfxClick();
  if (a.cellItems[row] && a.cellItems[row][col]) arcadeSpeakFocusItem(a.cellItems[row][col]);

  a.board[row][col] = 'X';
  a.lastMove = [row, col];
  a.playerTurn = false;
  const win = c4CheckWin(a.board, 'X');
  if (win) { a.winner = 'X'; a.winCells = win; a.finished = true; a.endPopupReady = false; setTimeout(()=>{ confetti(); }, 400); awardStarcadeWinBonus('c4-win'); render(); scheduleArcadeEndPopup(); return; }
  if (c4BoardFull(a.board)) { a.finished = true; a.endPopupReady = true; render(); maybeShowBoardArcadeReturnPrompt(); return; }
  render();
  setTimeout(() => {
    const aiCol = c4AIMove(a.board);
    if (aiCol === -1) { a.finished = true; render(); maybeShowBoardArcadeReturnPrompt(); return; }
    const aiRow = c4DropRow(a.board, aiCol);
    a.board[aiRow][aiCol] = 'O';
    a.lastMove = [aiRow, aiCol];
    if (a.cellItems[aiRow] && a.cellItems[aiRow][aiCol]) arcadeSpeakFocusItem(a.cellItems[aiRow][aiCol]);
    const win2 = c4CheckWin(a.board, 'O');
    if (win2) { a.winner = 'O'; a.winCells = win2; a.finished = true; a.endPopupReady = false; }
    else if (c4BoardFull(a.board)) { a.finished = true; a.endPopupReady = true; }
    a.playerTurn = true;
    render();
    if (a.finished && a.winner && a.winCells) scheduleArcadeEndPopup();
    else if (a.finished && a.endPopupReady) maybeShowBoardArcadeReturnPrompt();
  }, 2000);
};

function renderC4(app) {
  const a = state.arcade;
  const fromBoard = state.arcadeFromBoard;
  let resultMessage = '';
  if (a.finished) {
    if (a.winner === 'X') resultMessage = `<div class="text-2xl font-bold text-yellow-300 arcade-title-friendly">🎉 You won!</div>`;
    else if (a.winner === 'O') resultMessage = `<div class="text-xl font-bold text-white/80 arcade-instructions">The computer won. Try again!</div>`;
    else resultMessage = `<div class="text-xl font-bold text-white/80 arcade-instructions">It is a draw! 🤝</div>`;
  }

  let colBtns = '';
  for (let c = 0; c < C4_COLS; c++) {
    const canDrop = !a.finished && a.playerTurn && c4DropRow(a.board, c) !== -1;
    colBtns += `<button onclick="c4Drop(${c})" ${!canDrop ? 'disabled' : ''} class="h-full min-h-0 w-full ${canDrop ? 'bg-yellow-400/30 hover:bg-yellow-400/60 cursor-pointer text-yellow-200' : 'opacity-30 text-white/30'} rounded-md flex items-center justify-center text-sm sm:text-base transition">${canDrop ? '⬇' : '·'}</button>`;
  }

  let cells = '';
  for (let r = 0; r < C4_ROWS; r++) {
    for (let c = 0; c < C4_COLS; c++) {
      const v = a.board[r][c];
      const isWin = a.winCells && a.winCells.some(([wr, wc]) => wr === r && wc === c);
      const isLast = a.lastMove && a.lastMove[0] === r && a.lastMove[1] === c;
      const item = a.cellItems[r][c];
      const label = item ? arcadeItemLabel(item) : '';
      let inner = '';
      if (v === 'X') {
        const pc = isWin ? 'bg-gradient-to-br from-yellow-300 to-red-500 ring-4 ring-yellow-300 scale-105' : 'bg-gradient-to-br from-red-400 to-red-600';
        inner = `<div class="w-full h-full rounded-full ${pc} shadow-md ${isLast ? 'drop-anim' : ''} flex items-center justify-center text-white font-bold arcade-c4-piece-label px-0.5 text-center">${label}</div>`;
      } else if (v === 'O') {
        const pc = isWin ? 'bg-gradient-to-br from-yellow-300 to-amber-500 ring-4 ring-yellow-300 scale-105' : 'bg-gradient-to-br from-yellow-300 to-yellow-500';
        inner = `<div class="w-full h-full rounded-full ${pc} shadow-md ${isLast ? 'drop-anim' : ''} flex items-center justify-center text-blue-900 font-bold arcade-c4-piece-label px-0.5 text-center">${label}</div>`;
      } else {
        inner = `<div class="w-full h-full rounded-full bg-blue-950/80 shadow-inner flex items-center justify-center text-white/50 font-semibold arcade-c4-piece-label arcade-c4-piece-label--ghost px-0.5 text-center">${label}</div>`;
      }
      cells += `<div class="arcade-c4-cell p-0.5">${inner}</div>`;
    }
  }

  const turnStatus = a.finished ? '' : (a.playerTurn
    ? 'Your turn. Tap an arrow to drop a piece.'
    : 'Wait. The computer is playing...');

  app.innerHTML = `
    <div class="arcade-screen p-1 sm:p-2 flex flex-col">
      <div class="arcade-wrap arcade-c4-wrap max-w-5xl mx-auto w-full arcade-play-shell">
        <div class="arcade-play-chrome">
          <div class="flex justify-between items-center mb-0.5">
            <button onclick="${getArcadeExitHandler()}" class="text-white/70 hover:text-white text-xs sm:text-sm">${fromBoard ? '← Board' : '← The Starcade'}</button>
            <span class="text-sm font-bold arcade-title-friendly">🔴 Connect 4</span>
          </div>
          <details class="arcade-howto-details">
            <summary>How to play ▾</summary>
            <p class="arcade-instructions text-white/85 text-center px-1">You are <strong>Red</strong>. Computer is <strong>Yellow</strong>. Tap ⬇ to drop. Get <strong>4 in a row</strong>.</p>
          </details>
        </div>

        <div class="arcade-playfield arcade-board-area">
          <div class="arcade-board arcade-c4-board">
            <div class="arcade-c4-inner bg-blue-700 rounded-xl p-1 shadow-2xl">
              <div class="arcade-c4-drop-row grid grid-cols-7 gap-0.5">${colBtns}</div>
              <div class="arcade-c4-cell-grid grid grid-cols-7 grid-rows-6 gap-0.5 bg-blue-800 rounded-lg p-0.5">${cells}</div>
            </div>
          </div>
        </div>

        <div class="arcade-play-dock arcade-c4-status text-center">
          ${resultMessage && a.endPopupReady ? `<div class="arcade-toast">${resultMessage}</div>` : ''}
          ${a.finished && a.endPopupReady ? renderArcadeFinishedDock('c4')
          : (a.finished && a.winner ? `<p class="arcade-instructions text-white/85 text-sm">Nice line!</p>`
          : `<p class="arcade-instructions text-white/85 text-sm">${turnStatus}</p>`)}
        </div>
      </div>
    </div>`;
}

// ============================================================
// TREASURE HUNTER (embedded — id slime for routing)
// ============================================================
function sendTreasureFocusWords() {
  const frame = document.getElementById('treasureFrame');
  if (!frame || !frame.contentWindow) return;
  try {
    frame.contentWindow.postMessage({
      type: 'treasure-focus-words',
      words: enrichArcadeFocusItems(getFocusItems(state.selectedStudent))
    }, '*');
  } catch (e) {}
}

function restartTreasureGame() {
  if (state.arcade) {
    state.arcade.finished = false;
    state.arcade.score = 0;
    state.arcade.allFound = false;
  }
  const frame = document.getElementById('treasureFrame');
  if (frame && frame.contentWindow) {
    try { frame.contentWindow.postMessage({ type: 'treasure-restart' }, '*'); } catch (e) {}
  }
  render();
}

function renderTreasureHunter(app) {
  const fromBoard = state.arcadeFromBoard;
  const points = getPoints(state.selectedStudent);
  if (window._treasureHandler) {
    window.removeEventListener('message', window._treasureHandler);
  }
  window._treasureHandler = (e) => {
    if (!e.data || !e.data.type) return;
    if (e.data.type === 'treasure-game-over') {
      if (!state.arcade) state.arcade = { finished: false, score: 0, allFound: false };
      state.arcade.finished = true;
      state.arcade.score = typeof e.data.score === 'number' ? e.data.score : 0;
      state.arcade.allFound = !!e.data.allFound;
      if (e.data.allFound) confetti();
      if (state.arcade.score > TREASURE_SCORE_BONUS_THRESHOLD) {
        awardStarcadeWinBonus('treasure-score');
      }
      if (state.arcadeFromBoard) maybeShowBoardArcadeReturnPrompt();
      else render();
    }
    if (e.data.type === 'treasure-speak') {
      if (e.data.item) arcadeSpeakFocusItem(e.data.item);
      else if (e.data.word) speak(e.data.word);
    }
    if (e.data.type === 'treasure-ready') sendTreasureFocusWords();
  };
  window.addEventListener('message', window._treasureHandler);

  const a = state.arcade;
  const dockHtml = fromBoard
    ? `<button type="button" onclick="showBoardReturnOkPrompt()" class="board-game-prompt-go" style="font-size:0.95rem;padding:0.55rem 1.5rem">OK</button>`
    : (a && a.finished)
      ? renderArcadeFinishedDock('slime')
      : `<p class="arcade-instructions text-white/85 text-sm">Tap tiles to hear words and find the treasure.</p>`;

  app.innerHTML = `
    <div class="arcade-screen p-1 sm:p-2 flex flex-col">
      <div class="arcade-wrap arcade-treasure-wrap max-w-5xl mx-auto w-full arcade-play-shell">
        <div class="arcade-play-chrome">
          <div class="flex justify-between items-center mb-0.5">
            <button onclick="${getArcadeExitHandler()}" class="text-white/70 hover:text-white text-xs sm:text-sm">${fromBoard ? '← Board' : '← The Starcade'}</button>
            <span class="text-sm font-bold arcade-title-friendly">🏴‍☠️ Treasure Hunter</span>
          </div>
          <details class="arcade-howto-details">
            <summary>How to play ▾</summary>
            <p class="arcade-instructions text-white/85 text-center px-1">Tap a tile to say the word. Numbers hint at treasure. Find <strong>3</strong> ⭐ tiles for <strong>+3 clicks</strong> each. You start with <strong>10 clicks</strong>.</p>
          </details>
        </div>

        <div class="arcade-playfield arcade-board-area">
          <iframe id="treasureFrame" src="${getHtmlGameEmbedUrl('TreasureHunter.html')}" class="arcade-treasure-frame w-full h-full" title="Treasure Hunter game" allow="autoplay"></iframe>
        </div>

        <div class="arcade-play-dock arcade-treasure-status text-center flex gap-2 justify-center flex-wrap items-center">
          ${dockHtml}
        </div>
      </div>
    </div>`;

  const frame = document.getElementById('treasureFrame');
  if (frame) frame.onload = () => sendTreasureFocusWords();
}

// Confetti (visual only)
function confetti() {
  const colors = ['#f87171','#fbbf24','#34d399','#60a5fa','#a78bfa','#f472b6'];
  for (let i=0; i<30; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.background = colors[i % colors.length];
    c.style.left = (Math.random()*100) + '%';
    c.style.animationDelay = (Math.random()*0.5) + 's';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 2500);
  }
}

applyHwSentenceCsvBatches();
applyLongVowelWordLists();

async function bootstrapAdventuresCore() {
  if (window.isDesktopAdventures && window.AdventuresDesktop) {
    await window.AdventuresDesktop.loadAllStudentProgress();
    const loaded = await window.AdventuresDesktop.tryAutoLoadClassData();
    if (loaded) {
      window.AdventuresDesktop.startClassDataWatch();
      const lead = $('upload-lead');
      if (lead && state.view !== 'upload') {
        lead.textContent = 'Connected to your shared class data folder. Games update when Assessment Buddy saves.';
      }
      render();
      return;
    }
    const lead = $('upload-lead');
    if (lead) {
      lead.textContent = 'No shared class data found yet. Open Assessment Buddy first, or choose a JSON backup file below.';
    }
  }
  render();
}

if (window.DrivePilot) { DrivePilot.start(); } else { bootstrapAdventuresCore(); }