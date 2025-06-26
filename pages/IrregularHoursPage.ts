import { Page } from "@playwright/test"

class IrregularHoursPage {
    readonly page: Page

    constructor(page) {
        this.page = page
    }

    async selectNoOption() {
        await this.page.getByRole("radio", { name: "No" }).check()
        await this.page.getByRole("button", { name: "Continue" }).click()
    }

    async selectYesOption() {
        await this.page.getByRole("radio", { name: "Yes" }).check()
        await this.page.getByRole("button", { name: "Continue" }).click()
    }
}

export default IrregularHoursPage
