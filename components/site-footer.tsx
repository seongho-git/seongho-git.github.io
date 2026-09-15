import { personalInfo } from "@/lib/data"

const lastUpdated = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} {personalInfo.name}. Last updated {lastUpdated}.
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
