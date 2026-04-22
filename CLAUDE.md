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
4. **Products** — "Created with AI Vibe Coding" subtitle, AI Vibe Coding callout banner, JobAlert card (live demo + GitHub), Zestimate+ card (links to zestimate-plus.html)
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

## Known Limitations / Future Ideas

- GitHub link intentionally omitted from contact section (Hunter doesn't use GitHub for networking)
- JobAlert product card links to live Railway demo + GitHub repo
- Zestimate+ product card links to `zestimate-plus/` → `zestimate-plus/index.html` (self-contained interactive prototype, opens in new tab)
- Skills section manually curated — update when skill set changes
