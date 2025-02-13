import { test, expect } from '@playwright/test';
import {
	getPageLinks,
	waitForUrlsToLoad,
	collectPageErrors,
	collectPageConsoleErrors,
} from '../utils';

test.describe('no console errors', () => {
	test('top level routes', async ({ page }) => {
		const errors = collectPageConsoleErrors(page);
		const routes = ['/', '/posts', '/about', '/tags'];
		await waitForUrlsToLoad(page, routes);
		expect(errors).toMatchObject([]);
	});

	test('posts routes ', async ({ page }) => {
		const errors = collectPageConsoleErrors(page);
		const postUrls = await getPageLinks({
			page,
			url: '/posts',
			linkPrefix: '/posts/',
		});
		await waitForUrlsToLoad(page, postUrls);
		expect(errors).toMatchObject([]);
	});

	test('tag routes ', async ({ page }) => {
		const errors = collectPageConsoleErrors(page);
		const tagRoutes = await getPageLinks({
			page,
			url: '/tags',
			linkPrefix: '/tags/',
		});

		await waitForUrlsToLoad(page, tagRoutes);
		expect(errors).toMatchObject([]);
	});
});

test.describe('no uncaught errors', () => {
	test('top level routes', async ({ page }) => {
		const errors = collectPageErrors(page);
		const routes = ['/', '/posts', '/about', '/tags'];
		await waitForUrlsToLoad(page, routes);
		expect(errors).toMatchObject([]);
	});

	test('posts routes ', async ({ page }) => {
		const errors = collectPageErrors(page);
		const postUrls = await getPageLinks({
			page,
			url: '/posts',
			linkPrefix: '/posts/',
		});
		await waitForUrlsToLoad(page, postUrls);
		expect(errors).toMatchObject([]);
	});

	test('tag routes ', async ({ page }) => {
		const errors = collectPageErrors(page);
		const tagRoutes = await getPageLinks({
			page,
			url: '/tags',
			linkPrefix: '/tags/',
		});
		await waitForUrlsToLoad(page, tagRoutes);
		expect(errors).toMatchObject([]);
	});
});
