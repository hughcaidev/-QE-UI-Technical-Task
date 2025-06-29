import { Locator, Page } from "@playwright/test"

class NumberOfHoursPerShiftPage {
    readonly page: Page
    readonly numberOfHoursField: Locator
    readonly continueButton: Locator

    constructor(page: Page) {
        this.page = page
        this.numberOfHoursField = this.page.getByRole("textbox", {
            name: "How many hours in each shift?",
        })
        this.continueButton = this.page.locator("button", {
            hasText: "Continue",
        })
    }

    async enterHours(numberOfHours: string) {
        await this.numberOfHoursField.click()
        await this.numberOfHoursField.fill(numberOfHours)
    }

    async submitNumberOfHoursPerShift(numberOfHours: string) {
        await this.enterHours(numberOfHours)
        await this.continueButton.click()
    }

    async submitNumberOfShifts(numberOfShifts: string) {
        await this.page
            .getByRole("textbox", { name: "How many shifts will be" })
            .click()
        await this.page
            .getByRole("textbox", { name: "How many shifts will be" })
            .fill(numberOfShifts)
        await this.page.getByRole("button", { name: "Continue" }).click()
    }

    async submitNumberOfDays(numberOfDays: string) {
        await this.page
            .getByRole("textbox", { name: "How many days in the shift" })
            .click()
        await this.page
            .getByRole("textbox", { name: "How many days in the shift" })
            .fill(numberOfDays)
        await this.page.getByRole("button", { name: "Continue" }).click()
    }
}

export default NumberOfHoursPerShiftPage
