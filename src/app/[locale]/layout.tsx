import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import styles from "@/assets/styles/index.module.scss";
import {  NextIntlClientProvider } from "next-intl";
import { Analytics } from '@vercel/analytics/next';
import Head from "./head";

export default async function RootLayout(
 { children, params: { locale } }: {children: React.ReactNode; params: { locale: string } }) {
  return (
    <html style={{ scrollBehavior: "smooth" }} lang={locale}>
      <Head />

      <body className={styles.body}>
        <NextIntlClientProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
