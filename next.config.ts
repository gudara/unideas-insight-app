import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true, // Enforces strict mode for React
  productionBrowserSourceMaps: false,
  // Use the 'production' environment to enable optimizations
  env: {
    DATABASE_URL: process.env.DATABASE_URL || 'your_default_local_url_here'
  },
  compress: true,
};

export default nextConfig;
