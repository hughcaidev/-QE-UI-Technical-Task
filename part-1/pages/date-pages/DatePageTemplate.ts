import { Locator, Page } from "@playwright/test"

class DatePage {
    readonly page: Page
    readonly dayField: Locator
    readonly monthField: Locator
    readonly yearField: Locator
    readonly continueButton: Locator

    constructor(page: Page) {
        this.page = page
        this.dayField = this.page.getByRole("textbox", { name: "Day" })
        this.monthField = this.page.getByRole("textbox", { name: "Month" })
        this.yearField = this.page.getByRole("textbox", { name: "Year" })
        this.continueButton = this.page.locator("button", {
            hasText: "Continue",
        })
    }

    async enterDate(date) {
        const [day, month, year] = date.split("/")
        await this.dayField.click()
        await this.dayField.fill(day)
        await this.monthField.click()
        await this.monthField.fill(month)
        await this.yearField.click()
        await this.yearField.fill(year)
    }

    async submitDate(date) {
        await this.enterDate(date)
        await this.continueButton.click()
    }
}

export default DatePage
