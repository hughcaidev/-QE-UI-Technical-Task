import test, { expect } from "@playwright/test"
import StartDatePage from "../../pages/StartDatePage"
import LeaveYearPage from "../../pages/LeaveYearPage"
import moment from "moment"

var day = moment("01/07/2024", "DD/MM/YYYY")
const employmentStartDate = day.format("DD/MM/YYYY")
const employmentStartDateAsString = day.format("DD MMMM YYYY")
const dateSixMonthAgo = moment("01/07/2024", "DD/MM/YYYY")
    .subtract(6, "M")
    .format("DD/MM/YYYY")
const date364DaysAgo = moment("01/07/2024", "DD/MM/YYYY")
    .subtract(364, "day")
    .format("DD/MM/YYYY")
const dateOneYearAgo = moment("01/07/2024", "DD/MM/YYYY")
    .subtract(1, "year")
    .format("DD/MM/YYYY")
const dateOneDayLater = moment("01/07/2024", "DD/MM/YYYY")
    .add(1, "day")
    .format("DD/MM/YYYY")

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

    test("Users enter a valid start employment date and leave year", async ({
        page,
    }) => {
        await startDatePage.submitDate(employmentStartDate)
        await leaveYearPage.submitDate(dateSixMonthAgo)

        await expect(page.getByText("Number of days worked per")).toBeVisible()
    })

    test("Users enter a leave year that's within one year earlier than the start date", async ({
        page,
    }) => {
        await startDatePage.submitDate(employmentStartDate)
        await leaveYearPage.submitDate(date364DaysAgo)

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
        await leaveYearPage.submitDate(dateOneDayLater)

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
        await leaveYearPage.submitDate(dateOneYearAgo)

        await expect(page.getByTitle("There is a problem")).toBeVisible()
        await expect(page.getByRole("alert")).toContainText(
            `Your employment start date of ${employmentStartDateAsString} must be within 1 year of the leave year start date.`
        )
        await expect(page.getByRole("group")).toContainText(
            `Error: Your employment start date of ${employmentStartDateAsString} must be within 1 year of the leave year start date.`
        )
    })
})
