"use client"

import { useEffect, useMemo, useState } from "react"
import { format, differenceInDays, differenceInHours, differenceInMinutes } from "date-fns"
import { ExternalLink } from "lucide-react"
import { flattenDeadlines, dateInstant, editionLabel, venues, type DeadlineRow } from "@/lib/conferences"
import { TierBadges } from "@/components/conferences/tier-badges"
import { matchesVenue, type Filters } from "@/components/conferences/use-filters"

function formatDate(date: string | null) {
  return date ? format(dateInstant(date), "MMM d, yyyy") : "TBA"
}

function countdown(target: Date, now: Date) {
  const mins = differenceInMinutes(target, now)
  if (mins <= 0) return "Passed"
  const days = differenceInDays(target, now)
  const hours = differenceInHours(target, now) % 24
  if (days >= 1) return `${days}d ${hours}h`
  return `${hours}h ${mins % 60}m`
}

function Row({ row, now }: { row: DeadlineRow; now: Date }) {
  const { venue, edition, cycle } = row
  const passed = row.deadlineAt.getTime() <= now.getTime()
  const days = differenceInDays(row.deadlineAt, now)
  const urgency = passed ? "text-muted-foreground" : days <= 7 ? "text-primary font-semibold" : days <= 30 ? "text-foreground font-medium" : "text-foreground"
  const url = edition.url ?? venue.url ?? undefined

  return (
    <tr className={`border-b border-border align-top ${passed ? "opacity-60" : ""}`}>
      <td className="py-3 pr-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[15px] font-medium text-foreground hover:text-primary transition-colors"
          >
            {venue.name} {edition.year}
            <ExternalLink className="h-3 w-3 text-muted-foreground/60" aria-hidden="true" />
          </a>
          <TierBadges venue={venue} compact />
          {cycle.estimated && (
            <span className="rounded border border-dashed border-border px-1.5 text-[10px] leading-4 text-muted-foreground" title="Estimated from previous years">
              Est.
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1" title={venue.fullName ?? undefined}>
          {venue.fullName}
        </p>
        <p className="mt-0.5 text-[11px] text-muted-foreground/80">{venue.category}</p>
      </td>
      <td className="py-3 pr-4 whitespace-nowrap">
        <p className={`text-sm tabular-nums ${passed ? "line-through" : ""}`}>{formatDate(cycle.deadline)}</p>
        {cycle.name && <p className="text-xs text-muted-foreground">{cycle.name}</p>}
        {cycle.abstractDeadline && <p className="text-xs text-muted-foreground">Abstract {formatDate(cycle.abstractDeadline)}</p>}
        {cycle.notification && <p className="text-xs text-muted-foreground">Notification {formatDate(cycle.notification)}</p>}
      </td>
      <td className={`py-3 pr-4 whitespace-nowrap text-sm tabular-nums ${urgency}`}>{countdown(row.deadlineAt, now)}</td>
      <td className="py-3 pr-4 text-sm">
        <p className="whitespace-nowrap">{editionLabel(edition)}</p>
        {edition.location && <p className="text-xs text-muted-foreground">{edition.location}</p>}
      </td>
    </tr>
  )
}

export function DeadlinesTable({ filters }: { filters: Filters }) {
  const [now, setNow] = useState<Date | null>(null)
  const [showPast, setShowPast] = useState(false)

  useEffect(() => {
    setNow(new Date())
    const t = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(t)
  }, [])

  const rows = useMemo(() => {
    const filtered = venues.filter((v) => matchesVenue(filters, v))
    return flattenDeadlines(filtered).filter((r) => !(filters.hideEstimated && r.cycle.estimated))
  }, [filters])

  if (!now) return <p className="py-10 text-center text-sm text-muted-foreground">Loading…</p>

  const upcoming = rows.filter((r) => r.deadlineAt.getTime() > now.getTime())
  const past = rows.filter((r) => r.deadlineAt.getTime() <= now.getTime()).reverse()

  const Table = ({ items }: { items: DeadlineRow[] }) => (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead>
          <tr className="border-b border-foreground/80 text-xs uppercase tracking-wider text-muted-foreground">
            <th className="py-2 pr-4 font-medium">Conference</th>
            <th className="py-2 pr-4 font-medium">Deadline</th>
            <th className="py-2 pr-4 font-medium">Remaining</th>
            <th className="py-2 pr-4 font-medium">Conference date</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row) => (
            <Row key={row.key} row={row} now={now} />
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-2 text-sm font-medium">
          Upcoming <span className="text-muted-foreground">({upcoming.length})</span>
        </h2>
        {upcoming.length ? <Table items={upcoming} /> : <p className="py-6 text-sm text-muted-foreground">No upcoming deadlines match the current filters.</p>}
      </section>
      <section>
        <button
          type="button"
          onClick={() => setShowPast((s) => !s)}
          className="mb-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          aria-expanded={showPast}
        >
          {showPast ? "Hide" : "Show"} past deadlines <span className="text-muted-foreground">({past.length})</span>
        </button>
        {showPast && past.length > 0 && <Table items={past} />}
      </section>
    </div>
  )
}
