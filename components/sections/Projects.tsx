"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { projects } from "@/lib/data"

export function Projects() {
    return (
        <section id="projects" className="py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-foreground mb-4">Projects</h2>
                        <div className="w-12 h-1 bg-primary rounded-full"></div>
                    </motion.div>

                    <div className="space-y-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="border border-slate-200 dark:border-border shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-card">
                                    <CardHeader className="pb-3">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                                                <CardTitle className="text-lg font-semibold text-slate-900 dark:text-foreground leading-tight">
                                                    {project.link ? (
                                                        <a
                                                            href={project.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="hover:underline inline-flex items-center gap-2"
                                                        >
                                                            {project.title}
                                                            <ExternalLink className="h-4 w-4" />
                                                        </a>
                                                    ) : (
                                                        project.title
                                                    )}
                                                </CardTitle>
                                                <Badge
                                                    variant="secondary"
                                                    className="w-fit bg-slate-100 text-slate-600 dark:bg-secondary dark:text-secondary-foreground font-normal text-xs sm:text-sm whitespace-nowrap"
                                                >
                                                    {project.period}
                                                </Badge>
                                            </div>
                                            <CardDescription className="text-slate-600 dark:text-muted-foreground text-sm">
                                                Related with: {project.relatedExperience}
                                            </CardDescription>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
