// All homepage content. Components under components/sections render this file.

export const personalInfo = {
  name: "Seongho Kim",
  role: "Ph.D. Candidate",
  // Small uppercase label above the name.
  headline: "Compiler Engineer",
  researchInterestsLine:
    "Research Interests: Compiler Optimization for Homomorphic Encryption and Deep Learning",
  department: "School of Electrical and Electronic Engineering",
  university: "Yonsei University",
  universityUrl: "https://ee.yonsei.ac.kr/ee/",
  location: "Seoul, Republic of Korea",
  lab: "Compiler Research Laboratory (CoreLab)",
  labUrl: "https://corelab.yonsei.ac.kr/",
  advisor: "Prof. Hanjun Kim",
  email: "seongho-kim@yonsei.ac.kr",
  github: "https://github.com/seongho-git",
  linkedin: "https://www.linkedin.com/in/seongho-kim/",
  scholar: "https://scholar.google.com/citations?user=YosbfkYAAAAJ",
  orcid: "https://orcid.org/0009-0008-9306-9301",
  cv: "https://drive.google.com/file/d/15cjSGRjWUS0Wyid8og2MaLmghFh6fZoo/view?usp=sharing",
  about: [
    "I am a Ph.D. candidate in the School of Electrical and Electronic Engineering at Yonsei University, advised by Prof. Hanjun Kim at the Compiler Research Laboratory (CoreLab). I work on compiler optimization for fully homomorphic encryption (FHE) and deep learning.",
  ],
}

export type PublicationLink = { label: string; url: string }

export type Publication = {
  title: string
  authors: string
  // Short venue name shown in bold, e.g. "CGO 2026".
  venueShort?: string
  venue?: string
  date?: string
  location?: string
  // Rendered on its own line in bold red.
  note?: string
  // The first link is attached to the title; the rest are shown as separate [Label] links.
  links: PublicationLink[]
}

export const publications: { category: string; items: Publication[] }[] = [
  {
    category: "Preprints",
    items: [
      {
        title: "Ciphertext- and Polynomial-Level Optimization for Fully Homomorphic Encryption",
        authors:
          "Seongho Kim, Heelim Choi, Jaemin Kim, Seonyoung Cheon, Dongkwan Kim, Jaeho Lee, Hoyun Youm, Dongyoon Lee, Hanjun Kim, and Yongwoo Lee",
        venueShort: "arXiv",
        venue: "arXiv:2607.15750",
        date: "July 2026",
        links: [{ label: "arXiv", url: "https://arxiv.org/abs/2607.15750" }],
      },
    ],
  },
  {
    category: "Refereed Conference Papers",
    items: [
      {
        title: "Compiler-Runtime Co-operative Chain of Verification for LLM-Based Code Optimization",
        authors:
          "Hyunho Kwon, Sanggyu Shin, Ju Min Lee, Hoyun Youm, Seungbin Song, Seongho Kim, Hanwoong Jung, Seungwon Lee, and Hanjun Kim",
        venueShort: "CGO 2026",
        venue: "IEEE/ACM International Symposium on Code Generation and Optimization",
        date: "February 2026",
        location: "Sydney, Australia",
        links: [{ label: "IEEE Xplore", url: "https://ieeexplore.ieee.org/abstract/document/11395240" }],
      },
    ],
  },
  {
    category: "Refereed Journal Articles",
    items: [
      {
        title: "Survey and Evaluation of Converging Architecture in LLMs Based on Footsteps of Operations",
        authors: "Seongho Kim, Jihyun Moon, Juntaek Oh, Insu Choi, and Joon-Sung Yang",
        venueShort: "IEEE OJCS",
        venue: "IEEE Open Journal of the Computer Society, vol. 6, pp. 1214–1226",
        date: "July 2025",
        note: "IF=8.2, Q1 (JCR 2024)",
        links: [
          { label: "DOI", url: "https://doi.org/10.1109/OJCS.2025.3587005" },
          { label: "Video", url: "https://youtu.be/znFFq2Y0Fmo" },
        ],
      },
    ],
  },
  {
    category: "Posters and Student Research Competitions",
    items: [
      {
        title: "Tensor Abstraction Enabling Explicit Layout Optimization in Homomorphic Encryption",
        authors: "Seongho Kim and Hanjun Kim",
        venueShort: "CGO 2026 SRC",
        venue: "Student Research Competition, IEEE/ACM International Symposium on Code Generation and Optimization",
        date: "February 2026",
        location: "Sydney, Australia",
        links: [
          {
            label: "CGO",
            url: "https://2026.cgo.org/details/cgo-2026-student-research-competition/1/Tensor-Abstraction-Enabling-Explicit-Layout-Optimization-in-Homomorphic-Encryption",
          },
        ],
      },
    ],
  },
  {
    category: "Patents",
    items: [
      {
        title:
          "Apparatus and Method for Range Analysis-Based Bootstrapping Placement in Fully Homomorphic Encryption (KR Patent App. 10-2026-0024507)",
        authors: "Hanjun Kim, Hoyun Youm, Seonyoung Cheon, Dongkwan Kim, Sungwoo Yun, Chan Lee, Seongho Kim, Yongwoo Lee",
        links: [],
      },
    ],
  },
]

