import type { ReactNode } from "react"
import { personalInfo } from "@/lib/data"

/** Bold, blue site-owner name inside an author list (keeps a trailing equal-contribution asterisk). */
export function highlightName(text: string): ReactNode[] {
  const pattern = new RegExp(`(${personalInfo.name}\\*?)`)
  return text.split(pattern).map((part, i) =>
    part.startsWith(personalInfo.name) ? (
      <span key={i} className="font-semibold text-primary">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}
