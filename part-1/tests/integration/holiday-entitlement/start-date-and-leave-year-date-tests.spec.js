import test, { expect } from "@playwright/test"
import StartDatePage from "../../pages/StartDatePage"
import LeaveYearPage from "../../pages/LeaveYearPage"
import employmentStartDates from "../../data/dates"

const {
    employmentStartDate,
    employmentStartDateAsString,
    startDateSixMonthAgo,
    startDate364DaysAgo,
    startDateOneDayLater,
    startDateOneYearAgo,
} = employmentStartDates

test.describe("Integration Tests - Integration", () => {
    let startDatePage: StartDatePage
    let leaveYearPage: LeaveYearPage

    test.beforeEach(async ({ page }) => {
        startDatePage = new StartDatePage(page)
        leaveYearPage = new LeaveYearPage(page)

        await page.goto(
            "/calculate-your-holiday-entitlement/y/regular/days-worked-per-week/starting/"
        )
    })

    test("Users can enter a valid start employment date and leave year", async ({
        page,
    }) => {
        await startDatePage.submitDate(employmentStartDate)
        await leaveYearPage.submitDate(startDateSixMonthAgo)

        await expect(page.getByText("Number of days worked per")).toBeVisible()
    })

    test("Users can enter a leave year that's within one year earlier than the start date", async ({
        page,
    }) => {
        await startDatePage.submitDate(employmentStartDate)
        await leaveYearPage.submitDate(startDate364DaysAgo)

        await expect(page.getByText("Number of days worked per")).toBeVisible()
    })

    test("Users cannot enter the same date for their start employment date and leave year", async ({
        page,
    }) => {
        await startDatePage.submitDate(employmentStartDate)
        await leaveYearPage.submitDate(employmentStartDate)

        await expect(page.getByTitle("There is a problem")).toBeVisible()
        await expect(page.getByRole("alert")).toContainText(
            `Your leave year start date must be earlier than your employment start date of ${employmentStartDateAsString}.`
        )
        await expect(page.getByRole("group")).toContainText(
            `Error: Your leave year start date must be earlier than your employment start date of ${employmentStartDateAsString}.`
        )
    })

    test("Users cannot enter a leave year date that is later than the employment start date", async ({
        page,
    }) => {
        await startDatePage.submitDate(employmentStartDate)
        await leaveYearPage.submitDate(startDateOneDayLater)

        await expect(page.getByTitle("There is a problem")).toBeVisible()
        await expect(page.getByRole("alert")).toContainText(
            `Your leave year start date must be earlier than your employment start date of ${employmentStartDateAsString}.`
        )
        await expect(page.getByRole("group")).toContainText(
            `Error: Your leave year start date must be earlier than your employment start date of ${employmentStartDateAsString}.`
        )
    })

    test("Users cannot enter a leave year date that is more than 1 year earlier the employment start date", async ({
        page,
    }) => {
        await startDatePage.submitDate(employmentStartDate)
        await leaveYearPage.submitDate(startDateOneYearAgo)

        await expect(page.getByTitle("There is a problem")).toBeVisible()
        await expect(page.getByRole("alert")).toContainText(
            `Your employment start date of ${employmentStartDateAsString} must be within 1 year of the leave year start date.`
        )
        await expect(page.getByRole("group")).toContainText(
            `Error: Your employment start date of ${employmentStartDateAsString} must be within 1 year of the leave year start date.`
        )
    })
})
