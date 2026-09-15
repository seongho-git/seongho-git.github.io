import type { Venue } from "@/lib/conferences"

export function TierBadges({ venue, compact }: { venue: Venue; compact?: boolean }) {
  const items: { label: string; title: string; strong?: boolean }[] = []
  if (venue.kiise) {
    items.push({
      label: compact ? venue.kiise : `KIISE ${venue.kiise}`,
      title: `KIISE 2024 우수학술대회 목록: ${venue.kiise}`,
      strong: venue.kiise === "최우수",
    })
  }
  if (venue.bk21plus) {
    items.push({ label: `BK ${venue.bk21plus}`, title: `BK21 Plus IF ${venue.bk21plus} (2018 list)` })
  }
  if (!items.length) return null
  return (
    <span className="inline-flex flex-shrink-0 gap-1 whitespace-nowrap">
      {items.map((it) => (
        <span
          key={it.label}
          title={it.title}
          className={`inline-flex items-center rounded border px-1.5 py-px text-[10px] leading-4 tabular-nums ${
            it.strong ? "border-primary/40 bg-primary/10 text-primary" : "border-border text-muted-foreground"
          }`}
        >
          {it.label}
        </span>
      ))}
    </span>
  )
}
