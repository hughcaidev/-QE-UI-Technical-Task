import test, { expect } from "@playwright/test"
import StartDatePage from "../page-objects/startDatePage"

test.describe("Employment Start Date - Checking that the date field validation works as intended", () => {
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
            "https://www.gov.uk/calculate-your-holiday-entitlement/y/regular/compressed-hours/starting"
        )
    })

    test("The date input accepts today's dates", async ({ page }) => {
        await startDatePage.submitDate("25/06/2025")

        // Checks that the browser goes to the next page
        await expect(
            page.getByRole("heading", { name: "When does the leave year" })
        ).toBeVisible()
    })

    test("The date input accepts a future date", async ({ page }) => {
        await startDatePage.submitDate("31/12/2050")

        await expect(
            page.getByRole("heading", { name: "When does the leave year" })
        ).toBeVisible()
    })

    test("The date input accepts a past date", async ({ page }) => {
        await startDatePage.submitDate("01/01/1999")

        await expect(
            page.getByRole("heading", { name: "When does the leave year" })
        ).toBeVisible()
    })

    test("The date input accepts leap year dates", async ({ page }) => {
        await startDatePage.submitDate("29/02/2024")

        await expect(
            page.getByRole("heading", { name: "When does the leave year" })
        ).toBeVisible()
    })

    test("The date input accepts a date without a missing leading zero", async ({
        page,
    }) => {
        await startDatePage.submitDate("1/1/2025")

        await expect(
            page.getByRole("heading", { name: "When does the leave year" })
        ).toBeVisible()
    })

    test("The date input does not take in invalid dates", async ({ page }) => {
        await startDatePage.submitDate("32/01/2025")

        // Checks that the browsers displays the error message
        await expect(page.getByTitle("There is a problem")).toBeVisible()
        await expect(page.getByText("Error: Please answer this")).toBeVisible()
    })

    test("The date input does not take in a leap year date with the incorrect year", async ({
        page,
    }) => {
        await startDatePage.submitDate("29/02/2025")

        await expect(page.getByTitle("There is a problem")).toBeVisible()
        await expect(page.getByText("Error: Please answer this")).toBeVisible()
    })

    test("The date input does not take in invalid inputs", async ({ page }) => {
        await startDatePage.submitDate("a/a/a")

        await expect(page.getByTitle("There is a problem")).toBeVisible()
        await expect(page.getByText("Error: Please answer this")).toBeVisible()
    })

    test("OUTLIER - The date input accepts 01/01/0001 as a date", async ({
        page,
    }) => {
        await startDatePage.submitDate("01/01/0001")

        await expect(
            page.getByRole("heading", { name: "When does the leave year" })
        ).toBeVisible()
    })

    test("OUTLIER - The date input accepts 31/12/9999 as a date", async ({
        page,
    }) => {
        await startDatePage.submitDate("31/12/9999")

        await expect(
            page.getByRole("heading", { name: "When does the leave year" })
        ).toBeVisible()
    })
})
