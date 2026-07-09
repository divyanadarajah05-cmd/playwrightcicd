// Import the Playwright test runner and assertion utilities.
import { test, expect } from '@playwright/test';

// Define a test case for validating Amazon search behavior.
test('Amazon search validation', async ({ page }) => {
	// Store the search keyword in a constant for reuse in this test.
	const searchKeyword = 'laptop';

	// Navigate to the Amazon homepage.
	await page.goto('https://www.amazon.com/');

	// Wait for the search input box to be visible before interacting with it.
	await expect(page.locator('#twotabsearchtextbox')).toBeVisible();

	// Fill the search box with the keyword.
	await page.locator('#twotabsearchtextbox').fill(searchKeyword);

	// Click the search submit button to perform the search.
	await page.locator('#nav-search-submit-button').click();

	// Verify the URL includes the expected search query parameter.
	await expect(page).toHaveURL(/s\?k=laptop/i);

	// Verify the search input still contains the entered keyword.
	await expect(page.locator('#twotabsearchtextbox')).toHaveValue(new RegExp(searchKeyword, 'i'));

	// Locate the main search results container.
	const searchResultsContainer = page.locator('div.s-main-slot');

	// Confirm the search results container is visible on the page.
	await expect(searchResultsContainer).toBeVisible();

	// Locate product result cards that are marked with data component type as search result.
	const productCards = page.locator("div[data-component-type='s-search-result']");

	// Assert that at least one product card is present in the results.
	await expect(productCards.first()).toBeVisible();

	// Count the number of product cards found in the current results page.
	const productCount = await productCards.count();

	// Validate that the number of products is greater than zero.
	expect(productCount).toBeGreaterThan(0);
});
