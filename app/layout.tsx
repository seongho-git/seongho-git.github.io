import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { personalInfo } from "@/lib/data"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const siteUrl = "https://seongho-git.github.io"
const title = `${personalInfo.name} | ${personalInfo.role}, ${personalInfo.university}`
const description = `${personalInfo.name} is a ${personalInfo.role} at the ${personalInfo.lab}, ${personalInfo.university}, working on compiler optimization for fully homomorphic encryption and deep learning.`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${personalInfo.name}`,
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: siteUrl,
    title,
    description,
    siteName: personalInfo.name,
    images: [{ url: "/profile.jpg", width: 480, height: 480, alt: personalInfo.name }],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/profile.jpg"],
  },
  robots: { index: true, follow: true },
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  url: siteUrl,
  image: `${siteUrl}/profile.jpg`,
  email: `mailto:${personalInfo.email}`,
  jobTitle: personalInfo.role,
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: personalInfo.university,
    department: personalInfo.department,
  },
  sameAs: [personalInfo.github, personalInfo.linkedin, personalInfo.scholar, personalInfo.orcid],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  )
}
