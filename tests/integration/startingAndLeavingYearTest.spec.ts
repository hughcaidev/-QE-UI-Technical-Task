import test, { expect } from "@playwright/test"
import StartDatePage from "../page-objects/startDatePage"
import LeaveYearPage from "../page-objects/leaveYearPage"

test.describe("Integration Tests for checking that number of hours test works fine", () => {
    let startDatePage: StartDatePage
    let leaveYearPage: LeaveYearPage

    test.beforeEach(async ({ page }) => {
        startDatePage = new StartDatePage(page)
        leaveYearPage = new LeaveYearPage(page)

        await page.goto(
            "https://www.gov.uk/calculate-your-holiday-entitlement/y/regular/days-worked-per-week/starting/"
        )
    })

    test("Users enter a valid start employment date and leave year", async ({
        page,
    }) => {
        await startDatePage.submitDate("01/07/2024")
        await leaveYearPage.submitDate("01/01/2024")

        await expect(page.getByText("Number of days worked per")).toBeVisible()
    })

    test("Users enter a leave year that's within one year earlier than the start date", async ({
        page,
    }) => {
        await startDatePage.submitDate("01/07/2024")
        await leaveYearPage.submitDate("02/07/2023")

        await expect(page.getByText("Number of days worked per")).toBeVisible()
    })

    test("Users cannot enter the same date for their start employment date and leave year", async ({
        page,
    }) => {
        await startDatePage.submitDate("01/07/2024")
        await leaveYearPage.submitDate("01/07/2024")

        await expect(page.getByTitle("There is a problem")).toBeVisible()
        await expect(page.getByRole("alert")).toContainText(
            "Your leave year start date must be earlier than your employment start date of 01 July 2024."
        )
        await expect(page.getByRole("group")).toContainText(
            "Error: Your leave year start date must be earlier than your employment start date of 01 July 2024."
        )
    })

    test("Users cannot enter a leave year date that is later than the employment start date", async ({
        page,
    }) => {
        await startDatePage.submitDate("01/07/2024")
        await leaveYearPage.submitDate("02/07/2024")

        await expect(page.getByTitle("There is a problem")).toBeVisible()
        await expect(page.getByRole("alert")).toContainText(
            "Your leave year start date must be earlier than your employment start date of 01 July 2024."
        )
        await expect(page.getByRole("group")).toContainText(
            "Error: Your leave year start date must be earlier than your employment start date of 01 July 2024."
        )
    })

    test("Users cannot enter a leave year date that is more than 1 year earlier the employment start date", async ({
        page,
    }) => {
        await startDatePage.submitDate("01/07/2024")
        await leaveYearPage.submitDate("01/07/2023")

        await expect(page.getByTitle("There is a problem")).toBeVisible()
        await expect(page.getByRole("alert")).toContainText(
            "Your employment start date of 01 July 2024 must be within 1 year of the leave year start date."
        )
        await expect(page.getByRole("group")).toContainText(
            "Error: Your employment start date of 01 July 2024 must be within 1 year of the leave year start date."
        )
    })
})
