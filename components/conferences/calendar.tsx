"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { format, addMonths, startOfMonth, differenceInCalendarDays } from "date-fns"
import {
  countdown,
  dateInstant,
  deadlineInstant,
  deadlineTimeLabel,
  formatDate,
  formatDateRange,
  venues,
  type Venue,
  type Edition,
  type Cycle,
} from "@/lib/conferences"
import { SponsorBadge, TierBadges } from "@/components/conferences/tier-badges"
import { matchesVenue, type Filters } from "@/components/conferences/use-filters"

const MONTH_PX = 84
const LANE_PX = 26
const BAR_PX = 18
const ROW_PAD = 6
const LABEL_PX = 250
const CARD_W = 320
/** Minimum hit width so one-day conferences stay easy to hover. */
const MIN_HIT_PX = 14

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
  url?: string
  lane: number
  venue: Venue
  edition: Edition
  cycle?: Cycle
}

type Hover = { bar: Bar; rect: DOMRect; x: number; pinned: boolean }

type Order = "category" | "deadline"
const ORDER_KEY = "conference-calendar-order"

type NextDeadline = { edition: Edition; cycle: Cycle; at: Date }

/** The venue's earliest deadline after `now`, skipping estimated cycles when the filter hides them. */
function nextDeadline(venue: Venue, filters: Filters, now: Date): NextDeadline | null {
  let best: NextDeadline | null = null
  for (const edition of venue.editions) {
    for (const cycle of edition.cycles) {
      if (!cycle.deadline || (filters.hideEstimated && cycle.estimated)) continue
      const at = deadlineInstant(cycle)
      if (at > now && (!best || at < best.at)) best = { edition, cycle, at }
    }
  }
  return best
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
        url,
        lane: 0,
        venue,
        edition,
        cycle,
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
          url,
          lane: 0,
          venue,
          edition,
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

function barLabel(bar: Bar) {
  const { venue, edition, cycle } = bar
  const head = `${venue.name} ${edition.year}${cycle?.name ? ` (${cycle.name})` : ""}`
  if (bar.kind === "conference") return `${head}: conference ${formatDateRange(edition)}${edition.location ? `, ${edition.location}` : ""}`
  return `${head}: paper deadline ${formatDate(cycle?.deadline)}${cycle?.estimated ? " (estimated)" : ""}`
}

function Line({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="min-w-0 text-foreground">{children}</dd>
    </>
  )
}

function CycleLines({ cycle, now }: { cycle: Cycle; now: Date }) {
  const at = deadlineInstant(cycle)
  const left = countdown(at, now)
  return (
    <>
      {cycle.abstractDeadline && <Line label="Abstract">{formatDate(cycle.abstractDeadline)}</Line>}
      <Line label="Paper">
        <span className="font-medium">{formatDate(cycle.deadline)}</span>
        <span className="text-muted-foreground"> · {deadlineTimeLabel(cycle)}</span>
        <span className="block text-[11px] text-muted-foreground">
          {format(at, "MMM d, HH:mm")} your time · {left === "Passed" ? "passed" : `${left} left`}
        </span>
      </Line>
      {cycle.notification && <Line label="Notification">{formatDate(cycle.notification)}</Line>}
    </>
  )
}

/** Left edge of the card for a pointer at clientX, kept inside the viewport. */
const cardLeft = (x: number) => Math.min(Math.max(8, x - 40), window.innerWidth - CARD_W - 8)

const sameBar = (a: Bar | undefined, b: Bar) => !!a && a.key === b.key && a.venue.id === b.venue.id

function BarCard({ hover, now, cardRef }: { hover: Hover; now: Date; cardRef: React.RefObject<HTMLDivElement | null> }) {
  const { bar, rect, x, pinned } = hover
  const { venue, edition, cycle } = bar
  const estimated = bar.kind === "submission" ? bar.estimated : bar.estimated || bar.approximate
  const cycles = edition.cycles.filter((c) => c.deadline)

  // Anchor to the bar (below it, or above when there is no room) and follow the pointer horizontally.
  const vh = window.innerHeight
  const left = cardLeft(x)
  const below = vh - rect.bottom > 280 || rect.top < 280
  const style: React.CSSProperties = below
    ? { left, top: rect.bottom + 6, width: CARD_W }
    : { left, bottom: vh - rect.top + 6, width: CARD_W }

  return (
    <div
      ref={cardRef}
      role="tooltip"
      data-conference-card
      className={`fixed z-50 rounded-md border border-border bg-popover p-3 text-xs text-popover-foreground shadow-lg ${
        pinned ? "pointer-events-auto" : "pointer-events-none"
      }`}
      style={style}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold leading-snug">
          {venue.name} {edition.year}
          {bar.kind === "submission" && cycle?.name && <span className="font-normal text-muted-foreground"> · {cycle.name}</span>}
        </p>
        {estimated && (
          <span className="flex-shrink-0 rounded border border-dashed border-border px-1.5 text-[10px] leading-4 text-muted-foreground">
            Est.
          </span>
        )}
      </div>
      {venue.fullName && <p className="mt-0.5 leading-snug text-muted-foreground">{venue.fullName}</p>}
      <div className="mt-1.5 flex flex-wrap gap-1">
        <TierBadges venue={venue} compact />
        <SponsorBadge venue={venue} />
      </div>

      <dl className="mt-2.5 grid grid-cols-[84px_1fr] gap-x-2 gap-y-1 border-t border-border pt-2.5">
        {bar.kind === "submission" && cycle && <CycleLines cycle={cycle} now={now} />}
        <Line label="Conference">{formatDateRange(edition)}</Line>
        <Line label="Location">
          {edition.location ?? <span className="text-muted-foreground">TBA (not announced yet)</span>}
        </Line>
        {venue.sponsor && <Line label="Sponsor">{venue.sponsor.names}</Line>}
        {bar.kind === "conference" && cycles.length > 0 && (
          <Line label={cycles.length > 1 ? "Deadlines" : "Deadline"}>
            {cycles.slice(0, 4).map((c) => (
              <span key={`${c.name}-${c.deadline}`} className="block">
                {c.name ? `${c.name}: ` : ""}
                {formatDate(c.deadline)}
                {c.estimated ? " (est.)" : ""}
              </span>
            ))}
            {cycles.length > 4 && <span className="block text-muted-foreground">+{cycles.length - 4} more rounds</span>}
          </Line>
        )}
      </dl>

      {estimated && <p className="mt-2 text-[11px] text-muted-foreground">Estimated from previous years. Confirm on the official call for papers.</p>}
      {bar.url &&
        (pinned ? (
          <a href={bar.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-medium text-primary hover:underline">
            Open website ↗
          </a>
        ) : (
          <p className="mt-2 text-[11px] text-muted-foreground">Click the bar to open the website.</p>
        ))}
    </div>
  )
}

export function ConferenceCalendar({ filters }: { filters: Filters }) {
  const [today, setToday] = useState<Date | null>(null)
  const [hover, setHoverState] = useState<Hover | null>(null)
  const [order, setOrderState] = useState<Order>("category")
  const setOrder = (o: Order) => {
    setOrderState(o)
    try {
      window.localStorage.setItem(ORDER_KEY, o)
    } catch {}
  }
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(ORDER_KEY)
      if (saved === "category" || saved === "deadline") setOrderState(saved)
    } catch {}
  }, [])
  const hoverRef = useRef<Hover | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const setHover = useCallback((next: Hover | null) => {
    hoverRef.current = next
    setHoverState(next)
  }, [])
  const lastPointer = useRef<string>("mouse")

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
    const now = today ?? new Date()
    const list = venues
      .filter((v) => matchesVenue(filters, v))
      .map((v) => ({ venue: v, bars: buildBars(v, filters, range.start, range.end), next: nextDeadline(v, filters, now) }))
      .filter((r) => r.bars.length > 0)
    // Next-deadline order: soonest first; venues without an upcoming deadline keep category order at the end.
    if (order === "deadline") {
      list.sort((a, b) => (a.next?.at.getTime() ?? Infinity) - (b.next?.at.getTime() ?? Infinity))
    }
    return list
  }, [filters, range, order, today])

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

  // The card is positioned from the bar's screen rect, so drop it when the page scrolls.
  useEffect(() => {
    if (!hover) return
    const close = () => setHover(null)
    window.addEventListener("scroll", close, { passive: true })
    window.addEventListener("resize", close)
    return () => {
      window.removeEventListener("scroll", close)
      window.removeEventListener("resize", close)
    }
  }, [hover, setHover])

  // A pinned card (touch) closes on a tap anywhere outside it and its bar.
  useEffect(() => {
    if (!hover?.pinned) return
    const onDown = (e: PointerEvent) => {
      const t = e.target as Element | null
      if (t?.closest("[data-conference-card]") || t?.closest(`[data-bar="${CSS.escape(`${hover.bar.venue.id}-${hover.bar.key}`)}"]`)) return
      setHover(null)
    }
    document.addEventListener("pointerdown", onDown)
    return () => document.removeEventListener("pointerdown", onDown)
  }, [hover, setHover])

  // Drag to pan. A drag of more than 4px suppresses the click that follows, so bar links do not open.
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null)
  const suppressClick = useRef(false)
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    lastPointer.current = e.pointerType
    if (e.button !== 0 || !scroller.current) return
    drag.current = { x: e.clientX, left: scroller.current.scrollLeft, moved: false }
    scroller.current.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !scroller.current) return
    const dx = e.clientX - drag.current.x
    if (Math.abs(dx) > 4) {
      if (!drag.current.moved && hoverRef.current) setHover(null)
      drag.current.moved = true
    }
    scroller.current.scrollLeft = drag.current.left - dx
  }
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !scroller.current) return
    scroller.current.releasePointerCapture(e.pointerId)
    const moved = drag.current.moved
    drag.current = null
    if (moved) suppressClick.current = true
  }
  const onClickCapture = (e: React.MouseEvent) => {
    if (suppressClick.current) {
      e.preventDefault()
      e.stopPropagation()
      suppressClick.current = false
    }
  }

  // Hover handlers shared by every bar. The whole bar, end to end, is the hover target.
  // Moving along the same bar only repositions the card; it does not re-render the calendar.
  const showCard = (bar: Bar, e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === "touch" || drag.current?.moved) return
    const h = hoverRef.current
    if (h?.pinned) return
    if (sameBar(h?.bar, bar)) {
      if (cardRef.current) cardRef.current.style.left = `${cardLeft(e.clientX)}px`
      return
    }
    setHover({ bar, rect: e.currentTarget.getBoundingClientRect(), x: e.clientX, pinned: false })
  }
  const hideCard = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === "touch" || hoverRef.current?.pinned) return
    setHover(null)
  }
  const focusCard = (bar: Bar, e: React.FocusEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setHover({ bar, rect, x: rect.left + Math.min(rect.width / 2, 40), pinned: false })
  }
  // On touch, the first tap shows the card and the second opens the link.
  const onBarClick = (bar: Bar, e: React.MouseEvent<HTMLElement>) => {
    if (lastPointer.current !== "touch") return
    const h = hoverRef.current
    if (h?.pinned && sameBar(h.bar, bar) && bar.url) return
    e.preventDefault()
    setHover({ bar, rect: e.currentTarget.getBoundingClientRect(), x: e.clientX, pinned: true })
  }

  if (!today) return <p className="py-10 text-center text-sm text-muted-foreground">Loading…</p>

  const months = Array.from({ length: range.months }, (_, i) => addMonths(range.start, i))
  const isHovered = (bar: Bar) => sameBar(hover?.bar, bar)

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
        <div className="inline-flex items-center gap-1" role="group" aria-label="Row order">
          <span>Order:</span>
          {(
            [
              ["category", "Category"],
              ["deadline", "Next deadline"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setOrder(value)}
              aria-pressed={order === value}
              className={`rounded px-2 py-0.5 transition-colors ${
                order === value ? "bg-secondary font-medium text-foreground" : "hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
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
        <span>Hover or tap a bar for details.</span>
      </div>

      <div className="flex rounded-md border border-border">
        {/* Label column (does not scroll) */}
        <div className="flex-shrink-0 border-r border-border bg-background" style={{ width: LABEL_PX }}>
          <div className="h-12 border-b border-border" />
          {rows.map(({ venue, bars, next }) => {
            const lanes = Math.max(...bars.map((b) => b.lane)) + 1
            // Same counting as the Deadlines table: whole days left, or hours on the last day.
            const msLeft = next ? next.at.getTime() - today.getTime() : null
            const days = msLeft !== null ? Math.floor(msLeft / 86400000) : null
            const left = msLeft === null ? "" : msLeft < 86400000 ? `${Math.max(1, Math.floor(msLeft / 3600000))}h left` : `${days}d left`
            return (
              <div
                key={venue.id}
                className="flex flex-col justify-center border-b border-border px-3 last:border-b-0"
                style={{ height: lanes * LANE_PX + ROW_PAD * 2 }}
              >
                <div className="flex items-center gap-2">
                  <a
                    href={venue.url ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-0 truncate text-sm font-medium leading-5 text-foreground hover:text-primary transition-colors"
                    title={venue.fullName ?? venue.name}
                  >
                    {venue.name}
                  </a>
                  <TierBadges venue={venue} compact />
                </div>
                {order === "deadline" && (
                  <p className="truncate text-[11px] leading-4 text-muted-foreground tabular-nums">
                    {next ? (
                      <>
                        <span className={days !== null && days <= 7 ? "font-medium text-primary" : "text-foreground"}>
                          {formatDate(next.cycle.deadline, "MMM d, yyyy")}
                        </span>
                        {" · "}
                        {left}
                        {next.cycle.name ? ` · ${next.cycle.name}` : ""}
                        {next.cycle.estimated ? " · est." : ""}
                      </>
                    ) : (
                      "No upcoming deadline"
                    )}
                  </p>
                )}
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
          onScroll={() => hoverRef.current && !hoverRef.current.pinned && setHover(null)}
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
                <div
                  key={venue.id}
                  className="relative border-b border-border last:border-b-0"
                  style={{ height: lanes * LANE_PX + ROW_PAD * 2 }}
                >
                  {bars.map((bar) => {
                    const barLeft = Math.max(0, xOf(bar.start))
                    const barRight = Math.min(totalPx, xOf(bar.end) + dayPx)
                    const barWidth = Math.max(barRight - barLeft, 6)
                    // Hit area: the full lane height and at least MIN_HIT_PX wide, centered on the visible bar.
                    const hitWidth = Math.max(barWidth, MIN_HIT_PX)
                    const hitLeft = barLeft - (hitWidth - barWidth) / 2
                    const inset = (hitWidth - barWidth) / 2
                    const hot = isHovered(bar)
                    const visual =
                      bar.kind === "submission" ? (
                        <>
                          <span
                            className={`absolute inset-0 rounded-sm border transition-colors ${
                              bar.estimated
                                ? `border-dashed border-muted-foreground ${hot ? "bg-muted-foreground/25" : "bg-secondary"}`
                                : `border-primary ${hot ? "bg-primary/40" : "bg-primary/20"}`
                            }`}
                          />
                          {bar.deadline && (
                            <span
                              className={`absolute -top-px -bottom-px w-[3px] ${bar.estimated ? "bg-muted-foreground" : "bg-primary"}`}
                              style={{ left: xOf(bar.deadline) - barLeft - 1 }}
                            />
                          )}
                          {bar.notification && (
                            <span
                              className={`absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full ${bar.estimated ? "bg-muted-foreground" : "bg-primary"}`}
                              style={{ left: xOf(bar.notification) - barLeft - 3 }}
                            />
                          )}
                        </>
                      ) : (
                        <span
                          className={`absolute inset-0 rounded-sm transition-shadow ${
                            bar.estimated || bar.approximate ? "border border-dashed border-foreground/60 bg-foreground/20" : "bg-foreground"
                          } ${hot ? "ring-2 ring-primary ring-offset-1 ring-offset-background" : ""}`}
                        />
                      )
                    const props = {
                      "data-bar": `${venue.id}-${bar.key}`,
                      "aria-label": barLabel(bar),
                      className: "absolute block outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm",
                      style: { left: hitLeft, width: hitWidth, top: ROW_PAD - (LANE_PX - BAR_PX) / 2 + bar.lane * LANE_PX, height: LANE_PX },
                      onPointerEnter: (e: React.PointerEvent<HTMLElement>) => showCard(bar, e),
                      onPointerMove: (e: React.PointerEvent<HTMLElement>) => showCard(bar, e),
                      onPointerLeave: hideCard,
                      onFocus: (e: React.FocusEvent<HTMLElement>) => focusCard(bar, e),
                      onBlur: () => !hoverRef.current?.pinned && setHover(null),
                      onClick: (e: React.MouseEvent<HTMLElement>) => onBarClick(bar, e),
                    }
                    const inner = (
                      <span className="absolute" style={{ left: inset, width: barWidth, top: (LANE_PX - BAR_PX) / 2, height: BAR_PX }}>
                        {visual}
                      </span>
                    )
                    return bar.url ? (
                      <a key={bar.key} href={bar.url} target="_blank" rel="noopener noreferrer" {...props}>
                        {inner}
                      </a>
                    ) : (
                      <div key={bar.key} tabIndex={0} {...props}>
                        {inner}
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
      {hover && createPortal(<BarCard hover={hover} now={today} cardRef={cardRef} />, document.body)}
    </div>
  )
}
