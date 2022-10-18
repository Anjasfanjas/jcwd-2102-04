/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  images: {
    domains: ['localhost', "", 'jcwd210204api.purwadhikabootcamp.com', '']
  }
}

module.exports = nextConfig
