import type { Metadata } from "next";

export const SITE_URL = "https://portfolio-agnieszka26.vercel.app";
export const SITE_NAME = "AGNA Portfolio";

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  twitterImage?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = "/og_image.webp",
  twitterImage = "/twitter_image.webp",
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [twitterImage],
    },
  };
}

export function truncateDescription(text: string, maxLength = 160): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
}
