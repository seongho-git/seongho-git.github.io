import { SectionHeading } from "@/components/section-heading"
import { Entry, EntryList, Bullets } from "@/components/entry"
import { education } from "@/lib/data"

export function Education() {
  return (
    <section id="education" className="py-10">
      <SectionHeading title="Education" />
      <EntryList>
        {education.map((edu, index) => (
          <Entry key={index} aside={edu.period}>
            <p className="text-base sm:text-lg font-medium text-foreground">{edu.degree}</p>
            <p className="text-base text-muted-foreground">
              {edu.school}, {edu.location}
            </p>
            <Bullets items={edu.details} />
          </Entry>
        ))}
      </EntryList>
    </section>
  )
}
