import { test, expect } from '@playwright/test';

test.describe('about page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/about');
	});

	test('has about in title', async ({ page }) => {
		await expect(page).toHaveTitle(/About/);
	});

	test('has main content', async ({ page }) => {
		const main = page.getByRole('main');
		await expect(main).toBeVisible();
	});

	test('has heading', async ({ page }) => {
		const heading = page.getByRole('heading', { level: 1 });
		await expect(heading).toBeVisible();
	});
});
