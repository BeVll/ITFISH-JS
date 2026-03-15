import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "picsum.photos",
      "steamcdn-a.akamaihd.net",
      "upload.wikimedia.org",
    ],
  },
};

export default nextConfig;
