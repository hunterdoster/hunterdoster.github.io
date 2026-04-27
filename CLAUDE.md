# hunterdoster.com — Personal Portfolio Website

This file is loaded automatically by Claude Code at the start of every session.

---

## What This Is

Single-page personal portfolio website targeting PM/TPM hiring managers. Built entirely with AI Vibe Coding — no manual code written. Hosted free on GitHub Pages with custom domain.

- **Live URL:** https://hunterdoster.com
- **GitHub repo:** https://github.com/hunterdoster/hunterdoster.github.io (public)
- **Local folder:** `C:\Users\16786\Documents\hunterdoster.github.io\`

---

## Workflow

```bash
# From: C:\Users\16786\Documents\hunterdoster.github.io\
git add .
git commit -m "description"
git push
# Live in ~30 seconds at hunterdoster.com
```

Always edit `index.html` directly — it's the entire site.

---

## Tech Stack

- Single `index.html` + Tailwind CSS CDN + Inter font (Google Fonts)
- Hosting: GitHub Pages (free) with custom domain via Namecheap DNS
- DNS: 4 A records → GitHub IPs (185.199.108-111.153) + CNAME www → hunterdoster.github.io.

---

## Images

- `headshot.jpg` — Hunter's face photo (source: `C:\Users\16786\Downloads\IMG_9394.jpeg`, smiling, glasses)
- `profile.jpg` — kept in repo, not currently displayed

---

## Page Structure (top → bottom)

1. **Nav** — About · Experience · Products · Skills · Contact (button)
2. **Hero** — dark navy, headshot (rounded), name, "Product Manager · 7+ years experience", tagline, CTAs, badge pills
3. **Education** — AFIT M.S. Computer Engineering (Focus: Computer Networks & AI), USAFA B.S. Computer Engineering (no years shown)
4. **Products** — "Created with AI Vibe Coding" subtitle, AI Vibe Coding callout banner, JobAlert card (live demo + GitHub), Zestimate+ card (links to zestimate-plus/), Stock Analyzer card (links to stock-analyzer/)
5. **Skills** — 3 columns: Product Management, Technical, AI & Tools (includes Claude, ChatGPT/Codex, Grok)
6. **About** — 4-paragraph summary from LinkedIn
7. **Experience** — newest to oldest timeline (left border, indigo ▸ bullets):
   - Department of Defense SkillBridge Program — Jeff Cook Real Estate (2025–2026)
   - Product Manager, Radar Sensor Portfolio — AFRL (2024–Present)
   - Product Manager & Program Manager, Electronic Intelligence — AFRL (Apr 2022–Apr 2024)
   - Product Developer — AFIT (Apr 2020–Mar 2022)
   - Product Developer, ENG Department Lead — USAFA / cooling vest project (Apr 2019–Apr 2020)
8. **Contact** — dark navy, email + LinkedIn buttons only (no GitHub — Hunter doesn't use GitHub for networking)

---

## Styling Rules

- Primary color: indigo-600
- Hero/Contact background: navy-900 (`#0a1628`)
- Sections alternate: `bg-slate-50` → `bg-white` → repeat (no two adjacent sections same color)
  - Education: slate-50, Products: white, Skills: slate-50, About: white, Experience: slate-50
- **No bold inside experience bullets** — causes line-height spacing issues
- **No timeline dot `::before` pseudo-element** — was overlapping titles; removed entirely
- Experience timeline: `border-l-2 border-slate-200 pl-12`

---

## Session — 2026-04-21

### Site created from scratch
- Built single `index.html` using Tailwind CDN + Inter font
- Source material: LinkedIn profile (scraped via Python), resume files (pdf/docx — binary, not directly readable)
- Sections ordered: Education → Products → Skills → About → Experience → Contact

### Key fixes applied
- **Timeline dot removed** — CSS `::before` pseudo-element with `left: -1px` overlapped heading text; removed entirely
- **Bold stripped from bullets** — `<strong>` tags caused inconsistent line heights
- **Headshot corrected** — first photo (1772479813251.jfif) was wrong; replaced with `IMG_9394.jpeg`
- **Alternating backgrounds fixed** — forced slate-50/white pattern so no two adjacent sections match

