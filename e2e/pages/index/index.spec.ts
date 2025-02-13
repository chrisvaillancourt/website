import { test, expect } from '@playwright/test';

test.describe('home page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});
	test('has name in title', async ({ page }) => {
		// Expect a title "to contain" a substring.
		await expect(page).toHaveTitle(/Home • Chris Vaillancourt/);
	});
	test('has heading with name and title', async ({ page }) => {
		const heading = page.getByRole('heading', {
			name: `Hi! I'm Chris, a full stack software engineer`,
		});
		await expect(heading).toBeVisible();
	});

	test('has posts heading', async ({ page }) => {
		const postsHeading = page.getByRole('heading', { name: 'Posts' });
		await expect(postsHeading).toBeVisible();
	});
	test('has recent posts', async ({ page }) => {
		const postsList = page.getByLabel('Blog post list');
		await expect(postsList).toBeVisible();
		const posts = postsList.getByRole('listitem');
		const postsText = await posts.allTextContents();
		expect(postsText.length).toBeGreaterThan(6);
	});
});
