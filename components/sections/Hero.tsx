"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Cpu, Download } from "lucide-react"
import { personalInfo } from "@/lib/data"

export function Hero() {
    return (
        <section className="py-6 sm:py-10 relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5"></div>
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
                        {/* Profile Image - Left aligned, Square */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative flex-shrink-0"
                        >
                            <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-card dark:to-card flex items-center justify-center overflow-hidden shadow-xl ring-1 ring-slate-200 dark:ring-border">
                                <img
                                    src="/profile.jpg?height=192&width=192"
                                    alt={personalInfo.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>

                        {/* Content - Right side */}
                        <div className="flex-1 text-center md:text-left pt-2">
                            <motion.h1
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-foreground mb-2"
                            >
                                <span className="text-primary">
                                    {personalInfo.name}
                                </span>
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="text-lg sm:text-xl font-medium text-slate-700 dark:text-muted-foreground mb-4"
                            >
                                Ph.D. Student at <a href="https://corelab.yonsei.ac.kr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">CORE Lab</a>, Yonsei University
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="text-lg text-slate-600 dark:text-muted-foreground leading-relaxed mb-6 max-w-2xl"
                            >
                                {personalInfo.description}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="flex flex-wrap items-center justify-center md:justify-start gap-3"
                            >
                                <Button
                                    size="default"
                                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm rounded-md px-6 h-10"
                                    asChild
                                >
                                    <a href="#publications">View Publications</a>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="default"
                                    className="border-slate-200 dark:border-border hover:bg-slate-50 dark:hover:bg-accent rounded-md px-6 h-10"
                                    asChild
                                >
                                    <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                                        <Download className="mr-2 h-4 w-4" />
                                        CV
                                    </a>
                                </Button>

                                <div className="flex items-center gap-2 ml-2 border-l border-slate-200 dark:border-border pl-4">
                                    <a
                                        href={personalInfo.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-500 hover:text-blue-600 dark:text-muted-foreground dark:hover:text-primary transition-colors p-2 hover:bg-slate-100 dark:hover:bg-accent rounded-md"
                                    >
                                        <Github className="h-5 w-5" />
                                    </a>
                                    <a
                                        href={personalInfo.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-500 hover:text-blue-600 dark:text-muted-foreground dark:hover:text-primary transition-colors p-2 hover:bg-slate-100 dark:hover:bg-accent rounded-md"
                                    >
                                        <Linkedin className="h-5 w-5" />
                                    </a>
                                    <a
                                        href={`mailto:${personalInfo.email}`}
                                        className="text-slate-500 hover:text-blue-600 dark:text-muted-foreground dark:hover:text-primary transition-colors p-2 hover:bg-slate-100 dark:hover:bg-accent rounded-md"
                                    >
                                        <Mail className="h-5 w-5" />
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
