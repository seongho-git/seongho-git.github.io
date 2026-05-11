"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { experience } from "@/lib/data"

export function Experience() {
  return (
    <section id="experience" className="py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold font-serif text-foreground mb-4">Experience</h2>
            <div className="w-12 h-1 bg-primary rounded-full"></div>
          </motion.div>

          <div className="space-y-4">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border border-border shadow-sm hover:shadow-md transition-all duration-300 bg-card">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                        <CardTitle className="text-base font-semibold text-foreground leading-tight">
                          {exp.title}
                        </CardTitle>
                        <Badge
                          variant="secondary"
                          className="w-fit bg-secondary text-secondary-foreground font-normal text-xs sm:text-sm whitespace-nowrap"
                        >
                          {exp.period}
                        </Badge>
                      </div>
                      <CardDescription className="text-primary font-medium text-sm">
                        {exp.link ? (
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {exp.company}
                          </a>
                        ) : (
                          exp.company
                        )}
                        {exp.advisor && (
                          <span className="text-muted-foreground"> / {exp.advisor}</span>
                        )}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-outside ml-5 space-y-1">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {exp.technologies.map((tech, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="text-xs border-border text-muted-foreground"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
