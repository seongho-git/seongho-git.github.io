"use client"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Publications } from "@/components/sections/Publications"
import { Recognition } from "@/components/sections/Recognition"
import { Experience } from "@/components/sections/Experience"
import { Projects } from "@/components/sections/Projects"
import { Activities } from "@/components/sections/Activities"
import { Skills } from "@/components/sections/Skills"
import { Contact } from "@/components/sections/Contact"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:bg-none dark:bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Publications />
        <Recognition />
        <Experience />
        <Projects />
        <Activities />
        <Skills />
        <Contact />
      </main>
      <ScrollToTop />
    </div>
  )
}
