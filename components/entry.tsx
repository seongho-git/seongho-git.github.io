import type { ReactNode } from "react"

/** CV-style row: a narrow date column on the left, content on the right. */
export function Entry({ aside, children }: { aside: ReactNode; children: ReactNode }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[10.5rem_1fr] sm:gap-6">
      <div className="text-sm text-muted-foreground tabular-nums whitespace-nowrap">{aside}</div>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

export function EntryList({ children }: { children: ReactNode }) {
  return <div className="space-y-6">{children}</div>
}

export function Bullets({ items }: { items: string[] }) {
  if (!items.length) return null
  return (
    <ul className="mt-2 space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex text-sm leading-relaxed text-muted-foreground">
          <span className="mr-2.5 mt-[0.55rem] h-1 w-1 flex-shrink-0 rounded-full bg-foreground/60" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
