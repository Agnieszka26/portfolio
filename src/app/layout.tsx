import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import styles from "@/assets/styles/index.module.scss";
import { getLocale, getMessages } from "next-intl/server";
import { redirect } from "@/i18n/navigation";

import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
// import { notFound } from "next/navigation";
// import { routing } from "@/i18n/routing";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const l = await getLocale();
  const messages = await getMessages();
const p =  await params;
const {locale} = await params;
 
  return (
    <html style={{ scrollBehavior: "smooth" }} lang={l}>
      <head />

      <body className={styles.body}>
        <NextIntlClientProvider  messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
