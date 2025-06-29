import { Locator, Page } from "@playwright/test"

class NumberOfDaysPage {
    readonly page: Page
    readonly numberOfDaysField: Locator
    readonly continueButton: Locator

    constructor(page: Page) {
        this.page = page
        this.numberOfDaysField = this.page.getByRole("textbox", {
            name: "Number of days worked per",
        })
        this.continueButton = this.page.locator("button", {
            hasText: "Continue",
        })
    }

    async enterHours(numberOfDays: string) {
        await this.numberOfDaysField.click()
        await this.numberOfDaysField.fill(numberOfDays)
    }

    async submitNumberOfDays(numberOfDays: string) {
        await this.enterHours(numberOfDays)
        await this.continueButton.click()
    }
}

export default NumberOfDaysPage
