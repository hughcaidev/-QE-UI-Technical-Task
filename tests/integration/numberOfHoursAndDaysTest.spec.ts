import test, { expect } from "@playwright/test"

test.describe("Integration Tests for checking that number of hours test works fine", () => {
    
    test("Users can enter number of days that does not exceed the equavlant number of hours", async ({page})=>{
        await page.goto('https://www.gov.uk/calculate-your-holiday-entitlement/y/regular/compressed-hours/full-year');
        await page.getByRole('textbox', { name: 'Number of hours worked per' }).click();
        await page.getByRole('textbox', { name: 'Number of hours worked per' }).fill('40');
        await page.getByRole('button', { name: 'Continue' }).click();
        await page.getByRole('textbox', { name: 'Number of days worked per' }).click();
        await page.getByRole('textbox', { name: 'Number of days worked per' }).fill('5');
        await page.getByRole('button', { name: 'Continue' }).click();
        await expect(page.getByRole('heading', { name: 'Calculate holiday entitlement' })).toBeVisible();
    })
    
    test("Users cannot enter number of days that exceeds the equvilant number of hours", async ({
        page,
    }) => {
        await page.goto(
            "https://www.gov.uk/calculate-your-holiday-entitlement/y/regular/compressed-hours/full-year"
        )
        await page
            .getByRole("textbox", { name: "Number of hours worked per" })
            .click()
        await page
            .getByRole("textbox", { name: "Number of hours worked per" })
            .fill("25")
        await page.getByRole("button", { name: "Continue" }).click()
        await page
            .getByRole("textbox", { name: "Number of days worked per" })
            .click()
        await page
            .getByRole("textbox", { name: "Number of days worked per" })
            .fill("1")
        await page.getByRole("button", { name: "Continue" }).click()
        await expect(page.getByTitle("There is a problem")).toBeVisible()
        await page.getByText("Error: There are only 24").click()
        await expect(page.locator("#error-summary")).toContainText(
            "There is a problem There are only 24 hours per day. Please check and enter a correct value."
        )
        await page.getByText("Error: There are only 24").click()
    })
})
