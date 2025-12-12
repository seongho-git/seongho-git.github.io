"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { firstAuthorPublications, coAuthorPublications } from "@/lib/data"

// Helper function to highlight "Seongho Kim" in author list
const formatAuthors = (authors: string) => {
    const parts = authors.split("Seongho Kim")
    if (parts.length === 1) return <span>{authors}</span>

    return (
        <span>
            {parts[0]}
            <span className="font-bold text-blue-600 dark:text-blue-400">Seongho Kim</span>
            {parts[1]}
        </span>
    )
}

export function Publications() {
    return (
        <section id="publications" className="py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-foreground mb-4">Publications</h2>
                        <div className="w-12 h-1 bg-primary rounded-full"></div>
                    </motion.div>

                    {/* First Author Publications */}
                    <div className="mb-10">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-foreground mb-4">Refereed Journal Publications</h3>
                        <div className="space-y-6">
                            {firstAuthorPublications.map((pub, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="border border-slate-200 dark:border-border shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-card">
                                        <CardContent className="p-5 sm:p-6">
                                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <h4 className="text-lg font-semibold text-slate-900 dark:text-foreground mb-2 leading-tight">
                                                        <a href={pub.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                                            {pub.title}
                                                        </a>
                                                    </h4>
                                                    <p className="text-sm text-slate-600 dark:text-muted-foreground mb-3 italic">
                                                        {formatAuthors(pub.authors)}
                                                    </p>
                                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                                        <Badge className="bg-blue-100 text-blue-800 dark:bg-secondary dark:text-secondary-foreground hover:bg-blue-200 border-0 text-xs">
                                                            {pub.journal}
                                                        </Badge>
                                                        {pub.badges.map((badge, i) => (
                                                            <Badge
                                                                key={i}
                                                                variant="outline"
                                                                className="border-slate-200 dark:border-border text-slate-600 dark:text-muted-foreground text-xs"
                                                            >
                                                                {badge}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="flex sm:flex-col gap-2">
                                                    <a
                                                        href={pub.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-slate-400 hover:text-blue-600 dark:hover:text-primary transition-colors p-2 hover:bg-slate-100 dark:hover:bg-accent rounded-lg flex-shrink-0 self-start"
                                                    >
                                                        <ExternalLink className="h-5 w-5" />
                                                    </a>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Co-Author Publications */}
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-foreground mb-4">Refereed Conference Publications</h3>
                        <div className="space-y-6">
                            {coAuthorPublications.map((pub, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: (firstAuthorPublications.length + index) * 0.1 }}
                                >
                                    <Card className="border border-slate-200 dark:border-border shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-card">
                                        <CardContent className="p-5 sm:p-6">
                                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <h4 className="text-lg font-semibold text-slate-900 dark:text-foreground mb-2 leading-tight">
                                                        <a href={pub.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                                            {pub.title}
                                                        </a>
                                                    </h4>
                                                    <p className="text-sm text-slate-600 dark:text-muted-foreground mb-3 italic">
                                                        {formatAuthors(pub.authors)}
                                                    </p>
                                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                                        <Badge className="bg-blue-100 text-blue-800 dark:bg-secondary dark:text-secondary-foreground hover:bg-blue-200 border-0 text-xs">
                                                            {pub.journal}
                                                        </Badge>
                                                        {pub.badges.map((badge, i) => (
                                                            <Badge
                                                                key={i}
                                                                variant="outline"
                                                                className="border-slate-200 dark:border-border text-slate-600 dark:text-muted-foreground text-xs"
                                                            >
                                                                {badge}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="flex sm:flex-col gap-2">
                                                    <a
                                                        href={pub.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-slate-400 hover:text-blue-600 dark:hover:text-primary transition-colors p-2 hover:bg-slate-100 dark:hover:bg-accent rounded-lg flex-shrink-0 self-start"
                                                    >
                                                        <ExternalLink className="h-5 w-5" />
                                                    </a>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
