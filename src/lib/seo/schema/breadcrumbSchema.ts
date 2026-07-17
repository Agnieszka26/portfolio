import {
  localizedHomeUrl,
  localizedProjectsUrl,
  type SchemaLocale,
} from "./siteIdentity";
import { absoluteUrl, compactJsonLd } from "./utils";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type BreadcrumbListSchema = {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
};

const LABELS = {
  home: { en: "Home", pl: "Strona główna" },
  projects: { en: "Projects", pl: "Projekty" },
} as const;

function label(
  key: keyof typeof LABELS,
  locale: SchemaLocale,
): string {
  return locale.startsWith("pl") ? LABELS[key].pl : LABELS[key].en;
}

type BuildProjectBreadcrumbOptions = {
  locale: SchemaLocale;
  projectName: string;
  projectSlug: string;
};

export function buildProjectBreadcrumbSchema({
  locale,
  projectName,
  projectSlug,
}: BuildProjectBreadcrumbOptions): BreadcrumbListSchema {
  const items: BreadcrumbItem[] = [
    { name: label("home", locale), path: localizedHomeUrl(locale) },
    { name: label("projects", locale), path: localizedProjectsUrl(locale) },
    {
      name: projectName,
      path: absoluteUrl(`/${locale}/projects/${projectSlug}`),
    },
  ];

  return compactJsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path,
    })),
  }) as BreadcrumbListSchema;
}
