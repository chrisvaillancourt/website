import { test, expect } from '@playwright/test';

test.describe('theme', () => {
	test('renders with the night theme dark background', async ({ page }) => {
		await page.goto('/');
		const { r, g, b } = await page.evaluate(() => {
			const bg = getComputedStyle(document.documentElement).backgroundColor;
			// Use a canvas to reliably convert any color format (oklch, rgb, etc.) to RGB
			const canvas = document.createElement('canvas');
			canvas.width = 1;
			canvas.height = 1;
			const ctx = canvas.getContext('2d')!;
			ctx.fillStyle = bg;
			ctx.fillRect(0, 0, 1, 1);
			const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
			return { r, g, b };
		});
		// DaisyUI night theme base-100 is a dark color (oklch(20.77% ...))
		// All RGB channels should be well below 128
		expect(r, 'red channel should be dark').toBeLessThan(80);
		expect(g, 'green channel should be dark').toBeLessThan(80);
		expect(b, 'blue channel should be dark').toBeLessThan(80);
	});

	test('uses monospace font family', async ({ page }) => {
		await page.goto('/');
		const fontFamily = await page.evaluate(
			() => getComputedStyle(document.body).fontFamily,
		);
		expect(fontFamily).toContain('monospace');
	});
});
