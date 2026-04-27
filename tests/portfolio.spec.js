// @ts-check
const { test, expect } = require('@playwright/test');

// ─────────────────────────────────────────────────────────────────────────────
// Top-level portfolio (hunterdoster.com)
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Top-level site', () => {
  test('loads with name + role', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Hunter Doster/i);
    await expect(page.getByText(/Product Manager/i).first()).toBeVisible();
  });

  test('every nav anchor resolves to an existing section', async ({ page }) => {
    await page.goto('/');
    for (const id of ['about', 'experience', 'projects', 'skills', 'contact', 'education']) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });

  test('product cards link to correct destinations', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.locator('a[href="https://jobalert-production.up.railway.app"]').first()
    ).toBeVisible();
    await expect(page.locator('a[href="zestimate-plus/"]').first()).toBeVisible();
    await expect(page.locator('a[href="stock-analyzer/"]').first()).toBeVisible();
    await expect(
      page.locator('a[href="https://github.com/hunterdoster/jobalert"]').first()
    ).toBeVisible();
  });

  test('contact section has LinkedIn + email', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#contact a[href*="linkedin.com"]')).toBeVisible();
    await expect(page.locator('#contact a[href^="mailto:"]')).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Zestimate+
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Zestimate+', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/zestimate-plus/');
  });

  test('5 main tabs activate the matching panel', async ({ page }) => {
    const tabs = [
      ['The Problem', 'problem'],
      ['Interactive Prototype', 'proto'],
      ['Value Roadmap', 'roadmap'],
      ['Long-Term Vision', 'relationship'],
      ['PM Thinking', 'pm'],
    ];
    for (const [label, id] of tabs) {
      await page.locator('.snav-btn', { hasText: label }).click();
      await expect(page.locator(`#tab-${id}`)).toHaveClass(/\bon\b/);
    }
  });

  test('prototype stepper progresses through all 4 steps', async ({ page }) => {
    await page.locator('.snav-btn', { hasText: 'Interactive Prototype' }).click();
    for (const n of [2, 3, 4, 1]) {
      await page.locator(`#sn${n}`).click();
      await expect(page.locator(`#sp${n}`)).toHaveClass(/\bson\b/);
    }
  });

  test('comp accept/reject and "view alternatives" work', async ({ page }) => {
    await page.locator('.snav-btn', { hasText: 'Interactive Prototype' }).click();
    await page.locator('#sn2').click();

    await page.locator('#cc1 .ca').click();
    await expect(page.locator('#cc1')).toHaveClass(/\bacc\b/);

    await page.locator('#cc2 .cr').click();
    await expect(page.locator('#cc2')).toHaveClass(/\brej\b/);
    await expect(page.locator('#alt-note')).toBeVisible();

    await page.locator('#alt-note a').click();
    await expect(page.locator('#alt-comps')).toBeVisible();
  });

  test('home-details dropdowns recalculate the breakdown', async ({ page }) => {
    await page.locator('.snav-btn', { hasText: 'Interactive Prototype' }).click();
    await page.locator('#sn3').click();

    const before = await page.locator('#bdn-kitchen').textContent();
    await page.locator('#rc1 select.rsel').first().selectOption({ index: 0 });
    await expect.poll(() => page.locator('#bdn-kitchen').textContent()).not.toBe(before);
  });

  test('roadmap upgrade cards update projected sale price', async ({ page }) => {
    await page.locator('.snav-btn', { hasText: 'Value Roadmap' }).click();
    const before = await page.locator('#rm-proj').textContent();
    await page.locator('#uc2').click();
    await expect.poll(() => page.locator('#rm-proj').textContent()).not.toBe(before);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Stock Analyzer
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Stock Analyzer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/stock-analyzer/');
  });

  test('5 tabs are present in the DOM', async ({ page }) => {
    // Tabs live inside #results, which is hidden until an analyze runs.
    // We just verify the structure exists; the full-analyze test below
    // exercises them being visible & switchable end-to-end.
    await expect(page.locator('.tab-btn')).toHaveCount(5);
    const labels = ['Fundamentals', 'Growth Rates', 'Valuation', 'Analyst Notes', 'Custom Analysis'];
    for (const label of labels) {
      await expect(page.locator('.tab-btn', { hasText: label })).toBeAttached();
    }
  });

  test('quick-pick buttons populate the ticker input', async ({ page }) => {
    for (const t of ['AAPL', 'MSFT', 'GOOGL', 'NVDA', 'AMZN']) {
      await page.locator('.quick-btn', { hasText: new RegExp(`^${t}$`) }).click();
      await expect(page.locator('#ticker-input')).toHaveValue(t);
    }
  });

  test('BRK.B quick-pick is removed (regression check)', async ({ page }) => {
    await expect(page.locator('.quick-btn', { hasText: 'BRK.B' })).toHaveCount(0);
  });

  test('full analyze + custom valuation hit the Railway backend', async ({ page }) => {
    test.setTimeout(220_000);
    await page.locator('#ticker-input').fill('AAPL');
    await page.locator('#analyze-btn').click();

    await expect(page.locator('#results')).toBeVisible({ timeout: 200_000 });
    await expect(page.locator('#loading')).toBeHidden();
    await expect(page.locator('#fundChart')).toBeVisible();

    await page.locator('.tab-btn', { hasText: 'Custom Analysis' }).click();
    await expect(page.locator('#tab-custom')).toHaveClass(/\bactive\b/);
    await page.locator('#custom-growth').fill('15');
    await page.locator('#calc-btn').click();

    // Wait for the request to finish — button text returns to "Calculate".
    await expect(page.locator('#calc-btn')).toHaveText(/Calculate/, { timeout: 30_000 });
    await expect(page.locator('#custom-result')).not.toBeEmpty();

    // If the backend returned an error, surface it in the test output.
    const errorBox = page.locator('#custom-result .error-box');
    if (await errorBox.count()) {
      const msg = await errorBox.textContent();
      throw new Error(`Custom valuation API returned an error: ${msg}`);
    }
    await expect(page.locator('#custom-result .custom-result')).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// External endpoint health
// ─────────────────────────────────────────────────────────────────────────────
test.describe('External endpoints', () => {
  test('JobAlert Railway demo responds', async ({ request }) => {
    const res = await request.get('https://jobalert-production.up.railway.app/', { timeout: 30_000 });
    expect(res.status()).toBeLessThan(500);
  });

  test('Stock Analyzer Railway backend responds', async ({ request }) => {
    const res = await request.get('https://web-production-af43a.up.railway.app/', { timeout: 30_000 });
    expect(res.status()).toBeLessThan(500);
  });
});
