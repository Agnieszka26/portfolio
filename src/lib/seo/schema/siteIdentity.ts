import { SITE_NAME, SITE_URL } from "@/lib/metadata";
import { absoluteUrl } from "./utils";

/** Portfolio owner identity used across Person / CreativeWork schemas. */
export const PERSON = {
  name: "Agnieszka Mędrek",
  alternateName: "AGNA",
  jobTitle: {
    en: "Frontend Developer",
    pl: "Frontend Developer",
  },
  email: "agna.medrek@gmail.com",
  imagePath: "/og_image.webp",
  sameAs: [
    "https://github.com/Agnieszka26",
    "https://www.linkedin.com/in/agnieszka-m%C4%99drek/",
  ],
} as const;

export type SchemaLocale = "en" | "pl" | string;

export function personJobTitle(locale: SchemaLocale): string {
  return locale.startsWith("pl") ? PERSON.jobTitle.pl : PERSON.jobTitle.en;
}

export function personImageUrl(): string {
  return `${SITE_URL}${PERSON.imagePath}`;
}

export function localizedHomeUrl(locale: SchemaLocale): string {
  return absoluteUrl(`/${locale}`);
}

export function localizedProjectsUrl(locale: SchemaLocale): string {
  return absoluteUrl(`/${locale}/projects`);
}

export { SITE_NAME, SITE_URL };
