import { test, expect } from '@playwright/test';

test.describe('home page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});
	test('has name in title', async ({ page }) => {
		// Expect a title "to contain" a substring.
		await expect(page).toHaveTitle(/Home • Chris Vaillancourt/);
	});
	test('has heading with name', async ({ page }) => {
		const heading = page.getByRole('heading', { name: 'Chris Vaillancourt' });
		await expect(heading).toBeVisible();
	});
	test('has heading with professional title ', async ({ page }) => {
		const title = await page.getByText('Full Stack Software Engineer');
		await expect(title).toBeVisible();
	});
	test('has posts heading', async ({ page }) => {
		const postsHeading = await page.getByRole('heading', { name: 'Posts' });
		await expect(postsHeading).toBeVisible();
	});
	test('has recent posts', async ({ page }) => {
		const postsList = await page.getByLabel('Blog post list');
		await expect(postsList).toBeVisible();
		const posts = postsList.getByRole('listitem');
		const postsText = await posts.allTextContents();
		expect(postsText.length).toBeGreaterThan(6);
	});
	test('nav menu links are visible on mobile', async ({ page, isMobile }) => {
		if (!isMobile) return;

		const navHamburger = await page.getByLabel('Open main menu');
		await expect(navHamburger).toBeVisible();

		await navHamburger.click();
		const mainMenu = await page.getByLabel('Main menu', { exact: true });
		await expect(mainMenu).toBeVisible();

		const homeLink = await mainMenu.getByRole('link', { name: 'Home' });
		await expect(homeLink).toBeVisible();

		const postsLink = await mainMenu.getByRole('link', { name: 'Posts' });
		await expect(postsLink).toBeVisible();

		const aboutLink = await mainMenu.getByRole('link', { name: 'About' });
		await expect(aboutLink).toBeVisible();
	});
	test('nav menu links are visible on desktop', async ({ page, isMobile }) => {
		if (isMobile) return;

		const nav = await page.getByLabel('Main menu', { exact: true });
		await expect(nav).toBeVisible();
		const home = nav.getByText('home');
		const posts = nav.getByText('posts');
		const about = nav.getByText('about');
		await Promise.all([
			expect(home).toBeVisible(),
			expect(about).toBeVisible(),
			expect(posts).toBeVisible(),
		]);
	});
	test('nav menu toggle is visible on small viewports', async ({
		page,
		isMobile,
	}) => {
		if (!isMobile) return;

		await page.setViewportSize({ width: 320, height: 600 });
		const navHamburger = await page.getByLabel('Open main menu');
		await expect(navHamburger).toBeVisible();
	});
});
