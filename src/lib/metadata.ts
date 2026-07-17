import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import type { ProjectDetails } from "@/types/project";

/** Canonical production origin (no trailing slash). Prefers env over hardcoded fallback. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "https://www.agna.website"
).replace(/\/+$/, "");

export const SITE_NAME = "AGNA Portfolio";

export const baseMetadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
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
  const localizedPath = path.replace(
    new RegExp(`^/(${routing.locales.join("|")})`),
    "",
  );
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: Object.fromEntries(
        routing.locales.map((locale) => [
          locale,
          `${SITE_URL}/${locale}${localizedPath}`,
        ]),
      ),
    },
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

export function stripMarkdown(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^[>*+-]\s+/gm, "")
    .replace(/[*_~|]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateDescription(text: string, maxLength = 160): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;

  const sliced = normalized.slice(0, maxLength - 1);
  const lastSpace = sliced.lastIndexOf(" ");
  const cut =
    lastSpace > Math.floor(maxLength * 0.6) ? sliced.slice(0, lastSpace) : sliced;

  return `${cut.trimEnd()}…`;
}

function formatTechList(techs: string[], locale?: string): string {
  const conjunction = locale?.startsWith("pl") ? "i" : "and";
  if (techs.length === 1) return techs[0];
  if (techs.length === 2) return `${techs[0]} ${conjunction} ${techs[1]}`;
  return `${techs.slice(0, -1).join(", ")}, ${conjunction} ${techs[techs.length - 1]}`;
}

function extractTechnologies(project: ProjectDetails): string[] {
  const fromTags = (project.tags ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (fromTags.length) return fromTags;

  const fromField = stripMarkdown(project.technologies ?? "");
  if (!fromField) return [];

  return fromField
    .split(/[,•\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

/** Build a locale-aware meta description from project case-study fields. */
export function buildProjectDescription(
  project: ProjectDetails,
  fallback: string,
  locale = "en",
): string {
  const summary =
    stripMarkdown(project.paragraph ?? "") ||
    stripMarkdown(project.overview ?? "");
  const techs = extractTechnologies(project);
  const builtWith =
    locale.startsWith("pl") ? "Zbudowany z użyciem" : "Built with";
  const caseStudyPhrase = locale.startsWith("pl")
    ? `${project.header} to case study frontendowe stworzone z użyciem`
    : `${project.header} is a frontend case study built with`;

  if (summary && techs.length) {
    const alreadyMentionsTech = techs.some((tech) =>
      summary.toLowerCase().includes(tech.toLowerCase()),
    );
    if (alreadyMentionsTech) return truncateDescription(summary);

    const withTech = `${summary.replace(/\.$/, "")}. ${builtWith} ${formatTechList(techs, locale)}.`;
    return truncateDescription(withTech);
  }

  if (summary) return truncateDescription(summary);

  if (techs.length) {
    return truncateDescription(
      `${caseStudyPhrase} ${formatTechList(techs, locale)}.`,
    );
  }

  return truncateDescription(fallback);
}
