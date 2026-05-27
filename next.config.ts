import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  output: "standalone",
  // Pin trace root to the project so standalone layout is flat
  // (.next/standalone/node_modules/...) and not nested under absolute paths.
  outputFileTracingRoot: path.join(__dirname),
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // Ensure pg + native dialect are present in the standalone bundle so
  // scripts/migrate-prod.cjs can require('pg') at container start.
  outputFileTracingIncludes: {
    "/*": ["./node_modules/pg/**/*", "./node_modules/pg-*/**/*", "./node_modules/postgres-*/**/*"],
  },
};

export default nextConfig;
