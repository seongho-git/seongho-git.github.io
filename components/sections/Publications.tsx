"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { journalPublications, conferencePublications } from "@/lib/data"

// Highlights "Seongho Kim" in the author list with primary color
const formatAuthors = (authors: string) => {
  const parts = authors.split("Seongho Kim")
  if (parts.length === 1) return <span>{authors}</span>

  return (
    <span>
      {parts[0]}
      <span className="font-semibold not-italic text-primary">Seongho Kim</span>
      {parts[1]}
    </span>
  )
}

export function Publications() {
  return (
    <section id="publications" className="py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold font-serif text-foreground mb-4">Publications</h2>
            <div className="w-12 h-1 bg-primary rounded-full"></div>
          </motion.div>

          {/* Journal Publications */}
          <div className="mb-10">
            <h3 className="text-base font-semibold text-foreground mb-4 uppercase tracking-wider text-muted-foreground">
              Refereed Journal Publications
            </h3>
            <div className="space-y-4">
              {journalPublications.map((pub, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border border-border shadow-sm hover:shadow-md transition-all duration-300 bg-card">
                    <CardContent className="p-5 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="text-base font-semibold text-foreground mb-2 leading-snug">
                            <a
                              href={pub.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-primary transition-colors"
                            >
                              {pub.title}
                            </a>
                          </h4>
                          <p className="text-sm text-muted-foreground mb-3 italic">
                            {formatAuthors(pub.authors)}
                          </p>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge className="bg-primary/10 text-primary hover:bg-primary/15 border-0 text-xs font-medium">
                              {pub.journal}
                            </Badge>
                            {pub.badges.map((badge, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="border-border text-muted-foreground text-xs"
                              >
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex sm:flex-col gap-2">
                          <a
                            href={pub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground/50 hover:text-primary transition-colors p-2 hover:bg-accent rounded-lg flex-shrink-0 self-start"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Conference Publications */}
          <div>
            <h3 className="text-base font-semibold text-foreground mb-4 uppercase tracking-wider text-muted-foreground">
              Refereed Conference Publications
            </h3>
            <div className="space-y-4">
              {conferencePublications.map((pub, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (journalPublications.length + index) * 0.1 }}
                >
                  <Card className="border border-border shadow-sm hover:shadow-md transition-all duration-300 bg-card">
                    <CardContent className="p-5 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="text-base font-semibold text-foreground mb-2 leading-snug">
                            <a
                              href={pub.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-primary transition-colors"
                            >
                              {pub.title}
                            </a>
                          </h4>
                          <p className="text-sm text-muted-foreground mb-3 italic">
                            {formatAuthors(pub.authors)}
                          </p>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge className="bg-primary/10 text-primary hover:bg-primary/15 border-0 text-xs font-medium">
                              {pub.journal}
                            </Badge>
                            {pub.badges.map((badge, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="border-border text-muted-foreground text-xs"
                              >
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex sm:flex-col gap-2">
                          <a
                            href={pub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground/50 hover:text-primary transition-colors p-2 hover:bg-accent rounded-lg flex-shrink-0 self-start"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
