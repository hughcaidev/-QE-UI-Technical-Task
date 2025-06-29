import { Locator, Page } from "@playwright/test"

class HolidayEntitlementBasisPage {
    readonly page: Page
    readonly continueButton: Locator
    readonly annualisedHoursOption: Locator

    constructor(page) {
        this.page = page
        this.annualisedHoursOption = this.page.getByRole("radio", {
            name: "annualised hours",
        })
        this.continueButton = this.page.getByRole("button", {
            name: "Continue",
        })
    }

    async selectDaysWorkedPerWeekOption() {
        await this.page
            .getByRole("radio", { name: "days worked per week" })
            .check()
        await this.page.getByRole("button", { name: "Continue" }).click()
    }

    async selectHoursWorkedPerWeekOption() {
        await this.page
            .getByRole("radio", { name: "hours worked per week" })
            .check()
        await this.page.getByRole("button", { name: "Continue" }).click()
    }

    async selectAnnualisedHoursOption() {
        await this.annualisedHoursOption.check()
        await this.continueButton.click()
    }

    async selectCompressedHoursOption() {
        await this.page.getByRole("radio", { name: "compressed hours" }).check()
        await this.page.getByRole("button", { name: "Continue" }).click()
    }

    async selectShiftsOption() {
        await this.page.getByRole("radio", { name: "shifts" }).check()
        await this.page.getByRole("button", { name: "Continue" }).click()
    }
}

export default HolidayEntitlementBasisPage
