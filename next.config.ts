import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ac.goit.global",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/notes/filter/:slug",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=300, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
