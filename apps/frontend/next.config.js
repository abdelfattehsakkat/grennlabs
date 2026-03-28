/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Optimisations Green IT : limiter les builds inutiles
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },
};

module.exports = nextConfig;
