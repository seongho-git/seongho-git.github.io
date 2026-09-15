import { SectionHeading } from "@/components/section-heading"
import { personalInfo } from "@/lib/data"

export function Contact() {
  return (
    <section id="contact" className="py-10">
      <SectionHeading title="Contact" />
      <p className="text-base sm:text-lg leading-7 text-foreground/85">
        For research collaboration or academic inquiries, contact me at{" "}
        <a href={`mailto:${personalInfo.email}`} className="link">
          {personalInfo.email}
        </a>
        .
      </p>
      <address className="mt-4 text-base not-italic leading-relaxed text-muted-foreground">
        {personalInfo.lab}
        <br />
        {personalInfo.department}, {personalInfo.university}
        <br />
        {personalInfo.location}
      </address>
    </section>
  )
}
