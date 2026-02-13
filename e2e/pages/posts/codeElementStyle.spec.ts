import { test, expect } from '@playwright/test';

test('code element has minimal padding', async ({ page }) => {
	await page.goto('/posts');

	const main = page.getByRole('main');
	const postContainer = main.getByLabel('Blog post list');
	const posts = await postContainer.getByRole('link').all();

	const postLinks = (
		await Promise.all(posts.map((post) => post.getAttribute('href')))
	).filter((link): link is string => Boolean(link));

	for (const link of postLinks) {
		await testPostPageCodeElements(link);
	}

	async function testPostPageCodeElements(postRoute: string) {
		await page.goto(postRoute);

		const codeElements = await page.getByRole('code').all();
		const testedCssProperties = ['top', 'right', 'bottom', 'left'].map(
			(direction) => `padding-${direction}`,
		);
		// DaisyUI v5 applies small default padding to inline <code> elements.
		// This threshold ensures code blocks don't have excessive padding
		// while tolerating the framework's baseline styling.
		const maxPaddingPx = 10;

		for (const code of codeElements) {
			for (const cssProperty of testedCssProperties) {
				const value = await code.evaluate(
					(el, prop) => getComputedStyle(el).getPropertyValue(prop),
					cssProperty,
				);
				const numericValue = parseFloat(value);
				expect(
					numericValue,
					`${cssProperty} should be <= ${maxPaddingPx}px, got ${value}`,
				).toBeLessThanOrEqual(maxPaddingPx);
			}
		}
	}
});
