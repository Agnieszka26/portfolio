import {
  PERSON,
  SITE_NAME,
  localizedHomeUrl,
  type SchemaLocale,
} from "./siteIdentity";
import { compactJsonLd } from "./utils";

export type WebSiteSchema = {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  inLanguage?: string;
  publisher?: {
    "@type": "Person";
    name: string;
  };
};

export function buildWebsiteSchema(locale: SchemaLocale): WebSiteSchema {
  return compactJsonLd({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: localizedHomeUrl(locale),
    inLanguage: locale.startsWith("pl") ? "pl-PL" : "en-US",
    publisher: {
      "@type": "Person",
      name: PERSON.name,
    },
  }) as WebSiteSchema;
}
