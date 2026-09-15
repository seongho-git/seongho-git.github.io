"use client"

import { ConferencesShell } from "@/components/conferences/shell"
import { ConferenceCalendar } from "@/components/conferences/calendar"
import { useFilters } from "@/components/conferences/use-filters"

export default function ConferenceCalendarPage() {
  const { filters, toggleCategory, setTier, setHideEstimated, reset } = useFilters()
  return (
    <ConferencesShell
      wide
      filters={filters}
      onToggleCategory={toggleCategory}
      onTier={setTier}
      onHideEstimated={setHideEstimated}
      onReset={reset}
    >
      <ConferenceCalendar filters={filters} />
    </ConferencesShell>
  )
}
