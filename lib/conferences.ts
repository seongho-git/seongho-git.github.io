import raw from "@/data/conferences.json"

export type Cycle = {
  name: string | null
  deadline: string | null
  abstractDeadline: string | null
  notification: string | null
  estimated: boolean
  verified: boolean
  timezone?: string | null
}

export type Edition = {
  year: number
  dateText: string | null
  startDate: string | null
  endDate: string | null
  approximateDate: boolean
  location: string | null
  url: string | null
  cycles: Cycle[]
}

export type Venue = {
  id: string
  name: string
  fullName: string | null
  category: string
  domains: string[]
  keywords: string[]
  kiise: string | null
  bk21plus: number | null
  tierVariants?: { variant: string; kiise: string | null; bk21plus: number | null }[]
  lists?: { kaist: boolean; snu: boolean; postech: string | null }
  dblp: string | null
  url: string | null
  editions: Edition[]
  source: string
}

export type ConferenceData = {
  generatedAt: string
  sources: { heelim: { url: string; lastUpdated: string | null }; ccfDeadlines: string; tiers: string }
  categories: string[]
  venues: Venue[]
}

export const conferenceData = raw as ConferenceData
export const venues = conferenceData.venues
export const categories = conferenceData.categories

/** Deadlines are date-only in the source; treat them as 23:59 Anywhere on Earth (UTC-12). */
export function deadlineInstant(date: string): Date {
  return new Date(`${date}T23:59:59-12:00`)
}

export function dateInstant(date: string): Date {
  return new Date(`${date}T00:00:00Z`)
}

export type DeadlineRow = {
  key: string
  venue: Venue
  edition: Edition
  cycle: Cycle
  deadlineAt: Date
}

/** One row per (venue, edition, cycle) that has a deadline. */
export function flattenDeadlines(list: Venue[] = venues): DeadlineRow[] {
  const rows: DeadlineRow[] = []
  for (const venue of list) {
    for (const edition of venue.editions) {
      for (const cycle of edition.cycles) {
        if (!cycle.deadline) continue
        rows.push({
          key: `${venue.id}-${edition.year}-${cycle.name ?? "main"}-${cycle.deadline}`,
          venue,
          edition,
          cycle,
          deadlineAt: deadlineInstant(cycle.deadline),
        })
      }
    }
  }
  return rows.sort((a, b) => a.deadlineAt.getTime() - b.deadlineAt.getTime())
}

export const KIISE_LABEL: Record<string, string> = {
  최우수: "KIISE Top",
  우수: "KIISE Excellent",
}

export function editionLabel(edition: Edition) {
  return edition.dateText ?? (edition.startDate ? `${edition.startDate}${edition.endDate ? ` – ${edition.endDate}` : ""}` : "Date TBA")
}
