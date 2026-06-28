import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: undefined,
  serverExternalPackages: ["@prisma/client"],
};

export default nextConfig;