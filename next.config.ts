import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "cdn.dribbble.com",
      "uploadthing.com",
      "utfs.io",
      "img.clerk.com",
      "subdomain",
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
