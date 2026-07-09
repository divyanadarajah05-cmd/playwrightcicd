//------ My first Playwright Spec File ------//

import {test,expect} from'@playwright/test'

test("TestCase1",async({page})=>{
await page.goto("https://www.google.com") //--- Navigating to Google URL
await expect(page).toHaveTitle("Google") //--- Verifying the title of thepage
await page.waitForTimeout(3000) //--- Waiting for 3 seconds

})