### DNS setup (Namecheap)
- Removed `URL Redirect Record` that was intercepting traffic
- 4 A records: @ → 185.199.108/109/110/111.153
- CNAME: www → hunterdoster.github.io.
- Confirmed via `nslookup hunterdoster.com` — all 4 GitHub IPs resolving

---

## Session — 2026-04-22

### Zestimate+ product added
- Source file: `C:\Users\16786\Downloads\zestimate-plus-v2.html` (self-contained interactive product vision page)
- Copied to `zestimate-plus/index.html` (subfolder for clean URL + room for future assets)
- Live at: `hunterdoster.com/zestimate-plus/`
- Replaced the "More products coming soon" placeholder card in the Products section with a Zestimate+ card
- Card header uses Zestimate+ brand colors (dark navy `#0B1829` → `#14385E` gradient, teal accent)
- Tags: Product Vision, NLP / AI, Real Estate, Interactive Prototype
- "View Product" button links to `zestimate-plus/` (opens in new tab)
- No GitHub link — this is a product concept, not an open-source repo

### Copy updates
- About section: "a decade of experience" → "7+ years of experience"
- Hero badges: "9 Years Military Service" → "10 Years Military Service"
- Hero badges: added "Dual Technical & Program Management" pill
- Removed all hyphens from body text (compound adjectives and em dash separators); em dashes replaced with commas, compound-word hyphens replaced with spaces
- Experience dates corrected:
  - Jeff Cook Real Estate: "2025 – 2026" → "March 2026 – Sep 2026"
  - Radar Sensor Portfolio: "2024 – Present" → "Apr 2024 – Present"
  - Electronic Intelligence: "Apr 2022 – Apr 2024" → "Mar 2022 – Apr 2024"
- AFIT Product Developer: added flight test bullet — "Led cross functional flight test demonstration across three agencies, planning and executing the first live MVP demonstration of an acoustic drone detection system; results drove next phase engagement to scale the product for multiple defense use cases"

---

---

## Session — 2026-04-22 (continued)

