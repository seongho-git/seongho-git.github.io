import { format, differenceInDays, differenceInHours, differenceInMinutes } from "date-fns"
import raw from "@/data/conferences.json"

export type Cycle = {
  name: string | null
  deadline: string | null
  abstractDeadline: string | null
  notification: string | null
  estimated: boolean
  verified: boolean
  /** Local time of the paper deadline ("23:59") in `timezone`; null when the source gives only a date. */
  deadlineTime?: string | null
  /** "AoE", "UTC", "UTC-7", "PT", ...; null when unknown (read as AoE). */
  timezone?: string | null
  /** Exact deadline instant (UTC ISO) when time and time zone are known. */
  deadlineAt?: string
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
  /**
   * Sponsoring organizations, checked against the official site. group: "ACM" | "IEEE" | "ACM/IEEE" | "USENIX" | "Other";
   * label is the short badge text for "Other" (IACR, ISOC, Independent, ...).
   */
  sponsor?: { group: string; names: string; label?: string }
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

/** Exact deadline when known; date-only deadlines are treated as 23:59 Anywhere on Earth (UTC-12). */
export function deadlineInstant(cycle: Pick<Cycle, "deadline" | "deadlineAt">): Date {
  if (cycle.deadlineAt) return new Date(cycle.deadlineAt)
  return new Date(`${cycle.deadline}T23:59:59-12:00`)
}

/** "17:00 PT", "23:59 AoE"; date-only deadlines read as 23:59 AoE. */
export function deadlineTimeLabel(cycle: Cycle) {
  if (cycle.deadlineAt && cycle.deadlineTime && cycle.timezone) return `${cycle.deadlineTime} ${cycle.timezone}`
  return "23:59 AoE"
}

/** Calendar date ("2027-04-07") as local midnight, so it displays as the same date in every time zone. */
export function dateInstant(date: string): Date {
  const [y, m, d] = date.split("-").map(Number)
  return new Date(y, m - 1, d)
}

export function formatDate(date: string | null | undefined, pattern = "MMM d, yyyy") {
  return date ? format(dateInstant(date), pattern) : "TBA"
}

/** "Oct 16–20, 2027", "Oct 31 – Nov 4, 2027", or the source text when only the month is known. */
export function formatDateRange(edition: Edition) {
  const { startDate: s, endDate: e } = edition
  if (!s || edition.approximateDate) return edition.dateText ?? (s ? format(dateInstant(s), "MMMM yyyy") : "Date TBA")
  if (!e || e === s) return formatDate(s)
  const a = dateInstant(s)
  const b = dateInstant(e)
  if (a.getFullYear() !== b.getFullYear()) return `${format(a, "MMM d, yyyy")} – ${format(b, "MMM d, yyyy")}`
  if (a.getMonth() !== b.getMonth()) return `${format(a, "MMM d")} – ${format(b, "MMM d, yyyy")}`
  return `${format(a, "MMM d")}–${format(b, "d, yyyy")}`
}

export function countdown(target: Date, now: Date) {
  const mins = differenceInMinutes(target, now)
  if (mins <= 0) return "Passed"
  const days = differenceInDays(target, now)
  const hours = differenceInHours(target, now) % 24
  if (days >= 1) return `${days}d ${hours}h`
  return `${hours}h ${mins % 60}m`
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
          deadlineAt: deadlineInstant(cycle),
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
  return formatDateRange(edition)
}
