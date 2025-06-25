import test, { expect } from "@playwright/test"

test.describe("Employment Start Date - Checking that the date field validation works as intended", () => {
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
            "https://www.gov.uk/calculate-your-holiday-entitlement/y/regular/compressed-hours/starting"
        )
    })

    test("The date input accepts today's dates", async ({ page }) => {
        await page.getByRole("textbox", { name: "Day" }).click()
        await page.getByRole("textbox", { name: "Day" }).fill("25")
        await page.getByRole("textbox", { name: "Day" }).click()
        await page.getByRole("textbox", { name: "Month" }).fill("06")
        await page.getByRole("textbox", { name: "Year" }).click()
        await page.getByRole("textbox", { name: "Year" }).fill("2025")
        await page.getByRole("button", { name: "Continue" }).click()
        await expect(
            page.getByRole("heading", { name: "When does the leave year" })
        ).toBeVisible()
    })

    test("The date input accepts a future date", async ({ page }) => {
        await page.getByRole("textbox", { name: "Day" }).click()
        await page.getByRole("textbox", { name: "Day" }).fill("31")
        await page.getByRole("textbox", { name: "Month" }).click()
        await page.getByRole("textbox", { name: "Month" }).fill("12")
        await page.getByRole("textbox", { name: "Year" }).click()
        await page.getByRole("textbox", { name: "Year" }).fill("205")
        await page.getByRole("textbox", { name: "Year" }).press("ArrowRight")
        await page.getByRole("textbox", { name: "Year" }).fill("2050")
        await page.getByRole("button", { name: "Continue" }).click()
        await expect(
            page.getByRole("heading", { name: "When does the leave year" })
        ).toBeVisible()
    })

    test("The date input accepts a past date", async ({ page }) => {
        await page.getByRole("textbox", { name: "Day" }).click()
        await page.getByRole("textbox", { name: "Day" }).fill("01")
        await page.getByRole("textbox", { name: "Day" }).press("Tab")
        await page.getByRole("textbox", { name: "Month" }).fill("01")
        await page.getByRole("textbox", { name: "Month" }).press("Tab")
        await page.getByRole("textbox", { name: "Year" }).fill("1999")
        await page.getByRole("button", { name: "Continue" }).click()
        await expect(
            page.getByRole("heading", { name: "When does the leave year" })
        ).toBeVisible()
    })

    test("The date input accepts leap year dates", async ({ page }) => {
        await page.getByRole("textbox", { name: "Day" }).click()
        await page.getByRole("textbox", { name: "Day" }).fill("29")
        await page.getByRole("textbox", { name: "Day" }).press("Tab")
        await page.getByRole("textbox", { name: "Month" }).fill("02")
        await page.getByRole("textbox", { name: "Month" }).press("Tab")
        await page.getByRole("textbox", { name: "Year" }).fill("2024")
        await page.getByRole("button", { name: "Continue" }).click()
        await expect(
            page.getByRole("heading", { name: "When does the leave year" })
        ).toBeVisible()
    })

    test("The date input accepts a date without a missing leading zero", async ({
        page,
    }) => {
        await page.getByRole("textbox", { name: "Day" }).click()
        await page.getByRole("textbox", { name: "Day" }).fill("1")
        await page.getByRole("textbox", { name: "Day" }).press("Tab")
        await page.getByRole("textbox", { name: "Month" }).fill("1")
        await page.getByRole("textbox", { name: "Month" }).press("Tab")
        await page.getByRole("textbox", { name: "Year" }).fill("2025")
        await page.getByRole("button", { name: "Continue" }).click()
        await expect(
            page.getByRole("heading", { name: "When does the leave year" })
        ).toBeVisible()
    })

    test("The date input does not take in invalid dates", async ({ page }) => {
        await page.getByRole("textbox", { name: "Day" }).click()
        await page.getByRole("textbox", { name: "Day" }).fill("32")
        await page.getByRole("textbox", { name: "Day" }).press("Tab")
        await page.getByRole("textbox", { name: "Month" }).fill("01")
        await page.getByRole("textbox", { name: "Month" }).press("Tab")
        await page.getByRole("textbox", { name: "Year" }).fill("2025")
        await page.getByRole("button", { name: "Continue" }).click()

        await expect(page.getByTitle("There is a problem")).toBeVisible()
        await expect(page.getByText("Error: Please answer this")).toBeVisible()
    })

    test("The date input does not take in a leap year date with the incorrect year", async ({
        page,
    }) => {
        await page.getByRole("textbox", { name: "Day" }).click()
        await page.getByRole("textbox", { name: "Day" }).fill("29")
        await page.getByRole("textbox", { name: "Day" }).press("Tab")
        await page.getByRole("textbox", { name: "Month" }).fill("02")
        await page.getByRole("textbox", { name: "Month" }).press("Tab")
        await page.getByRole("textbox", { name: "Year" }).fill("2025")
        await page.getByRole("button", { name: "Continue" }).click()

        await expect(page.getByTitle("There is a problem")).toBeVisible()
        await expect(page.getByText("Error: Please answer this")).toBeVisible()
    })

    test("The date input does not take in invalid inputs", async ({ page }) => {
        await page.getByRole("textbox", { name: "Day" }).click()
        await page.getByRole("textbox", { name: "Day" }).fill("a")
        await page.getByRole("textbox", { name: "Day" }).press("Tab")
        await page.getByRole("textbox", { name: "Month" }).fill("a")
        await page.getByRole("textbox", { name: "Month" }).press("Tab")
        await page.getByRole("textbox", { name: "Year" }).fill("a")
        await page.getByRole("button", { name: "Continue" }).click()

        await expect(page.getByTitle("There is a problem")).toBeVisible()
        await expect(page.getByText("Error: Please answer this")).toBeVisible()
    })
})
