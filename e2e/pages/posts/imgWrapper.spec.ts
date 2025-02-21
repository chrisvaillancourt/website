import { test, expect } from '@playwright/test';

test('images in a post are not wrapped in paragraph tags', async ({ page }) => {
	await page.goto('/posts/reducing-react-re-renders-with-memoized-references/');
	const img = page.getByAltText(
		'react dev tools option that highlights a component when it re-renders',
	);
	await expect(img).toBeVisible();
	const imgParent = img.locator('..');
	const imgParentElHandle = await imgParent.elementHandle();
	if (!imgParentElHandle) throw new Error('image parent handle is missing');
	const imgParentTagName = await imgParentElHandle.evaluate((el) => el.tagName);
	expect(imgParentTagName).toBe('DIV');
});
