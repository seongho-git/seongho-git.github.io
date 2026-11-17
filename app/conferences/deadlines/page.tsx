"use client"

import { ConferencesShell } from "@/components/conferences/shell"
import { DeadlinesTable } from "@/components/conferences/deadlines-table"
import { useFilters } from "@/components/conferences/use-filters"

export default function ConferenceDeadlinesPage() {
  const { filters, toggleCategory, setTier, setHideEstimated, setIncludeUnranked, reset } = useFilters()
  return (
    <ConferencesShell
      filters={filters}
      onToggleCategory={toggleCategory}
      onTier={setTier}
      onHideEstimated={setHideEstimated}
      onIncludeUnranked={setIncludeUnranked}
      onReset={reset}
    >
      <DeadlinesTable filters={filters} />
    </ConferencesShell>
  )
}
