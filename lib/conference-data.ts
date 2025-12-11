export interface ConferenceMetadata {
    name: string
    full: string
    tags: string[]
    bkScore: number
    link: string // Default/Base link
}

export interface Conference extends ConferenceMetadata {
    deadline: string // ISO string
    abstract?: string
    cycle: string
    year: number
    location: string
    isPredicted?: boolean
    conferenceDate: string
    conferenceEndDate?: string
}

// 1. Conference Metadata Definition
export const conferenceMetadata: { [key: string]: ConferenceMetadata } = {
    "CCS": {
        name: "CCS",
        full: "ACM Conference on Computer and Communications Security",
        tags: ["Security", "Crypto", "Privacy", "Net"],
        bkScore: 4,
        link: "https://www.sigsac.org/ccs/"
    },
    "USENIX Security": {
        name: "USENIX Security",
        full: "USENIX Security Symposium",
        tags: ["Security", "Sys", "Privacy", "Net", "ML"],
        bkScore: 3,
        link: "https://www.usenix.org/conference/"
    },
    "Crypto": {
        name: "Crypto",
        full: "International Cryptology Conference",
        tags: ["Crypto", "Security", "Theory"],
        bkScore: 4,
        link: "https://crypto.iacr.org/"
    },
    "OOPSLA": {
        name: "OOPSLA",
        full: "Object-Oriented Programming, Systems, Languages & Applications",
        tags: ["PL", "Sys", "SE", "Compiler"],
        bkScore: 4,
        link: "https://splashcon.org/"
    },
    "MICRO": {
        name: "MICRO",
        full: "International Symposium on Microarchitecture",
        tags: ["Arch", "Sys", "Hardware", "ML"],
        bkScore: 4,
        link: "https://microarch.org/"
    },
    "ASPLOS": {
        name: "ASPLOS",
        full: "Architectural Support for Programming Languages and Operating Systems",
        tags: ["Arch", "Sys", "PL", "OS", "Hardware"],
        bkScore: 4,
        link: "https://asplos-conference.org/"
    },
    "NDSS": {
        name: "NDSS",
        full: "Network and Distributed System Security Symposium",
        tags: ["Security", "Sys", "Net", "Privacy"],
        bkScore: 2,
        link: "https://www.ndss-symposium.org/"
    },
    "EuroSys": {
        name: "EuroSys",
        full: "European Conference on Computer Systems",
        tags: ["Sys", "OS", "Cloud", "Dist"],
        bkScore: 2,
        link: "https://www.eurosys.org/"
    },
    "IEEE S&P": {
        name: "IEEE S&P",
        full: "IEEE Symposium on Security and Privacy",
        tags: ["Security", "Privacy", "Sys", "ML"],
        bkScore: 4,
        link: "https://www.ieee-security.org/"
    },
    "CGO": {
        name: "CGO",
        full: "Code Generation and Optimization",
        tags: ["Compiler", "Arch", "PL", "Sys"],
        bkScore: 2,
        link: "https://conf.researchr.org/home/cgo-"
    },
    "CC": {
        name: "CC",
        full: "International Conference on Compiler Construction",
        tags: ["Compiler", "PL", "Sys"],
        bkScore: 2,
        link: "https://conf.researchr.org/home/cc-"
    },
    "PLDI": {
        name: "PLDI",
        full: "Programming Language Design and Implementation",
        tags: ["PL", "Compiler", "SE", "Sys"],
        bkScore: 4,
        link: "https://pldi.sigplan.org/"
    },
    "ISCA": {
        name: "ISCA",
        full: "International Symposium on Computer Architecture",
        tags: ["Arch", "Sys", "Hardware", "ML"],
        bkScore: 4,
        link: "https://iscaconf.org/"
    },
    "DAC": {
        name: "DAC",
        full: "Design Automation Conference",
        tags: ["EDA", "Arch", "Sys", "Hardware", "Embedded"],
        bkScore: 3,
        link: "https://www.dac.com/"
    },
    "ESORICS": {
        name: "ESORICS",
        full: "European Symposium on Research in Computer Security",
        tags: ["Security", "Privacy", "Sys"],
        bkScore: 2,
        link: "https://esorics.org/"
    },
    "OSDI": {
        name: "OSDI",
        full: "USENIX Symposium on Operating Systems Design and Implementation",
        tags: ["OS", "Sys", "Dist", "Cloud"],
        bkScore: 4, // BKCSA039
        link: "https://www.usenix.org/conference/"
    },
    "HPCA": {
        name: "HPCA",
        full: "IEEE International Symposium on High-Performance Computer Architecture",
        tags: ["Arch", "Sys", "Hardware"],
        bkScore: 4, // BKCSA018
        link: "https://www.hpca-conf.org/"
    },
}

