import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    // Set root to the parent workspace folder dynamically
    root: path.resolve(__dirname, ".."),
  },
};

export default nextConfig;
