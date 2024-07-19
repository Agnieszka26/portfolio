/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "v5.airtableusercontent.com",
        port: "",
        pathname: "/v3/**",
      },
    ],
  },
};

module.exports = nextConfig;
