import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Publications } from "@/components/sections/Publications"
import { Education } from "@/components/sections/Education"
import { Experience } from "@/components/sections/Experience"
import { Honors } from "@/components/sections/Honors"
import { Projects } from "@/components/sections/Projects"
import { Service } from "@/components/sections/Service"
import { Contact } from "@/components/sections/Contact"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <About />
        <Publications />
        <Education />
        <Experience />
        <Honors />
        <Projects />
        <Service />
        <Contact />
      </main>
      <SiteFooter />
      <ScrollToTop />
    </div>
  )
}
