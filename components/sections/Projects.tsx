"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ExternalLink, Calendar, ChevronRight } from "lucide-react"
import { projects } from "@/lib/data"

export function Projects() {
    return (
        <section id="projects" className="py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">Projects</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
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
                                <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 hover:shadow-3xl transition-all duration-500 group h-full">
                                    <CardHeader className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-t-2xl">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-xl text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {project.title}
                                            </CardTitle>
                                            {project.link.startsWith("http") ? (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors p-2 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl"
                                                >
                                                    <ExternalLink className="h-5 w-5" />
                                                </a>
                                            ) : (
                                                <ExternalLink className="h-5 w-5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                                            )}

                                        </div>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <Calendar className="w-4 h-4 text-slate-500" />
                                            <CardDescription className="text-slate-600 dark:text-slate-400">{project.period}</CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                                            {project.description}
                                        </p>
                                        <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                                            <ChevronRight className="w-4 h-4 mr-1" />
                                            Related to{" "}
                                            <a href={project.link} className="hover:underline ml-1">
                                                {project.relatedTo}
                                            </a>
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
