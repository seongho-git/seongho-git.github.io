"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { skills } from "@/lib/data"

export function Skills() {
    return (
        <section id="skills" className="py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-foreground mb-4">Skills</h2>
                        <div className="w-12 h-1 bg-primary rounded-full"></div>
                    </motion.div >

                    <div className="grid md:grid-cols-3 gap-6">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="border border-slate-200 dark:border-border shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-card h-full">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-lg flex items-center text-slate-900 dark:text-foreground">
                                            <div className="w-8 h-8 bg-blue-50 dark:bg-secondary rounded-lg flex items-center justify-center mr-3">
                                                <skill.icon className="w-4 h-4 text-primary" />
                                            </div>
                                            {skill.category}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {skill.items.map((item, i) => (
                                                <Badge key={i} variant="secondary" className="bg-slate-100 text-slate-700 dark:bg-secondary dark:text-secondary-foreground hover:bg-slate-200 dark:hover:bg-accent">
                                                    {item}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div >
            </div >
        </section >
    )
}
