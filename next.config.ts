import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hdnpkmnrnfkiuadpbeac.supabase.co",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "3mb",
    }
  },
};

export default nextConfig;
