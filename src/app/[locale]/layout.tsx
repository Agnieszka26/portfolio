import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import styles from "@/assets/styles/index.module.scss";
import { abrilFatface, mulish } from "@/lib/fonts";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}


export const metadata = {
  title: "AGNA - Front-end Developer | Portfolio",
  description:
    "Portfolio Agnieszka Mędrek - front-end developer, Next.js, React, UI/UX. Zobacz moje projekty, umiejętności i kontakt.",
  metadataBase: new URL("https://portfolio-agnieszka26.vercel.app"),
  openGraph: {
    title: "Agnieszka Mędrek - Front-end Developer",
    description: "Przegląd projektów i umiejętności Agnieszki - specjalistki React i Next.js",
    url: "https://portfolio-agnieszka26.vercel.app",
    siteName: "AGNA Portfolio",
    images: [
      {
        url: "/og_image.webp",
        width: 1200,
        height: 630,
        alt: "AGNA - Front-end Developer Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agnieszka Mędrek- Front-end Developer",
    description: "Portfolio: projekty React, Next.js, UI/UX",
    images: ["/twitter_image.webp"],
  },
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
};

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
