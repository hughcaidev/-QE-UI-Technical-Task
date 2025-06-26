import { Locator, Page } from "@playwright/test"

class WorkOutHolidayPage {
    readonly page: Page
    readonly continueButton: Locator

    constructor(page) {
        this.page = page
        this.continueButton = page.locator("button", { hasText: "Continue" })
    }

    async selectFullYearOption() {
        await this.page
            .getByRole("radio", { name: "for a full leave year" })
            .check()
        await this.continueButton.click()
    }

    async selectStartingPartWayOption() {
        await this.page
            .getByRole("radio", { name: "for someone starting part way" })
            .check()
        await this.continueButton.click()
    }

    async selectLeavingPartWayOption() {
        await this.page
            .getByRole("radio", { name: "for someone leaving part way" })
            .check()
        await this.page.getByRole("button", { name: "Continue" }).click()
    }

    async selectStartingAndEndingPartWay() {
        await this.page
            .getByRole("radio", { name: "for someone starting and" })
            .check()
        await this.page.getByRole("button", { name: "Continue" }).click()
    }
}

export default WorkOutHolidayPage
