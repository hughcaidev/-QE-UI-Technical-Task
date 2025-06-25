import { Locator, Page } from "@playwright/test"

class StartDatePage {
    readonly page: Page
    readonly continueButton: Locator

    constructor(page) {
        this.page = page
        this.continueButton = page.locator("button", { hasText: "Continue" })
    }

    async enterDate(date) {
        const [day, month, year] = date.split("/")
        await this.page.getByRole("textbox", { name: "Day" }).click()
        await this.page.getByRole("textbox", { name: "Day" }).fill(day)
        await this.page.getByRole("textbox", { name: "Day" }).click()
        await this.page.getByRole("textbox", { name: "Month" }).fill(month)
        await this.page.getByRole("textbox", { name: "Month" }).click()
        await this.page.getByRole("textbox", { name: "Year" }).fill(year)
    }

    async submitDate(date) {
        await this.enterDate(date)
        await this.continueButton.click()
    }
}

export default StartDatePage
