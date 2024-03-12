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
});
