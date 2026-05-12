// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",                  // emit static HTML to /out
  basePath: "/<REPO>",               // e.g. "/my-next-app" — no trailing slash
  images: { unoptimized: true },     // next/image needs a server otherwise
  trailingSlash: true,               // optional but plays nicer with GH Pages
};

export default nextConfig;