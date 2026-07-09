export default class ConfirmationPagePOM {
	 page: any;
	 constructor(page: any) {
		 this.page = page;
	 }

	 getConfirmationHeading() {
		 return this.page.getByRole('heading', { name: 'Thank you for your purchase today!' });
	 }

	 getIdValue() {
		 return this.page.locator('//td[text()="Id"]/following-sibling::td');
	 }

	 getStatusValue() {
		 return this.page.locator('//td[text()="Status"]/following-sibling::td');
	 }

	 getAmountValue() {
		 return this.page.locator('//td[text()="Amount"]/following-sibling::td');
	 }

	 getCardNumberValue() {
		 return this.page.locator('//td[text()="Card Number"]/following-sibling::td');
	 }

	 getExpirationValue() {
		 return this.page.locator('//td[text()="Expiration"]/following-sibling::td');
	 }

	 getAuthCodeValue() {
		 return this.page.locator('//td[text()="Auth Code"]/following-sibling::td');
	 }

	 getDateValue() {
		 return this.page.locator('//td[text()="Date"]/following-sibling::td');
	 }
}
