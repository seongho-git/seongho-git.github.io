import type { ReactNode } from "react"

/**
 * Title with its primary link attached as a small blue "[Label]" inside the same anchor.
 * Extra links are rendered as separate small blue "[Label]" anchors after the title.
 */
const labelClass = "ml-1.5 align-baseline text-xs font-normal text-primary"

export function TitleLink({
  title,
  links,
  className,
}: {
  title: ReactNode
  links: { label: string; url: string }[]
  className?: string
}) {
  const [primary, ...rest] = links
  return (
    <span className={className}>
      {primary ? (
        <a href={primary.url} target="_blank" rel="noopener noreferrer" className="group hover:text-primary transition-colors">
          {title}
          <span className={`${labelClass} group-hover:underline`}>[{primary.label}]</span>
        </a>
      ) : (
        title
      )}
      {rest.map((l) => (
        <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className={`${labelClass} hover:underline`}>
          [{l.label}]
        </a>
      ))}
    </span>
  )
}
