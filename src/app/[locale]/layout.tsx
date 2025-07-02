import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import styles from "@/assets/styles/index.module.scss";
import {  NextIntlClientProvider } from "next-intl";

export default async function RootLayout(
 { children, params: { locale } }: {children: React.ReactNode; params: { locale: string } }) {
  console.log(" RootLayout locale", locale);
  return (
    <html style={{ scrollBehavior: "smooth" }} lang={locale}>
      <head />

      <body className={styles.body}>
        <NextIntlClientProvider 
        // messages={await import(`../../../messages/${locale}.json`)}
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
