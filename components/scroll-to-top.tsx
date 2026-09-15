"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!visible) return null
  return (
    <Button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      variant="outline"
      size="icon"
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-40 h-10 w-10 rounded-full bg-background shadow-sm"
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  )
}
