// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * On-demand functional suite for the static "Lead Slip Detector" demo
 * (clever-case-study-backend). Every interactive element and section is
 * exercised. Run against the live URL by default, or set DEMO_URL to a
 * file:// path for offline testing (see playwright.config.js / README.md).
 *
 * User-story mapping lives in ../user-stories.md.
 */

// Open the page (empty path resolves to baseURL exactly).
async function openLanding(page) {
  await page.goto('');
  await expect(page.locator('#landing-view')).toBeVisible();
}

// Submit the upload form to reveal the pre-rendered dashboard (client-side).
async function openDashboard(page) {
  await openLanding(page);
  await page.locator('#submit-btn').click();
  await expect(page.locator('#dashboard-view')).toBeVisible();
  await expect(page.locator('#landing-view')).toBeHidden();
}

test.describe('Landing view', () => {
  // US-01
  test('renders landing with Clever branding, dashboard hidden', async ({ page }) => {
    await openLanding(page);
    await expect(page.locator('#dashboard-view')).toBeHidden();
    // Brand wordmark + hero title + subtitle
    await expect(page.locator('#landing-view .wordmark')).toHaveText('Clever');
    await expect(page.locator('.upload-title')).toHaveText('Lead Slip Detector');
    // Subtitle synced to live wording (no em-dash; mentions duplicate leads).
    await expect(page.locator('.upload-subtitle')).toHaveText(
      'Upload your leads and outreach files to identify contacts that slipped through without being reached and duplicate leads that may have been contacted twice.'
    );
    // Submit CTA present
    await expect(page.locator('#submit-btn')).toHaveText('Analyze Pipeline');
  });

  // US-18 — demo instructions callout for first-time visitors.
  test('demo instructions callout is visible with two numbered steps', async ({ page }) => {
    await openLanding(page);
    const callout = page.locator('#demo-callout');
    await expect(callout).toBeVisible();
    await expect(callout.locator('.demo-callout-title')).toContainText('Just want a demo? No files needed.');
    await expect(callout.locator('.demo-step')).toHaveCount(2);
    await expect(callout).toContainText('Load Demo Data');
    await expect(callout).toContainText('Analyze Pipeline');
  });

  // US-02
  test('static-demo ribbon links back to the site root', async ({ page }) => {
    await openLanding(page);
    const ribbon = page.locator('.demo-ribbon');
    await expect(ribbon).toContainText('Static offline demo');
    await expect(ribbon.locator('a')).toHaveAttribute('href', '../');
  });

  // US-03
  test('"Load Demo Data" button is cosmetic and updates its own state', async ({ page }) => {
    await openLanding(page);
    const btn = page.locator('#demo-btn');
    await expect(btn).toHaveText('Load Demo Data');
    await expect(page.locator('#demo-leads-status')).toBeHidden();
    await expect(page.locator('#demo-outreach-status')).toBeHidden();

    await btn.click();

    await expect(btn).toContainText('Demo Data Loaded');
    await expect(btn).toBeDisabled();
    await expect(page.locator('#demo-leads-status')).toBeVisible();
    await expect(page.locator('#demo-outreach-status')).toBeVisible();
    // Cosmetic only: we stay on the landing view.
    await expect(page.locator('#landing-view')).toBeVisible();
    await expect(page.locator('#dashboard-view')).toBeHidden();
  });

  // US-04
  test('email-notification toggle defaults off and can be switched on', async ({ page }) => {
    await openLanding(page);
    const toggle = page.locator('#email-toggle');
    await expect(toggle).not.toBeChecked();
    // "Proposed" framing synced from live (cosmetic in the static demo).
    const wrap = page.locator('.email-toggle-wrap');
    await expect(wrap).toContainText('Proposed');
    // The checkbox is visually hidden behind a styled track; click the track label.
    await page.locator('.toggle-track').click();
    await expect(toggle).toBeChecked();
    await page.locator('.toggle-track').click();
    await expect(toggle).not.toBeChecked();
  });
});

test.describe('Mobile responsiveness (390px)', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  // US-19 — mobile fixes: callout visible, scrollable tab bar that doesn't
  // overlap, stacked section headers, and visible table scroll hints.
  test('callout shows, tab bar scrolls without overlap, headers stack, hints visible', async ({ page }) => {
    // Landing: demo callout is visible on a narrow viewport.
    await openLanding(page);
    await expect(page.locator('#demo-callout')).toBeVisible();

    // Reveal dashboard.
    await page.locator('#submit-btn').click();
    await expect(page.locator('#dashboard-view')).toBeVisible();

    // Tab bar is horizontally scrollable (content wider than the viewport).
    const tabInner = page.locator('.tab-bar-inner');
    const overflow = await tabInner.evaluate((el) => el.scrollWidth - el.clientWidth);
    expect(overflow, 'tab bar should overflow and scroll horizontally').toBeGreaterThan(0);

    // Nav and tab bar do not overlap (tab bar sits fully below the nav).
    const navBox = await page.locator('#dashboard-view .nav').boundingBox();
    const tabBox = await page.locator('.tab-bar').boundingBox();
    expect(navBox).not.toBeNull();
    expect(tabBox).not.toBeNull();
    expect(tabBox.y, 'tab bar should start at/after the nav bottom').toBeGreaterThanOrEqual(navBox.y + navBox.height - 1);

    // Section headers stack vertically on mobile.
    const header = page.locator('#section-slipped .section-header');
    await expect(header).toHaveCSS('flex-direction', 'column');

    // The swipe-to-scroll hint is revealed at <=768px.
    await expect(page.locator('#section-slipped .scroll-hint').first()).toBeVisible();
  });
});

