"use client"

import { useEffect, useState } from "react"

export type TierFilter = "all" | "top" | "excellent"

export type Filters = {
  categories: string[]
  tier: TierFilter
  hideEstimated: boolean
}

const STORAGE_KEY = "conference-filters-v1"
const DEFAULT: Filters = { categories: [], tier: "all", hideEstimated: false }

/** Filter state shared between the Deadlines and Calendar pages via localStorage. */
export function useFilters() {
  const [filters, setFilters] = useState<Filters>(DEFAULT)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) setFilters({ ...DEFAULT, ...JSON.parse(saved) })
    } catch {}
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(filters))
    } catch {}
  }, [filters, ready])

  const toggleCategory = (c: string) =>
    setFilters((f) => ({
      ...f,
      categories: f.categories.includes(c) ? f.categories.filter((x) => x !== c) : [...f.categories, c],
    }))
  const setTier = (tier: TierFilter) => setFilters((f) => ({ ...f, tier }))
  const setHideEstimated = (hideEstimated: boolean) => setFilters((f) => ({ ...f, hideEstimated }))
  const reset = () => setFilters(DEFAULT)

  return { filters, ready, toggleCategory, setTier, setHideEstimated, reset }
}

export function matchesVenue(filters: Filters, venue: { category: string; kiise: string | null }) {
  if (filters.categories.length && !filters.categories.includes(venue.category)) return false
  if (filters.tier === "top" && venue.kiise !== "최우수") return false
  if (filters.tier === "excellent" && venue.kiise !== "우수") return false
  return true
}
