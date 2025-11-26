"use client"

import { motion } from "framer-motion"
import { personalInfo } from "@/lib/data"

export function About() {
    return (
        <section id="about" className="py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-foreground mb-4">About Me</h2>
                        <div className="w-12 h-1 bg-primary rounded-full"></div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-6"
                    >
                        {personalInfo.about.map((paragraph, index) => (
                            <p key={index} className="text-base sm:text-lg text-slate-600 dark:text-muted-foreground leading-relaxed text-justify">
                                {paragraph}
                            </p>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
