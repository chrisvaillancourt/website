import { test, expect } from '@playwright/test';

test('code element has no padding', async ({ page }) => {
	const postRoute =
		'/posts/customizing-daisyui-themes-for-accessible-color-contrast/';
	await page.goto(postRoute);

	const codeElements = await page.getByRole('code').all();
	const testedCssProperties = ['top', 'right', 'bottom', 'left'].map(
		(direction) => `padding-${direction}`,
	);
	const expectedComputedStyle = '0px';

	const results: Promise<void>[] = [];
	for (const code of codeElements) {
		for (const cssProperty of testedCssProperties) {
			results.push(expect(code).toHaveCSS(cssProperty, expectedComputedStyle));
		}
	}
	await Promise.all(results);
});
