# Basag Katahimikan — VAWC Awareness Website

Gender and Society Midterm Project · Gender-responsive Digital Platform
Central issue: **Violence Against Women and Children (VAWC)**

## Files
| File | What it does |
|---|---|
| `index.html` | Content and structure of the site |
| `style.css` | Design and responsive layout (phone → tablet → laptop) |
| `script.js` | Interactivity (menu, Quick Exit, counters, chart, flip cards, accordion, tabs, self-check, pledge wall) |

Keep all three files **in the same folder**.

---

## 1. Open it on a laptop (no internet or setup needed)
1. Unzip the folder.
2. Double-click `index.html`. It opens in Chrome / Edge / Firefox.

Editing: open the files in **VS Code** (free). Install the "Live Server" extension, right-click `index.html` → *Open with Live Server* to see changes instantly.

## 2. Put it online so it works on any cellphone (free)

### Option A — Netlify Drop (easiest, ~2 minutes)
1. Go to **https://app.netlify.com/drop**
2. Drag the whole `vawc-website` folder onto the page.
3. You get a link like `https://something.netlify.app` — open it on any phone or laptop.
4. Create a free account so the link doesn't expire, and you can rename it (Site settings → Change site name).

### Option B — GitHub Pages
1. Create a free account at **github.com** → New repository (Public), e.g. `vawc-website`.
2. Click *Add file → Upload files*, upload `index.html`, `style.css`, `script.js`, then *Commit*.
3. Go to *Settings → Pages* → Source: *Deploy from a branch* → Branch: `main` / root → Save.
4. After 1–2 minutes your site is at `https://YOUR-USERNAME.github.io/vawc-website/`

### Test on phone without uploading (same Wi-Fi)
With VS Code Live Server running, find your laptop's IP (`ipconfig` on Windows) and open
`http://YOUR-IP:5500` on your phone while both are on the same Wi-Fi.

---

## 3. Things to customize before submitting
- **Group members**: in `index.html`, search for `Member Name 1` (footer) and replace with your names.
- **Colors**: change the variables at the top of `style.css` (`--plum-800`, `--orange`, etc.).
- **Quick Exit destination**: change `SAFE_URL` at the top of `script.js`.

## 4. Features (for your presentation)
- **Responsive** — mobile-first layout with hamburger menu on phones, multi-column on laptops.
- **Quick Exit button + Esc×2 shortcut** — a real safety feature used on survivor-support sites; it replaces the page in history so the Back button won't return here.
- **Animated statistics & bar chart** with cited sources.
- **Forms of VAWC cards** (RA 9262 Sec. 3), **law accordion**, **protection order tabs** (BPO / TPO / PPO).
- **Myth vs Fact flip cards.**
- **Private relationship self-check** — nothing is saved or sent.
- **Tap-to-call hotlines** on phones.
- **Pledge wall** — saved only in that browser (localStorage), so each device shows its own pledges.
- **Accessibility** — keyboard-usable buttons, ARIA labels, reduced-motion support.
- **References** — every statistic and law links to its source.

> Hotline numbers can change. Double-check them on official DSWD / PCW / PNP pages before your presentation.
