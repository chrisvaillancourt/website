import { test, expect } from '@playwright/test';
import { waitForAllLoadStates, getPageLinks } from '../utils';

test('no console errors', async ({ page }) => {
	const errors: unknown[] = [];
	page.on('console', (msg) => {
		if (msg.type() === 'error') {
			errors.push(msg);
		}
	});

	const routes = ['/', '/posts', '/about', '/tags'];

	for (const route of routes) {
		await page.goto(route);
		await waitForAllLoadStates(page);
	}

	await page.goto('/posts');
	const links = await page.getByRole('link').all();

	const postRoutes: Set<string> = new Set();
	for (const link of links) {
		const href = await link.getAttribute('href');
		if (href?.startsWith('/posts/')) {
			postRoutes.add(href);
		}
	}
	for (const postRoute of postRoutes) {
		await page.goto(postRoute);
		await waitForAllLoadStates(page);
	}

	await expect(errors).toMatchObject([]);
});
