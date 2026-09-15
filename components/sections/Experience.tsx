import { SectionHeading } from "@/components/section-heading"
import { Entry, EntryList, Bullets } from "@/components/entry"
import { experience } from "@/lib/data"

export function Experience() {
  return (
    <section id="experience" className="py-10">
      <SectionHeading title="Experience" />
      <EntryList>
        {experience.map((exp, index) => (
          <Entry key={index} aside={exp.period}>
            <p className="text-[15px] font-medium text-foreground">{exp.title}</p>
            <p className="text-sm text-muted-foreground">
              {exp.link ? (
                <a href={exp.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  {exp.organization}
                </a>
              ) : (
                exp.organization
              )}
            </p>
            {exp.advisor && <p className="text-sm text-muted-foreground">Advised by {exp.advisor}</p>}
            <Bullets items={exp.bullets} />
          </Entry>
        ))}
      </EntryList>
    </section>
  )
}
