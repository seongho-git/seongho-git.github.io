"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Download, GraduationCap } from "lucide-react"
import { personalInfo } from "@/lib/data"

export function Hero() {
  return (
    <section className="py-6 sm:py-10 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative flex-shrink-0"
            >
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-secondary flex items-center justify-center overflow-hidden shadow-lg ring-1 ring-border">
                <img
                  src="/profile.jpg?height=192&width=192"
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <div className="flex-1 text-center md:text-left pt-2">

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-xs font-semibold tracking-widest uppercase text-primary mb-2"
              >
                Ph.D. Student · Compiler Engineer
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-serif tracking-tight text-foreground mb-3"
              >
                {personalInfo.name}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-base sm:text-lg font-medium text-muted-foreground mb-4"
              >
                Ph.D. Student at{" "}
                <a
                  href="http://corelab.yonsei.ac.kr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  CoreLab
                </a>
                , Yonsei University
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-base text-muted-foreground leading-relaxed mb-6 max-w-2xl"
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
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm rounded-full px-6 h-10"
                  asChild
                >
                  <a href="#publications">View Publications</a>
                </Button>

                <Button
                  variant="outline"
                  size="default"
                  className="border-border hover:bg-accent rounded-full px-6 h-10"
                  asChild
                >
                  <a
                    href="https://drive.google.com/file/d/15cjSGRjWUS0Wyid8og2MaLmghFh6fZoo/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    CV
                  </a>
                </Button>

                <div className="flex items-center gap-2 ml-2 border-l border-border pl-4">
                  <a
                    href={personalInfo.scholar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-accent rounded-md"
                  >
                    <GraduationCap className="h-5 w-5" />
                  </a>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-accent rounded-md"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-accent rounded-md"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-accent rounded-md"
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
