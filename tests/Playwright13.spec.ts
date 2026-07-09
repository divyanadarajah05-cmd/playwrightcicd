import { test, expect } from '@playwright/test';

test('TestCase13', async ({ page }) => {
  await page.goto('https://blazedemo.com/');
  await page.getByText('Paris Philadelphia Boston Portland San Diego Mexico City São Paolo Choose your').click();
  await expect(page.getByRole('heading', { name: 'Welcome to the Simple Travel' })).toBeVisible();
  await expect(page.locator('body')).toContainText('Choose your departure city:');
  await expect(page.locator('select[name="fromPort"]')).toHaveValue('Paris');
  await expect(page.locator('select[name="fromPort"]')).toMatchAriaSnapshot(`
    - combobox:
      - option "Paris" [selected]
      - option "Philadelphia"
      - option "Boston"
      - option "Portland"
      - option "San Diego"
      - option "Mexico City"
      - option "São Paolo"
    `);
  await page.locator('select[name="fromPort"]').selectOption('Mexico City');
  await page.locator('select[name="toPort"]').selectOption('Dublin');
  await page.getByRole('button', { name: 'Find Flights' }).click();
});