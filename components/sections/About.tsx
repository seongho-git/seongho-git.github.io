import { SectionHeading } from "@/components/section-heading"
import { personalInfo } from "@/lib/data"

export function About() {
  return (
    <section id="about" className="py-10">
      <SectionHeading title="Research Interests" />
      <ul className="space-y-1.5">
        {personalInfo.researchInterests.map((item, i) => (
          <li key={i} className="flex text-[15px] leading-7 text-foreground/85">
            <span className="mr-2.5 mt-[0.8rem] h-1 w-1 flex-shrink-0 rounded-full bg-foreground/60" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}
