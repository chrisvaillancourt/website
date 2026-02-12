import { test, expect } from '@playwright/test';

test.describe('RSS feed', () => {
	test('returns valid XML with expected structure', async ({ request }) => {
		const response = await request.get('/rss.xml');
		expect(response.status()).toBe(200);
		expect(response.headers()['content-type']).toContain('xml');

		const body = await response.text();
		expect(body).toContain('<?xml');
		expect(body).toContain('<rss');
		expect(body).toContain('<channel>');
		expect(body).toContain('<title>');
		expect(body).toContain('<item>');
	});
});
