"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Cpu, Download } from "lucide-react"
import { personalInfo } from "@/lib/data"

export function Hero() {
    return (
        <section className="py-24 sm:py-32 relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5"></div>
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-8"
                        >
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="relative">
                                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-2xl ring-1 ring-blue-200/50 dark:ring-blue-800/50">
                                        <img
                                            src="/profile.jpg?height=160&width=160"
                                            alt={personalInfo.name}
                                            className="w-full h-full object-cover rounded-3xl"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2, duration: 0.5 }}
                                        className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-300 mb-6 shadow-lg"
                                    >
                                        <Cpu className="w-4 h-4 mr-2" />
                                        {personalInfo.role}
                                    </motion.div>
                                    <motion.h1
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.5 }}
                                        className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6"
                                    >
                                        Hi, I&apos;m{" "}
                                        <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 bg-clip-text text-transparent">
                                            {personalInfo.name}
                                        </span>
                                    </motion.h1>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4, duration: 0.5 }}
                                        className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed mb-8"
                                    >
                                        {personalInfo.description}
                                    </motion.p>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5, duration: 0.5 }}
                                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8"
                                    >
                                        <Button
                                            size="lg"
                                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-xl"
                                            asChild
                                        >
                                            <a href="#publications">View Publications</a>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            className="border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/30 shadow-lg bg-transparent"
                                            asChild
                                        >
                                            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                                                <Download className="mr-2 h-5 w-5" />
                                                Download CV
                                            </a>
                                        </Button>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6, duration: 0.5 }}
                                        className="flex items-center space-x-6"
                                    >
                                        <a
                                            href={personalInfo.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-3 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl"
                                        >
                                            <Github className="h-6 w-6" />
                                        </a>
                                        <a
                                            href={personalInfo.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-3 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl"
                                        >
                                            <Linkedin className="h-6 w-6" />
                                        </a>
                                        <a
                                            href={`mailto:${personalInfo.email}`}
                                            className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-3 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl"
                                        >
                                            <Mail className="h-6 w-6" />
                                        </a>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>

                        {/* CoreLab Card - kept as is but animated */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="hidden lg:flex justify-center lg:justify-end lg:col-span-4"
                        >
                            {/* ... (CoreLab Card content) ... */}
                            {/* I'll simplify this part by just copying the card structure but making it cleaner if possible, 
                   or just keeping it as a nice visual element. */}
                            <div className="w-80 h-80 border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-900 dark:to-blue-950/20 rounded-xl flex flex-col justify-center items-center text-center p-8">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center">
                                    <img
                                        src="/corelab_logo.png?height=64&width=64"
                                        alt="CoreLab"
                                        className="w-16 h-16 object-contain"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-blue-600 mb-2">
                                    <a
                                        href="https://corelab.yonsei.ac.kr/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-blue-700 transition-colors"
                                    >
                                        CoreLab
                                    </a>
                                </h3>
                                <p className="text-muted-foreground mb-2">Yonsei University</p>
                                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                    Research Assistant
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
