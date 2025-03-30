import {NewsItemType} from "@/types/newsItem";
import Link from "next/link";
import {getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth, getMonthName} from "@/lib/news";
import {NewsList} from "@/components";

type FilteresNewsPageType = {
    params: Promise<{
        filter: string[]
    }>
}

const FilteredNewsPage = async ({params}: FilteresNewsPageType) => {

    const {filter} = await params

    // Get the parts from the path
    const selectedYear = parseInt(filter?.[0])
    const selectedMonth = parseInt(filter?.[1])

    let news: NewsItemType[] = [];
    let links: number[] = [];

    // Fill links array with either years or months. Depends on the path
    if (!selectedYear) {
        links = getAvailableNewsYears()  // Returns array of all News Years
    }
    if (selectedYear && !selectedMonth) {
        news = getNewsForYear(selectedYear)
        links = getAvailableNewsMonths(selectedYear) // Get all months for this year
    }
    if (selectedYear && selectedMonth) {
        news = getNewsForYearAndMonth(selectedYear, selectedMonth)
        links = []
    }

    // newsContent is the variable shown on the screen
    let newsContent = <p>No News found for selected period.</p>

    if (news.length > 0) {
        newsContent = <NewsList newslist={news} />
    }

    links = links.sort()

    if (
        selectedYear && !getAvailableNewsYears().includes(selectedYear) ||
        selectedMonth && !getAvailableNewsMonths(selectedYear).includes(selectedMonth)
    ) {
        // We have a selected year, but it is not part of the available years
        // We have a selected month, but that month is not in the news array
        throw new Error('Invalid Filter')
    }

    // Bit dirty: Link is the year.
    // If you select the year, then the link is the month.
    return (
        <>
            <header id="archive-header">
                <nav>
                    <ul>
                        {links.map((link: number) => {
                            const href = selectedYear
                                ? `/archive/${selectedYear}/${link}`
                                : `/archive/${link}`
                            const linkText = selectedYear
                                ? getMonthName(link)
                                : link // This is the Year
                            return (
                                <li key={link}><Link href={href}>{linkText}</Link></li>
                            )
                        })}
                    </ul>
                </nav>
            </header>
            {newsContent}
        </>
    )
}

export default FilteredNewsPage
