import { test, expect } from '@playwright/test';

const testData = {
	urls: {
		home: 'https://blazedemo.com/',
		purchasePath: 'purchase.php',
		confirmationPath: 'confirmation.php'
	},
	selectors: {
		fromPort: 'select[name="fromPort"]',
		toPort: 'select[name="toPort"]',
		resultsHeading: 'h3',
		flightRows: 'table.table tbody tr',
		purchaseIdValueCell: 'td:has-text("Id") + td',
		purchaseStatusValueCell: 'td:has-text("Status") + td',
		name: 'input[name="inputName"]',
		address: 'input[name="address"]',
		city: 'input[name="city"]',
		state: 'input[name="state"]',
		zipCode: 'input[name="zipCode"]',
		cardType: 'select[name="cardType"]',
		cardNumber: 'input[name="creditCardNumber"]',
		cardMonth: 'input[name="creditCardMonth"]',
		cardYear: 'input[name="creditCardYear"]',
		nameOnCard: 'input[name="nameOnCard"]'
	},
	labels: {
		findFlights: 'Find Flights',
		chooseFlight: 'Choose This Flight',
		purchaseFlight: 'Purchase Flight'
	},
	expected: {
		titleContains: 'BlazeDemo',
		defaultFromCity: 'Paris',
		defaultToCity: 'Buenos Aires',
		optionCount: 7,
		selectedFromCity: 'Boston',
		selectedToCity: 'London',
		resultsHeading: 'Flights from Boston to London:',
		confirmationHeading: 'Thank you for your purchase today!',
		allowedStatus: ['PendingCapture', 'Completed', 'Confirmed']
	},
	purchaseForm: {
		name: 'John Doe',
		address: '123 Main Street',
		city: 'Boston',
		state: 'MA',
		zipCode: '02110',
		cardType: 'Visa',
		cardNumber: '4111111111111111',
		cardMonth: '12',
		cardYear: '2028',
		nameOnCard: 'John Doe'
	}
};

test('search flights from Boston to London on BlazeDemo', async ({ page }) => {
	const statusPattern = new RegExp(testData.expected.allowedStatus.join('|'));

	// Open BlazeDemo home page.
	await page.goto(testData.urls.home);

	// Validate home page title.
	await expect(page).toHaveTitle(new RegExp(testData.expected.titleContains));

	// Validate default selected cities in both listboxes.
	await expect(page.locator(`${testData.selectors.fromPort} option:checked`)).toHaveText(testData.expected.defaultFromCity);
	await expect(page.locator(`${testData.selectors.toPort} option:checked`)).toHaveText(testData.expected.defaultToCity);

	// Validate option count in both listboxes.
	await expect(page.locator(`${testData.selectors.fromPort} option`)).toHaveCount(testData.expected.optionCount);
	await expect(page.locator(`${testData.selectors.toPort} option`)).toHaveCount(testData.expected.optionCount);

	// Select Boston as departure city.
	await page.locator(testData.selectors.fromPort).selectOption({ label: testData.expected.selectedFromCity });

	// Select London as destination city.
	await page.locator(testData.selectors.toPort).selectOption({ label: testData.expected.selectedToCity });

	// Submit the search request.
	await page.getByRole('button', { name: testData.labels.findFlights }).click();

	// Validate that results page heading shows the expected route.
	await expect(page.locator(testData.selectors.resultsHeading)).toHaveText(testData.expected.resultsHeading);

	// Validate that at least one flight result row is available.
	const flightRows = page.locator(testData.selectors.flightRows);
	await expect(flightRows.first()).toBeVisible();

	// Validate that each result has a "Choose This Flight" button.
	const chooseFlightButton = page.getByRole('button', { name: testData.labels.chooseFlight }).first();
	await expect(chooseFlightButton).toBeVisible();

	// Choose the first available flight.
	await chooseFlightButton.click();
	await expect(page).toHaveURL(new RegExp(testData.urls.purchasePath));

	// Fill the purchase form.
	await page.locator(testData.selectors.name).fill(testData.purchaseForm.name);
	await page.locator(testData.selectors.address).fill(testData.purchaseForm.address);
	await page.locator(testData.selectors.city).fill(testData.purchaseForm.city);
	await page.locator(testData.selectors.state).fill(testData.purchaseForm.state);
	await page.locator(testData.selectors.zipCode).fill(testData.purchaseForm.zipCode);
	await page.locator(testData.selectors.cardType).selectOption({ label: testData.purchaseForm.cardType });
	await page.locator(testData.selectors.cardNumber).fill(testData.purchaseForm.cardNumber);
	await page.locator(testData.selectors.cardMonth).fill(testData.purchaseForm.cardMonth);
	await page.locator(testData.selectors.cardYear).fill(testData.purchaseForm.cardYear);
	await page.locator(testData.selectors.nameOnCard).fill(testData.purchaseForm.nameOnCard);

	// Submit purchase and validate confirmation details.
	await page.getByRole('button', { name: testData.labels.purchaseFlight }).click();
	await expect(page).toHaveURL(new RegExp(testData.urls.confirmationPath));
	await expect(page.getByRole('heading', { level: 1 })).toHaveText(testData.expected.confirmationHeading);
	await expect(page.locator(testData.selectors.purchaseIdValueCell)).toHaveText(/\S+/);
	await expect(page.locator(testData.selectors.purchaseStatusValueCell)).toHaveText(statusPattern);
});
