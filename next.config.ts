import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.urbancompany.com",
      },
      {
        protocol: "https",
        hostname: "cleanfanatics.com",
      },
      {
        protocol: "https",
        hostname: "www.urbanpartner.in",
      },
    ],
  },
};

export default nextConfig;
