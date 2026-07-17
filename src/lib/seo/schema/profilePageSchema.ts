import {
  PERSON,
  SITE_NAME,
  localizedHomeUrl,
  type SchemaLocale,
} from "./siteIdentity";
import { compactJsonLd } from "./utils";

export type ProfilePageSchema = {
  "@context": "https://schema.org";
  "@type": "ProfilePage";
  name?: string;
  url: string;
  mainEntity: {
    "@type": "Person";
    name: string;
    url?: string;
  };
};

export function buildProfilePageSchema(locale: SchemaLocale): ProfilePageSchema {
  return compactJsonLd({
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: SITE_NAME,
    url: localizedHomeUrl(locale),
    mainEntity: {
      "@type": "Person",
      name: PERSON.name,
      url: localizedHomeUrl(locale),
    },
  }) as ProfilePageSchema;
}
