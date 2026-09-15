import { Github, Linkedin, Mail, Download, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OrcidIcon } from "@/components/orcid-icon"
import { personalInfo } from "@/lib/data"

const icons = [
  { label: "Google Scholar", href: personalInfo.scholar, icon: GraduationCap },
  { label: "ORCID", href: personalInfo.orcid, icon: OrcidIcon },
  { label: "GitHub", href: personalInfo.github, icon: Github },
  { label: "LinkedIn", href: personalInfo.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${personalInfo.email}`, icon: Mail },
]

export function Hero() {
  return (
    <section className="pt-12 pb-10 sm:pt-16 sm:pb-12">
      <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-start sm:gap-10 sm:text-left">
        <img
          src="/profile.jpg"
          alt={`Portrait of ${personalInfo.name}`}
          width={192}
          height={192}
          className="h-40 w-40 flex-shrink-0 rounded-2xl object-cover ring-1 ring-border sm:h-48 sm:w-48"
        />
        <div className="min-w-0 flex-1 pt-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">{personalInfo.headline}</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{personalInfo.name}</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            {personalInfo.role} at{" "}
            <a href={personalInfo.labUrl} target="_blank" rel="noopener noreferrer" className="link">
              CoreLab
            </a>
            ,{" "}
            <a href={personalInfo.universityUrl} target="_blank" rel="noopener noreferrer" className="link">
              {personalInfo.university}
            </a>
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{personalInfo.researchInterestsLine}</p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <Button asChild className="h-10 rounded-full px-6">
              <a href="#publications">View Publications</a>
            </Button>
            <Button asChild variant="outline" className="h-10 rounded-full px-6">
              <a href={personalInfo.cv} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                CV
              </a>
            </Button>
            <div className="ml-1 flex items-center gap-1 border-l border-border pl-4">
              {icons.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  title={label}
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
