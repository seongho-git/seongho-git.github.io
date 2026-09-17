import type { ReactNode } from "react"
import { personalInfo } from "@/lib/data"

/** Renders the site owner's name in bold blue inside an author list. */
export function highlightName(text: string): ReactNode[] {
  return text.split(new RegExp(`(${personalInfo.name})`)).map((part, i) =>
    part === personalInfo.name ? (
      <span key={i} className="font-semibold text-primary">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}
