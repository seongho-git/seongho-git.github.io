"use client"

import { motion } from "framer-motion"
import { personalInfo } from "@/lib/data"

export function About() {
    return (
        <section id="about" className="py-24 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">About Me</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-700 mx-auto rounded-full"></div>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="space-y-6"
                        >
                            {personalInfo.about.map((paragraph, index) => (
                                <p key={index} className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="space-y-6"
                        >
                            {personalInfo.interests.map((interest, index) => (
                                <div key={index} className="group">
                                    <div className="flex items-start space-x-4 p-6 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                                            <interest.icon className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{interest.title}</h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-300">
                                                {interest.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
