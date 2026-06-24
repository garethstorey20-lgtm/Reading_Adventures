# GitHub Pages — no banner?

The yellow **pilot v2** banner appears only on the **student app page**, not in GitHub repo Settings.

## Open this exact URL in the browser

```
https://garethstorey20-lgtm.github.io/Reading_Adventures/web-pilot/?t=garethstorey20
```

You should see:
- Yellow bar at the top: **Web — Reading Adventures from Google Drive (pilot v2)**
- OR a red bar explaining which file failed to load

## If you see GitHub 404

Your repo root on GitHub must include:

```
Reading_Adventures/          (repo)
├── index.html               ← redirect to web-pilot
├── .nojekyll
├── data/
│   ├── master-gpc-audio.js
│   └── ...
├── web-pilot/
│   ├── index.html
│   ├── drive-config.js
│   ├── tenants.json
│   └── js/
│       ├── pilot-bootstrap.js
│       ├── tenant-registry.js
│       ├── drive-loader.js
│       └── app.js
└── HTML games/
```

**Common mistake:** uploading only the *contents* of `web-pilot/` to the repo root (no `web-pilot` folder, no `data/` folder). That breaks script paths and the banner will not work.

**Fix:** upload the full folder from `Desktop\reading-adventures-web`.

## Rebuild upload folder

```
cd TRACKER\web-pilot
node scripts\prepare-github-folder.cjs
```

Then replace all files on GitHub with `Desktop\reading-adventures-web`.

## Pages settings

Settings → Pages → Deploy from branch → **main** → **/ (root)**

Wait 5–10 minutes after each upload.
