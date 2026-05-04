import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/**',
      },
    ],
  },
  
  // Force trailing slashes on all URLs
  trailingSlash: true,

  // Redirects for edge cases
  async redirects() {
    return [
      // Redirect index.html variations to root
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index.htm',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Security and caching headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      // Cache static assets for 1 year (immutable)
      {
        source: '/(.*)\\.(jpg|jpeg|png|gif|svg|webp|ico|woff|woff2|ttf|eot|css|js)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache HTML pages for 1 hour with stale-while-revalidate
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
