import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure Turbopack treats this folder as the root (multiple lockfiles detected)
  turbopack: {
    // __dirname resolves to the current config directory
    root: __dirname,
  },
};

export default nextConfig;
