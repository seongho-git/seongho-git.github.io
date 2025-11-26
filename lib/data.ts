import { Github, Linkedin, Mail, Cpu, Zap, BookOpen, FileText, Award, Building2, Users, Target } from "lucide-react"

export const personalInfo = {
  name: "Seongho Kim",
  role: "Compiler Engineer",
  email: "seongho-kim@yonsei.ac.kr",
  github: "https://github.com/seongho-git",
  linkedin: "https://linkedin.com/in/seongho-kim",
  description: "Research Interests: Compiler Optimization for Deep Learning and Homomorphic Encryption, Large Language Model Acceleration",
  about: [
    "I'm a passionate Compiler Engineer with specialized expertise in optimization techniques for Homomorphic Encryption and Deep Learning.",
    "Currently pursuing an Integrated M.S./Ph.D in Electrical & Electronic Engineering at Yonsei University, I work as a Research Assistant at CoreLab under Prof. Hanjun Kim, focusing on compiler optimization techniques.",
    "My research interests include compiler optimization for homomorphic encryption and deep learning, with experience in MLIR, LLVM, C/C++, Python, and CUDA."
  ],
  interests: [
    {
      title: "Compiler Optimization",
      description: "MLIR, LLVM, C/C++, Python for homomorphic encryption and deep learning",
      icon: Cpu
    },
    {
      title: "Deep Learning Acceleration",
      description: "LLM optimization, CUDA, PyTorch",
      icon: Zap
    },
    {
      title: "Digital Circuit Design",
      description: "Verilog, Xilinx Vivado, Cadence Virtuoso",
      icon: BookOpen
    }
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
    title: "SNU Lab Study",
    period: "2023.12 ~ 2024.03",
    description: "Apply GQA to Llama2-7B on TensorRT-LLM",
    relatedTo: "SNU Lab Study project",
    link: "#experience"
  },
  {
    title: "Circuit and System Lab Study",
    period: "2023.01 ~ 2023.06",
    description: "Analysis of Ultra-WideBand CMOS TX & TRX Architecture",
    relatedTo: "Undergraduate Research Intern experience",
    link: "https://drive.google.com/file/d/1DIE-QB58-gWAj9FHtF4tP1jNMG_2th0z/view?usp=sharing"
  }
]

export const skills = [
  {
    category: "Computer Science",
    icon: Cpu,
    items: ["MLIR", "LLVM", "Python", "C/C++", "CUDA"],
    color: "blue"
  },
  {
    category: "Digital Circuit Design",
    icon: Zap,
    items: ["Verilog", "Xilinx Vivado", "Cadence Virtuoso"],
    color: "slate"
  }
]
