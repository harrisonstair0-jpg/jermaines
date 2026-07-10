import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.GITHUB_PAGES === "true"
    ? {
        output: "export",
        basePath: "/jermaines",
        assetPrefix: "/jermaines/",
      }
    : {}),
};

export default nextConfig;
