import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, Code, Cpu, Zap, BookOpen } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold">CompilerDev</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#about" className="text-sm font-medium hover:text-blue-600 transition-colors">
                About
              </a>
              <a href="#projects" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Projects
              </a>
              <a href="#experience" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Experience
              </a>
              <a href="#contact" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Contact
              </a>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground">
              Compiler Engineer & <span className="text-blue-600">Language Designer</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Building the future of programming languages and compiler technologies. Passionate about optimization,
              performance, and elegant code generation.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                View My Work
              </Button>
              <Button variant="outline" size="lg">
                Download Resume
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-blue-600 transition-colors">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-blue-600 transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-blue-600 transition-colors">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">About Me</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Crafting efficient compilers and innovative programming languages
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Cpu className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Compiler Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Expert in advanced optimization techniques, from traditional passes to modern machine learning-guided
                  optimizations.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Performance Engineering</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Specialized in high-performance code generation, runtime systems, and low-level optimization
                  strategies.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Language Design</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Passionate about creating expressive, safe, and efficient programming languages with modern type
                  systems.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Featured Projects</h2>
            <p className="mt-4 text-lg text-muted-foreground">Open source contributions and research projects</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>OptimizeJS</CardTitle>
                  <Github className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription>A modern JavaScript compiler with advanced optimization passes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">LLVM</Badge>
                  <Badge variant="secondary">WebAssembly</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Implements cutting-edge optimization techniques including escape analysis and speculative
                  optimization.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>RustLang Contrib</CardTitle>
                  <Github className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription>Contributions to the Rust compiler and standard library</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">Rust</Badge>
                  <Badge variant="secondary">MIR</Badge>
                  <Badge variant="secondary">Borrow Checker</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Improved borrow checker performance and implemented new optimization passes in the MIR.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Quantum Lang</CardTitle>
                  <Github className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription>Experimental quantum programming language</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">C++</Badge>
                  <Badge variant="secondary">Quantum</Badge>
                  <Badge variant="secondary">Research</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Novel approach to quantum circuit compilation with classical-quantum hybrid optimization.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Experience</h2>
            <p className="mt-4 text-lg text-muted-foreground">Professional journey in compiler engineering</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-8">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Senior Compiler Engineer</CardTitle>
                    <CardDescription className="text-blue-600 font-medium">TechCorp Inc.</CardDescription>
                  </div>
                  <Badge variant="outline">2022 - Present</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Lead development of next-generation compiler infrastructure, focusing on machine learning-guided
                  optimizations and cross-platform code generation. Improved compilation speed by 40% and generated code
                  performance by 25%.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Compiler Engineer</CardTitle>
                    <CardDescription className="text-blue-600 font-medium">StartupLang</CardDescription>
                  </div>
                  <Badge variant="outline">2020 - 2022</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Built compiler toolchain from scratch for a new systems programming language. Implemented LLVM
                  backend, designed type system, and created developer tooling including LSP server and debugger
                  integration.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Get In Touch</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Interested in collaborating on compiler projects or discussing language design? I'd love to hear from you.
            </p>
            <div className="mt-10">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Mail className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2024 CompilerDev. Built with Next.js and deployed on GitHub Pages.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
