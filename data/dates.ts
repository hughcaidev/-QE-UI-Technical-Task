import moment from "moment"

const day = moment("01/07/2024", "DD/MM/YYYY")

const employmentStartDates = {
    employmentStartDate: day.format("DD/MM/YYYY"),
    employmentStartDateAsString: day.format("DD MMMM YYYY"),
    startDateSixMonthAgo: moment("01/07/2024", "DD/MM/YYYY")
        .subtract(6, "M")
        .format("DD/MM/YYYY"),
    startDate364DaysAgo: moment("01/07/2024", "DD/MM/YYYY")
        .subtract(364, "day")
        .format("DD/MM/YYYY"),
    startDateOneYearAgo: moment("01/07/2024", "DD/MM/YYYY")
        .subtract(1, "year")
        .format("DD/MM/YYYY"),
    startDateOneDayLater: moment("01/07/2024", "DD/MM/YYYY")
        .add(1, "day")
        .format("DD/MM/YYYY"),
}

export default employmentStartDates