test.describe('View switching', () => {
  // US-05
  test('"Analyze Pipeline" reveals the dashboard and hides the landing view', async ({ page }) => {
    await openLanding(page);
    await page.locator('#submit-btn').click();
    await expect(page.locator('#dashboard-view')).toBeVisible();
    await expect(page.locator('#landing-view')).toBeHidden();
    // Dashboard nav + tab bar present
    await expect(page.locator('.nav-subtitle')).toHaveText('Lead Slip Detector');
    await expect(page.locator('.tab-bar')).toBeVisible();
  });

  // US-06
  test('"Run New Analysis" returns to the landing view', async ({ page }) => {
    await openDashboard(page);
    await page.locator('#run-new-analysis').click();
    await expect(page.locator('#landing-view')).toBeVisible();
    await expect(page.locator('#dashboard-view')).toBeHidden();
    // Submit button restored for a fresh run
    await expect(page.locator('#submit-btn')).toBeVisible();
  });
});

test.describe('Tab bar navigation', () => {
  const tabs = [
    { label: 'AI Analysis', target: '#section-ai' },
    { label: 'Slipped Leads', target: '#section-slipped' },
    { label: 'Syntax Issues', target: '#section-syntax' },
    { label: 'Slip Database', target: '#section-database' },
    { label: 'Duplicate Leads', target: '#section-duplicates' },
    { label: 'SMS Failures', target: '#section-sms' },
  ];

  for (const tab of tabs) {
    // US-07
    test(`tab "${tab.label}" anchors to ${tab.target}`, async ({ page }) => {
      await openDashboard(page);
      const link = page.locator('.tab-link', { hasText: tab.label });
      await expect(link).toHaveAttribute('href', tab.target);
      await link.click();
      await expect(page).toHaveURL(new RegExp(tab.target.replace('#', '#') + '$'));
      const section = page.locator(tab.target);
      await expect(section).toBeVisible();
      await expect(section).toBeInViewport();
    });
  }
});

test.describe('Pipeline Health Summary', () => {
  // US-08 — assert the real baked-in numbers, matched by their labels.
  const cards = [
    { label: 'Total Leads Reviewed', value: '206' },
    { label: 'Total Outreach Attempts', value: '379' },
    { label: 'Leads Never Contacted', value: '30' },
    { label: 'No-Contact Rate', value: '14.6%' },
    { label: 'Total Syntax Issues', value: '345' },
    { label: 'Duplicate Lead Groups', value: '10' },
    { label: 'SMS Failed, Never Called', value: '12' },
    { label: 'Detected Slips', value: '18' },
  ];

  for (const c of cards) {
    test(`stat card "${c.label}" shows ${c.value}`, async ({ page }) => {
      await openDashboard(page);
      const card = page.locator('.stat-card', { hasText: c.label }).first();
      await expect(card.locator('.stat-number')).toHaveText(c.value);
    });
  }

  // US-09
  test('health status pill summarizes issues', async ({ page }) => {
    await openDashboard(page);
    const pill = page.locator('.pipeline-status-text');
    await expect(pill).toContainText('30 not contacted');
    await expect(pill).toContainText('10 duplicate groups');
  });
});

test.describe('AI Pipeline Analysis section', () => {
  // US-10
  test('shows summary, Claude badge, and an expand toggle that is closed by default', async ({ page }) => {
    await openDashboard(page);
    const section = page.locator('#section-ai');
    await expect(section.locator('.section-title')).toHaveText('AI Pipeline Analysis');
    await expect(section.getByText('Claude', { exact: true })).toBeVisible();
    // Always-visible short summary
    await expect(page.locator('#ai-summary')).toContainText('most critical finding');
    // Details collapsed -> full text not visible yet
    await expect(page.locator('#ai-details')).not.toHaveAttribute('open', '');
    await expect(page.locator('#ai-text')).toBeHidden();
  });

  // US-11
  test('"See full analysis" toggle reveals the full multi-category analysis', async ({ page }) => {
    await openDashboard(page);
    const details = page.locator('#ai-details');
    await details.locator('summary').click();
    await expect(details).toHaveAttribute('open', '');
    const full = page.locator('#ai-text');
    await expect(full).toBeVisible();
    // Covers all three problem categories
    await expect(full).toContainText('Slipped Lead');
    await expect(full).toContainText('Duplicate Lead');
    await expect(full).toContainText('SMS Failure');
    // Toggle icon flips to the open glyph
    await expect(page.locator('#ai-toggle-icon')).toHaveText('▼');
    // Collapse again
    await details.locator('summary').click();
    await expect(details).not.toHaveAttribute('open', '');
    await expect(full).toBeHidden();
  });
});

