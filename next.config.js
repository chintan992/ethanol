/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.anilist.co',
        pathname: '/file/anilistcdn/**',
      },
    ],
  },
}

module.exports = nextConfig
