import { test, expect } from '@playwright/test';

test.describe('theme', () => {
	test('page renders with expected background color', async ({ page }) => {
		await page.goto('/');
		const bgColor = await page.evaluate(
			() => getComputedStyle(document.documentElement).backgroundColor,
		);
		// DaisyUI night theme has a dark background — not white/transparent
		expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
		expect(bgColor).not.toBe('rgb(255, 255, 255)');
	});

	test('page has expected font family', async ({ page }) => {
		await page.goto('/');
		const fontFamily = await page.evaluate(
			() => getComputedStyle(document.body).fontFamily,
		);
		expect(fontFamily).toContain('monospace');
	});
});
