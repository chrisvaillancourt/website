import type { Page, ConsoleMessage } from '@playwright/test';

export {
	waitForAllLoadStates,
	waitForUrlsToLoad,
	getPageLinks,
	collectPageErrors,
	collectPageConsoleErrors,
};

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
 * Go to each url in URL's collection and wait for each URL to completely load.
 */
async function waitForUrlsToLoad(page: Page, urls: Iterable<string>) {
	for (const url of urls) {
		await page.goto(url);
		// need to block so we guarantee page loads before loading the next page
		await waitForAllLoadStates(page);
	}
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
		if (!linkPrefix) {
			href && routesToVisit.add(href);
		} else {
			if (href && href.startsWith(linkPrefix)) {
				routesToVisit.add(href);
			}
		}
	}
	return routesToVisit;
}
/**
 * Listens for uncaught exceptions in the provided page and returns an array of
 * all exceptions.
 */
function collectPageErrors(page: Page): readonly Error[] {
	const errors: Error[] = [];
	page.on('pageerror', (exception) => {
		errors.push(exception);
	});
	return errors;
}
/**
 * Listens for console.error() messages in the provided page and returns an array of
 * all error messages.
 */
function collectPageConsoleErrors(page: Page): readonly ConsoleMessage[] {
	const errorMessages: ConsoleMessage[] = [];
	page.on('console', (msg) => {
		if (msg.type() === 'error') {
			errorMessages.push(msg);
		}
	});
	return errorMessages;
}
