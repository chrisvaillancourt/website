import { test, expect } from '@playwright/test';

test.describe('navigation', () => {
	test('all nav links return 200', async ({ page, request }) => {
		await page.goto('/');
		const navLinks = page.locator('nav a');
		const hrefs = await navLinks.evaluateAll((links) =>
			links
				.map((a) => a.getAttribute('href'))
				.filter((href): href is string => href !== null),
		);

		expect(hrefs.length).toBeGreaterThan(0);

		for (const href of hrefs) {
			const url = href.startsWith('/') ? href : `/${href}`;
			const response = await request.get(url);
			expect(
				response.status(),
				`Expected 200 for ${url}, got ${response.status()}`,
			).toBe(200);
		}
	});

	test('404 page renders for non-existent route', async ({ page }) => {
		const response = await page.goto('/non-existent-page-xyz');
		expect(response?.status()).toBe(404);
	});
});
