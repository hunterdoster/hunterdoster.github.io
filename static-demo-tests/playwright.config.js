// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Self-contained config for the static Lead Slip Detector demo.
 *
 * Test target precedence:
 *   1. process.env.DEMO_URL (e.g. a local file:// URL for offline testing)
 *   2. the published live demo
 *
 * Local file example (PowerShell):
 *   $env:DEMO_URL='file:///C:/Users/16786/Documents/hunterdoster.github.io/clever-case-study-backend/index.html'; npm test
 *
 * NOTE: baseURL must end with a trailing slash (or be the index.html file URL)
 * so that relative download links like "downloads/slipped_leads.csv" resolve.
 */
const DEMO_URL = process.env.DEMO_URL || 'https://hunterdoster.com/clever-case-study-backend/';

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: DEMO_URL,
    headless: true,
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
