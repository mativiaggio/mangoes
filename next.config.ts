import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      "www.svgrepo.com",
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
