/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');
const { i18n } = require('./next-i18next.config.js');
const withNextIntl = createNextIntlPlugin();
const nextConfig = {
  i18n,
  trailingSlash: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
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
