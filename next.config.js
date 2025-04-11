/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "khkeguistlgztrrbfozt.supabase.co",
        port: "",
        pathname: "/storage/v1/object/sign/portfolio/**",
      },
    ],
  },
};

module.exports = nextConfig;
