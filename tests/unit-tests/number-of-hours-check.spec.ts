import test, { expect } from "@playwright/test"
import NumberOfHoursPage from "../page-objects/numberOfHoursPage"

test.describe("Number of Hours Page - Validation for the number of hours field is working as intented", () => {
    let numberOfHoursPage: NumberOfHoursPage

    test.beforeEach(async ({ page, context }) => {
        numberOfHoursPage = new NumberOfHoursPage(page)
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

    test("Inputs can take values between 0 and 168 hours", async ({ page }) => {
        await numberOfHoursPage.submitNumberOfHours("40")

        // Checks that the submittion navigates to the next page
        await expect(page.getByText("Number of days worked per")).toBeVisible()
        await expect(page.locator("h1")).toContainText(
            "Number of days worked per week?"
        )
    })

    test("Inputs can take values up to a maximum of 168 hours", async ({
        page,
    }) => {
        await numberOfHoursPage.submitNumberOfHours("168")

        await expect(page.getByText("Number of days worked per")).toBeVisible()
        await expect(page.locator("h1")).toContainText(
            "Number of days worked per week?"
        )
    })

    test("Input can take 0.5 hours as a value", async ({ page }) => {
        await numberOfHoursPage.submitNumberOfHours("0.5")

        await expect(page.getByText("Number of days worked per")).toBeVisible()
        await expect(page.locator("h1")).toContainText(
            "Number of days worked per week?"
        )
    })

    test("Users cannot input cannot take values greater than 168", async ({
        page,
    }) => {
        await numberOfHoursPage.submitNumberOfHours("169")

        // Checks that the page displays the error message
        await expect(page.getByTitle("There is a problem")).toBeVisible()
        await expect(page.getByRole("alert")).toContainText(
            "You can enter a maximum of 168 hours per week. Do not enter fractions. If you work half-hours, enter .5 for half. For example, 40.5"
        )
    })

    test("Input cannot accept 0 hours", async ({ page }) => {
        await numberOfHoursPage.submitNumberOfHours("0")

        await expect(page.locator("#error-summary")).toContainText(
            "There is a problem Please enter at least .5 hours worked. Do not enter fractions. If you work half-hours, enter .5 for half. For example, 40.5"
        )
        await expect(page.locator("#current-question")).toContainText(
            "Error: Please enter at least .5 hours worked. Do not enter fractions. If you work half-hours, enter .5 for half. For example, 40.5"
        )
    })

    test("Input cannot accept negative numbers for the hours", async ({
        page,
    }) => {
        await numberOfHoursPage.submitNumberOfHours("-1")

        await expect(page.locator("#error-summary")).toContainText(
            "There is a problem Please enter at least .5 hours worked. Do not enter fractions. If you work half-hours, enter .5 for half. For example, 40.5"
        )
        await expect(page.locator("#current-question")).toContainText(
            "Error: Please enter at least .5 hours worked. Do not enter fractions. If you work half-hours, enter .5 for half. For example, 40.5"
        )
    })

    test("Input cannout take in non-numeric values", async ({ page }) => {
        await numberOfHoursPage.submitNumberOfHours("a")

        await expect(page.getByTitle("There is a problem")).toBeVisible()
        await expect(page.getByText("Error: Please answer this")).toBeVisible()
    })
})
