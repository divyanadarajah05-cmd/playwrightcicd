// Using Base Url for the tests

//----- This Test uses baseUrl configured in playwright.config.ts file. The baseUrl is set to https://playwright.dev/ -----//
import { test, expect } from '@playwright/test';

test("TestCase18", async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(2000);
  console.log("Url = " + await page.url());
  console.log("Title of the page is: " + await page.title());
})
