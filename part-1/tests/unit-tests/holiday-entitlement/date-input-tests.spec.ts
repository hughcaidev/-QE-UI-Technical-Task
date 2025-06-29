import test, { expect } from "@playwright/test"
import StartDatePage from "../../pages/StartDatePage"

test.describe("Unit Tests - Employment Start Date Page - Employment Start Date Field", () => {
    let startDatePage: StartDatePage

    test.beforeEach(async ({ page, context }) => {
        startDatePage = new StartDatePage(page)

        await context.addCookies([
            {
                name: "cookies_preferences_set",
                value: "true",
                path: "/",
                domain: "www.gov.uk",
            },
        ])

        await page.goto(
            "/calculate-your-holiday-entitlement/y/regular/compressed-hours/starting"
        )
    })

    test("The date field accepts today's date", async ({ page }) => {
        await startDatePage.submitDate("25/06/2025")

        // Checks that the browser goes to the next page
        await expect(
            page.getByRole("heading", { name: "When does the leave year" })
        ).toBeVisible()
    })

    test("The date field accepts a future date", async ({ page }) => {
        await startDatePage.submitDate("31/12/2050")

        await expect(
            page.getByRole("heading", { name: "When does the leave year" })
        ).toBeVisible()
    })

    test("The date field accepts a past date", async ({ page }) => {
        await startDatePage.submitDate("01/01/1999")

        await expect(
            page.getByRole("heading", { name: "When does the leave year" })
        ).toBeVisible()
    })

    test("The date field accepts a leap year date", async ({ page }) => {
        await startDatePage.submitDate("29/02/2024")

        await expect(
            page.getByRole("heading", { name: "When does the leave year" })
        ).toBeVisible()
    })

    test("The date field accepts a date without a missing leading zero", async ({
        page,
    }) => {
        await startDatePage.submitDate("1/1/2025")

        await expect(
            page.getByRole("heading", { name: "When does the leave year" })
        ).toBeVisible()
    })

    test("The date field does not accept invalid dates", async ({ page }) => {
        await startDatePage.submitDate("32/01/2025")

        // Checks that the browsers displays the error message
        await expect(page.getByTitle("There is a problem")).toBeVisible()
        await expect(page.getByText("Error: Please answer this")).toBeVisible()
    })

    test("The date field does not accept a leap year date with the incorrect year", async ({
        page,
    }) => {
        await startDatePage.submitDate("29/02/2025")

        await expect(page.getByTitle("There is a problem")).toBeVisible()
        await expect(page.getByText("Error: Please answer this")).toBeVisible()
    })

    test("The date field does not accept invalid inputs", async ({ page }) => {
        await startDatePage.submitDate("a/a/a")

        await expect(page.getByTitle("There is a problem")).toBeVisible()
        await expect(page.getByText("Error: Please answer this")).toBeVisible()
    })

    test("OUTLIER - The date field accepts 01/01/0001 as a date", async ({
        page,
    }) => {
        await startDatePage.submitDate("01/01/0001")

        await expect(
            page.getByRole("heading", { name: "When does the leave year" })
        ).toBeVisible()
    })

    test("OUTLIER - The date field accepts 31/12/9999 as a date", async ({
        page,
    }) => {
        await startDatePage.submitDate("31/12/9999")

        await expect(
            page.getByRole("heading", { name: "When does the leave year" })
        ).toBeVisible()
    })
})