test.describe('Dashboard data sections', () => {
  // US-12
  test('Uncontacted/Slipped Leads table is populated (30 rows)', async ({ page }) => {
    await openDashboard(page);
    const section = page.locator('#section-slipped');
    await expect(section.locator('.section-title')).toHaveText('Uncontacted Leads');
    await expect(section.locator('.section-count')).toHaveText('30 leads');
    await expect(section.locator('table thead')).toBeVisible();
    await expect(section.locator('tbody tr')).toHaveCount(30);
  });

  // US-13
  test('Syntax Issues section: stats, bar chart, and collapsible detail table', async ({ page }) => {
    await openDashboard(page);
    const section = page.locator('#section-syntax');
    await expect(section.locator('.section-title')).toHaveText('Syntax Issues Summary');
    await expect(section.locator('.section-count')).toHaveText('345 total');
    // Mini stat row + "Issues by Field" bar chart are visible up front.
    await expect(section.locator('.stat-card')).toHaveCount(3);
    await expect(section.locator('.bar-row').first()).toBeVisible();
    // Detailed report is collapsed by default; expanding reveals the populated table.
    const details = section.locator('details.syntax-details');
    await expect(details).not.toHaveAttribute('open', '');
    await expect(details.locator('table')).toBeHidden();
    await details.locator('summary').click();
    await expect(details).toHaveAttribute('open', '');
    await expect(details.locator('table')).toBeVisible();
    expect(await details.locator('tbody tr').count()).toBeGreaterThan(10);
  });

  // US-14
  test('Slip Database History table is populated (18 unique slips)', async ({ page }) => {
    await openDashboard(page);
    const section = page.locator('#section-database');
    await expect(section.locator('.section-title')).toHaveText('Slip Database History');
    await expect(section.locator('.section-count')).toContainText('18');
    await expect(section.locator('tbody tr')).toHaveCount(18);
  });

  // US-15
  test('Duplicate Leads section shows 10 groups of paired leads', async ({ page }) => {
    await openDashboard(page);
    const section = page.locator('#section-duplicates');
    await expect(section.locator('.section-title')).toHaveText('Duplicate Leads');
    await expect(section.locator('.section-count')).toHaveText('10 groups');
    await expect(section.locator('table')).toHaveCount(10);
    expect(await section.locator('tbody tr').count()).toBeGreaterThanOrEqual(20);
  });

  // US-16
  test('SMS Failures section is populated (12 leads + summary cards)', async ({ page }) => {
    await openDashboard(page);
    const section = page.locator('#section-sms');
    await expect(section.locator('.section-title')).toHaveText('SMS Failures');
    await expect(section.locator('.section-count')).toHaveText('12 leads');
    // Three summary stat cards inside the section
    await expect(section.locator('.stat-card')).toHaveCount(3);
    await expect(section.locator('tbody tr')).toHaveCount(12);
    // Failure-reason tag present
    await expect(section).toContainText('Landline or non-SMS-capable number');
  });
});

test.describe('Download links', () => {
  // US-17 — every download must resolve (real file), not 404.
  const downloads = [
    { selector: '#section-slipped a[href="downloads/slipped_leads.csv"]', file: 'downloads/slipped_leads.csv', type: 'text/csv' },
    { selector: '#section-slipped a[href="downloads/slip_database.json"]', file: 'downloads/slip_database.json', type: 'application/json' },
    { selector: '#section-syntax a[href="downloads/syntax_report.html"]', file: 'downloads/syntax_report.html', type: 'text/html' },
  ];

  for (const d of downloads) {
    test(`download link ${d.file} is present and resolves (200, non-empty)`, async ({ page }) => {
      await openDashboard(page);
      // Link is present in the DOM (first match — some appear twice).
      await expect(page.locator(d.selector).first()).toBeVisible();

      // Skip the live HTTP fetch when testing a local file:// snapshot.
      if (page.url().startsWith('file:')) {
        test.info().annotations.push({ type: 'note', description: 'file:// target — HTTP fetch skipped' });
        return;
      }

      const url = new URL(d.file, page.url()).toString();
      const resp = await page.request.get(url);
      expect(resp.status(), `${d.file} should return 200`).toBe(200);
      expect(resp.headers()['content-type'] || '').toContain(d.type);
      const body = await resp.body();
      expect(body.length, `${d.file} should be non-empty`).toBeGreaterThan(0);
    });
  }
});
