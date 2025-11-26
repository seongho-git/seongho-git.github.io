"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"
import { experience } from "@/lib/data"

export function Experience() {
    return (
        <section id="experience" className="py-24 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">Experience</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
                    </motion.div>

                    <div className="space-y-8">
                        {experience.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 hover:shadow-2xl transition-all duration-300 group">
                                    <CardHeader className={`border-l-4 ${exp.color === 'blue' ? 'border-l-blue-600' : exp.color === 'indigo' ? 'border-l-indigo-600' : 'border-l-slate-600'}`}>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-xl text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                    {exp.title}
                                                </CardTitle>
                                                <CardDescription className="text-blue-600 dark:text-blue-400 font-medium text-base mt-1">
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
                                                    {exp.advisor && ` / ${exp.advisor}`}
                                                </CardDescription>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className="border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
                                            >
                                                {exp.period}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <p className="text-slate-600 dark:text-slate-300 mb-4">{exp.description}</p>
                                        <div className="mt-4">
                                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Technologies used:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {exp.technologies.map((tech, i) => (
                                                    <Badge key={i} className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-0">
                                                        {tech}
                                                    </Badge>
                                                ))}
                                            </div>
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
