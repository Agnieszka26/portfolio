import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import styles from "@/assets/styles/index.module.scss";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export default  function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // const { locale } = await params;
  // if (!hasLocale(routing.locales, locale)) {
  //   // notFound();
  // }
console.log("params", params);
  return (
    <html style={{ scrollBehavior: "smooth" }} lang={'en'}>
      <head />

      <body className={styles.body}>
        {/* <NextIntlClientProvider> */}
          <Navbar />
          <main>{children}</main>
          <Footer />
        {/* </NextIntlClientProvider> */}
      </body>
    </html>
  );
}
