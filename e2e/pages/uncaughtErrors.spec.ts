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

	const postRoutes = await getPageLinks({
		page,
		url: '/posts',
		linkPrefix: '/posts/',
	});

	for (const postRoute of postRoutes) {
		await page.goto(postRoute);
		await waitForAllLoadStates(page);
	}

	const tagRoutes = await getPageLinks({
		page,
		url: '/tags',
		linkPrefix: '/tags/',
	});

	await expect(errors).toMatchObject([]);
});
