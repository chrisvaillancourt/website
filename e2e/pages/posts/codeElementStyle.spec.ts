import { test, expect } from '@playwright/test';

test('code element has no padding', async ({ page }) => {
	await page.goto('/posts');

	const main = await page.getByRole('main');
	const postContainer = await main.getByLabel('Blog post list');
	const posts = await postContainer.getByRole('link').all();

	const postLinks = (
		await Promise.all(posts.map((post) => post.getAttribute('href')))
	).filter((link): link is string => Boolean(link));

	for (const link of postLinks) {
		// We can't run these concurrently because each needs to use the same
		// page object and change the navigation.
		// TODO look into refactoring this so it can run concurrently
		await testPostPageCodeElements(link);
	}

	async function testPostPageCodeElements(postRoute: string) {
		await page.goto(postRoute);

		const codeElements = await page.getByRole('code').all();
		const testedCssProperties = ['top', 'right', 'bottom', 'left'].map(
			(direction) => `padding-${direction}`,
		);
		const expectedComputedStyle = '0px';

		const results: Promise<void>[] = [];
		for (const code of codeElements) {
			for (const cssProperty of testedCssProperties) {
				results.push(
					expect(code).toHaveCSS(cssProperty, expectedComputedStyle),
				);
			}
		}
		return Promise.all(results);
	}
});
