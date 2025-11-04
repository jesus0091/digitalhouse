import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ["fakestoreapi.com"],
    // alternativa estricta:
    // remotePatterns: [
    //   { protocol: "https", hostname: "fakestoreapi.com", pathname: "/img/**" },
    // ],
  },
};

export default nextConfig;