### Stock Analyzer product added
- Backend source: `C:\Users\16786\Desktop\stocksFullCombined.py` (Rule #1 investing analysis script)
- Backend deployed to Railway at: `https://web-production-af43a.up.railway.app`
- Backend repo: `https://github.com/hunterdoster/stock-analyzer` (private)
- Backend local folder: `C:\Users\16786\Documents\stock-analyzer\`
- Frontend: `stock-analyzer/index.html` (self-contained, Chart.js CDN, custom CSS)
- Live at: `hunterdoster.com/stock-analyzer/`
- Product card added to Products section (3rd card, dark navy gradient, indigo icon)
- Tags: Python, Flask, SimFin API, Chart.js, Railway
- "Launch Analyzer →" button links to `stock-analyzer/`
- Product renamed from "Rule #1 Stock Analyzer" to "Stock Analyzer" everywhere

### Stock Analyzer features
- Tabs: Fundamentals | Growth Rates | Valuation | Analyst Notes | Custom Analysis
- Fundamentals tab: toggle chart (Revenue / EPS / Equity / FCF / PE) + full data table
- Growth Rates tab: CAGR grouped bar chart + table (long / 7yr / 5yr / 3yr / 1yr)
- Valuation tab: 3-column comparison (Equity Only / Eq+Analyst / Analyst Only) + full table
- Analyst Notes tab: auto-generated color-coded flags (green/amber/red)
- Custom Analysis tab: enter any growth rate + optional PE → live valuation
- Backend has 1-hour TTL cache per ticker, rate limit 5/min 20/hr per IP
- Email alerts via Gmail SMTP when traffic hits thresholds (30/hr warn, 100/hr critical, 300/day)

---

## Session — 2026-04-22 (continued)

### JobAlert mobile responsiveness
- Source files: `C:\Users\16786\Documents\JobAlert\jobalert-web\templates\` (Jinja2 templates)
- Repo: `https://github.com/hunterdoster/jobalert` (private), deployed to Railway at `https://jobalert-production.up.railway.app`
- Local folder: `C:\Users\16786\Documents\JobAlert\jobalert-web\`
- **Problem:** fixed `w-64` sidebar left almost no room for content on mobile; grids and tables overflowed
- **Fixes applied:**
  - `base.html`: added hamburger button in mobile-only top header; sidebar is now `fixed` with `-translate-x-full` on mobile, slides in via JS toggle with semi-transparent backdrop; desktop layout unchanged (`md:static md:translate-x-0`)
  - All templates: padding changed from `px-8 py-6` → `px-4 py-4 sm:px-8 sm:py-6`
  - `dashboard.html`: `grid-cols-4` → `grid-cols-2 sm:grid-cols-4`; `grid-cols-3` → `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
  - `monitors.html`: `grid-cols-4` detail grid → `grid-cols-2 sm:grid-cols-4`; architecture `grid-cols-3` → `grid-cols-1 sm:grid-cols-3`; header uses `flex-wrap`
  - `settings.html`: `grid-cols-2` → `grid-cols-1 md:grid-cols-2`
  - `jobs.html` / `logs.html` / `dashboard.html`: all tables wrapped in `overflow-x-auto`; filter rows use `flex-wrap`

---

## Session — 2026-04-22 (continued)

### Stock Analyzer CORS fix
- **Problem:** "Load failed" immediately on wife's iPhone but worked on Hunter's iPhone
- **Root cause:** Railway routes through Fastly CDN; specific `origins=[...]` CORS config causes `Vary: Origin` response header, meaning different CDN edge nodes cache different preflight responses — wife's phone hit an edge node with a stale/missing preflight
- **Fix:** Changed `CORS(app, origins=[...])` → `CORS(app)` in `stock-analyzer/app.py` (backend); this returns `Access-Control-Allow-Origin: *` on all responses, eliminating CDN origin-vary caching issues. Safe since the API has no auth.
- **Frontend:** Updated `catch` block in `stock-analyzer/index.html` to detect `TypeError` (network error) and show "Could not reach the server. Check your connection and try again." instead of the opaque Safari "Load failed" message

---

## Verification Suite (Playwright)

End-to-end test suite at `tests/portfolio.spec.js` runs against the **live site** (https://hunterdoster.com) and exercises every interactive feature across all three products plus the JobAlert and Stock Analyzer Railway endpoints.

```bash
# One-time setup
npm install
npx playwright install chromium

# Run on demand
npm test
```

What it covers:
- **Top-level:** title, all nav anchors resolve, product card hrefs, LinkedIn + email links
- **Zestimate+:** all 5 tabs activate, 4-step prototype navigation, comp accept/reject + view-alternatives, home-detail dropdowns recalc breakdown, roadmap upgrade cards update projected price
- **Stock Analyzer:** all 5 tabs visible, every quick-pick fills the input, **BRK.B is absent** (regression check), full AAPL analyze + custom valuation hit the Railway backend end-to-end
- **External health:** JobAlert + Stock Analyzer Railway URLs return < 500

Runs ~2-3 min total (the AAPL analyze drives most of the wall time). On-demand only, no CI.

When adding a new product or interactive feature, add a `test.describe(...)` block in `tests/portfolio.spec.js` mirroring the existing patterns.

---

## Known Limitations / Future Ideas

- GitHub link intentionally omitted from contact section (Hunter doesn't use GitHub for networking)
- JobAlert product card links to live Railway demo + GitHub repo
- Zestimate+ product card links to `zestimate-plus/` → `zestimate-plus/index.html` (self-contained interactive prototype, opens in new tab)
- Stock Analyzer card links to `stock-analyzer/` — backend at Railway, frontend on GitHub Pages
- Skills section manually curated — update when skill set changes
