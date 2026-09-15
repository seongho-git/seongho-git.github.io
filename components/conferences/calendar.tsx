"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { format, addMonths, startOfMonth, differenceInCalendarDays } from "date-fns"
import { dateInstant, venues, type Venue, type Edition, type Cycle } from "@/lib/conferences"
import { TierBadges } from "@/components/conferences/tier-badges"
import { matchesVenue, type Filters } from "@/components/conferences/use-filters"

const MONTH_PX = 84
const LANE_PX = 26
const LABEL_PX = 250

type Bar = {
  key: string
  kind: "submission" | "conference"
  start: Date
  end: Date
  deadline?: Date
  abstract?: Date
  notification?: Date
  estimated: boolean
  approximate?: boolean
  title: string
  url?: string
  lane: number
}

function buildBars(venue: Venue, filters: Filters, rangeStart: Date, rangeEnd: Date): Bar[] {
  const bars: Bar[] = []
  const inRange = (a: Date, b: Date) => a <= rangeEnd && b >= rangeStart

  for (const edition of venue.editions) {
    const url = edition.url ?? venue.url ?? undefined
    for (const cycle of edition.cycles) {
      if (!cycle.deadline || (filters.hideEstimated && cycle.estimated)) continue
      const deadline = dateInstant(cycle.deadline)
      const abstract = cycle.abstractDeadline ? dateInstant(cycle.abstractDeadline) : undefined
      const notification = cycle.notification ? dateInstant(cycle.notification) : undefined
      const start = abstract ?? deadline
      const end = notification ?? deadline
      if (!inRange(start, end)) continue
      bars.push({
        key: `${edition.year}-${cycle.name ?? "main"}-${cycle.deadline}-sub`,
        kind: "submission",
        start,
        end,
        deadline,
        abstract,
        notification,
        estimated: cycle.estimated,
        title: [
          `${venue.name} ${edition.year}${cycle.name ? ` (${cycle.name})` : ""}`,
          abstract ? `Abstract: ${cycle.abstractDeadline}` : null,
          `Deadline: ${cycle.deadline}`,
          notification ? `Notification: ${cycle.notification}` : null,
          cycle.estimated ? "Estimated" : null,
        ]
          .filter(Boolean)
          .join("\n"),
        url,
        lane: 0,
      })
    }
    if (edition.startDate) {
      const start = dateInstant(edition.startDate)
      const end = dateInstant(edition.endDate ?? edition.startDate)
      if (inRange(start, end)) {
        bars.push({
          key: `${edition.year}-conf`,
          kind: "conference",
          start,
          end,
          estimated: edition.cycles.length > 0 && edition.cycles.every((c: Cycle) => c.estimated),
          approximate: edition.approximateDate,
          title: `${venue.name} ${edition.year}\n${edition.dateText ?? edition.startDate}${edition.location ? `\n${edition.location}` : ""}`,
          url,
          lane: 0,
        })
      }
    }
  }

  // Greedy lane assignment so overlapping bars stack instead of colliding.
  bars.sort((a, b) => a.start.getTime() - b.start.getTime())
  const laneEnds: number[] = []
  for (const bar of bars) {
    const pad = 3 * 86400000
    let lane = laneEnds.findIndex((e) => e + pad <= bar.start.getTime())
    if (lane === -1) {
      lane = laneEnds.length
      laneEnds.push(0)
    }
    laneEnds[lane] = bar.end.getTime()
    bar.lane = lane
  }
  return bars
}

