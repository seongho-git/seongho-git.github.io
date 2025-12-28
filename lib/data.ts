import { Github, Linkedin, Mail, Cpu, Zap, BookOpen, FileText, Award, Building2, Users, Target, Code, Terminal, Layers, Trophy, Heart } from "lucide-react"

export const personalInfo = {
  name: "Seongho Kim",
  role: "Compiler Engineer",
  email: "seongho-kim@yonsei.ac.kr",
  github: "https://github.com/seongho-git",
  linkedin: "https://linkedin.com/in/seongho-kim",
  scholar: "https://scholar.google.com/citations?user=YosbfkYAAAAJ",
  description: "Research Interests: Compiler Optimization for Deep Learning and Homomorphic Encryption, Large Language Model Acceleration",
  about: [
    "I am a Ph.D. student in the Department of Electrical and Electronic Engineering at Yonsei University, advised by Prof. Hanjun Kim at CoreLab. My research focuses on analyzing computational characteristics of ML applications and exploring various acceleration possibilities through compiler optimization.",
    "My work centers on understanding the operational footprints of emerging computing paradigms—particularly Deep Learning and Homomorphic Encryption—and implementing optimizations across the entire software stack. I aim to bridge the gap between algorithmic demands and hardware capabilities through systematic analysis and compiler-driven acceleration.",
    "I am passionate about exploring diverse acceleration opportunities by profiling kernel-level execution patterns, identifying bottlenecks, and developing optimization techniques. My technical expertise spans Compiler Optimization (MLIR, LLVM), AI Acceleration (LLM kernels, CUDA), and Privacy-Preserving Computing (Homomorphic Encryption)."
  ]
}

export const firstAuthorPublications = [
  {
    title: "Survey and Evaluation of Converging Architecture in LLMs Based on Footsteps of Operations",
    journal: "IEEE Open Journal of the Computer Society, July 2025",
    badges: ["IF=8.2, Q1 (JCR 2024)"],
    link: "https://doi.org/10.1109/OJCS.2025.3587005",
    authors: "Seongho Kim, Jihyun Moon, Juntaek Oh, Insu Choi, and Joon-Sung Yang"
  }
]

export const coAuthorPublications = [
  {
    title: "Compiler-Runtime Co-operative Chain of Verification for LLM-Based Code Optimization",
    journal: "Proceedings of the 2026 International Symposium on Code Generation and Optimization (CGO), January 2026",
    badges: ["To Appear"],
    link: "#",
    authors: "Hyunho Kwon, Sanggyu Shin, Ju Min Lee, Hoyun Youm, Seungbin Song, Seongho Kim, Hanwoong Jung, Seungwon Lee, and Hanjun Kim"
  }
]

export const experience = [
  {
    title: "Research Assistant",
    company: "Compiler Research Laboratory (CoreLab), Yonsei University",
    advisor: "Prof. Hanjun Kim",
    period: "2025.03 - Present",
    description: [
      "Designed multiplication algorithm for fully homomorphic encryption",
      "LLM-based compiler optimization framework with runtime verification (CGO'26)"
    ],
    link: "https://corelab.yonsei.ac.kr/",
    technologies: [],
    color: "blue"
  },
  {
    title: "Undergraduate Research Assistant",
    company: "Compiler Research Laboratory (CoreLab), Yonsei University",
    advisor: "Prof. Hanjun Kim",
    period: "2024.06 - 2025.02",
    description: [
      "Profiled kernel-level execution patterns in privacy-preserving machine learning workloads"
    ],
    link: "https://corelab.yonsei.ac.kr/",
    technologies: [],
    color: "blue"
  },
  {
    title: "Undergraduate Research Lead",
    company: "Design and Architecture for Intelligent Systems Laboratory, Yonsei University",
    advisor: "Prof. Joon-Sung Yang",
    period: "2024.02 - 2024.06",
    description: [
      "Analyzed inference bottlenecks across LLM architectures through systematic kernel profiling (OJCS'25)"
    ],
    link: "https://doi.org/10.1109/OJCS.2025.3587005",
    technologies: [],
    color: "slate"
  },
  {
    title: "Undergraduate Research Intern",
    company: "Scalable Computer Architecture Laboratory, Seoul National University",
    advisor: "Prof. Jung-Ho Ahn",
    period: "2023.12 - 2024.02",
    description: [
      "Performed architectural analysis of Llama2-7B and identified optimization opportunities for inference acceleration"
    ],
    technologies: [],
    color: "blue"
  },
  {
    title: "Undergraduate Research Intern",
    company: "Circuit and System Laboratory, Yonsei University",
    advisor: "Prof. Tae Wook Kim",
    period: "2023.01 - 2023.06",
    description: [
      "Designed pulse generator for Ultra-WideBand transmitter"
    ],
    technologies: [],
    color: "indigo"
  },
  {
    title: "Information Systems Officer",
    company: "Headquarters of ROK Air Force, Republic of Korea",
    period: "2020.10 - 2022.07",
    description: [
      "Mandatory Military Service"
    ],
    technologies: [],
    color: "slate"
  }
]

export const projects = [
  {
    title: "LLM Optimization Competition Project",
    period: "2024.07 - 2024.10",
    relatedExperience: "Undergraduate Research Assistant at CoreLab, Yonsei University",
    link: "https://github.com/seongho-git/continuous_batching_optimization.git",
    description: [
      "Developed dynamic batching optimization for Microsoft Phi-3 on NVIDIA Jetson Orin (32GB)",
      "Ranked 7th among 47 teams in edge-deployed large language model inference acceleration",
      "Leveraged architectural insights from systematic LLM bottleneck analysis (OJCS'25)"
    ],
    color: "slate"
  },
  {
    title: "LLM Architecture Bottleneck Analysis",
    period: "2024.02 - 2024.06",
    relatedExperience: "Undergraduate Research Lead at Design and Architecture for Intelligent Systems Laboratory, Yonsei University",
    link: "https://youtu.be/znFFq2Y0Fmo",
    color: "slate"
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

export const recognition = [
  {
    title: "Emerging Engineer",
    organization: "Institute for the Promotion of Engineering and Science in Korea (IPESK)",
    date: "December 2024",
    description: "Recognized as an emerging engineer for outstanding research contributions in compiler optimization and ML acceleration.",
    color: "blue"
  }
]

export const activities = [
  {
    category: "International Conference Volunteer",
    items: [
      {
        title: "Session Volunteer",
        event: "International Symposium on Microarchitecture (MICRO)",
        location: "Seoul, Republic of Korea",
        date: "November 2025",
        description: "Volunteered as a session assistant at MICRO 2025, supporting conference operations and attendee engagement.",
        link: "https://microarch.org/micro58/",
        color: "indigo"
      }
    ]
  }
]
