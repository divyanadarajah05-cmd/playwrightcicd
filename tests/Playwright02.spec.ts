//------ Validating textBox Existance & it's visibility ------//

import {test,expect} from'@playwright/test'

test("TestCase2",async({page})=>{
await page.goto("https://www.google.com") 
let textBox = await page.locator("css=#APjFqb")
await textBox.highlight()
await expect(textBox).toBeEnabled()
await expect(textBox).toBeVisible()
await expect(textBox).toHaveCount(1)

await page.waitForTimeout(3000) 

})
