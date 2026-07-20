import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["ui-avatars.com", "cloudinary.com"],
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
