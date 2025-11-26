"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send } from "lucide-react"

export function Contact() {
    const [emailForm, setEmailForm] = useState({
        senderEmail: "",
        subject: "",
        message: "",
    })

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const { senderEmail, subject, message } = emailForm

        const mailtoLink = `mailto:seongho-kim@yonsei.ac.kr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            `From: ${senderEmail}\n\n${message}`,
        )}`

        window.location.href = mailtoLink
    }

    const handleInputChange = (field: string, value: string) => {
        setEmailForm((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    return (
        <section id="contact" className="py-24 bg-slate-50/50 dark:bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-foreground mb-4">Get in Touch</h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                        <p className="mt-6 text-lg text-slate-600 dark:text-muted-foreground">
                            Feel free to reach out for collaborations or just a friendly hello
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white dark:bg-card rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200 dark:border-border"
                    >
                        <form onSubmit={handleEmailSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Your Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        value={emailForm.senderEmail}
                                        onChange={(e) => handleInputChange("senderEmail", e.target.value)}
                                        required
                                        className="bg-slate-50 dark:bg-input border-slate-200 dark:border-border focus:ring-blue-600 focus:border-blue-600"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        placeholder="Research Collaboration"
                                        value={emailForm.subject}
                                        onChange={(e) => handleInputChange("subject", e.target.value)}
                                        required
                                        className="bg-slate-50 dark:bg-input border-slate-200 dark:border-border focus:ring-blue-600 focus:border-blue-600"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Hello, I'd like to discuss..."
                                    rows={6}
                                    value={emailForm.message}
                                    onChange={(e) => handleInputChange("message", e.target.value)}
                                    required
                                    className="bg-slate-50 dark:bg-input border-slate-200 dark:border-border focus:ring-blue-600 focus:border-blue-600 resize-none"
                                />
                            </div>
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg rounded-full"
                            >
                                <Send className="w-4 h-4 mr-2" />
                                Send Message
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
