import test, { expect } from "@playwright/test"
import NumberOfHoursPage from "../../pages/NumberOfHoursPage"
import NumberOfDaysPage from "../../pages/numberOfDaysPage"

test.describe("Integration Tests - Number of hours and number of days fields", () => {
    let numberOfHoursPage: NumberOfHoursPage;
    let numberOfDaysPage: NumberOfDaysPage;

    test.beforeEach(async ({ page }) => {
        numberOfHoursPage = new NumberOfHoursPage(page)
        numberOfDaysPage = new NumberOfDaysPage(page)

        await page.goto(
            "/calculate-your-holiday-entitlement/y/regular/compressed-hours/full-year"
        )
    })

    test("Users can enter number of days that does not exceed the equavlant number of hours", async ({
        page,
    }) => {
        await numberOfHoursPage.submitNumberOfHours("40")
        await numberOfDaysPage.submitNumberOfDays("5")

        await expect(
            page.getByRole("heading", { name: "Calculate holiday entitlement" })
        ).toBeVisible()
    })

    test("Users cannot enter number of days that exceeds the equvilant number of hours", async ({
        page,
    }) => {
        await numberOfHoursPage.submitNumberOfHours("25")
        await numberOfDaysPage.submitNumberOfDays("1")

        await expect(page.getByTitle("There is a problem")).toBeVisible()
        await expect(page.locator("#error-summary")).toContainText(
            "There is a problem There are only 24 hours per day. Please check and enter a correct value."
        )
        await expect(page.getByText("Error: There are only 24")).toBeVisible()
    })
})
