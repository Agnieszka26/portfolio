/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');
// const { i18n } = require('./next-i18next.config.js');

const withNextIntl = createNextIntlPlugin("./src/i18n/request.tsx");
const nextConfig = {
  trailingSlash: true,
  transpilePackages: ['next-sanity', 'sanity', '@sanity/vision'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "khkeguistlgztrrbfozt.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/portfolio/**",
      },
    ],
  },
};
module.exports = withNextIntl(nextConfig);
// const withNextIntl = createNextIntlPlugin();
// export default withNextIntl(nextConfig);
