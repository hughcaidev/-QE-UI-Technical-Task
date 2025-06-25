import { Page } from "@playwright/test"

class NumberOfHoursPage {
    readonly page: Page
    constructor(page) {
        this.page = page
    }

    async enterHours(numberOfHours: string) {
        await this.page
            .getByRole("textbox", { name: "Number of hours worked per" })
            .click()
        await this.page
            .getByRole("textbox", { name: "Number of hours worked per" })
            .fill(numberOfHours)
    }

    async submitNumberOfHours(numberOfHours: string) {
        await this.enterHours(numberOfHours)
        await this.page.getByRole("button", { name: "Continue" }).click()
    }
}

export default NumberOfHoursPage
