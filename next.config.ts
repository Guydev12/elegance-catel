import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "veutdehnfcuzkkazbwzi.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/media/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
