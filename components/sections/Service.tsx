import { SectionHeading } from "@/components/section-heading"
import { Entry, EntryList } from "@/components/entry"
import { service } from "@/lib/data"

export function Service() {
  return (
    <section id="service" className="py-10">
      <SectionHeading title="Service and Activities" />
      <EntryList>
        {service.map((item, index) => (
          <Entry key={index} aside={item.date}>
            <p className="text-base sm:text-lg font-medium text-foreground">{item.role}</p>
            <p className="text-base text-muted-foreground">
              {item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  {item.event}
                </a>
              ) : (
                item.event
              )}
              , {item.location}
            </p>
          </Entry>
        ))}
      </EntryList>
    </section>
  )
}