// Helper function to parse deadline strings (handles timezone suffixes like EST)
export function parseDeadline(deadlineStr: string): Date {
    // Handle timezone-prefixed times like "2025-12-11EST17:59:59"
    const tzMatch = deadlineStr.match(/^(\d{4}-\d{2}-\d{2})([A-Z]+)(\d{2}:\d{2}:\d{2})$/)
    if (tzMatch) {
        const [, datePart, , timePart] = tzMatch
        // Convert to ISO format (timezone handling simplified - treat as local)
        return new Date(`${datePart}T${timePart}`)
    }
    return new Date(deadlineStr)
}

// 2. All Conference Deadlines (unified - no manual moving between arrays needed)
export const allConferences: Conference[] = [
    // 2026 Cycles (Confirmed)
    {
        ...conferenceMetadata["CCS"],
        deadline: "2026-01-14T23:59:59",
        cycle: "(1 / 2)",
        year: 2026,
        location: "The Hague, Netherlands",
        link: "https://www.sigsac.org/ccs/CCS2026/",
        conferenceDate: "Nov 15-19, 2026",
        conferenceEndDate: "2026-11-19"
    },
    {
        ...conferenceMetadata["USENIX Security"],
        deadline: "2026-02-05T23:59:59",
        abstract: "2026-01-29",
        cycle: "(2 / 2)",
        year: 2026,
        location: "Baltimore, USA",
        link: "https://www.usenix.org/conference/usenixsecurity26",
        conferenceDate: "Aug 12-14, 2026",
        conferenceEndDate: "2026-08-14"
    },
    {
        ...conferenceMetadata["Crypto"],
        deadline: "2026-02-12T23:59:59",
        cycle: "(1 / 1)",
        year: 2026,
        location: "Santa Barbara, USA",
        link: "https://crypto.iacr.org/2026/",
        conferenceDate: "Aug 17-20, 2026",
        conferenceEndDate: "2026-08-20"
    },
    {
        ...conferenceMetadata["OOPSLA"],
        deadline: "2026-03-17T23:59:59",
        cycle: "(2 / 2)",
        year: 2026,
        location: "Oakland, USA",
        link: "https://2026.splashcon.org/track/oopsla-2026",
        conferenceDate: "Oct 3-9, 2026",
        conferenceEndDate: "2026-10-09"
    },
    {
        ...conferenceMetadata["MICRO"],
        deadline: "2026-04-09T04:59:59",
        abstract: "2026-04-02",
        cycle: "(1 / 1)",
        year: 2026,
        location: "Athens, Greece",
        link: "https://microarch.org/",
        conferenceDate: "Oct 31-Nov 4, 2026",
        conferenceEndDate: "2026-11-04"
    },
    {
        ...conferenceMetadata["CCS"],
        deadline: "2026-04-29T23:59:59",
        cycle: "(2 / 2)",
        year: 2026,
        location: "The Hague, Netherlands",
        link: "https://www.sigsac.org/ccs/CCS2026/",
        conferenceDate: "Nov 15-19, 2026",
        conferenceEndDate: "2026-11-19"
    },
    {
        ...conferenceMetadata["OSDI"],
        deadline: "2025-12-11EST17:59:59",
        abstract: "2025-12-04",
        cycle: "(1 / 1)",
        year: 2026,
        location: "Seattle, USA",
        link: "https://www.usenix.org/conference/osdi26",
        conferenceDate: "July 13-15, 2026",
        conferenceEndDate: "2026-07-15"
    },

    // Predicted / Future Cycles (Nearest Only)
    {
        ...conferenceMetadata["ASPLOS"],
        deadline: "2026-02-28T23:59:59", // Predicted Spring Cycle
        cycle: "(1 / 2)",
        year: 2027,
        location: "TBD",
        link: "https://asplos-conference.org/",
        isPredicted: true,
        conferenceDate: "Mar 2027 (TBD)",
        conferenceEndDate: "2027-03-31"
    },
    {
        ...conferenceMetadata["NDSS"],
        deadline: "2026-04-23T23:59:59",
        cycle: "(1 / 2)",
        year: 2027,
        location: "San Diego, USA",
        link: "https://www.ndss-symposium.org/",
        isPredicted: true,
        conferenceDate: "Feb 2027 (TBD)",
        conferenceEndDate: "2027-02-28"
    },
    {
        ...conferenceMetadata["CGO"],
        deadline: "2026-05-30T23:59:59",
        cycle: "(1 / 1)", // Usually single cycle
        year: 2027,
        location: "Sydney, Australia",
        link: "https://conf.researchr.org/home/cgo-2027",
        isPredicted: true,
        conferenceDate: "Feb 2027 (TBD)",
        conferenceEndDate: "2027-02-28"
    },
    {
        ...conferenceMetadata["EuroSys"],
        deadline: "2026-05-15T23:59:59",
        abstract: "2026-05-08",
        cycle: "(1 / 2)",
        year: 2027,
        location: "Edinburgh, UK",
        link: "https://www.eurosys.org/",
        isPredicted: true,
        conferenceDate: "Apr 2027 (TBD)",
        conferenceEndDate: "2027-04-30"
    },
    {
        ...conferenceMetadata["IEEE S&P"],
        deadline: "2026-06-05T23:59:59",
        abstract: "2026-05-29",
        cycle: "(1 / 2)",
        year: 2027,
        location: "San Francisco, USA",
        link: "https://www.ieee-security.org/TC/SP2027/",
        isPredicted: true,
        conferenceDate: "May 2027 (TBD)",
        conferenceEndDate: "2027-05-31"
    },
    {
        ...conferenceMetadata["USENIX Security"],
        deadline: "2026-08-26T23:59:59",
        cycle: "(1 / 2)",
        year: 2027,
        location: "TBD",
        link: "https://www.usenix.org/conference/usenixsecurity27",
        isPredicted: true,
        conferenceDate: "Aug 2027 (TBD)",
        conferenceEndDate: "2027-08-31"
    },
    {
        ...conferenceMetadata["OOPSLA"],
        deadline: "2026-10-15T23:59:59",
        cycle: "(1 / 2)",
        year: 2027,
        location: "TBD",
        link: "https://splashcon.org/",
        isPredicted: true,
        conferenceDate: "Oct 2027 (TBD)",
        conferenceEndDate: "2027-10-31"
    },
    {
        ...conferenceMetadata["CC"],
        deadline: "2026-11-10T23:59:59",
        abstract: "2026-11-07",
        cycle: "(1 / 1)",
        year: 2027,
        location: "Sydney, Australia",
        link: "https://conf.researchr.org/home/cc-2027",
        isPredicted: true,
        conferenceDate: "Feb 2027 (TBD)",
        conferenceEndDate: "2027-02-28"
    },
    {
        ...conferenceMetadata["PLDI"],
        deadline: "2026-11-13T23:59:59",
        cycle: "(1 / 1)",
        year: 2027,
        location: "Boulder, USA",
        link: "https://pldi27.sigplan.org/",
        isPredicted: true,
        conferenceDate: "Jun 2027 (TBD)",
        conferenceEndDate: "2027-06-30"
    },
    {
        ...conferenceMetadata["ISCA"],
        deadline: "2026-11-17T23:59:59",
        abstract: "2026-11-10",
        cycle: "(1 / 1)",
        year: 2027,
        location: "Raleigh, USA",
        link: "https://iscaconf.org/isca2027/",
        isPredicted: true,
        conferenceDate: "Jun 2027 (TBD)",
        conferenceEndDate: "2027-06-30"
    },
    {
        ...conferenceMetadata["DAC"],
        deadline: "2026-11-19T17:00:00",
        abstract: "2026-11-11",
        cycle: "(1 / 1)",
        year: 2027,
        location: "Long Beach, USA",
        link: "https://www.dac.com/",
        isPredicted: true,
        conferenceDate: "Jul 2027 (TBD)",
        conferenceEndDate: "2027-07-31"
    },

    // Past Deadlines (kept for history and TBD generation reference)
    {
        ...conferenceMetadata["OSDI"],
        deadline: "2024-12-15EST17:59:59",
        abstract: "2024-12-03",
        cycle: "(1 / 1)",
        year: 2025,
        location: "Boston, USA",
        link: "https://www.usenix.org/conference/osdi25",
        conferenceDate: "July 7-9, 2025",
        conferenceEndDate: "2025-07-09"
    },
    {
        ...conferenceMetadata["IEEE S&P"],
        deadline: "2025-11-13T23:59:59",
        abstract: "2025-11-06",
        cycle: "(2 / 2)",
        year: 2026,
        location: "San Francisco, USA",
        link: "https://sp2026.ieee-security.org/",
        conferenceDate: "May 18-20, 2026",
        conferenceEndDate: "2026-05-20"
    },
    {
        ...conferenceMetadata["IEEE S&P"],
        deadline: "2025-06-05T23:59:59",
        abstract: "2025-05-29",
        cycle: "(1 / 2)",
        year: 2026,
        location: "San Francisco, USA",
        link: "https://sp2026.ieee-security.org/",
        conferenceDate: "May 18-20, 2026",
        conferenceEndDate: "2026-05-20"
    },
    {
        ...conferenceMetadata["ISCA"],
        deadline: "2025-11-17T23:59:59",
        abstract: "2025-11-10",
        cycle: "(1 / 1)",
        year: 2026,
        location: "Raleigh, USA",
        link: "https://iscaconf.org/isca2026/",
        conferenceDate: "Jun 27 - Jul 1, 2026",
        conferenceEndDate: "2026-07-01"
    },
    {
        ...conferenceMetadata["DAC"],
        deadline: "2025-11-19T17:00:00",
        abstract: "2025-11-12",
        cycle: "(1 / 1)",
        year: 2026,
        location: "Long Beach, USA",
        link: "https://www.dac.com/",
        conferenceDate: "Jul 26-29, 2026",
        conferenceEndDate: "2026-07-29"
    },
    {
        ...conferenceMetadata["PLDI"],
        deadline: "2025-11-14T23:59:59",
        cycle: "(1 / 1)",
        year: 2026,
        location: "Boulder, USA",
        link: "https://pldi26.sigplan.org/",
        conferenceDate: "Jun 15-19, 2026",
        conferenceEndDate: "2026-06-19"
    },
    {
        ...conferenceMetadata["CC"],
        deadline: "2025-11-10T23:59:59",
        abstract: "2025-11-07",
        cycle: "(1 / 1)",
        year: 2026,
        location: "Sydney, Australia",
        link: "https://conf.researchr.org/home/cc-2026",
        conferenceDate: "Jan 31 - Feb 1, 2026",
        conferenceEndDate: "2026-02-01"
    },
    {
        ...conferenceMetadata["EuroSys"],
        deadline: "2025-09-25T23:59:59",
        abstract: "2025-09-18",
        cycle: "(2 / 2)",
        year: 2026,
        location: "Edinburgh, UK",
        link: "https://2026.eurosys.org/",
        conferenceDate: "Apr 27-30, 2026",
        conferenceEndDate: "2026-04-30"
    },
    {
        ...conferenceMetadata["EuroSys"],
        deadline: "2025-05-15T23:59:59",
        abstract: "2025-05-08",
        cycle: "(1 / 2)",
        year: 2026,
        location: "Edinburgh, UK",
        link: "https://2026.eurosys.org/",
        conferenceDate: "Apr 27-30, 2026",
        conferenceEndDate: "2026-04-30"
    },
    {
        ...conferenceMetadata["CGO"],
        deadline: "2025-09-12T23:59:59",
        cycle: "(2 / 2)",
        year: 2026,
        location: "Sydney, Australia",
        link: "https://conf.researchr.org/home/cgo-2026",
        conferenceDate: "Jan 31 - Feb 4, 2026",
        conferenceEndDate: "2026-02-04"
    },
    {
        ...conferenceMetadata["CGO"],
        deadline: "2025-05-30T23:59:59",
        cycle: "(1 / 2)",
        year: 2026,
        location: "Sydney, Australia",
        link: "https://conf.researchr.org/home/cgo-2026",
        conferenceDate: "Jan 31 - Feb 4, 2026",
        conferenceEndDate: "2026-02-04"
    },
    {
        ...conferenceMetadata["ASPLOS"],
        deadline: "2025-08-20T23:59:59",
        abstract: "2025-08-13",
        cycle: "(2 / 2)",
        year: 2026,
        location: "Pittsburgh, USA",
        link: "https://asplos-conference.org/",
        conferenceDate: "Mar 22-26, 2026",
        conferenceEndDate: "2026-03-26"
    },
    {
        ...conferenceMetadata["ASPLOS"],
        deadline: "2025-03-12T23:59:59",
        abstract: "2025-03-05",
        cycle: "(1 / 2)",
        year: 2026,
        location: "Pittsburgh, USA",
        link: "https://asplos-conference.org/",
        conferenceDate: "Mar 22-26, 2026",
        conferenceEndDate: "2026-03-26"
    },
    {
        ...conferenceMetadata["NDSS"],
        deadline: "2025-08-06T23:59:59",
        cycle: "(2 / 2)",
        year: 2026,
        location: "San Diego, USA",
        link: "https://www.ndss-symposium.org/ndss2026/",
        conferenceDate: "Feb 23-27, 2026",
        conferenceEndDate: "2026-02-27"
    },
    {
        ...conferenceMetadata["NDSS"],
        deadline: "2025-04-23T23:59:59",
        cycle: "(1 / 2)",
        year: 2026,
        location: "San Diego, USA",
        link: "https://www.ndss-symposium.org/ndss2026/",
        conferenceDate: "Feb 23-27, 2026",
        conferenceEndDate: "2026-02-27"
    },
    {
        ...conferenceMetadata["CCS"],
        deadline: "2025-04-14T23:59:59",
        abstract: "2025-04-07",
        cycle: "(2 / 2)",
        year: 2025,
        location: "Taipei, Taiwan",
        link: "https://www.sigsac.org/ccs/CCS2025/",
        conferenceDate: "Oct 13-17, 2025",
        conferenceEndDate: "2025-10-17"
    },
    {
        ...conferenceMetadata["CCS"],
        deadline: "2025-01-09T23:59:59",
        abstract: "2025-01-02",
        cycle: "(1 / 2)",
        year: 2025,
        location: "Taipei, Taiwan",
        link: "https://www.sigsac.org/ccs/CCS2025/",
        conferenceDate: "Oct 13-17, 2025",
        conferenceEndDate: "2025-10-17"
    },
    {
        ...conferenceMetadata["USENIX Security"],
        deadline: "2025-01-22T23:59:59",
        cycle: "(2 / 2)",
        year: 2025,
        location: "Seattle, USA",
        link: "https://www.usenix.org/conference/usenixsecurity25",
        conferenceDate: "Aug 13-15, 2025",
        conferenceEndDate: "2025-08-15"
    },
    {
        ...conferenceMetadata["USENIX Security"],
        deadline: "2025-08-26T23:59:59",
        cycle: "(1 / 2)",
        year: 2026,
        location: "Baltimore, USA",
        link: "https://www.usenix.org/conference/usenixsecurity26",
        conferenceDate: "Aug 12-14, 2026",
        conferenceEndDate: "2026-08-14"
    },
    {
        ...conferenceMetadata["Crypto"],
        deadline: "2025-02-13T23:59:59",
        cycle: "(1 / 1)",
        year: 2025,
        location: "Santa Barbara, USA",
        link: "https://crypto.iacr.org/2025/",
        conferenceDate: "Aug 17-21, 2025",
        conferenceEndDate: "2025-08-21"
    },
    {
        ...conferenceMetadata["OOPSLA"],
        deadline: "2025-10-10T23:59:59",
        cycle: "(1 / 2)",
        year: 2026,
        location: "Oakland, USA",
        link: "https://2026.splashcon.org/track/oopsla-2026",
        conferenceDate: "Oct 3-9, 2026",
        conferenceEndDate: "2026-10-09"
    },
    {
        ...conferenceMetadata["MICRO"],
        deadline: "2025-04-11T23:59:59",
        abstract: "2025-04-04",
        cycle: "(1 / 1)",
        year: 2025,
        location: "Seoul, Korea",
        link: "https://microarch.org/micro58/",
        conferenceDate: "Oct 18-22, 2025",
        conferenceEndDate: "2025-10-22"
    },
    {
        ...conferenceMetadata["ESORICS"],
        deadline: "2025-04-29T23:59:59",
        cycle: "(1 / 1)",
        year: 2025,
        location: "Toulouse, France",
        link: "https://esorics2025.org/",
        conferenceDate: "Sep 22-26, 2025",
        conferenceEndDate: "2025-09-26"
    },
    {
        ...conferenceMetadata["ISCA"],
        deadline: "2024-11-15T23:59:59",
        cycle: "(1 / 1)",
        year: 2025,
        location: "Tokyo, Japan",
        link: "https://iscaconf.org/isca2025/",
        conferenceDate: "Jun 21-25, 2025",
        conferenceEndDate: "2025-06-25"
    },
    {
        ...conferenceMetadata["PLDI"],
        deadline: "2024-11-14T23:59:59",
        cycle: "(1 / 1)",
        year: 2025,
        location: "Vancouver, Canada",
        link: "https://pldi25.sigplan.org/",
        conferenceDate: "Jun 16-20, 2025",
        conferenceEndDate: "2025-06-20"
    },
    {
        ...conferenceMetadata["HPCA"],
        deadline: "2024-07-25T23:59:59",
        abstract: "2024-07-18",
        cycle: "(1 / 1)",
        year: 2025,
        location: "Las Vegas, USA",
        link: "https://www.hpca-conf.org/2025/",
        conferenceDate: "Mar 1-5, 2025",
        conferenceEndDate: "2025-03-05"
    },
]

