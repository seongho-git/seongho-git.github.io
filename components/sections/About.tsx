import { SectionHeading } from "@/components/section-heading"
import { personalInfo } from "@/lib/data"

export function About() {
  return (
    <section id="about" className="py-10">
      <SectionHeading title="About" />
      <div className="space-y-4">
        {personalInfo.about.map((paragraph, index) => (
          <p key={index} className="text-base sm:text-lg leading-7 text-foreground/85">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  )
}
