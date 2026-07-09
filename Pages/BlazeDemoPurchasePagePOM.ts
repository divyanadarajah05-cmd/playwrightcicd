export default class PurchasePagePOM {
	 page: any;
	 constructor(page: any) {
		 this.page = page;
	 }

	 getNameTextbox() {
		 return this.page.locator('#inputName');
	 }

	 getAddressTextbox() {
		 return this.page.locator('#address');
	 }

	 getCityTextbox() {
		 return this.page.locator('#city');
	 }

	 getStateTextbox() {
		 return this.page.locator('#state');
	 }

	 getZipCodeTextbox() {
		 return this.page.locator('#zipCode');
	 }

	 getCardTypeListbox() {
		 return this.page.locator('#cardType');
	 }

	 getCreditCardNumberTextbox() {
		 return this.page.locator('#creditCardNumber');
	 }

	 getCreditCardMonthTextbox() {
		 return this.page.locator('#creditCardMonth');
	 }

	 getCreditCardYearTextbox() {
		 return this.page.locator('#creditCardYear');
	 }

	 getNameOnCardTextbox() {
		 return this.page.locator('#nameOnCard');
	 }

	 getRememberMeCheckbox() {
		 return this.page.locator('#rememberMe');
	 }

	 getPurchaseFlightButton() {
		 return this.page.getByRole('button', { name: 'Purchase Flight' });
	 }
}
