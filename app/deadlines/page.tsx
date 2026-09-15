"use client"

import { useEffect } from "react"
import Link from "next/link"

// Legacy URL. Static export cannot send HTTP redirects, so redirect on the client.
export default function DeadlinesRedirect() {
  useEffect(() => {
    window.location.replace("/conferences/deadlines/")
  }, [])
  return (
    <main className="p-8 text-sm text-muted-foreground">
      This page has moved to{" "}
      <Link href="/conferences/deadlines/" className="link">
        /conferences/deadlines
      </Link>
      .
    </main>
  )
}
