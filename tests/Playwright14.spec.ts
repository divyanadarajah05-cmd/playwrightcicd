import { test, expect } from '@playwright/test';
import HomePagePOM from '../Pages/BlazeDemoHomePagePOM';
import ResultPagePOM from '../Pages/BlazeDemoResultPagePOM';
import PurchasePagePOM from '../Pages/BlazeDemoPurchasePagePOM';
import ConfirmationPagePOM from '../Pages/BlazeDemoConfirmationPagePOM';

test('TestCase14', async ({ page }) => {
  await page.goto('https://blazedemo.com');
  const homepage = new HomePagePOM(page);
  await page.pause()

  await homepage.getFromCityListbox().selectOption('Mexico City');
  await homepage.getToCityListbox().selectOption('Dublin');
  await homepage.getFindFlightsButton().click();

  const resultPage = new ResultPagePOM(page);
  await resultPage.getFlightsButton(1).click();

  await page.waitForTimeout(2000);

  const purchasePage = new PurchasePagePOM(page);
  await purchasePage.getNameTextbox().fill('John Doe');
  await purchasePage.getAddressTextbox().fill('123 Main St');
  await purchasePage.getCityTextbox().fill('Anytown');
  await purchasePage.getStateTextbox().fill('CA');
  await purchasePage.getZipCodeTextbox().fill('12345');
  await purchasePage.getCardTypeListbox().selectOption('Visa');
  await purchasePage.getCreditCardNumberTextbox().fill('4111111111111111');
  await purchasePage.getCreditCardMonthTextbox().fill('12');
  await purchasePage.getCreditCardYearTextbox().fill('2025');
  await purchasePage.getNameOnCardTextbox().fill('John Doe');
  await purchasePage.getRememberMeCheckbox().check();
  await purchasePage.getPurchaseFlightButton().click();

  await page.waitForTimeout(2000);

  const confirmationPage = new ConfirmationPagePOM(page);
  await expect(confirmationPage.getConfirmationHeading()).toBeVisible();
  await expect(confirmationPage.getIdValue()).toHaveText(/\d+/);
  // await expect(confirmationPage.getStatusValue()).toHaveText('PendingCapture');
  // await expect(confirmationPage.getAmountValue()).toHaveText(/\$\d+\.\d{2}/);
  // await expect(confirmationPage.getCardNumberValue()).toHaveText(/xxxx-xxxx-xxxx-\d{4}/);
  // await expect(confirmationPage.getExpirationValue()).toHaveText(/\d{2}\/\d{2}/);
  // await expect(confirmationPage.getAuthCodeValue()).toHaveText(/\d+/);
  // await expect(confirmationPage.getDateValue()).toHaveText(/\d{4}-\d{2}-\d{2}/);

  await page.waitForTimeout(2000);

});