export function ConferenceCalendar({ filters }: { filters: Filters }) {
  const [today, setToday] = useState<Date | null>(null)
  const scroller = useRef<HTMLDivElement>(null)

  useEffect(() => setToday(new Date()), [])

  const range = useMemo(() => {
    const base = today ?? new Date()
    const start = startOfMonth(addMonths(base, -9))
    const months = 24
    return { start, end: addMonths(start, months), months }
  }, [today])

  const dayPx = MONTH_PX / 30.4375
  const xOf = (d: Date) => differenceInCalendarDays(d, range.start) * dayPx
  const totalPx = range.months * MONTH_PX

  const rows = useMemo(() => {
    return venues
      .filter((v) => matchesVenue(filters, v))
      .map((v) => ({ venue: v, bars: buildBars(v, filters, range.start, range.end) }))
      .filter((r) => r.bars.length > 0)
  }, [filters, range])

  // Scroll so that today sits one third into the visible width.
  const scrollToToday = useCallback(
    (smooth = false) => {
      if (!today || !scroller.current) return
      const el = scroller.current
      const left = Math.max(0, xOf(today) - el.clientWidth / 3)
      el.scrollTo({ left, behavior: smooth ? "smooth" : "auto" })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [today, range],
  )

  useEffect(() => {
    scrollToToday()
  }, [scrollToToday, rows.length])

  // Drag to pan. A drag of more than 4px suppresses the click that follows, so bar links do not open.
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null)
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !scroller.current) return
    drag.current = { x: e.clientX, left: scroller.current.scrollLeft, moved: false }
    scroller.current.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !scroller.current) return
    const dx = e.clientX - drag.current.x
    if (Math.abs(dx) > 4) drag.current.moved = true
    scroller.current.scrollLeft = drag.current.left - dx
  }
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !scroller.current) return
    scroller.current.releasePointerCapture(e.pointerId)
    const moved = drag.current.moved
    drag.current = null
    if (moved) suppressClick.current = true
  }
  const suppressClick = useRef(false)
  const onClickCapture = (e: React.MouseEvent) => {
    if (suppressClick.current) {
      e.preventDefault()
      e.stopPropagation()
      suppressClick.current = false
    }
  }

  if (!today) return <p className="py-10 text-center text-sm text-muted-foreground">Loading…</p>

  const months = Array.from({ length: range.months }, (_, i) => addMonths(range.start, i))

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
        <button
          type="button"
          onClick={() => scrollToToday(true)}
          className="rounded border border-border px-2 py-0.5 text-xs text-foreground hover:border-primary hover:text-primary transition-colors"
        >
          Today
        </button>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-6 rounded-sm border border-primary bg-primary/15" /> Submission window (abstract → deadline → notification)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-[3px] bg-primary" /> Paper deadline
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-primary" /> Notification
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-6 rounded-sm bg-foreground" /> Conference
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-6 rounded-sm border border-dashed border-muted-foreground" /> Estimated
        </span>
      </div>

      <div className="flex rounded-md border border-border">
        {/* Label column (does not scroll) */}
        <div className="flex-shrink-0 border-r border-border bg-background" style={{ width: LABEL_PX }}>
          <div className="h-12 border-b border-border" />
          {rows.map(({ venue, bars }) => {
            const lanes = Math.max(...bars.map((b) => b.lane)) + 1
            return (
              <div
                key={venue.id}
                className="flex items-center gap-2 border-b border-border px-3 last:border-b-0"
                style={{ height: lanes * LANE_PX + 12 }}
              >
                <a
                  href={venue.url ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-0 truncate text-sm font-medium text-foreground hover:text-primary transition-colors"
                  title={venue.fullName ?? venue.name}
                >
                  {venue.name}
                </a>
                <TierBadges venue={venue} compact />
              </div>
            )
          })}
        </div>

        {/* Scrollable timeline */}
        <div
          ref={scroller}
          className="relative flex-1 cursor-grab overflow-x-auto select-none active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onClickCapture={onClickCapture}
        >
          <div className="relative" style={{ width: totalPx }}>
            {/* Month header */}
            <div className="sticky top-0 z-10 flex h-12 border-b border-border bg-background">
              {months.map((m) => (
                <div
                  key={m.toISOString()}
                  className="flex-shrink-0 border-r border-border px-2 py-1.5 text-xs text-muted-foreground"
                  style={{ width: MONTH_PX }}
                >
                  <div className="font-medium text-foreground">{format(m, "MMM")}</div>
                  <div>{format(m, "yyyy")}</div>
                </div>
              ))}
            </div>

            {/* Month grid lines */}
            <div className="pointer-events-none absolute inset-0 top-12 flex">
              {months.map((m) => (
                <div key={m.toISOString()} className="h-full flex-shrink-0 border-r border-border/60" style={{ width: MONTH_PX }} />
              ))}
            </div>

            {/* Today line */}
            <div className="pointer-events-none absolute bottom-0 top-0 z-20 w-px bg-primary" style={{ left: xOf(today) }}>
              <span className="absolute top-12 -translate-x-1/2 rounded-b bg-primary px-1.5 py-px text-[10px] font-medium text-primary-foreground">
                Today
              </span>
            </div>

            {/* Rows */}
            {rows.map(({ venue, bars }) => {
              const lanes = Math.max(...bars.map((b) => b.lane)) + 1
              return (
                <div key={venue.id} className="relative border-b border-border last:border-b-0" style={{ height: lanes * LANE_PX + 12 }}>
                  {bars.map((bar) => {
                    const left = Math.max(0, xOf(bar.start))
                    const right = Math.min(totalPx, xOf(bar.end) + dayPx)
                    const width = Math.max(right - left, 6)
                    const top = 6 + bar.lane * LANE_PX
                    const common = { title: bar.title, style: { left, width, top, height: LANE_PX - 8 } }
                    const content =
                      bar.kind === "submission" ? (
                        <>
                          <span className={`absolute inset-0 rounded-sm border ${bar.estimated ? "border-dashed border-muted-foreground bg-secondary" : "border-primary bg-primary/20"}`} />
                          {bar.deadline && (
                            <span
                              className={`absolute -top-px -bottom-px w-[3px] ${bar.estimated ? "bg-muted-foreground" : "bg-primary"}`}
                              style={{ left: xOf(bar.deadline) - left - 1 }}
                            />
                          )}
                          {bar.notification && (
                            <span
                              className={`absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full ${bar.estimated ? "bg-muted-foreground" : "bg-primary"}`}
                              style={{ left: xOf(bar.notification) - left - 3 }}
                            />
                          )}
                        </>
                      ) : (
                        <span
                          className={`absolute inset-0 rounded-sm ${
                            bar.estimated || bar.approximate ? "border border-dashed border-foreground/60 bg-foreground/20" : "bg-foreground"
                          }`}
                        />
                      )
                    return bar.url ? (
                      <a key={bar.key} href={bar.url} target="_blank" rel="noopener noreferrer" className="absolute block" {...common}>
                        {content}
                      </a>
                    ) : (
                      <div key={bar.key} className="absolute" {...common}>
                        {content}
                      </div>
                    )
                  })}
                </div>
              )
            })}
            {rows.length === 0 && <p className="p-8 text-center text-sm text-muted-foreground">No conferences match the current filters.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
