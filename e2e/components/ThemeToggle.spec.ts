import { test, expect, type Page } from '@playwright/test';

const LIGHT_THEME_BG_COLOR = 'rgb(15, 23, 41)';
const DARK_THEME_BG_COLOR = 'rgb(255, 255, 255)';

test.describe('ThemeToggle', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});
	test('toggle is visible', async ({ page }) => {
		const toggle = getToggle(page);
		await expect(toggle).toBeVisible();
		await expect(toggle).toBeInViewport();
	});
	test('clicking toggle changes theme', async ({ page }) => {
		const html = await page.locator('html');
		const toggle = getToggle(page);
		await expect(html).toHaveCSS('background-color', LIGHT_THEME_BG_COLOR);
		await toggle.click();
		await expect(html).toHaveCSS('background-color', DARK_THEME_BG_COLOR);
	});
	test('theme persists across page loads', async ({ page }) => {
		const html = await page.locator('html');
		const toggle = getToggle(page);
		await expect(html).toHaveCSS('background-color', LIGHT_THEME_BG_COLOR);

		await toggle.click();
		await expect(html).toHaveCSS('background-color', DARK_THEME_BG_COLOR);

		await page.reload();
		await expect(html).toHaveCSS('background-color', DARK_THEME_BG_COLOR);

		await toggle.click();
		await expect(html).toHaveCSS('background-color', LIGHT_THEME_BG_COLOR);
		await page.reload();
		await expect(html).toHaveCSS('background-color', LIGHT_THEME_BG_COLOR);
	});
});

function getToggle(page: Page) {
	return page.getByLabel('Toggle Theme');
}
