import { personalInfo } from "@/lib/data"

// Inlined at build time by next.config.mjs.
const buildDate = process.env.NEXT_PUBLIC_BUILD_DATE
const buildYear = process.env.NEXT_PUBLIC_BUILD_YEAR

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          © {buildYear} {personalInfo.name}.{buildDate && ` Last updated ${buildDate}.`}
        </p>
        <p className="flex flex-wrap gap-x-4">
          <a href={personalInfo.scholar} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Scholar</a>
          <a href={personalInfo.orcid} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">ORCID</a>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">GitHub</a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">LinkedIn</a>
        </p>
      </div>
    </footer>
  )
}
