"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, parseISO } from "date-fns"
import { Filter, ExternalLink } from "lucide-react"
import { upcomingConferences, pastConferences, Conference } from "@/lib/conference-data"
import { Button } from "@/components/ui/button"

// Helper to get all unique tags
const allTags = Array.from(new Set([...upcomingConferences, ...pastConferences].flatMap(c => c.tags))).sort()

// BK Score Colors: 1=Red, 2=Yellow, 3=Green, 4=Blue
const bkScoreColors: { [key: number]: string } = {
  1: "bg-red-500 text-white border-red-600 dark:bg-red-600 dark:border-red-500",
  2: "bg-yellow-500 text-white border-yellow-600 dark:bg-yellow-600 dark:border-yellow-500",
  3: "bg-green-500 text-white border-green-600 dark:bg-green-600 dark:border-green-500",
  4: "bg-blue-500 text-white border-blue-600 dark:bg-blue-600 dark:border-blue-500",
}

export default function DeadlinesPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const filterConferences = (confs: Conference[]) => {
    return confs
      .filter(conf => selectedTags.length === 0 || conf.tags.some(tag => selectedTags.includes(tag)))
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
  }

  const filteredUpcoming = filterConferences(upcomingConferences)
  // Sort past conferences in descending order (most recent first)
  const filteredPast = filterConferences(pastConferences).sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime())

  const getCountdown = (deadlineStr: string) => {
    if (!now) return ""

    const deadline = parseISO(deadlineStr)
    if (now > deadline) return "Passed"

    const days = differenceInDays(deadline, now)
    const hours = differenceInHours(deadline, now) % 24
    const minutes = differenceInMinutes(deadline, now) % 60
    const seconds = differenceInSeconds(deadline, now) % 60

    return `${days}d ${hours}h ${minutes}m ${seconds}s`
  }

  const formatDeadlineTime = (date: Date) => {
    const timeStr = format(date, "HH:mm")
    if (timeStr === "23:59") return "AoE"
    return timeStr
  }

  const ConferenceTable = ({ conferences, title }: { conferences: Conference[], title: string }) => (
    <Card className="border-0 shadow-xl bg-white/80 dark:bg-card/80 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-border/50 mb-12">
      <CardHeader className="bg-gradient-to-r from-slate-50/80 to-slate-100/80 dark:from-secondary/30 dark:to-secondary/30 rounded-t-2xl border-b border-slate-200/50 dark:border-border/50">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[320px]">Conference</TableHead>
              <TableHead className="w-[200px]">Deadline</TableHead>
              <TableHead className="w-[140px]">Countdown</TableHead>
              <TableHead className="w-[100px] text-center">BK Score</TableHead>
              <TableHead className="w-[150px]">Location</TableHead>
              <TableHead className="w-[150px]">Tags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conferences.map((conf) => {
              const date = parseISO(conf.deadline)
              const isPassed = now ? now > date : false
              const isConferencePassed = (conf.conferenceEndDate && now) ? now > parseISO(conf.conferenceEndDate) : false

              return (
                <TableRow key={`${conf.name}-${conf.year}-${conf.cycle}-${conf.deadline}`} className="group hover:bg-slate-50/50 dark:hover:bg-muted/50 transition-colors">
                  {/* Conference */}
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <a
                          href={conf.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-lg transition-colors flex items-center gap-2 ${isConferencePassed
                            ? "text-slate-400 line-through decoration-slate-400"
                            : "text-slate-900 dark:text-foreground group-hover:text-blue-600 dark:group-hover:text-primary"
                            }`}
                        >
                          {conf.name} {conf.year}
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                        {conf.isPredicted && (
                          <Badge variant="outline" className="text-[10px] h-5 px-1 bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800">
                            TBD
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground truncate max-w-[280px]" title={conf.full}>
                        {conf.full}
                      </span>
                      <span className="text-xs text-slate-500 mt-1">
                        {conf.conferenceDate}
                      </span>
                    </div>
                  </TableCell>

                  {/* Deadline */}
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${isPassed ? "text-slate-400 line-through" : ""}`}>
                          {format(date, "MMM d, yyyy")}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground bg-slate-100 dark:bg-secondary px-1.5 py-0.5 rounded">
                          {formatDeadlineTime(date)}
                        </span>
                      </div>
                      {conf.cycle && (
                        <span className="text-xs text-blue-600 dark:text-primary font-medium">
                          Cycle {conf.cycle}
                        </span>
                      )}
                      {conf.abstract && (
                        <span className="text-xs text-slate-500">
                          Abstract: {conf.abstract}
                        </span>
                      )}
                    </div>
                  </TableCell>

                  {/* Countdown */}
                  <TableCell>
                    {isPassed ? (
                      <span className="text-slate-400 text-sm">Passed</span>
                    ) : (
                      <span className="font-mono text-slate-900 dark:text-foreground font-bold whitespace-nowrap text-sm">
                        {getCountdown(conf.deadline)}
                      </span>
                    )}
                  </TableCell>

                  {/* BK Score */}
                  <TableCell className="text-center">
                    {conf.bkScore && (
                      <Badge variant="outline" className={`border ${bkScoreColors[conf.bkScore] || "bg-slate-100 text-slate-800"}`}>
                        {conf.bkScore}
                      </Badge>
                    )}
                  </TableCell>

                  {/* Location */}
                  <TableCell className="text-sm text-muted-foreground">
                    {conf.location}
                  </TableCell>

                  {/* Tags */}
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {conf.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-sm text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:bg-none dark:bg-background">
      <SiteHeader />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-foreground mb-4">
              Conference Deadlines
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-slate-600 dark:text-muted-foreground">
              Upcoming submission deadlines for major conferences.
            </p>
          </div>

          {/* Filter Section */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
            <div className="flex items-center mr-2 text-slate-600 dark:text-muted-foreground">
              <Filter className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Filter by:</span>
            </div>
            {allTags.map(tag => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer transition-all ${selectedTags.includes(tag)
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "hover:bg-slate-100 dark:hover:bg-secondary"
                  }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
            {selectedTags.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTags([])}
                className="ml-2 text-xs text-slate-500 hover:text-slate-700"
              >
                Clear
              </Button>
            )}
          </div>

          <ConferenceTable conferences={filteredUpcoming} title="Upcoming Deadlines" />

          {filteredPast.length > 0 && (
            <ConferenceTable conferences={filteredPast} title="Past Deadlines (2025/2026 Cycle)" />
          )}

          <div className="mt-8 text-center text-sm text-slate-500 dark:text-muted-foreground">
            * Deadlines marked TBD are estimates based on previous years. Please verify with official websites.
          </div>
        </div>
      </main>
    </div>
  )
}
