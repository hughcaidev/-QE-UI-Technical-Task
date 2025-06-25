import test, { expect } from "@playwright/test"

test.describe("Number of Hours Page - Validation for the number of hours field is working as intented", () => {
    test.beforeEach(async ({ page, context }) => {
        await context.addCookies([
            {
                name: "cookies_preferences_set",
                value: "true",
                path: "/",
                domain: "www.gov.uk",
            },
        ])

        await page.goto(
            "https://www.gov.uk/calculate-your-holiday-entitlement/y/regular/hours-worked-per-week/full-year"
        )
    })

    test("Inputs can take values up to 168 hours", async ({ page }) => {
        await page
            .getByRole("textbox", { name: "Number of hours worked per" })
            .click()
        await page
            .getByRole("textbox", { name: "Number of hours worked per" })
            .fill("168")
    })

    test("Input can take 0.5 hours as a value", async ({ page }) => {
        await page
            .getByRole("textbox", { name: "Number of hours worked per" })
            .click()
        await page
            .getByRole("textbox", { name: "Number of hours worked per" })
            .fill("0.5")
        await page.getByRole("button", { name: "Continue" }).click()
        await expect(page.getByText("Number of days worked per")).toBeVisible()
        await expect(page.locator("h1")).toContainText(
            "Number of days worked per week?"
        )
    })

    test("Input cannot take values greater than 168", async ({ page }) => {
        await page.getByRole("button", { name: "Continue" }).click()
        await page.goto(
            "https://www.gov.uk/calculate-your-holiday-entitlement/y/regular/hours-worked-per-week/full-year"
        )
        await page
            .getByRole("textbox", { name: "Number of hours worked per" })
            .click()
        await page
            .getByRole("textbox", { name: "Number of hours worked per" })
            .fill("169")
        await page.getByRole("button", { name: "Continue" }).click()
        await expect(page.getByTitle("There is a problem")).toBeVisible()
        await expect(page.getByRole("alert")).toContainText(
            "You can enter a maximum of 168 hours per week. Do not enter fractions. If you work half-hours, enter .5 for half. For example, 40.5"
        )
    })

    test("Input cannot take values equal to or less than 0", async ({
        page,
    }) => {
        await page
            .getByRole("textbox", { name: "Number of hours worked per" })
            .click()
        await page
            .getByRole("textbox", { name: "Number of hours worked per" })
            .fill("0")
        await page.getByRole("button", { name: "Continue" }).click()
        await page
            .getByRole("textbox", { name: "Number of hours worked per" })
            .click()
        await page
            .getByRole("textbox", { name: "Number of hours worked per" })
            .fill("-1")
        await page.getByRole("button", { name: "Continue" }).click()
        await expect(page.locator("#error-summary")).toContainText(
            "There is a problem Please enter at least .5 hours worked. Do not enter fractions. If you work half-hours, enter .5 for half. For example, 40.5"
        )

        await expect(page.locator("#current-question")).toContainText(
            "Error: Please enter at least .5 hours worked. Do not enter fractions. If you work half-hours, enter .5 for half. For example, 40.5"
        )
    })

    test("Input cannout take in non-numeric values", async ({ page }) => {
        await page
            .getByRole("textbox", { name: "Number of hours worked per" })
            .click()
        await page
            .getByRole("textbox", { name: "Number of hours worked per" })
            .fill("a")
        await page.getByRole("button", { name: "Continue" }).click()

        await expect(page.getByTitle("There is a problem")).toBeVisible()
        await expect(page.getByText("Error: Please answer this")).toBeVisible()
    })
})
