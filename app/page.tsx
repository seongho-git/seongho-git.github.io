"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Github,
  Linkedin,
  Mail,
  Home,
  Cpu,
  Zap,
  BookOpen,
  ExternalLink,
  Menu,
  X,
  FileText,
  Award,
  Download,
  Building2,
  Users,
  Target,
  ChevronRight,
  Calendar,
  Send,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [emailForm, setEmailForm] = useState({
    senderEmail: "",
    subject: "",
    message: "",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-blue-950/20 dark:to-indigo-950/30">
      {/* Header */}
      <header className="border-b border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <button onClick={scrollToTop} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Seongho Kim
              </span>
            </button>
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#about"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                About
              </a>
              <a
                href="#publications"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Publications
              </a>
              <a
                href="#experience"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Experience
              </a>
              <a
                href="#projects"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Projects
              </a>
              <a
                href="#skills"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Skills
              </a>
              <a
                href="#education"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Education
              </a>
              <a
                href="#contact"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contact
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button
                size="sm"
                className="hidden sm:flex bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
              >
                <a href="mailto:seongho-kim@yonsei.ac.kr">Contact Me</a>
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a
              href="#about"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#publications"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Publications
            </a>
            <a
              href="#experience"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Experience
            </a>
            <a
              href="#projects"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </a>
            <a
              href="#skills"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Skills
            </a>
            <a
              href="#education"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Education
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-20 items-center">
              <div className="lg:col-span-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="relative">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-2xl ring-1 ring-blue-200/50 dark:ring-blue-800/50">
                      <img
                        src="/profile.jpg?height=160&width=160"
                        alt="Seongho Kim"
                        className="w-full h-full object-cover rounded-3xl"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-300 mb-6 shadow-lg">
                      <Cpu className="w-4 h-4 mr-2" />
                      Compiler Engineer
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
                      Hi, I'm{" "}
                      <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 bg-clip-text text-transparent">
                        Seongho Kim
                      </span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed mb-8">
                      Research Interests: Compiler Optimization for Deep Learning and Homomorphic Encryption, Large
                      Language Model Acceleration
                    </p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-xl"
                      >
                        <a href="#publications">View Publications</a>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/30 shadow-lg bg-transparent"
                      >
                        <Download className="mr-2 h-5 w-5" />
                        <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                          Download CV
                        </a>
                      </Button>
                    </div>
                    <div className="flex items-center space-x-6">
                      <a
                        href="https://github.com/seongho-git"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-3 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl"
                      >
                        <Github className="h-6 w-6" />
                      </a>
                      <a
                        href="https://linkedin.com/in/seongho-kim"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-3 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl"
                      >
                        <Linkedin className="h-6 w-6" />
                      </a>
                      <a
                        href="mailto:seongho-kim@yonsei.ac.kr"
                        className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-3 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl"
                      >
                        <Mail className="h-6 w-6" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden lg:flex justify-center lg:justify-end lg:col-span-4">
               <Card className="w-80 h-80 border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-900 dark:to-blue-950/20">
                <CardContent className="p-8 h-full flex flex-col justify-center items-center text-center">
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
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                  >
                    Research Assistant
                  </Badge>
                </CardContent>
              </Card>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">About Me</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-700 mx-auto rounded-full"></div>
            </div>
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-6">
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  I'm a passionate{" "}
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">Compiler Engineer</span> with
                  specialized expertise in optimization techniques for Homomorphic Encryption and Deep Learning.
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Currently pursuing an Integrated M.S./Ph.D in Electrical & Electronic Engineering at Yonsei
                  University, I work as a Research Assistant at CoreLab under Prof. Hanjun Kim, focusing on compiler
                  optimization techniques.
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  My research interests include compiler optimization for homomorphic encryption and deep learning, with
                  experience in MLIR, LLVM, C/C++, Python, and CUDA.
                </p>
              </div>
              <div className="space-y-6">
                <div className="group">
                  <div className="flex items-start space-x-4 p-6 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                      <Cpu className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Compiler Optimization</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        MLIR, LLVM, C/C++, Python for homomorphic encryption and deep learning
                      </p>
                    </div>
                  </div>
                </div>
                <div className="group">
                  <div className="flex items-start space-x-4 p-6 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Deep Learning Acceleration</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300">LLM optimization, CUDA, PyTorch</p>
                    </div>
                  </div>
                </div>
                <div className="group">
                  <div className="flex items-start space-x-4 p-6 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Digital Circuit Design</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Verilog, Xilinx Vivado, Cadence Virtuoso
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">Publications</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
            </div>
            <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 hover:shadow-3xl transition-all duration-500 group">
              <CardHeader className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-t-2xl">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Survey and Evaluation of Converging Architecture in LLM based on Footsteps of Operations
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
                        IEEE Open Journal of the Computer Society, July 2025
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
                      >
                        IF=8.2, Q1 (JCR 2024)
                      </Badge>
                    </div>
                  </div>
                  <a
                    href="https://doi.org/10.1109/OJCS.2025.3587005"
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
                  <span className="text-blue-600 dark:text-blue-400 font-bold underline decoration-blue-600/30 underline-offset-2">
                    Seongho Kim
                  </span>
                  , Jihyun Moon, Juntaek Oh, Insu Choi, and Joon-Sung Yang
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  This paper provides insights into strategies for enhancing LLM performance by analyzing the converging
                  architecture.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">Experience</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
            </div>
            <div className="space-y-8">
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 hover:shadow-2xl transition-all duration-300 group">
                <CardHeader className="border-l-4 border-l-blue-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        Research Assistant
                      </CardTitle>
                      <CardDescription className="text-blue-600 dark:text-blue-400 font-medium text-base mt-1">
                        <a
                          href="https://corelab.yonsei.ac.kr/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          CoreLab in Yonsei University
                        </a>{" "}
                        / Prof. Hanjun Kim
                      </CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
                    >
                      2025.03 - Present
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-slate-600 dark:text-slate-300 mb-4">Homomorphic Encryption</p>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Technologies used:</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-0">
                        MLIR
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-0">
                        Python
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-0">
                        C/C++
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-0">
                        CUDA
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-0">
                        A6000
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 hover:shadow-2xl transition-all duration-300 group">
                <CardHeader className="border-l-4 border-l-blue-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        Undergraduate Research Assistant
                      </CardTitle>
                      <CardDescription className="text-blue-600 dark:text-blue-400 font-medium text-base mt-1">
                        <a
                          href="https://corelab.yonsei.ac.kr/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          CoreLab in Yonsei University
                        </a>{" "}
                        / Prof. Hanjun Kim
                      </CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
                    >
                      2024.06 - 2025.02
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-slate-600 dark:text-slate-300 mb-4">Study LLVM</p>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Technologies used:</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-0">
                        LLVM
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-0">
                        Python
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-0">
                        C/C++
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 hover:shadow-2xl transition-all duration-300 group">
                <CardHeader className="border-l-4 border-l-slate-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                        Lead of Undergraduate Research Team
                      </CardTitle>
                      <CardDescription className="text-blue-600 dark:text-blue-400 font-medium text-base mt-1">
                        DATES Lab in Yonsei University / Prof. Joon-Sung Yang
                      </CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      2024.03 - 2024.06
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 mb-4">
                    <li>
                      Authored and published a research paper titled{" "}
                      <a
                        href="https://arxiv.org/abs/2410.11381"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        "Survey and Evaluation of Converging Architecture in LLM based on Footsteps of Operations"
                      </a>
                      , providing insights into strategies for accelerating LLM performance.
                    </li>
                    <li>
                      Spearheaded a research team of 3 undergraduates and a graduate, defining objectives and developing
                      research plans.
                    </li>
                    <li>Research Topic: Analysis of open-source LLMs.</li>
                    <li>
                      Experimented with Gemma (Google Deepmind) and Llama (Meta) on RTX 6000 Ada with Runpod support.
                    </li>
                  </ul>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Technologies used:</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300 border-0">
                        Python
                      </Badge>
                      <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300 border-0">
                        C/C++
                      </Badge>
                      <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300 border-0">
                        NVIDIA RTX 6000 Ada
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 hover:shadow-2xl transition-all duration-300 group">
                <CardHeader className="border-l-4 border-l-indigo-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        Invited Project Builder of LLM Acceleration
                      </CardTitle>
                      <CardDescription className="text-blue-600 dark:text-blue-400 font-medium text-base mt-1">
                        Backdrop Build Lab V3 and V4
                      </CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300"
                    >
                      2024.02 - 2024.06
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 mb-4">
                    <li>Invited to be a project developer to explore the potential for LLM acceleration.</li>
                    <li>Analyzed kernel performance between Llama and Gemma with RTX 6000 Ada provided by Runpod.</li>
                  </ul>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Technologies used:</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 border-0">
                        Python
                      </Badge>
                      <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 border-0">
                        C/C++
                      </Badge>
                      <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 border-0">
                        NVIDIA RTX 6000 Ada
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 hover:shadow-2xl transition-all duration-300 group">
                <CardHeader className="border-l-4 border-l-blue-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        SNU Convergence Research Intern
                      </CardTitle>
                      <CardDescription className="text-blue-600 dark:text-blue-400 font-medium text-base mt-1">
                        SCALE Lab in Seoul National University / Prof. Jung-Ho Ahn
                      </CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
                    >
                      2023.12 - 2024.02
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-slate-600 dark:text-slate-300 mb-4">Acceleration of Llama2 7B (LLM of Meta).</p>
                  <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 mb-4">
                    <li>
                      Investigated the architecture and performance of OPT and Llama (LLMs of META) on TensorRT-LLM
                      (NVIDIA).
                    </li>
                    <li>Established research objectives on significant and feasible kernel optimization.</li>
                    <li>
                      Achieved 40% performance improvement by applying GQA on Llama2 7B compared to the MHA baseline.
                    </li>
                  </ul>
                  <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 mb-4">
                    <ChevronRight className="w-4 h-4 mr-1" />
                    Related to{" "}
                    <a href="#projects" className="hover:underline ml-1">
                      SNU Lab Study project
                    </a>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Technologies used:</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-0">
                        Python
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-0">
                        PyTorch
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-0">
                        C/C++
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-0">
                        NVIDIA TITAN V
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 hover:shadow-2xl transition-all duration-300 group">
                <CardHeader className="border-l-4 border-l-indigo-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        Undergraduate Research Intern
                      </CardTitle>
                      <CardDescription className="text-blue-600 dark:text-blue-400 font-medium text-base mt-1">
                        Circuit and System Lab in Yonsei University / Prof. Tae Wook Kim
                      </CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300"
                    >
                      2023.01 - 2023.06
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 mb-4">
                    <li>Research Topic: Analyze Impulse Radio Ultra-WideBand (IR-UWB) transmitter and transceiver.</li>
                    <li>Designed proposed pulse generator of UWB transmitter.</li>
                    <li>Analyzed the architecture of UWB transmitter and transceiver.</li>
                    <li>Optimized the performance of multi-stage amplifier.</li>
                  </ul>
                  <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 mb-4">
                    <ChevronRight className="w-4 h-4 mr-1" />
                    Related to{" "}
                    <a href="#projects" className="hover:underline ml-1">
                      Circuit and System Lab Study project
                    </a>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Technologies used:</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 border-0">
                        Verilog
                      </Badge>
                      <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 border-0">
                        Cadence Virtuoso
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 hover:shadow-2xl transition-all duration-300 group">
                <CardHeader className="border-l-4 border-l-slate-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                        Mandatory Military Service
                      </CardTitle>
                      <CardDescription className="text-blue-600 dark:text-blue-400 font-medium text-base mt-1">
                        Information Systems Management in the Republic of Korea Air Force (ROKAF)
                      </CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      2020.10 - 2022.07
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Fulfilled mandatory military service requirement, focusing on information systems management.
                  </p>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Technologies used:</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300 border-0">
                        Python
                      </Badge>
                      <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300 border-0">
                        MS Excel
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">Projects</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 hover:shadow-3xl transition-all duration-500 group">
                <CardHeader className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      SNU Lab Study
                    </CardTitle>
                    <ExternalLink className="h-5 w-5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <CardDescription className="text-slate-600 dark:text-slate-400">2023.12 ~ 2024.03</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    Apply GQA to Llama2-7B on TensorRT-LLM
                  </p>
                  <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                    <ChevronRight className="w-4 h-4 mr-1" />
                    Related to{" "}
                    <a href="#experience" className="hover:underline ml-1">
                      SNU Lab Study project
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 hover:shadow-3xl transition-all duration-500 group">
                <CardHeader className="bg-gradient-to-r from-slate-50/80 to-slate-100/80 dark:from-slate-900/30 dark:to-slate-800/30 rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                      Circuit and System Lab Study
                    </CardTitle>
                    <a
                      href="https://drive.google.com/file/d/1DIE-QB58-gWAj9FHtF4tP1jNMG_2th0z/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors p-2 hover:bg-slate-50 dark:hover:bg-slate-950/30 rounded-xl"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <CardDescription className="text-slate-600 dark:text-slate-400">2023.01 ~ 2023.06</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    Analysis of Ultra-WideBand CMOS TX & TRX Architecture
                  </p>
                  <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <ChevronRight className="w-4 h-4 mr-1" />
                    Related to{" "}
                    <a href="#experience" className="hover:underline ml-1">
                      Undergraduate Research Intern experience
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">Skills</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 hover:shadow-2xl transition-all duration-300 group">
                <CardHeader className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30">
                  <CardTitle className="text-xl flex items-center text-slate-900 dark:text-white">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                      <Cpu className="w-5 h-5 text-white" />
                    </div>
                    Computer Science
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 dark:from-blue-900/30 dark:to-blue-800/30 dark:text-blue-300 border-0 px-3 py-1">
                      MLIR
                    </Badge>
                    <Badge className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 dark:from-blue-900/30 dark:to-blue-800/30 dark:text-blue-300 border-0 px-3 py-1">
                      LLVM
                    </Badge>
                    <Badge className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 dark:from-blue-900/30 dark:to-blue-800/30 dark:text-blue-300 border-0 px-3 py-1">
                      Python
                    </Badge>
                    <Badge className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 dark:from-blue-900/30 dark:to-blue-800/30 dark:text-blue-300 border-0 px-3 py-1">
                      C/C++
                    </Badge>
                    <Badge className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 dark:from-blue-900/30 dark:to-blue-800/30 dark:text-blue-300 border-0 px-3 py-1">
                      CUDA
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 hover:shadow-2xl transition-all duration-300 group">
                <CardHeader className="bg-gradient-to-r from-slate-50/80 to-slate-100/80 dark:from-slate-900/30 dark:to-slate-800/30">
                  <CardTitle className="text-xl flex items-center text-slate-900 dark:text-white">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    Digital Circuit Design
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 dark:from-slate-900/30 dark:to-slate-800/30 dark:text-slate-300 border-0 px-3 py-1">
                      Verilog
                    </Badge>
                    <Badge className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 dark:from-slate-900/30 dark:to-slate-800/30 dark:text-slate-300 border-0 px-3 py-1">
                      Xilinx Vivado
                    </Badge>
                    <Badge className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 dark:from-slate-900/30 dark:to-slate-800/30 dark:text-slate-300 border-0 px-3 py-1">
                      Cadence Virtuoso
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 hover:shadow-2xl transition-all duration-300 group">
                <CardHeader className="bg-gradient-to-r from-indigo-50/80 to-blue-50/80 dark:from-indigo-950/30 dark:to-blue-950/30">
                  <CardTitle className="text-xl flex items-center text-slate-900 dark:text-white">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    Programming
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 dark:from-indigo-900/30 dark:to-indigo-800/30 dark:text-indigo-300 border-0 px-3 py-1">
                      Linux
                    </Badge>
                    <Badge className="bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 dark:from-indigo-900/30 dark:to-indigo-800/30 dark:text-indigo-300 border-0 px-3 py-1">
                      Docker
                    </Badge>
                    <Badge className="bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 dark:from-indigo-900/30 dark:to-indigo-800/30 dark:text-indigo-300 border-0 px-3 py-1">
                      Multipass
                    </Badge>
                    <Badge className="bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 dark:from-indigo-900/30 dark:to-indigo-800/30 dark:text-indigo-300 border-0 px-3 py-1">
                      Dart
                    </Badge>
                    <Badge className="bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 dark:from-indigo-900/30 dark:to-indigo-800/30 dark:text-indigo-300 border-0 px-3 py-1">
                      Flutter
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 hover:shadow-2xl transition-all duration-300 group">
                <CardHeader className="bg-gradient-to-r from-slate-50/80 to-slate-100/80 dark:from-slate-900/30 dark:to-slate-800/30">
                  <CardTitle className="text-xl flex items-center text-slate-900 dark:text-white">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    Languages
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 dark:from-slate-900/30 dark:to-slate-800/30 dark:text-slate-300 border-0 px-3 py-1">
                      Korean (Native)
                    </Badge>
                    <Badge className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 dark:from-slate-900/30 dark:to-slate-800/30 dark:text-slate-300 border-0 px-3 py-1">
                      English (Expert)
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">Education</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
            </div>
            <div className="space-y-8 mb-16">
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 hover:shadow-2xl transition-all duration-300 group">
                <CardHeader className="border-l-4 border-l-blue-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        Integrated M.S./Ph.D. in Electrical and Electronic Engineering 
                      </CardTitle>
                      <CardDescription className="text-blue-600 dark:text-blue-400 font-medium text-base mt-1">
                        Yonsei University (GPA 4.3/4.3)
                      </CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
                    >
                      2025 - Present
                    </Badge>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 hover:shadow-2xl transition-all duration-300 group">
                <CardHeader className="border-l-4 border-l-slate-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                        B.E. in Electrical and Electronic Engineering 
                      </CardTitle>
                      <CardDescription className="text-blue-600 dark:text-blue-400 font-medium text-base mt-1">
                        Yonsei University (GPA 3.72/4.3)
                      </CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      2019 - 2024
                    </Badge>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 hover:shadow-2xl transition-all duration-300 group">
                <CardHeader className="border-l-4 border-l-indigo-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        High School
                      </CardTitle>
                      <CardDescription className="text-blue-600 dark:text-blue-400 font-medium text-base mt-1">
                        Hanil High School
                      </CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300"
                    >
                      2014 - 2017
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            </div>

            <div className="mt-16">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                Scholarships & Certifications
              </h3>
              <div className="space-y-6">
                <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 hover:shadow-2xl transition-all duration-300 group">
                  <CardHeader className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          Integrated B.S./M.S./Ph.D
                        </CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-400">
                          Yonsei University | 2025.02 - 2028.02
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Full scholarship for 3 years after the bachelor's degree.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 hover:shadow-2xl transition-all duration-300 group">
                  <CardHeader className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          Semiconductor Specialist Track
                        </CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-400">
                          Yonsei University | 2023.03 - 2025.02
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Scholarship for 2 years and certification after course completion.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 hover:shadow-2xl transition-all duration-300 group">
                  <CardHeader className="bg-gradient-to-r from-slate-50/80 to-slate-100/80 dark:from-slate-900/30 dark:to-slate-800/30">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                          AI-900: Microsoft Azure AI Fundamentals
                        </CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-400">
                          Microsoft | 2023.07
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 hover:shadow-2xl transition-all duration-300 group">
                  <CardHeader className="bg-gradient-to-r from-indigo-50/80 to-blue-50/80 dark:from-indigo-950/30 dark:to-blue-950/30">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          Computer Specialist Level 1
                        </CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-400">KCCI | 2022.06</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-sm text-slate-600 dark:text-slate-300">Highest Level certification from KCCI</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 dark:from-blue-950/20 dark:via-slate-950 dark:to-indigo-950/20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">Get In Touch</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Interested in collaborating on compiler optimization projects or discussing research opportunities? I'd
                love to hear from you.
              </p>
            </div>

            <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50">
              <CardHeader className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30">
                <CardTitle className="text-2xl text-center text-slate-900 dark:text-white">Send Message</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleEmailSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="senderEmail" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Your Email
                    </Label>
                    <Input
                      id="senderEmail"
                      type="email"
                      placeholder="your.email@example.com"
                      value={emailForm.senderEmail}
                      onChange={(e) => handleInputChange("senderEmail", e.target.value)}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Research Collaboration Inquiry"
                      value={emailForm.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Hello Seongho, I'm interested in discussing..."
                      value={emailForm.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                      rows={6}
                      className="mt-2"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-xl"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Send Email
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Home className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                Seongho Kim
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              &copy; {new Date().getFullYear()} Seongho Kim. Built with Next.js and deployed on GitHub Pages.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
