import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import styles from "@/assets/styles/index.module.scss";
import {  NextIntlClientProvider } from "next-intl";

export default async function RootLayout(
 { children, params: { locale } }: {children: React.ReactNode; params: { locale: string } }) {
  return (
    <html style={{ scrollBehavior: "smooth" }} lang={locale}>
      <head />

      <body className={styles.body}>
        <NextIntlClientProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
