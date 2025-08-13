const withPWA = require("next-pwa");
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  ...withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  }),
  reactStrictMode: false,
  // Bundle optimization settings
  experimental: {
    // Optimize package imports for better tree shaking
    optimizePackageImports: ['lucide-react', '@neondatabase/serverless']
  }
};

module.exports = withBundleAnalyzer(nextConfig);