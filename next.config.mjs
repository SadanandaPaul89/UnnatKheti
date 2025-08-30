import next from 'next'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // works with Leaflet and external images
  },
  devIndicators: false,
  reactStrictMode: false,
  output: 'standalone', // ensures serverless deploy compatibility
}

export default nextConfig
