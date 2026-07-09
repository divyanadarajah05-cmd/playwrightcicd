//----- Interacting with Javascript Alerts -----


import { test, expect } from '@playwright/test'

test("TestCase7", async ({page})=>{
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")
    await page.waitForTimeout(2000)

    await page.on("dialog", async (dialog) => {
        switch(dialog.type()){
            case "alert":
                console.log("Alert Message : " + dialog.message())
                await expect(dialog.message()).toBe("I am a JS Alert")
                await dialog.accept()
                await expect(page.locator("#result")).toHaveText("You successfully clicked an alert")

                break
            case "confirm":
                console.log("Confirm Message : " + dialog.message())
                await expect(dialog.message()).toBe("I am a JS Confirm")
                await dialog.dismiss()
                await expect(page.locator("#result")).toHaveText("You clicked: Cancel")

                break
            case "prompt":
                console.log("Prompt Message : " + dialog.message())
                await expect(dialog.message()).toBe("I am a JS prompt")
                await dialog.accept("Playwright")
                await expect(page.locator("#result")).toHaveText("You entered: Playwright")
                break
        }
    })
    
    
    await page.locator("button[onclick='jsAlert()']").click()
    await page.waitForTimeout(2000)
    await page.locator("button[onclick='jsConfirm()']").click()
    await page.waitForTimeout(2000)
    await page.locator("button[onclick='jsPrompt()']").click()
    await page.waitForTimeout(2000)

})

