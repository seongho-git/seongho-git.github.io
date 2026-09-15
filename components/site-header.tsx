"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { personalInfo } from "@/lib/data"

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Publications", href: "/#publications" },
  { label: "Experience", href: "/#experience" },
  { label: "Conferences", href: "/conferences/" },
  { label: "Contact", href: "/#contact" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => href.startsWith("/conferences") && pathname?.startsWith("/conferences")

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-base font-semibold tracking-tight text-foreground hover:text-primary transition-colors">
          {personalInfo.name}
        </Link>

        <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-sm transition-colors hover:text-foreground ${
                isActive(item.href) ? "text-foreground font-medium" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-background" aria-label="Mobile">
          <div className="mx-auto flex max-w-5xl flex-col px-4 py-3 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="py-2 text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
