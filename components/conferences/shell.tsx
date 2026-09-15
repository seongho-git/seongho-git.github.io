"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { conferenceData, categories } from "@/lib/conferences"
import type { Filters, TierFilter } from "@/components/conferences/use-filters"

const tabs = [
  { label: "Calendar", href: "/conferences/" },
  { label: "Deadlines", href: "/conferences/deadlines/" },
]

const tierOptions: { value: TierFilter; label: string }[] = [
  { value: "all", label: "All tiers" },
  { value: "top", label: "KIISE 최우수" },
  { value: "excellent", label: "KIISE 우수" },
]

type Props = {
  children: ReactNode
  filters: Filters
  onToggleCategory: (c: string) => void
  onTier: (t: TierFilter) => void
  onHideEstimated: (v: boolean) => void
  onReset: () => void
  wide?: boolean
}

export function ConferencesShell({ children, filters, onToggleCategory, onTier, onHideEstimated, onReset, wide }: Props) {
  const pathname = usePathname() ?? ""
  const active = filters.categories.length > 0 || filters.tier !== "all" || filters.hideEstimated
  const updated = conferenceData.sources.heelim.lastUpdated ?? conferenceData.generatedAt.slice(0, 10)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className={`mx-auto px-4 py-10 sm:px-6 lg:px-8 ${wide ? "max-w-7xl" : "max-w-5xl"}`}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Conferences</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Submission deadlines and dates for systems, architecture, compiler, and security venues, with KIISE and BK21+ tiers.
            </p>
          </div>
          <nav className="flex gap-1 rounded-md border border-border p-1 text-sm" aria-label="Conference views">
            {tabs.map((tab) => {
              const isActive = pathname.replace(/\/$/, "") === tab.href.replace(/\/$/, "")
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`rounded px-3 py-1.5 transition-colors ${
                    isActive ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Filters */}
        <div className="mt-6 space-y-3 border-y border-border py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => {
              const on = filters.categories.includes(c)
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => onToggleCategory(c)}
                  aria-pressed={on}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    on
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              )
            })}
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              {tierOptions.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => onTier(o.value)}
                  aria-pressed={filters.tier === o.value}
                  className={`rounded px-2 py-1 transition-colors ${
                    filters.tier === o.value ? "bg-secondary text-foreground font-medium" : "hover:text-foreground"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <label className="inline-flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={filters.hideEstimated}
                onChange={(e) => onHideEstimated(e.target.checked)}
                className="h-3.5 w-3.5 accent-[hsl(var(--primary))]"
              />
              Hide estimated deadlines
            </label>
            {active && (
              <button type="button" onClick={onReset} className="text-primary hover:underline">
                Reset filters
              </button>
            )}
          </div>
        </div>

        <div className="mt-6">{children}</div>

        <div className="mt-10 space-y-1 text-xs text-muted-foreground">
          <p>
            Deadlines are treated as 23:59 Anywhere on Earth (UTC−12). Entries marked <em>Est.</em> are estimates based on
            previous years; always confirm on the official call for papers.
          </p>
          <p>
            KIISE tier follows the 2024 Korean Institute of Information Scientists and Engineers list; BK21+ IF follows the
            2018 BK21 Plus Computer Science conference list. For CVPR, ICCV, ECCV, ICML, and ICLR the BK21+ IF depends on the
            presentation type and the oral value is shown.
          </p>
          <p>
            Data updated {updated}. Sources:{" "}
            <a href={conferenceData.sources.heelim.url} target="_blank" rel="noopener noreferrer" className="link">
              profile.heelim.com
            </a>
            ,{" "}
            <a href={conferenceData.sources.ccfDeadlines} target="_blank" rel="noopener noreferrer" className="link">
              ccf-deadlines
            </a>
            ,{" "}
            <a href={conferenceData.sources.tiers} target="_blank" rel="noopener noreferrer" className="link">
              CS 분야 우수 학술대회 목록
            </a>
            .
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
