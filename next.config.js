/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'github.com',
      'images.pexels.com',
      'via.placeholder.com',
      'opengraph.githubassets.com'
    ],
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  trailingSlash: true,
  // output: 'export',
  // distDir: 'out',
  basePath: '',
  assetPrefix: '',
}

module.exports = nextConfig