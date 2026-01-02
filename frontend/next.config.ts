import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/:path*`,
      },
    ];
  },
  images: {
    domains: [
      "plus.unsplash.com",
      "images.unsplash.com",
      "i.ibb.co.com",
      "alkyempxxabgqatxqoqi.supabase.co",
    ],
  },
};

export default nextConfig;
