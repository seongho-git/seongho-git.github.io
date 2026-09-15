import { Github, Linkedin, Mail, FileText, GraduationCap } from "lucide-react"
import { OrcidIcon } from "@/components/orcid-icon"
import { personalInfo } from "@/lib/data"

const linkClass = "inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"

export function Hero() {
  return (
    <section className="pt-12 pb-10 sm:pt-16 sm:pb-12">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
        <img
          src="/profile.jpg"
          alt={`Portrait of ${personalInfo.name}`}
          width={160}
          height={160}
          className="h-36 w-36 flex-shrink-0 rounded-md object-cover ring-1 ring-border sm:h-40 sm:w-40"
        />
        <div className="min-w-0">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{personalInfo.name}</h1>
          <p className="mt-2 text-base text-foreground">
            {personalInfo.role},{" "}
            <a href={personalInfo.labUrl} target="_blank" rel="noopener noreferrer" className="link">
              {personalInfo.lab}
            </a>
          </p>
          <p className="text-base text-muted-foreground">
            {personalInfo.department}, {personalInfo.university}
          </p>

          <div className="mt-5 space-y-1.5 text-sm">
            <p className="flex flex-wrap gap-x-5 gap-y-1.5">
              <a href={`mailto:${personalInfo.email}`} className={linkClass}>
                <Mail className="h-4 w-4" aria-hidden="true" />
                {personalInfo.email}
              </a>
              <a href={personalInfo.scholar} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
                Google Scholar
              </a>
              <a href={personalInfo.orcid} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <OrcidIcon className="h-4 w-4" />
                ORCID
              </a>
            </p>
            <p className="flex flex-wrap gap-x-5 gap-y-1.5">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <Github className="h-4 w-4" aria-hidden="true" />
                GitHub
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                LinkedIn
              </a>
              <a href={personalInfo.cv} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <FileText className="h-4 w-4" aria-hidden="true" />
                CV
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
