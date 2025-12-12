"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { activities } from "@/lib/data"

export function Activities() {
    return (
        <section id="activities" className="py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-foreground mb-4">Activities</h2>
                        <div className="w-12 h-1 bg-primary rounded-full"></div>
                    </motion.div>

                    <div className="space-y-10">
                        {activities.map((categoryBlock, categoryIndex) => (
                            <div key={categoryIndex}>
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-foreground mb-4">
                                    {categoryBlock.category}
                                </h3>
                                <div className="space-y-6">
                                    {categoryBlock.items.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Card className="border border-slate-200 dark:border-border shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-card">
                                                <CardHeader className="pb-3">
                                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                                        <div className="flex-1">
                                                            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-foreground leading-tight">
                                                                {item.title}
                                                            </CardTitle>
                                                            <CardDescription className="text-primary font-medium text-sm mt-1">
                                                                {item.link ? (
                                                                    <a
                                                                        href={item.link}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="hover:underline inline-flex items-center gap-1"
                                                                    >
                                                                        {item.event}
                                                                        <ExternalLink className="h-3 w-3" />
                                                                    </a>
                                                                ) : (
                                                                    item.event
                                                                )}
                                                            </CardDescription>
                                                            <p className="text-xs text-slate-500 dark:text-muted-foreground mt-1">
                                                                {item.location}
                                                            </p>
                                                        </div>
                                                        <Badge
                                                            variant="secondary"
                                                            className="w-fit bg-slate-100 text-slate-600 dark:bg-secondary dark:text-secondary-foreground font-normal text-xs sm:text-sm whitespace-nowrap"
                                                        >
                                                            {item.date}
                                                        </Badge>
                                                    </div>
                                                </CardHeader>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
