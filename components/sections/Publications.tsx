"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { publications } from "@/lib/data"

export function Publications() {
    return (
        <section id="publications" className="py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">Publications</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
                    </motion.div>

                    <div className="space-y-8">
                        {publications.map((pub, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 hover:shadow-3xl transition-all duration-500 group">
                                    <CardHeader className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-t-2xl">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <CardTitle className="text-xl mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                    {pub.title}
                                                </CardTitle>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
                                                        {pub.journal}
                                                    </Badge>
                                                    {pub.badges.map((badge, i) => (
                                                        <Badge
                                                            key={i}
                                                            variant="outline"
                                                            className="border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
                                                        >
                                                            {badge}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <a
                                                href={pub.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-3 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl"
                                            >
                                                <ExternalLink className="h-5 w-5" />
                                            </a>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-8">
                                        <p className="text-slate-600 dark:text-slate-300 mb-4 font-medium">
                                            {pub.authors}
                                        </p>
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                            {pub.description}
                                        </p>
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
