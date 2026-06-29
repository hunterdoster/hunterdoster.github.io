# Static Demo Tests — Lead Slip Detector

On-demand Playwright suite that exercises **every feature and interactive element**
of the static demo at `clever-case-study-backend/`
(live: https://hunterdoster.com/clever-case-study-backend/).

This suite is **self-contained** and intentionally lives **outside** the published
`clever-case-study-backend/` folder, so GitHub Pages never serves it. It is run
manually (not scheduled) whenever you want to surface regressions in the demo.

## Setup (first time)

```bash
cd static-demo-tests
npm install
npx playwright install chromium
```

## Run (against the live demo — default)

```bash
cd static-demo-tests
npm test
```

## Run against the local on-disk snapshot (offline)

PowerShell:

```powershell
cd static-demo-tests
$env:DEMO_URL='file:///C:/Users/16786/Documents/hunterdoster.github.io/clever-case-study-backend/index.html'; npm test
```

Bash:

```bash
cd static-demo-tests
DEMO_URL='file:///C:/Users/16786/Documents/hunterdoster.github.io/clever-case-study-backend/index.html' npm test
```

> Note: when run against a `file://` snapshot, the download-link tests assert the
> links are present but skip the HTTP 200/content-type fetch (file scheme can't be
> fetched the same way). Run against the live URL for full download coverage.

## What it covers

See `user-stories.md` for the full story → test mapping. Summary:

- Landing page branding, offline-demo ribbon link, cosmetic "Load Demo Data" button, email toggle.
- "Analyze Pipeline" reveals the dashboard; "Run New Analysis" returns to the upload view.
- All 6 sticky tab anchors scroll to / reveal their sections.
- Pipeline Health Summary stat cards assert the real baked-in numbers (206 / 379 / 30 / 14.6% / 345 / 10 / 12 / 18) and the status pill.
- AI Analysis section: short summary + "See full analysis" `<details>` expand/collapse.
- Every data table is present and populated (Slipped 30, Syntax, Slip Database 18, Duplicates 10 groups, SMS 12).
- Every download link resolves over HTTP (200 + content-type, non-empty).
