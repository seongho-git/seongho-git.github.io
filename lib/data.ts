import { Github, Linkedin, Mail, Cpu, Zap, BookOpen, FileText, Award, Building2, Users, Target, Code, Terminal, Layers } from "lucide-react"

export const personalInfo = {
  name: "Seongho Kim",
  role: "Compiler Engineer",
  email: "seongho-kim@yonsei.ac.kr",
  github: "https://github.com/seongho-git",
  linkedin: "https://linkedin.com/in/seongho-kim",
  description: "Research Interests: Compiler Optimization for Deep Learning and Homomorphic Encryption, Large Language Model Acceleration",
  about: [
    "I am a Ph.D. student in the Department of Electrical and Electronic Engineering at Yonsei University, advised by Prof. Hanjun Kim at CORE Lab. My research focuses on compiler optimization for emerging computing paradigms, specifically Homomorphic Encryption (HE) and Deep Learning (DL).",
    "I am dedicated to bridging the gap between hardware capabilities and software demands through advanced compiler techniques. My work aims to enable efficient and secure computing by optimizing the entire software stack, from high-level algorithmic descriptions down to hardware-specific instruction generation.",
    "My core technical interests lie in Compiler Optimization (MLIR, LLVM) and AI Acceleration (LLM kernels, CUDA, NPU architecture). I strive to build systems that are not only performant but also robust and scalable."
  ]
}

export const publications = [
  {
    title: "Survey and Evaluation of Converging Architecture in LLM based on Footsteps of Operations",
    journal: "IEEE Open Journal of the Computer Society, July 2025",
    badges: ["IF=8.2, Q1 (JCR 2024)"],
    link: "https://doi.org/10.1109/OJCS.2025.3587005",
    authors: "Seongho Kim, Jihyun Moon, Juntaek Oh, Insu Choi, and Joon-Sung Yang",
    description: "This paper provides insights into strategies for enhancing LLM performance by analyzing the converging architecture."
  }
]

export const experience = [
  {
    title: "Research Assistant",
    company: "CoreLab in Yonsei University",
    advisor: "Prof. Hanjun Kim",
    period: "2025.03 - Present",
    description: "Homomorphic Encryption",
    link: "https://corelab.yonsei.ac.kr/",
    technologies: ["MLIR", "Python", "C/C++", "CUDA", "A6000"],
    color: "blue"
  },
  {
    title: "Undergraduate Research Assistant",
    company: "CoreLab in Yonsei University",
    advisor: "Prof. Hanjun Kim",
    period: "2024.06 - 2025.02",
    description: "Study LLVM",
    link: "https://corelab.yonsei.ac.kr/",
    technologies: ["LLVM", "Python", "C/C++"],
    color: "blue"
  },
  {
    title: "Lead of Undergraduate Research Team",
    company: "DATES Lab in Yonsei University",
    advisor: "Prof. Joon-Sung Yang",
    period: "2024.03 - 2024.06",
    description: "Authored and published a research paper titled \"Survey and Evaluation of Converging Architecture in LLM based on Footsteps of Operations\". Spearheaded a research team of 3 undergraduates and a graduate. Experimented with Gemma and Llama on RTX 6000 Ada.",
    link: "https://arxiv.org/abs/2410.11381",
    technologies: ["Python", "C/C++", "NVIDIA RTX 6000 Ada"],
    color: "slate"
  },
  {
    title: "Invited Project Builder of LLM Acceleration",
    company: "Backdrop Build Lab V3 and V4",
    period: "2024.02 - 2024.06",
    description: "Invited to be a project developer to explore the potential for LLM acceleration. Analyzed kernel performance between Llama and Gemma.",
    technologies: ["Python", "C/C++", "NVIDIA RTX 6000 Ada"],
    color: "indigo"
  },
  {
    title: "SNU Convergence Research Intern",
    company: "SCALE Lab in Seoul National University",
    advisor: "Prof. Jung-Ho Ahn",
    period: "2023.12 - 2024.02",
    description: "Acceleration of Llama2 7B. Achieved 40% performance improvement by applying GQA on Llama2 7B compared to the MHA baseline.",
    technologies: ["Python", "PyTorch", "C/C++", "NVIDIA TITAN V"],
    color: "blue"
  },
  {
    title: "Undergraduate Research Intern",
    company: "Circuit and System Lab in Yonsei University",
    advisor: "Prof. Tae Wook Kim",
    period: "2023.01 - 2023.06",
    description: "Analysis of Ultra-WideBand CMOS TX & TRX Architecture. Designed proposed pulse generator of UWB transmitter.",
    technologies: ["Verilog", "Cadence Virtuoso"],
    color: "indigo"
  },
  {
    title: "Mandatory Military Service",
    company: "Republic of Korea Air Force (ROKAF)",
    period: "2020.10 - 2022.07",
    description: "Information Systems Management.",
    technologies: ["Python", "MS Excel"],
    color: "slate"
  }
]

export const projects = [
  {
    title: "LLM Kernel Performance Analysis",
    period: "2024.02 ~ 2024.06",
    affiliation: "Backdrop Build Lab V3 & V4",
    description: "Analyzed and compared kernel performance between Llama and Gemma models to identify acceleration opportunities.",
    relatedTo: "Invited Project Builder experience",
    link: "https://github.com/seongho-git" // Placeholder as requested
  },
  {
    title: "Llama2-7B GQA Optimization",
    period: "2023.12 ~ 2024.03",
    affiliation: "SCALE Lab, Seoul National University",
    description: "Applied Grouped Query Attention (GQA) to Llama2-7B on TensorRT-LLM, achieving a 40% performance improvement over the MHA baseline.",
    relatedTo: "SNU Convergence Research Intern",
    link: "#experience"
  },
  {
    title: "Ultra-WideBand CMOS Transmitter Design",
    period: "2023.01 ~ 2023.06",
    affiliation: "Circuit and System Lab, Yonsei University",
    description: "Analyzed Ultra-WideBand CMOS TX & TRX Architecture and designed a proposed pulse generator for UWB transmitters.",
    relatedTo: "Undergraduate Research Intern",
    link: "https://drive.google.com/file/d/1DIE-QB58-gWAj9FHtF4tP1jNMG_2th0z/view?usp=sharing"
  }
]

export const skills = [
  {
    category: "Languages",
    icon: Code,
    items: ["C/C++", "CUDA C", "Python", "Dart", "Verilog"],
    color: "blue"
  },
  {
    category: "Frameworks & Tools",
    icon: Terminal,
    items: ["MLIR", "LLVM", "CUDA", "PyTorch", "TensorRT-LLM", "Git", "Docker"],
    color: "indigo"
  },
  {
    category: "Hardware Design",
    icon: Layers,
    items: ["Xilinx Vivado", "Cadence Virtuoso", "FPGA"],
    color: "slate"
  }
]