export const education = [
  {
    degree: "Ph.D. in Electrical and Electronic Engineering",
    school: "Yonsei University",
    period: "Mar 2025 – Present",
    location: "Seoul, Republic of Korea",
    details: [
      "Compiler Research Laboratory (CoreLab), advised by Prof. Hanjun Kim",
      "Full scholarship",
    ],
  },
  {
    degree: "B.S. in Electrical and Electronic Engineering",
    school: "Yonsei University",
    period: "Mar 2019 – Feb 2025",
    location: "Seoul, Republic of Korea",
    details: ["Yonsei University Semiconductor Specialist Track"],
  },
]

export const experience = [
  {
    title: "Research Assistant",
    organization: "Compiler Research Laboratory (CoreLab), Yonsei University",
    advisor: "Prof. Hanjun Kim",
    period: "Mar 2025 – Present",
    link: "https://corelab.yonsei.ac.kr/",
    bullets: [
      "Developed Recifhe, a multi-level compiler that performs ciphertext- and polynomial-level optimization for fully homomorphic encryption (arXiv 2026)",
      "Designed a tensor abstraction that enables explicit ciphertext layout optimization for RNS-CKKS homomorphic encryption (CGO 2026 SRC)",
      "Co-developed a compiler-runtime cooperative verification framework for LLM-based code optimization (CGO 2026)",
      "Designed a multiplication algorithm for fully homomorphic encryption",
    ],
  },
  {
    title: "Undergraduate Research Assistant",
    organization: "Compiler Research Laboratory (CoreLab), Yonsei University",
    advisor: "Prof. Hanjun Kim",
    period: "Jun 2024 – Feb 2025",
    link: "https://corelab.yonsei.ac.kr/",
    bullets: [
      "Profiled kernel-level execution patterns of privacy-preserving machine learning workloads",
    ],
  },
  {
    title: "Undergraduate Research Lead",
    organization: "Design and Architecture for Intelligent Systems Laboratory, Yonsei University",
    advisor: "Prof. Joon-Sung Yang",
    period: "Mar 2024 – Jun 2024",
    link: "https://doi.org/10.1109/OJCS.2025.3587005",
    bullets: [
      "Analyzed inference bottlenecks across LLM architectures through systematic kernel profiling (OJCS 2025)",
    ],
  },
  {
    title: "Undergraduate Research Intern",
    organization: "Scalable Computer Architecture Laboratory, Seoul National University",
    advisor: "Prof. Jung Ho Ahn",
    period: "Dec 2023 – Feb 2024",
    bullets: [
      "Analyzed the architecture of Llama 2 7B and identified optimization opportunities for inference acceleration",
    ],
  },
  {
    title: "Undergraduate Research Intern",
    organization: "Circuit and System Laboratory, Yonsei University",
    advisor: "Prof. Tae Wook Kim",
    period: "Jan 2023 – Jun 2023",
    bullets: ["Designed a pulse generator for an ultra-wideband (UWB) transmitter"],
  },
  {
    title: "Information Systems Officer (Mandatory Military Service)",
    organization: "Headquarters, Republic of Korea Air Force",
    period: "Oct 2020 – Jul 2022",
    bullets: [],
  },
]

export const projects = [
  {
    title: "Edge LLM Inference Acceleration",
    period: "Jul 2024 – Oct 2024",
    affiliation: "SAIT Samsung Computer Engineering Challenge 2024 · Compiler Research Laboratory (CoreLab), Yonsei University",
    link: "https://github.com/seongho-git/continuous_batching_optimization",
    linkLabel: "GitHub",
    bullets: [
      "Dynamic batching optimization framework for Microsoft Phi-3 on NVIDIA Jetson Orin (32 GB)",
      "Ranked 7th of 47 teams",
      "Architectural insights from the LLM bottleneck analysis (IEEE OJCS 2025)",
    ],
  },
  {
    title: "Small Language Model Inference Acceleration",
    period: "Feb 2024 – Jun 2024",
    affiliation: "Backdrop Build V3 and V4, Backdrop Labs · Invited Project Builder",
    link: "https://github.com/seongho-git/lab_TensorRT-LLM",
    linkLabel: "GitHub",
    bullets: [
      "Inference acceleration of Gemma 2B (Google DeepMind) with TensorRT-LLM",
    ],
  },
]

export const honors = [
  {
    title: "Emerging Engineering Researcher",
    organization: "Institute for the Promotion of Engineering and Science in Korea (IPESK)",
    date: "Sep 2026",
  },
  {
    title: "Bronze Prize, 32nd Samsung Humantech Paper Award",
    organization: "Samsung Electronics",
    date: "Feb 2026",
    detail:
      "Compiler-Runtime Co-operative Chain of Verification for LLM-Based Code Optimization. Hyunho Kwon, Ju Min Lee, Hoyun Youm, and Seongho Kim.",
    link: "https://humantech.samsung.com/notice/detail/AZ44sBHrBxgMG6t3",
    linkLabel: "Humantech",
  },
  {
    title: "Emerging Engineer",
    organization: "Institute for the Promotion of Engineering and Science in Korea (IPESK)",
    date: "Dec 2024",
  },
]

export const service = [
  {
    role: "Session Volunteer",
    event: "58th IEEE/ACM International Symposium on Microarchitecture (MICRO 2025)",
    location: "Seoul, Republic of Korea",
    date: "Oct 2025",
    link: "https://microarch.org/micro58/",
  },
]
