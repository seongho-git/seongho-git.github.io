/** @type {import('next').NextConfig} */

// Computed once at build time and inlined into both server and client bundles
// via `env`, so the footer renders the same string on both sides.
const buildDate = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Seoul",
})

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '',
  assetPrefix: '',
  env: {
    NEXT_PUBLIC_BUILD_DATE: buildDate,
    NEXT_PUBLIC_BUILD_YEAR: String(new Date().getFullYear()),
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
