const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    localeDetection: false,
    defaultLocale: 'en',
    locales: ['en', 'pl',],
  },
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
