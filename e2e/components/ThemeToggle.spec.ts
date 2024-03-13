import { test, expect } from '@playwright/test';
import { LIGHT_THEME_NAME, DARK_THEME_NAME } from '../../src/lib/theme';
/* 
- [ ] test toggle light / dark aria role
- [ ] test light when first loading 
- [ ] test theme persists across page loads

*/

test.describe('ThemeToggle', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});
	test('toggle is visible', async ({ page }) => {
		const toggle = page.getByLabel('Toggle Dark Mode');
		await expect(toggle).toBeVisible();
		await expect(toggle).toBeInViewport();
	});
	test('clicking toggle changes theme', async ({ page }) => {
		const toggle = page.getByLabel('Toggle Dark Mode');
		const html = await page.locator('html');
		expect(html).toHaveCSS(
			'background-color',
			'hsl(var(--b1) / var(--tw-bg-opacity, 1))',
		);
		await toggle.click();
		// const html = await page.locator('html').elementHandle();
		expect(html).toBeTruthy();
	});
	test('test', async ({ page }) => {
		await page.goto('http://localhost:4322/');
		await page.getByLabel('Toggle Dark Mode').click();
		await expect(page.getByLabel('Toggle Dark Mode')).toBeVisible();
		await page.getByLabel('Toggle Dark Mode').click();
		await expect(page.getByLabel('Toggle Dark Mode')).toBeVisible();
		await page.locator('html').click();
		await page.goto('http://localhost:4322/');
		await expect(page.getByLabel('Toggle Dark Mode')).toBeVisible();
		await page.getByLabel('Toggle Dark Mode').click();
		await expect(page.getByLabel('Toggle Dark Mode')).toBeVisible();
	});
});
