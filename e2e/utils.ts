import { type Page } from '@playwright/test';

export { waitForAllLoadStates, getPageLinks };

/**
 * Wait for all page loading states to resolve.
 */
function waitForAllLoadStates(
	page: Page,
): Promise<
	[
		PromiseSettledResult<void>,
		PromiseSettledResult<void>,
		PromiseSettledResult<void>,
	]
> {
	return Promise.allSettled([
		page.waitForLoadState('load'),
		page.waitForLoadState('domcontentloaded'),
		page.waitForLoadState('networkidle'),
	]);
}

/**
 * Scrape links found on the given url. Returns the href of all links that begin with the provided prefix.
 * If no prefix is provided, returns all link href's.
 * @param page The playwright page object
 * @param url The path of the page used to find links
 * @param linkPrefix the prefix used to include links
 */
async function getPageLinks({
	page,
	url,
	linkPrefix,
}: {
	page: Page;
	url: string;
	linkPrefix?: string;
}): Promise<Set<string>> {
	await page.goto(url);
	const pageLinks = await page.getByRole('link').all();

	const routesToVisit: Set<string> = new Set();
	for (const link of pageLinks) {
		const href = await link.getAttribute('href');

		if (linkPrefix) {
			href && routesToVisit.add(href);
		} else if (href) {
			routesToVisit.add(href);
		}
	}
	return routesToVisit;
}
