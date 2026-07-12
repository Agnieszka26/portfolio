import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import styles from "@/assets/styles/index.module.scss";
import { abrilFatface, mulish } from "@/lib/fonts";
import { baseMetadata, createPageMetadata } from "@/lib/metadata";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    ...baseMetadata,
    ...createPageMetadata({
      title: t("homeTitle"),
      description: t("homeDescription"),
      path: `/${locale}`,
    }),
  };
}

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
