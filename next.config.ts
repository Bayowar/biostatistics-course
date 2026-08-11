import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/biostatistics-course",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
