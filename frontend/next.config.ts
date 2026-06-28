import type { NextConfig } from "next";
import path from "path/win32";

const nextConfig: NextConfig = {
  output: undefined,
  outputFileTracingRoot: process.cwd(),
  serverExternalPackages: ["@prisma/client"],
};

export default nextConfig;