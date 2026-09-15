import { SectionHeading } from "@/components/section-heading"
import { Entry, EntryList, Bullets } from "@/components/entry"
import { TitleLink } from "@/components/title-link"
import { projects } from "@/lib/data"

export function Projects() {
  return (
    <section id="projects" className="py-10">
      <SectionHeading title="Projects" />
      <EntryList>
        {projects.map((project, index) => (
          <Entry key={index} aside={project.period}>
            <p className="text-[15px] font-medium text-foreground">
              <TitleLink
                title={project.title}
                links={project.link ? [{ label: project.linkLabel ?? "Link", url: project.link }] : []}
              />
            </p>
            <p className="text-sm text-muted-foreground">{project.affiliation}</p>
            <Bullets items={project.bullets} />
          </Entry>
        ))}
      </EntryList>
    </section>
  )
}
