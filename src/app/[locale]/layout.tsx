import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import styles from "@/assets/styles/index.module.scss";
import { abrilFatface, mulish } from "@/lib/fonts";
import { baseMetadata } from "@/lib/metadata";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}


export const metadata = baseMetadata;

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html className={styles.html} lang={locale}>
      <body
        className={`${styles.body} ${mulish.variable} ${abrilFatface.variable}`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
