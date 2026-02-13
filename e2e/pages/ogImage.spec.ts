import { test, expect } from '@playwright/test';

test.describe('OG image', () => {
	test('returns a PNG for a valid post slug', async ({ request }) => {
		const response = await request.get('/og-image/100vh-hack.png');
		expect(response.status()).toBe(200);
		expect(response.headers()['content-type']).toBe('image/png');

		const body = await response.body();
		expect(body.length).toBeGreaterThan(0);
	});
});
