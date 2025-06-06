"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, Code, Cpu, Zap, BookOpen, ExternalLink, Menu, X, FileText, Award } from "lucide-react"
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
              <Code className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold">Seongho Kim</span>
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
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                <img
                    src="/profile.jpg?height=192&width=192"
                    alt="Seongho Kim"
                    className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mt-6 md:mt-0">
                  Hi, I'm <span className="text-blue-600">Seongho Kim</span>
                </h1>
                <h2 className="text-xl sm:text-2xl text-muted-foreground mt-4 font-medium">Compiler Engineer</h2>
                <p className="mt-6 text-lg text-muted-foreground">
                  Research Interests: Compiler Optimization for Homomorphic Encryption and Deep Learning
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <Mail className="mr-2 h-4 w-4" />
                    <a href="mailto:seongho-kim@yonsei.ac.kr">Get in Touch</a>
                  </Button>
                  <Button variant="outline" size="lg">
                    <a href="#projects">View Projects</a> 
                  </Button>
                </div>
                <div className="mt-8 flex items-center space-x-4">
                  <a
                    href="https://github.com/seongho-git"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-blue-600 transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/seongho-kim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-blue-600 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="mailto:seongho-kim@yonsei.ac.kr"
                    className="text-muted-foreground hover:text-blue-600 transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -left-6 -top-6 w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/20"></div>
                <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-blue-200/50 dark:bg-blue-800/20"></div>
                <div className="relative z-10 w-80 h-80 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-800/10 flex items-center justify-center border border-blue-200 dark:border-blue-800/30 shadow-lg">
                  <div className="text-center p-6">
                    <Cpu className="h-16 w-16 text-blue-600/40 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-blue-600">CORE Lab</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Yonsei University</p>
                    <p className="mt-4 text-xs text-muted-foreground">Research Assistant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-lg text-muted-foreground mb-6">
                  I'm a passionate <span className="text-blue-600 font-medium">Compiler Engineer</span> with specialized
                  expertise in optimization techniques for Homomorphic Encryption and Deep Learning.
                </p>
                <p className="text-muted-foreground mb-6">
                  Currently pursuing an Integrated M.S./Ph.D in Electrical & Electronic Engineering at Yonsei
                  University, I work as a Research Assistant at CORE Lab under Prof. Hanjun Kim, focusing on compiler
                  optimization techniques.
                </p>
                <p className="text-muted-foreground">
                  My research interests include compiler optimization for homomorphic encryption and deep learning, with
                  experience in LLVM, C/C++, Python, and CUDA.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Cpu className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">Compiler Optimization</h3>
                    <p className="text-sm text-muted-foreground">
                      LLVM, C/C++, Python for homomorphic encryption and deep learning
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
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12">Publications</h2>
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">
                      Survey and Evaluation of Converging Architecture in LLM based on Footsteps of Operations
                    </CardTitle>
                    <CardDescription className="text-blue-600 font-medium mt-2">Arxiv, 2024. 10.</CardDescription>
                  </div>
                  <a
                    href="https://arxiv.org/abs/2410.11381"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Seongho Kim, Jihyun Moon, Juntaek Oh, Insu Choi, and Joon-Sung Yang
                </p>
                <p className="text-sm text-muted-foreground">
                  This paper provides insights into strategies for accelerating LLM performance through converging
                  architecture analysis.
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
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12">Experience</h2>
            <div className="space-y-8">
              <Card className="border-l-4 border-l-blue-600">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">Research Assistant</CardTitle>
                      <CardDescription className="text-blue-600 font-medium text-base">
                        CORE Lab in Yonsei University / Prof. Hanjun Kim
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
                      <Badge variant="secondary">LLVM</Badge>
                      <Badge variant="secondary">Python</Badge>
                      <Badge variant="secondary">C/C++</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-600">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">Undergraduate Research Assistant</CardTitle>
                      <CardDescription className="text-blue-600 font-medium text-base">
                        CORE Lab in Yonsei University / Prof. Hanjun Kim
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

              <Card className="border-l-4 border-l-blue-600">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">Lead of Undergraduate Research Team</CardTitle>
                      <CardDescription className="text-blue-600 font-medium text-base">
                        DATES Lab in Yonsei University / Prof. Joon-Sung Yang
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      2024.03 - 2024.10
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                    <li>
                      Authored and published a research paper titled "Survey and Evaluation of Converging Architecture
                      in LLM based on Footsteps of Operations", providing insights into strategies for accelerating LLM
                      performance.
                    </li>
                    <li>
                      Spearheaded a research team of 3 undergraduates and a graduate, defining objectives and developing
                      research plans.
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

              <Card className="border-l-4 border-l-blue-600">
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

              <Card className="border-l-4 border-l-blue-600">
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
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12">Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="group-hover:text-blue-600 transition-colors">SNU Lab Study</CardTitle>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                  </div>
                  <CardDescription>2023.12 ~ 2024.03</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Apply GQA to Llama2-7B on TensorRT-LLM</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="group-hover:text-blue-600 transition-colors">
                      Circuit and System Lab Study
                    </CardTitle>
                    <a
                      href="https://drive.google.com/file/d/1DIE-QB58-gWAj9FHtF4tP1jNMG_2th0z/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground group-hover:text-blue-600 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <CardDescription>2023.01 ~ 2023.06</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Analysis of Ultra-WideBand CMOS TX & TRX Architecture</p>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12">Skills</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Computer Science</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">LLVM</Badge>
                  <Badge variant="outline">C/C++</Badge>
                  <Badge variant="outline">Python</Badge>
                  <Badge variant="outline">CUDA</Badge>
                  <Badge variant="outline">PyTorch</Badge>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Digital Circuit Design</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Verilog</Badge>
                  <Badge variant="outline">Xilinx Vivado</Badge>
                  <Badge variant="outline">Cadence Virtuoso</Badge>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Programming</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Linux</Badge>
                  <Badge variant="outline">Docker</Badge>
                  <Badge variant="outline">Multipass</Badge>
                  <Badge variant="outline">Dart</Badge>
                  <Badge variant="outline">Flutter</Badge>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Korean</Badge>
                  <Badge variant="outline">English</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12">Education</h2>
            <div className="space-y-8">
              <Card className="border-l-4 border-l-blue-600">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">Integrated M.S./Ph.D in EEE</CardTitle>
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

              <Card className="border-l-4 border-l-blue-600">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">BE in Electrical & Electronic</CardTitle>
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

              <Card className="border-l-4 border-l-blue-600">
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
              <h3 className="text-2xl font-bold text-foreground mb-8">Scholarships & Certifications</h3>
              <div className="space-y-8">
                <Card>
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
                      Yonsei BA/MS/Ph.D Accerlerated Degree Program is a integrated program for the students who want to
                      get the master's degree right after the bachelor's degree. The selected students will receive a
                      full scholarship for 3 years after the bachelor's degree.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-start">
                      <Award className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
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

                <Card>
                  <CardHeader>
                    <div className="flex items-start">
                      <FileText className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <CardTitle className="text-lg">AI-900: Microsoft Azure AI Fundamentals</CardTitle>
                        <CardDescription>Microsoft | 2023.07</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-start">
                      <FileText className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
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
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">Get In Touch</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Interested in collaborating on compiler optimization projects or discussing research opportunities? I'd
              love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Mail className="mr-2 h-4 w-4" />
                  <a href="mailto:seongho-kim@yonsei.ac.kr">Send Email</a>
              </Button>
              <Button variant="outline" size="lg">
                  <Github className="mr-2 h-4 w-4" />
                  <a href="https://github.com/seongho-git" target="_blank" rel="noopener noreferrer">GitHub Profile</a>
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
