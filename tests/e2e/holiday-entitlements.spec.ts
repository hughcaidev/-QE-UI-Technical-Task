import { test, expect } from "@playwright/test"
import IrregularHoursPage from "../../pages/IrregularHoursPage"
import HolidayEntitlementBasisPage from "../../pages/HolidayEntitlementBasisPage"
import WorkOutHolidayPage from "../../pages/WorkOutHolidayPage"
import NumberOfDaysPage from "../../pages/numberOfDaysPage"
import StartDatePage from "../../pages/StartDatePage"
import LeaveYearPage from "../../pages/LeaveYearPage"
import NumberOfHoursPage from "../../pages/NumberOfHoursPage"
import NumberOfHoursPerShiftPage from "../../pages/NumberOfHoursPerShiftPage"
import EndDatePage from "../../pages/EndDatePage"

test.describe("E2E Tests - Holiday entitlement", () => {
    let irregularHoursPage: IrregularHoursPage
    let holidayEntitlementBasisPage: HolidayEntitlementBasisPage
    let workOutHolidayPage: WorkOutHolidayPage
    let numberOfDaysPage: NumberOfDaysPage
    let startDatePage: StartDatePage
    let leaveYearPage: LeaveYearPage
    let numberOfHoursPage: NumberOfHoursPage
    let numberOfHoursPerShiftPage: NumberOfHoursPerShiftPage
    let endDatePage: EndDatePage

    test.beforeEach(async ({ page, context }) => {
        irregularHoursPage = new IrregularHoursPage(page)
        holidayEntitlementBasisPage = new HolidayEntitlementBasisPage(page)
        workOutHolidayPage = new WorkOutHolidayPage(page)
        numberOfDaysPage = new NumberOfDaysPage(page)
        startDatePage = new StartDatePage(page)
        endDatePage = new EndDatePage(page)
        leaveYearPage = new LeaveYearPage(page)
        numberOfHoursPage = new NumberOfHoursPage(page)
        numberOfHoursPerShiftPage = new NumberOfHoursPerShiftPage(page)

        await context.addCookies([
            {
                name: "cookies_preferences_set",
                value: "true",
                path: "/",
                domain: "www.gov.uk",
            },
        ])

        await page.goto("/calculate-your-holiday-entitlement")
        await page.getByRole("button", { name: "Start now" }).click()
    })

    test("Regular employee - Works 5 Days per Week - Full Leave Annually", async ({
        page,
    }) => {
        await irregularHoursPage.selectNoOption()
        await holidayEntitlementBasisPage.selectDaysWorkedPerWeekOption()
        await workOutHolidayPage.selectFullYearOption()
        await numberOfDaysPage.submitNumberOfDays("5")

        await expect(page.locator("#result-info")).toContainText(
            "The statutory holiday entitlement is 28 days holiday."
        )
    })

    test("Regular employee - Works 6 Days per Week - Full Leave Annually", async ({
        page,
    }) => {
        await irregularHoursPage.selectNoOption()
        await holidayEntitlementBasisPage.selectDaysWorkedPerWeekOption()
        await workOutHolidayPage.selectFullYearOption()
        await numberOfDaysPage.submitNumberOfDays("6")

        await expect(page.locator("#result-info")).toContainText(
            "The statutory holiday entitlement is 28 days holiday."
        )
        await expect(page.locator("#result-info")).toContainText(
            "Even though more than 5 days a week are worked, the maximum statutory holiday entitlement is 28 days."
        )
    })

    test("Regular employee - Works 3 Days per Week - Full Leave Annually", async ({
        page,
    }) => {
        await irregularHoursPage.selectNoOption()
        await holidayEntitlementBasisPage.selectDaysWorkedPerWeekOption()
        await workOutHolidayPage.selectFullYearOption()
        await numberOfDaysPage.submitNumberOfDays("3")

        await expect(page.locator("#result-info")).toContainText(
            "The statutory holiday entitlement is 16.8 days holiday."
        )
    })

    test("Regular Employee - Works 40 hours per week - Starts on 01/04/2025 and leave years starts on 01/01/2025 (9 months)", async ({
        page,
    }) => {
        await irregularHoursPage.selectNoOption()
        await holidayEntitlementBasisPage.selectHoursWorkedPerWeekOption()
        await workOutHolidayPage.selectStartingPartWayOption()
        await startDatePage.submitDate("01/04/2025")
        await leaveYearPage.submitDate("01/01/2025")
        await numberOfHoursPage.submitNumberOfHours("40")
        await numberOfDaysPage.submitNumberOfDays("5")

        await expect(page.locator("#result-info")).toContainText(
            "The statutory entitlement is 168 hours holiday."
        )
    })

    test("Regular Employee - Works 40 hours per week - Starts on 01/04/2025 and leaves on 01/10/2025 (9 months), leave year starts on 01/01/2025", async ({
        page,
    }) => {
        await irregularHoursPage.selectNoOption()
        await holidayEntitlementBasisPage.selectHoursWorkedPerWeekOption()
        await startDatePage.submitDate("01/04/2025")
        await endDatePage.submitDate("01/10/2025")
        await numberOfHoursPage.submitNumberOfHours("40")
        await numberOfDaysPage.submitNumberOfDays("5")

        await expect(page.locator("#result-info")).toContainText(
            "The statutory entitlement is 14.2 hours holiday."
        )
    })

    test("Regular employee - Annualised hours - Full year", async ({
        page,
    }) => {
        await irregularHoursPage.selectNoOption()
        holidayEntitlementBasisPage.selectAnnualisedHoursOption()
        await workOutHolidayPage.selectFullYearOption()

        await expect(page.locator("#result-info")).toContainText(
            "The statutory holiday entitlement is 5.6 weeks holiday."
        )
    })

    test("Regular employee - Annualised hours - Works for 6 months, started from 01/07/2024 and the leave year date starts on 01/01/2024", async ({
        page,
    }) => {
        await irregularHoursPage.selectNoOption()
        holidayEntitlementBasisPage.selectAnnualisedHoursOption()
        await workOutHolidayPage.selectStartingPartWayOption()
        await startDatePage.submitDate("01/07/2024")
        await leaveYearPage.submitDate("01/01/2024")

        await expect(page.locator("#result-info")).toContainText(
            "The statutory holiday entitlement is 2.80 weeks holiday."
        )
    })

    test("Regular Employee - Works 40 compressed hours per week, 4 days a week - Leaves on 01/10/2025 and leave year date starts on 01/01/2025 (9 months of employment)", async ({
        page,
    }) => {
        await irregularHoursPage.selectNoOption()
        await holidayEntitlementBasisPage.selectCompressedHoursOption()
        await workOutHolidayPage.selectLeavingPartWayOption()

        await endDatePage.submitDate("01/10/2025")
        await leaveYearPage.submitDate("01/01/2025")
        await numberOfHoursPage.submitNumberOfHours("40")
        await numberOfDaysPage.submitNumberOfDays("4")

        await expect(page.locator("#result-info")).toContainText(
            "The statutory holiday entitlement is 168 hours and 12 minutes holiday for the year. Rather than taking a day’s holiday it’s 10 hours and 0 minutes holiday for each day otherwise worked."
        )
        await expect(page.getByText("1 October 2025")).toBeVisible()
        await expect(page.getByText("1 January 2025")).toBeVisible()
        await expect(page.getByText("40.0")).toBeVisible()
        await expect(page.getByText("4.0")).toBeVisible()
    })

    test("Irregular hours employee - Works for 5 days a week", async ({
        page,
    }) => {
        await irregularHoursPage.selectYesOption()
        await leaveYearPage.submitDate("01/01/2022")
        await holidayEntitlementBasisPage.selectDaysWorkedPerWeekOption()
        await workOutHolidayPage.selectFullYearOption()
        await numberOfDaysPage.submitNumberOfDays("5")

        await expect(page.locator("#result-info")).toContainText(
            "The statutory holiday entitlement is 28 days holiday."
        )
    })

    test("Irregular hours employee - Works 6 hours shifts, two shifts per day, 5 days a week - Full year", async ({
        page,
    }) => {
        await irregularHoursPage.selectYesOption()
        await leaveYearPage.submitDate("01/01/2022")
        await holidayEntitlementBasisPage.selectShiftsOption()
        await workOutHolidayPage.selectFullYearOption()
        await numberOfHoursPerShiftPage.submitNumberOfHoursPerShift("6")
        await numberOfHoursPerShiftPage.submitNumberOfShifts("2")
        await numberOfHoursPerShiftPage.submitNumberOfDays("5")

        await expect(page.locator("#result-info")).toContainText(
            "The statutory holiday entitlement is 15.7 shifts for the year. Each shift being 6.0 hours."
        )
    })

    test("Irregular hours employee - Works 6 hours shifts, two shifts per day, 5 days a week - Works for 6 months", async ({
        page,
    }) => {
        await irregularHoursPage.selectYesOption()
        await leaveYearPage.submitDate("01/01/2022")
        await holidayEntitlementBasisPage.selectShiftsOption()
        await workOutHolidayPage.selectStartingPartWayOption()
        await startDatePage.submitDate("01/07/2022")
        await numberOfHoursPerShiftPage.submitNumberOfHoursPerShift("6")
        await numberOfHoursPerShiftPage.submitNumberOfShifts("2")
        await numberOfHoursPerShiftPage.submitNumberOfDays("5")

        await expect(page.locator("#result-info")).toContainText(
            "The statutory holiday entitlement is 8 shifts for the year. Each shift being 6.0 hours."
        )
    })
})
