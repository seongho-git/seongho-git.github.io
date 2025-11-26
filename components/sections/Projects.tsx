"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ExternalLink, Calendar, ChevronRight } from "lucide-react"
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

                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="border border-slate-200 dark:border-border shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-card h-full flex flex-col">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between gap-2">
                                            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-foreground group-hover:text-blue-600 dark:group-hover:text-primary transition-colors leading-tight">
                                                {project.title}
                                            </CardTitle>
                                            {project.link.startsWith("http") ? (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-slate-400 hover:text-blue-600 dark:hover:text-primary transition-colors flex-shrink-0 mt-1"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                </a>
                                            ) : (
                                                <ExternalLink className="h-4 w-4 text-slate-300 flex-shrink-0 mt-1" />
                                            )}

                                        </div>
                                        <div className="mb-2">
                                            <span className="text-sm font-medium text-primary block">
                                                {project.affiliation}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="w-3 h-3 text-slate-400" />
                                            <CardDescription className="text-xs sm:text-sm text-slate-500 dark:text-muted-foreground">{project.period}</CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-1 flex flex-col justify-between">
                                        <p className="text-sm text-slate-600 dark:text-muted-foreground mb-4 leading-relaxed">
                                            {project.description}
                                        </p>
                                        <div className="flex items-center text-xs text-primary font-medium pt-2 border-t border-slate-100 dark:border-border">
                                            <ChevronRight className="w-3 h-3 mr-1" />
                                            Related to{" "}
                                            <span className="ml-1 truncate">
                                                {project.relatedTo}
                                            </span>
                                        </div>
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
