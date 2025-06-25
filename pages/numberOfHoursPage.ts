import { Locator, Page } from "@playwright/test"

class NumberOfHoursPage {
    readonly page: Page
    readonly numberOfHoursField: Locator
    readonly continueButton: Locator

    constructor(page) {
        this.page = page
        this.numberOfHoursField = this.page.getByRole("textbox", {
            name: "Number of hours worked per",
        })
        this.continueButton = this.page.getByRole("button", {
            name: "Continue",
        })
    }

    async enterHours(numberOfHours: string) {
        await this.numberOfHoursField.click()
        await this.numberOfHoursField.fill(numberOfHours)
    }

    async submitNumberOfHours(numberOfHours: string) {
        await this.enterHours(numberOfHours)
        await this.continueButton.click()
    }
}

export default NumberOfHoursPage
