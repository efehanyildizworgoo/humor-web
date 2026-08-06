import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      // Uploads go through a Server Action; the default 1 MB body limit made
      // every image over 1 MB throw (413) and crash the admin page, even
      // though the UI promises 10 MB. Keep this above MAX_UPLOAD_BYTES so the
      // app's own size check is the one that reports the error.
      bodySizeLimit: "12mb",
    },
  },
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
