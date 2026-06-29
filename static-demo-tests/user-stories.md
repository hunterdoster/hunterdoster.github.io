# User Stories — Static Lead Slip Detector Demo

On-demand (manually run) functional coverage for the static client-side demo at
`clever-case-study-backend/`. Each story maps to one or more tests in
`tests/static_demo.spec.js`.

| ID | Story | Acceptance criteria | Test(s) |
|----|-------|---------------------|---------|
| US-01 | As a visitor, I land on a branded upload page so I know it's the Clever Lead Slip Detector. | Landing view visible; dashboard hidden; "Clever" wordmark, "Lead Slip Detector" title, and subtitle present; "Analyze Pipeline" CTA shown. | `Landing view › renders landing with Clever branding…` |
| US-02 | As a visitor, I can return to the main site from the offline-demo ribbon. | Ribbon reads "Static offline demo…"; its link `href="../"` (site root). | `Landing view › static-demo ribbon links back…` |
| US-03 | As a visitor, the "Load Demo Data" button shows demo data is ready without leaving the page. | Button is cosmetic: on click it disables, text changes to "Demo Data Loaded ✓", both file status lines appear; still on landing view. | `Landing view › "Load Demo Data" button is cosmetic…` |
| US-04 | As a visitor, the email-notification toggle is off by default and can be switched on. | `#email-toggle` unchecked initially; "Proposed" framing shown; check() makes it checked (cosmetic, no nav). | `Landing view › email-notification toggle defaults off…` |
| US-18 | As a first-time visitor, a callout tells me I can run the demo with no files. | `#demo-callout` visible; title "Just want a demo? No files needed."; two numbered steps referencing "Load Demo Data" then "Analyze Pipeline". | `Landing view › demo instructions callout is visible…` |
| US-19 | As a mobile visitor, the demo is usable on a narrow (390px) screen. | Demo callout visible; tab bar overflows and scrolls horizontally without overlapping the nav; section headers stack vertically; table scroll hints are visible. | `Mobile responsiveness (390px) › callout shows, tab bar scrolls…` |
| US-05 | As a visitor, clicking "Analyze Pipeline" reveals the pre-rendered dashboard. | After submit: dashboard visible, landing hidden, nav subtitle + tab bar present. | `View switching › "Analyze Pipeline" reveals the dashboard…` |
| US-06 | As a visitor, "Run New Analysis" takes me back to the upload page. | After clicking it from the dashboard: landing visible, dashboard hidden, submit button restored. | `View switching › "Run New Analysis" returns…` |
| US-07 | As a visitor, each sticky tab scrolls to / reveals its dashboard section. | Each of 6 tabs (AI Analysis, Slipped Leads, Syntax Issues, Slip Database, Duplicate Leads, SMS Failures) has the correct `#section-*` href; clicking updates the URL hash and brings the target section into the viewport. | `Tab bar navigation › tab "…" anchors to …` (×6) |
| US-08 | As an analyst, the Pipeline Health Summary shows the real pipeline metrics. | Stat cards match baked-in values: 206 leads, 379 outreach, 30 never contacted, 14.6% no-contact rate, 345 syntax issues, 10 duplicate groups, 12 SMS-failed-never-called, 18 detected slips. | `Pipeline Health Summary › stat card "…" shows …` (×8) |
| US-09 | As an analyst, the health pill summarizes the top issues. | Pill contains "30 not contacted" and "10 duplicate groups". | `Pipeline Health Summary › health status pill…` |
| US-10 | As an analyst, the AI section shows a short summary up front with a collapsed full-analysis toggle. | "AI Pipeline Analysis" title + "Claude" badge; `#ai-summary` visible; `#ai-details` not open; `#ai-text` hidden. | `AI Pipeline Analysis section › shows summary, Claude badge…` |
| US-11 | As an analyst, "See full analysis" expands the full multi-category report. | Clicking summary opens details; `#ai-text` visible and covers Slipped, Duplicate, and SMS Failure analyses; toggle icon flips to ▼; clicking again collapses and hides it. | `AI Pipeline Analysis section › "See full analysis" toggle…` |
| US-12 | As an analyst, the Uncontacted/Slipped Leads table is populated. | Title "Uncontacted Leads", count "30 leads", header + 30 body rows. | `Dashboard data sections › Uncontacted/Slipped Leads table…` |
| US-13 | As an analyst, the Syntax Issues section shows stats and a collapsible detail table. | Title "Syntax Issues Summary", count "345 total", 3 mini stat cards, "Issues by Field" bar chart visible; "View Detailed Syntax Report" `<details>` is collapsed by default and expands to reveal a table with >10 rows. | `Dashboard data sections › Syntax Issues section: stats, bar chart, and collapsible detail table` |
| US-14 | As an analyst, the Slip Database History table lists the unique slips. | Title "Slip Database History", count contains "18", 18 body rows. | `Dashboard data sections › Slip Database History table…` |
| US-15 | As an analyst, the Duplicate Leads section shows the 10 duplicate groups. | Title "Duplicate Leads", count "10 groups", 10 group tables, ≥20 paired rows. | `Dashboard data sections › Duplicate Leads section…` |
| US-16 | As an analyst, the SMS Failures section is populated with leads and summary cards. | Title "SMS Failures", count "12 leads", 3 summary stat cards, 12 body rows, failure-reason tag present. | `Dashboard data sections › SMS Failures section…` |
| US-17 | As an analyst, every download link points to a real file (not a 404). | The 3 download links exist; each resolves over HTTP with status 200, expected content-type (csv/json/html) and a non-empty body. (HTTP fetch skipped when run against a local file:// snapshot.) | `Download links › download link … resolves` (×3) |

## How stories map to features

- **Landing / upload view** → US-01..US-05 (branding, ribbon, demo button, email toggle, analyze).
- **View show/hide** → US-05, US-06.
- **Sticky tab bar (anchor nav)** → US-07.
- **Pipeline Health Summary** → US-08, US-09.
- **AI Analysis section + `<details>` toggle** → US-10, US-11.
- **Data tables** (Slipped, Syntax, Slip Database, Duplicates, SMS) → US-12..US-16.
- **Download links** (`downloads/*.csv`, `*.json`, `*.html`) → US-17.
