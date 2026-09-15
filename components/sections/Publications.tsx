import { SectionHeading } from "@/components/section-heading"
import { TitleLink } from "@/components/title-link"
import { highlightName } from "@/components/highlight-name"
import { publications } from "@/lib/data"

const hasEqualContribution = publications.some((group) => group.items.some((pub) => pub.authors.includes("*")))

export function Publications() {
  return (
    <section id="publications" className="py-10">
      <SectionHeading title="Publications" />
      <div className="space-y-8">
        {publications.map((group) => (
          <div key={group.category}>
            <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">{group.category}</h3>
            <ol className="divide-y divide-border">
              {group.items.map((pub) => {
                const venueParts = [pub.venue, pub.location, pub.date].filter(Boolean)
                return (
                  <li key={pub.title} className="py-4 first:pt-0 last:pb-0">
                    <p className="text-base sm:text-lg font-medium leading-snug text-foreground">
                      <TitleLink title={pub.title} links={pub.links} />
                    </p>
                    <p className="mt-1 text-base text-muted-foreground">{highlightName(pub.authors)}</p>
                    {(pub.venueShort || venueParts.length > 0) && (
                      <p className="mt-1 text-base text-muted-foreground">
                        {pub.venueShort && <span className="font-semibold text-foreground">{pub.venueShort}</span>}
                        {pub.venueShort && venueParts.length > 0 && ", "}
                        {venueParts.join(", ")}
                      </p>
                    )}
                    {pub.note && <p className="mt-1 text-base font-semibold text-red-600 dark:text-red-400">{pub.note}</p>}
                  </li>
                )
              })}
            </ol>
          </div>
        ))}
      </div>
      {hasEqualContribution && <p className="mt-6 text-sm text-muted-foreground">* Equal contribution.</p>}
    </section>
  )
}
