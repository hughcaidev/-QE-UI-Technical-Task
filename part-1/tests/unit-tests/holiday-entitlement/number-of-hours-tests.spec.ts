import test, { expect } from "@playwright/test"
import NumberOfHoursPage from "../../pages/NumberOfHoursPage"

test.describe("Unit Tests - Number of Hours Page - Number of Hours Field", () => {
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
            "/calculate-your-holiday-entitlement/y/regular/hours-worked-per-week/full-year"
        )
    })

    test("The number of hours field accepts values between 0 and 168", async ({
        page,
    }) => {
        await numberOfHoursPage.submitNumberOfHours("40")

        // Checks that the submittion navigates to the next page
        await expect(page.getByText("Number of days worked per")).toBeVisible()
        await expect(page.locator("h1")).toContainText(
            "Number of days worked per week?"
        )
    })

    test("The number of hours field accepts values up to a maximum of 168", async ({
        page,
    }) => {
        await numberOfHoursPage.submitNumberOfHours("168")

        await expect(page.getByText("Number of days worked per")).toBeVisible()
        await expect(page.locator("h1")).toContainText(
            "Number of days worked per week?"
        )
    })

    test("The number of hours field accepts 0.5 an an input", async ({
        page,
    }) => {
        await numberOfHoursPage.submitNumberOfHours("0.5")

        await expect(page.getByText("Number of days worked per")).toBeVisible()
        await expect(page.locator("h1")).toContainText(
            "Number of days worked per week?"
        )
    })

    test("The number of hours field accepts values greater than 168", async ({
        page,
    }) => {
        await numberOfHoursPage.submitNumberOfHours("169")

        // Checks that the page displays the error message
        await expect(page.getByTitle("There is a problem")).toBeVisible()
        await expect(page.getByRole("alert")).toContainText(
            "You can enter a maximum of 168 hours per week. Do not enter fractions. If you work half-hours, enter .5 for half. For example, 40.5"
        )
    })

    test("The number of hours field does not accept 0 as an input", async ({
        page,
    }) => {
        await numberOfHoursPage.submitNumberOfHours("0")

        await expect(page.locator("#error-summary")).toContainText(
            "There is a problem Please enter at least .5 hours worked. Do not enter fractions. If you work half-hours, enter .5 for half. For example, 40.5"
        )
        await expect(page.locator("#current-question")).toContainText(
            "Error: Please enter at least .5 hours worked. Do not enter fractions. If you work half-hours, enter .5 for half. For example, 40.5"
        )
    })

    test("The number of hours field does not accept negative numbers for the hours", async ({
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

    test("The number of hours field does not accepts non-numeric values", async ({
        page,
    }) => {
        await numberOfHoursPage.submitNumberOfHours("a")

        await expect(page.getByTitle("There is a problem")).toBeVisible()
        await expect(page.getByText("Error: Please answer this")).toBeVisible()
    })
})
