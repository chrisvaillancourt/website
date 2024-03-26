import { test, expect } from '@playwright/test';
import { getPageLinks, waitForUrlsToLoad } from '../utils';

test.describe('no console errors', () => {
	test('top level routes', async ({ page }) => {
		const errors: unknown[] = [];
		page.on('console', (msg) => {
			if (msg.type() === 'error') {
				errors.push(msg);
			}
		});

		const routes = ['/', '/posts', '/about', '/tags'];
		await waitForUrlsToLoad(page, routes);
		await expect(errors).toMatchObject([]);
	});

	test('posts routes ', async ({ page }) => {
		const errors: unknown[] = [];
		page.on('console', (msg) => {
			if (msg.type() === 'error') {
				errors.push(msg);
			}
		});
		const postUrls = await getPageLinks({
			page,
			url: '/posts',
			linkPrefix: '/posts/',
		});
		await waitForUrlsToLoad(page, postUrls);
		await expect(errors).toMatchObject([]);
	});
	test('tag routes ', async ({ page }) => {
		const errors: unknown[] = [];
		page.on('console', (msg) => {
			if (msg.type() === 'error') {
				errors.push(msg);
			}
		});
		const tagRoutes = await getPageLinks({
			page,
			url: '/tags',
			linkPrefix: '/tags/',
		});

		await waitForUrlsToLoad(page, tagRoutes);
		await expect(errors).toMatchObject([]);
	});
});

test.describe('no uncaught errors', () => {
	test('top level routes', async ({ page }) => {
		const errors: unknown[] = [];
		page.on('pageerror', (exception) => {
			errors.push(exception);
		});

		const routes = ['/', '/posts', '/about', '/tags'];
		await waitForUrlsToLoad(page, routes);
		await expect(errors).toMatchObject([]);
	});

	test('posts routes ', async ({ page }) => {
		const errors: unknown[] = [];
		page.on('pageerror', (exception) => {
			errors.push(exception);
		});
		const postUrls = await getPageLinks({
			page,
			url: '/posts',
			linkPrefix: '/posts/',
		});
		await waitForUrlsToLoad(page, postUrls);
		await expect(errors).toMatchObject([]);
	});
	test('tag routes ', async ({ page }) => {
		const errors: unknown[] = [];
		page.on('pageerror', (exception) => {
			errors.push(exception);
		});
		const tagRoutes = await getPageLinks({
			page,
			url: '/tags',
			linkPrefix: '/tags/',
		});

		await waitForUrlsToLoad(page, tagRoutes);
		await expect(errors).toMatchObject([]);
	});
});
