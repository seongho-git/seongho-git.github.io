import { SectionHeading } from "@/components/section-heading"
import { Entry, EntryList } from "@/components/entry"
import { TitleLink } from "@/components/title-link"
import { highlightName } from "@/components/highlight-name"
import { honors } from "@/lib/data"

export function Honors() {
  return (
    <section id="honors" className="py-10">
      <SectionHeading title="Honors and Awards" />
      <EntryList>
        {honors.map((item, index) => (
          <Entry key={index} aside={item.date}>
            <p className="text-base sm:text-lg font-medium text-foreground">
              <TitleLink title={item.title} links={item.link ? [{ label: item.linkLabel ?? "Link", url: item.link }] : []} />
            </p>
            <p className="text-base text-muted-foreground">{item.organization}</p>
            {item.detail && <p className="mt-1 text-base text-muted-foreground">{highlightName(item.detail)}</p>}
          </Entry>
        ))}
      </EntryList>
    </section>
  )
}
