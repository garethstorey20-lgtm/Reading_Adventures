# Pilot schools registry — Reading Adventures web trial

Use this document to track your 10 test schools. When you have a Google Drive folder for a school, paste the link in the **Drive folder link** column and copy the **folder ID** into `tenants.json` (see instructions below).

**Live site base URL:**
`https://garethstorey20-lgtm.github.io/Reading_Adventures/web-pilot/`

---

## Test schools

| # | Code (URL slug) | Display name | Student URL | Drive folder link | Folder ID (for tenants.json) |
|---|-----------------|--------------|-------------|-------------------|------------------------------|
| 1 | `pilot-cedar-4m8` | Cedar Grove Primary | `?t=pilot-cedar-4m8` | [ENTER SCHOOL DRIVE LINK HERE] | *(paste ID after link)* |
| 2 | `pilot-birch-7k2` | Birch Lane School | `?t=pilot-birch-7k2` | [ENTER SCHOOL DRIVE LINK HERE] | *(paste ID after link)* |
| 3 | `pilot-maple-9n1` | Maple View Academy | `?t=pilot-maple-9n1` | [ENTER SCHOOL DRIVE LINK HERE] | *(paste ID after link)* |
| 4 | `pilot-willow-3p6` | Willow Brook Primary | `?t=pilot-willow-3p6` | [ENTER SCHOOL DRIVE LINK HERE] | *(paste ID after link)* |
| 5 | `pilot-aspen-8r4` | Aspen Hill School | `?t=pilot-aspen-8r4` | [ENTER SCHOOL DRIVE LINK HERE] | *(paste ID after link)* |
| 6 | `pilot-oak-2t7` | Oak Meadow Primary | `?t=pilot-oak-2t7` | [ENTER SCHOOL DRIVE LINK HERE] | *(paste ID after link)* |
| 7 | `pilot-pine-5w9` | Pine Ridge Academy | `?t=pilot-pine-5w9` | [ENTER SCHOOL DRIVE LINK HERE] | *(paste ID after link)* |
| 8 | `pilot-elder-6x3` | Elder Park School | `?t=pilot-elder-6x3` | [ENTER SCHOOL DRIVE LINK HERE] | *(paste ID after link)* |
| 9 | `pilot-hazel-1y5` | Hazel Wood Primary | `?t=pilot-hazel-1y5` | [ENTER SCHOOL DRIVE LINK HERE] | *(paste ID after link)* |
| 10 | `pilot-rowan-0z8` | Rowan Field School | `?t=pilot-rowan-0z8` | [ENTER SCHOOL DRIVE LINK HERE] | *(paste ID after link)* |

**Full student URL example (school 1):**
`https://garethstorey20-lgtm.github.io/Reading_Adventures/web-pilot/?t=pilot-cedar-4m8`

**Existing test school (your account):**
`https://garethstorey20-lgtm.github.io/Reading_Adventures/web-pilot/?t=garethstorey20`

---

## How to enter a Google Drive folder link

### Step 1 — Get the link from the teacher

The teacher shares a link like:
`https://drive.google.com/drive/folders/1AbCdEfGhIjKlMnOpQrStUvWxYz`

### Step 2 — Extract the folder ID

The folder ID is the long string **after** `/folders/`:

- Link: `https://drive.google.com/drive/folders/1AbCdEfGhIjKlMnOpQrStUvWxYz`
- Folder ID: `1AbCdEfGhIjKlMnOpQrStUvWxYz`

Paste the full link in this document’s **Drive folder link** column (replace `[ENTER SCHOOL DRIVE LINK HERE]`).

### Step 3 — Update `tenants.json`

Open `TRACKER\web-pilot\tenants.json` and find the school’s code (e.g. `pilot-cedar-4m8`). Set `"folderId"` to the ID from step 2:

```json
"pilot-cedar-4m8": {
  "label": "Cedar Grove Primary",
  "provider": "google-drive",
  "folderId": "1AbCdEfGhIjKlMnOpQrStUvWxYz",
  "classDataFileId": "",
  "classDataFileName": ""
}
```

Leave `classDataFileId` and `classDataFileName` empty to allow **any JSON file** in the folder.

### Multiple year groups in one Drive folder

Teachers can upload **any number of `.json` files** — e.g. `Year-3.json`, `Year-4.json`.

| Situation | What happens |
|-----------|----------------|
| One JSON in folder | Loads automatically |
| Several JSON files | Student picks their class/year group from a list |
| Same student on same device | Last choice is remembered |
| Direct link to one file | Add `&file=Year-3.json` to the school URL |

**Per-year-group link example:**
`https://garethstorey20-lgtm.github.io/Reading_Adventures/web-pilot/?t=pilot-cedar-4m8&file=Year-3.json`

### Step 4 — Redeploy to GitHub

After editing `tenants.json`, rebuild and upload (see main trial guide):

```
cd TRACKER\web-pilot
node scripts\prepare-github-folder.cjs
```

Upload `Desktop\reading-adventures-web` to GitHub, then wait 5–10 minutes before testing the school URL.

### Step 5 — Teacher uploads class data

The teacher uploads **one or more `.json` files** (from Assessment Buddy) into that Drive folder and sets sharing to **Anyone with the link → Viewer**. Use clear file names (e.g. year groups) so students can pick the right one.

---

## Notes

- Codes are anonymous — they do not reveal real school names in the URL.
- Display names (`label`) only appear inside the app banner after load.
- Each school needs its **own** Drive folder and **own** `?t=` link.
- Student progress on the web is stored in the browser only (not synced back to Drive).
