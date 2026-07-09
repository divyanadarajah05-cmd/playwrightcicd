//----- Interacting with Javascript Alerts -----


import { test, expect } from '@playwright/test'

test("TestCase8", async ({page})=>{
    await page.goto("https://blazedemo.com/")
    await page.locator("select[name='fromPort']").selectOption({label:"Paris"}) 
    await page.locator("select[name='toPort']").selectOption({label:"London"})
    await page.locator("input[type='submit']").click()
    await page.waitForTimeout(2000)
    await expect(page.locator(".table tbody tr")).toHaveCount(5)


})

