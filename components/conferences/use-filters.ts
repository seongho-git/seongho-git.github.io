"use client"

import { useEffect, useState } from "react"
import { categories } from "@/lib/conferences"

export type TierFilter = "all" | "top" | "excellent"

export type Filters = {
  categories: string[]
  tier: TierFilter
  hideEstimated: boolean
  /** Off by default: only venues with a BK21+ IF score or a KIISE tier are shown. */
  includeUnranked: boolean
}

const STORAGE_KEY = "conference-filters-v1"
const DEFAULT: Filters = { categories: [], tier: "all", hideEstimated: false, includeUnranked: false }

/** Filter state shared between the Deadlines and Calendar pages via localStorage. */
export function useFilters() {
  const [filters, setFilters] = useState<Filters>(DEFAULT)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = { ...DEFAULT, ...JSON.parse(saved) } as Filters
        // Drop categories that no longer exist (e.g. after a rename), or the page would show nothing.
        parsed.categories = (parsed.categories ?? []).filter((c) => categories.includes(c))
        setFilters(parsed)
      }
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
  const setIncludeUnranked = (includeUnranked: boolean) => setFilters((f) => ({ ...f, includeUnranked }))
  const reset = () => setFilters(DEFAULT)

  return { filters, ready, toggleCategory, setTier, setHideEstimated, setIncludeUnranked, reset }
}

/** Ranked = has a BK21+ IF score or a KIISE tier. */
export const isRanked = (venue: { kiise: string | null; bk21plus: number | null }) => Boolean(venue.bk21plus || venue.kiise)

export function matchesVenue(filters: Filters, venue: { category: string; kiise: string | null; bk21plus: number | null }) {
  if (!filters.includeUnranked && !isRanked(venue)) return false
  if (filters.categories.length && !filters.categories.includes(venue.category)) return false
  if (filters.tier === "top" && venue.kiise !== "최우수") return false
  if (filters.tier === "excellent" && venue.kiise !== "우수") return false
  return true
}
