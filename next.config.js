/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');
// const { i18n } = require('./next-i18next.config.js');

const withNextIntl = createNextIntlPlugin("./src/i18n/request.tsx");
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "khkeguistlgztrrbfozt.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/portfolio/**",
      },
      {
        protocol: "https",
        hostname: "**.airtableusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dl.airtable.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
module.exports = withNextIntl(nextConfig);
// const withNextIntl = createNextIntlPlugin();
// export default withNextIntl(nextConfig);
