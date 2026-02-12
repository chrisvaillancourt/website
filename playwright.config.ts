import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright runs outside Vite, so import.meta.env is not available.
 * Use APP_URL env var directly or fall back to the dev server URL.
 */
const baseURL = process.env['APP_URL'] || 'http://localhost:4321';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './e2e',
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env['CI'],
	/* Retry on CI only */
	retries: 2,
	/* Opt out of parallel tests on CI. */
	...(process.env['CI'] ? { workers: 1 } : {}),
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'list', // changed from html to list to stop default browser from opening
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL,

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',
	},

	webServer: {
		command: 'pnpm preview',
		port: 4321,
		reuseExistingServer: !process.env['CI'],
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
		/* Test against mobile viewports. */
		{
			name: 'Mobile Chrome',
			use: {
				...devices['Pixel 5'],
			},
		},
		// consider adding more variety of viewport sizes
		{
			name: 'Mobile Safari',
			use: {
				...devices['iPhone 12 Mini'],
			},
		},
	],
});
