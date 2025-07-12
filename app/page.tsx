"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  Code,
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
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Seongho Kim
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-sm font-medium hover:text-blue-600 transition-colors">
                About
              </a>
              <a href="#publications" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Publications
              </a>
              <a href="#experience" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Experience
              </a>
              <a href="#projects" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Projects
              </a>
              <a href="#skills" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Skills
              </a>
              <a href="#education" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Education
              </a>
              <a href="#contact" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Contact
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button size="sm" className="hidden sm:flex bg-blue-600 hover:bg-blue-700">
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
        <div className="md:hidden bg-background border-b">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a
              href="#about"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#publications"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Publications
            </a>
            <a
              href="#experience"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Experience
            </a>
            <a
              href="#projects"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </a>
            <a
              href="#skills"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Skills
            </a>
            <a
              href="#education"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Education
            </a>
            <a
              href="#contact"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section className="py-20 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/30 dark:from-blue-950/20 dark:via-transparent dark:to-indigo-950/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-xl">
                <img
                  src="/profile.jpg?height=192&width=192"
                  alt="Seongho Kim"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-4">
                  <Cpu className="w-4 h-4 mr-2" />
                  Compiler Engineer
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mt-2">
                  Hi, I'm{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Seongho Kim
                  </span>
                </h1>
                <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  Research Interests: Compiler Optimization for Deep Learning and Homomorphic Encryption, Large Language
                  Model Acceleration
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-lg">
                    <Mail className="mr-2 h-4 w-4" />
                    <a href="mailto:seongho-kim@yonsei.ac.kr">Get in Touch</a>
                  </Button>
                  <Button variant="outline" size="lg" className="shadow-lg bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                      Download CV
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" className="shadow-lg bg-transparent">
                    <a href="#publications">View Publications</a>
                  </Button>
                </div>
                <div className="mt-8 flex items-center space-x-6">
                  <a
                    href="https://github.com/seongho-git"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                  <a
                    href="https://linkedin.com/in/seongho-kim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a
                    href="mailto:seongho-kim@yonsei.ac.kr"
                    className="text-muted-foreground hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg"
                  >
                    <Mail className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex justify-center lg:justify-end">
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
                  <div className="mt-4 flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Building2 className="w-4 h-4 mr-1" />
                      Lab
                    </div>
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-1" />
                      HE & ML
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-lg text-muted-foreground mb-6">
                  I'm a passionate <span className="text-blue-600 font-medium">Compiler Engineer</span> with specialized
                  expertise in optimization techniques for Homomorphic Encryption and Deep Learning.
                </p>
                <p className="text-muted-foreground mb-6">
                  Currently pursuing an Integrated M.S./Ph.D in Electrical & Electronic Engineering at Yonsei
                  University, I work as a Research Assistant at CoreLab under Prof. Hanjun Kim, focusing on compiler
                  optimization techniques.
                </p>
                <p className="text-muted-foreground">
                  My research interests include compiler optimization for homomorphic encryption and deep learning, with
                  experience in MLIR, LLVM, C/C++, Python, and CUDA.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Cpu className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">Compiler Optimization</h3>
                    <p className="text-sm text-muted-foreground">
                      MLIR, LLVM, C/C++, Python for homomorphic encryption and deep learning
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Zap className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">Deep Learning Acceleration</h3>
                    <p className="text-sm text-muted-foreground">LLM optimization, CUDA, PyTorch</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <BookOpen className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">Digital Circuit Design</h3>
                    <p className="text-sm text-muted-foreground">Verilog, Xilinx Vivado, Cadence Virtuoso</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">Publications</h2>
            <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">
                      Survey and Evaluation of Converging Architecture in LLM based on Footsteps of Operations
                    </CardTitle>
                    <CardDescription className="text-blue-600 font-medium">
                      IEEE OJCS, IF=8.2, Q1 (JCR 2025)
                    </CardDescription>
                  </div>
                  <a
                    href="https://arxiv.org/abs/2410.11381"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4 font-medium">
                  <span className="text-blue-600 font-bold underline">Seongho Kim</span>, Jihyun Moon, Juntaek Oh, Insu
                  Choi, and Joon-Sung Yang
                </p>
                <p className="text-sm text-muted-foreground">
                  This paper provides insights into strategies for enhancing LLM performance by analyzing the converging
                  architecture.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">Experience</h2>
            <div className="space-y-8">
              <Card className="border-l-4 border-l-blue-600 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">Research Assistant</CardTitle>
                      <CardDescription className="text-blue-600 font-medium text-base">
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
                    <Badge variant="outline" className="text-sm">
                      2025.03 - Present
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Homomorphic Encryption</p>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-muted-foreground">Technologies used:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">MLIR</Badge>
                      <Badge variant="secondary">Python</Badge>
                      <Badge variant="secondary">C/C++</Badge>
                      <Badge variant="secondary">CUDA</Badge>
                      <Badge variant="secondary">A6000</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-600 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">Undergraduate Research Assistant</CardTitle>
                      <CardDescription className="text-blue-600 font-medium text-base">
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
                    <Badge variant="outline" className="text-sm">
                      2024.06 - 2025.02
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Study LLVM</p>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-muted-foreground">Technologies used:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">LLVM</Badge>
                      <Badge variant="secondary">Python</Badge>
                      <Badge variant="secondary">C/C++</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-600 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">Lead of Undergraduate Research Team</CardTitle>
                      <CardDescription className="text-blue-600 font-medium text-base">
                        DATES Lab in Yonsei University / Prof. Joon-Sung Yang
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      2024.03 - 2024.06
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                    <li>
                      Authored and published a research paper titled{" "}
                      <a
                        href="https://arxiv.org/abs/2410.11381"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
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
                    <p className="text-sm font-medium text-muted-foreground">Technologies used:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">Python</Badge>
                      <Badge variant="secondary">C/C++</Badge>
                      <Badge variant="secondary">NVIDIA RTX 6000 Ada</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-600 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">Invited Project Builder of LLM Acceleration</CardTitle>
                      <CardDescription className="text-blue-600 font-medium text-base">
                        Backdrop Build Lab V3 and V4
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      2024.02 - 2024.06
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                    <li>Invited to be a project developer to explore the potential for LLM acceleration.</li>
                    <li>Analyzed kernel performance between Llama and Gemma with RTX 6000 Ada provided by Runpod.</li>
                  </ul>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-muted-foreground">Technologies used:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">Python</Badge>
                      <Badge variant="secondary">C/C++</Badge>
                      <Badge variant="secondary">NVIDIA RTX 6000 Ada</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-600 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">SNU Convergence Research Intern</CardTitle>
                      <CardDescription className="text-blue-600 font-medium text-base">
                        SCALE Lab in Seoul National University / Prof. Jung-Ho Ahn
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      2023.12 - 2024.02
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Acceleration of Llama2 7B (LLM of Meta).</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                    <li>
                      Investigated the architecture and performance of OPT and Llama (LLMs of META) on TensorRT-LLM
                      (NVIDIA).
                    </li>
                    <li>Established research objectives on significant and feasible kernel optimization.</li>
                    <li>
                      Achieved 40% performance improvement by applying GQA on Llama2 7B compared to the MHA baseline.
                    </li>
                  </ul>
                  <p className="text-sm text-blue-600 mb-4">
                    Related to{" "}
                    <a href="#projects" className="hover:underline">
                      SNU Lab Study project
                    </a>
                  </p>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-muted-foreground">Technologies used:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">Python</Badge>
                      <Badge variant="secondary">PyTorch</Badge>
                      <Badge variant="secondary">C/C++</Badge>
                      <Badge variant="secondary">NVIDIA TITAN V</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-indigo-600 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">Undergraduate Research Intern</CardTitle>
                      <CardDescription className="text-blue-600 font-medium text-base">
                        Circuit and System Lab in Yonsei University / Prof. Tae Wook Kim
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      2023.01 - 2023.06
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                    <li>Research Topic: Analyze Impulse Radio Ultra-WideBand (IR-UWB) transmitter and transceiver.</li>
                    <li>Designed proposed pulse generator of UWB transmitter.</li>
                    <li>Analyzed the architecture of UWB transmitter and transceiver.</li>
                    <li>Optimized the performance of multi-stage amplifier.</li>
                  </ul>
                  <p className="text-sm text-blue-600 mb-4">
                    Related to{" "}
                    <a href="#projects" className="hover:underline">
                      Circuit and System Lab Study project
                    </a>
                  </p>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-muted-foreground">Technologies used:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">Verilog</Badge>
                      <Badge variant="secondary">Cadence Virtuoso</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-gray-600 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">Mandatory Military Service</CardTitle>
                      <CardDescription className="text-blue-600 font-medium text-base">
                        Information Systems Management in the Republic of Korea Air Force (ROKAF)
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      2020.10 - 2022.07
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Fulfilled mandatory military service requirement, focusing on information systems management.
                  </p>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-muted-foreground">Technologies used:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">Python</Badge>
                      <Badge variant="secondary">MS Excel</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="hover:shadow-xl transition-all duration-300 group border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
                  <div className="flex items-center justify-between">
                    <CardTitle className="group-hover:text-blue-600 transition-colors">SNU Lab Study</CardTitle>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                  </div>
                  <CardDescription>2023.12 ~ 2024.03</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">Apply GQA to Llama2-7B on TensorRT-LLM</p>
                  <p className="text-sm text-blue-600">
                    Related to{" "}
                    <a href="#experience" className="hover:underline">
                      SNU Convergence Research Intern experience
                    </a>
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 group border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                  <div className="flex items-center justify-between">
                    <CardTitle className="group-hover:text-purple-600 transition-colors">
                      Circuit and System Lab Study
                    </CardTitle>
                    <a
                      href="https://drive.google.com/file/d/1DIE-QB58-gWAj9FHtF4tP1jNMG_2th0z/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground group-hover:text-purple-600 transition-colors p-2 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <CardDescription>2023.01 ~ 2023.06</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">Analysis of Ultra-WideBand CMOS TX & TRX Architecture</p>
                  <p className="text-sm text-purple-600">
                    Related to{" "}
                    <a href="#experience" className="hover:underline">
                      Undergraduate Research Intern experience
                    </a>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">Skills</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Cpu className="w-6 h-6 mr-2 text-blue-600" />
                    Computer Science
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      MLIR
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      LLVM
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Python
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      C/C++
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      CUDA
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Zap className="w-6 h-6 mr-2 text-green-600" />
                    Digital Circuit Design
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Verilog
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Xilinx Vivado
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Cadence Virtuoso
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Code className="w-6 h-6 mr-2 text-purple-600" />
                    Programming
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      Linux
                    </Badge>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      Docker
                    </Badge>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      Multipass
                    </Badge>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      Dart
                    </Badge>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      Flutter
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Users className="w-6 h-6 mr-2 text-orange-600" />
                    Languages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                      Korean (Native)
                    </Badge>
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
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
      <section id="education" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">Education</h2>
            <div className="space-y-8">
              <Card className="border-l-4 border-l-blue-600 shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">Integrated M.S./Ph.D in Electrical & Electronic</CardTitle>
                      <CardDescription className="text-blue-600 font-medium text-base">
                        Yonsei University
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      2025 - Present
                    </Badge>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-l-4 border-l-green-600 shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">B.E. in Electrical & Electronic</CardTitle>
                      <CardDescription className="text-blue-600 font-medium text-base">
                        Yonsei University
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      2019 - 2024
                    </Badge>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-l-4 border-l-purple-600 shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">High School</CardTitle>
                      <CardDescription className="text-blue-600 font-medium text-base">
                        Hanil High School
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      2014 - 2017
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            </div>

            <div className="mt-16">
              <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Scholarships & Certifications</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <div className="flex items-start">
                      <Award className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <CardTitle className="text-lg">Integrated B.S./M.S./Ph.D</CardTitle>
                        <CardDescription>Yonsei University | 2025.02 - 2028.02</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Yonsei BA/MS/Ph.D Accelerated Degree Program is an integrated program for students who want to get
                      the master's degree right after the bachelor's degree. The selected students will receive a full
                      scholarship for 3 years after the bachelor's degree.
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <div className="flex items-start">
                      <Award className="h-6 w-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <CardTitle className="text-lg">Semiconductor Specialist Track</CardTitle>
                        <CardDescription>Yonsei University | 2023.03 - 2025.02</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Yonsei University Semiconductor Specialist Track was created for the purpose of supporting the
                      future semiconductor specialists. The selected students will receive scholarship for 2 years and
                      get the certification of the track after complete the course.
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <div className="flex items-start">
                      <FileText className="h-6 w-6 text-purple-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <CardTitle className="text-lg">AI-900: Microsoft Azure AI Fundamentals</CardTitle>
                        <CardDescription>Microsoft | 2023.07</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <div className="flex items-start">
                      <FileText className="h-6 w-6 text-orange-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <CardTitle className="text-lg">Computer Specialist in Spreadsheet & Database Level 1</CardTitle>
                        <CardDescription>KCCI | 2022.06</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Highest Level certification from KCCI</p>
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
        className="py-20 bg-gradient-to-br from-blue-50 via-transparent to-indigo-50 dark:from-blue-950/20 dark:via-transparent dark:to-indigo-950/10"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">Get In Touch</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Interested in collaborating on compiler optimization projects or discussing research opportunities? I'd
              love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-lg">
                <Mail className="mr-2 h-4 w-4" />
                <a href="mailto:seongho-kim@yonsei.ac.kr">Send Email</a>
              </Button>
              <Button variant="outline" size="lg" className="shadow-lg bg-transparent">
                <Github className="mr-2 h-4 w-4" />
                <a href="https://github.com/seongho-git" target="_blank" rel="noopener noreferrer">
                  GitHub Profile
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Seongho Kim. Built with Next.js and deployed on GitHub Pages.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