// 3. Helper Functions for Dynamic Filtering

/**
 * Get conferences with deadlines that haven't passed yet
 */
export function getUpcomingConferences(currentDate: Date = new Date()): Conference[] {
    const allWithTBD = [...allConferences, ...generateTBDConferences(currentDate)]

    return allWithTBD
        .filter(conf => parseDeadline(conf.deadline) > currentDate)
        .sort((a, b) => parseDeadline(a.deadline).getTime() - parseDeadline(b.deadline).getTime())
}

/**
 * Get conferences with deadlines that have already passed
 */
export function getPastConferences(currentDate: Date = new Date()): Conference[] {
    return allConferences
        .filter(conf => parseDeadline(conf.deadline) <= currentDate)
        .sort((a, b) => parseDeadline(b.deadline).getTime() - parseDeadline(a.deadline).getTime())
}

/**
 * Generate TBD conferences for conferences in metadata that don't have
 * an upcoming deadline registered (looking ~14 months ahead)
 */
export function generateTBDConferences(currentDate: Date = new Date()): Conference[] {
    const lookAheadMonths = 14
    const lookAheadDate = new Date(currentDate)
    lookAheadDate.setMonth(lookAheadDate.getMonth() + lookAheadMonths)

    const tbdConferences: Conference[] = []

    // For each conference in metadata, check if there's an upcoming deadline
    for (const confName of Object.keys(conferenceMetadata)) {
        const metadata = conferenceMetadata[confName]

        // Find the most recent past deadline for this conference
        const pastDeadlines = allConferences
            .filter(c => c.name === confName && parseDeadline(c.deadline) <= currentDate)
            .sort((a, b) => parseDeadline(b.deadline).getTime() - parseDeadline(a.deadline).getTime())

        // Find any upcoming deadline for this conference
        const upcomingDeadlines = allConferences
            .filter(c => c.name === confName && parseDeadline(c.deadline) > currentDate)

        // If there's no upcoming deadline and we have past data, generate TBD
        if (upcomingDeadlines.length === 0 && pastDeadlines.length > 0) {
            const mostRecent = pastDeadlines[0]
            const mostRecentDeadline = parseDeadline(mostRecent.deadline)

            // Create a TBD entry with +1 year from the most recent deadline
            const tbdDeadline = new Date(mostRecentDeadline)
            tbdDeadline.setFullYear(tbdDeadline.getFullYear() + 1)

            // Only add if it's within our look-ahead window
            if (tbdDeadline <= lookAheadDate && tbdDeadline > currentDate) {
                tbdConferences.push({
                    ...metadata,
                    deadline: tbdDeadline.toISOString().replace('.000Z', ''),
                    cycle: mostRecent.cycle,
                    year: mostRecent.year + 1,
                    location: "TBD",
                    isPredicted: true,
                    conferenceDate: `${getMonthName(tbdDeadline)} ${tbdDeadline.getFullYear()} (TBD)`,
                    conferenceEndDate: `${tbdDeadline.getFullYear()}-12-31`
                })
            }
        }
    }

    return tbdConferences
}

function getMonthName(date: Date): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return months[date.getMonth()]
}

// Legacy exports for backward compatibility
export const upcomingConferences = allConferences.filter(c =>
    parseDeadline(c.deadline) > new Date()
)
export const pastConferences = allConferences.filter(c =>
    parseDeadline(c.deadline) <= new Date()
)

