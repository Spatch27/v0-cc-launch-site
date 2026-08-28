/** @type {import('next').NextConfig} */
const permanentRedirects = [
  ['/outputs', '/outcomes'],
  ['/insights/building-resilient-marketing-systems', '/insights'],
  ['/insights/case-for-marketing-product-teams', '/insights'],
  ['/insights/embedded-consultancy-model', '/insights'],
  ['/insights/rethinking-marketing-velocity', '/insights'],
  ['/insights/marketing-operations-competitive-advantage', '/insights'],
  ['/insights/removing-operational-drag', '/insights'],
]

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return permanentRedirects.map(([source, destination]) => ({
      source,
      destination,
      statusCode: 301,
    }))
  },
}

export default nextConfig
