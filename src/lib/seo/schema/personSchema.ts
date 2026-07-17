import {
  PERSON,
  localizedHomeUrl,
  personImageUrl,
  personJobTitle,
  type SchemaLocale,
} from "./siteIdentity";
import { compactJsonLd } from "./utils";

export type PersonSchema = {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  alternateName?: string;
  jobTitle: string;
  url: string;
  image: string;
  email?: string;
  sameAs: string[];
};

export function buildPersonSchema(locale: SchemaLocale): PersonSchema {
  return compactJsonLd({
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON.name,
    alternateName: PERSON.alternateName,
    jobTitle: personJobTitle(locale),
    url: localizedHomeUrl(locale),
    image: personImageUrl(),
    email: PERSON.email,
    sameAs: [...PERSON.sameAs],
  }) as PersonSchema;
}

/** Nested Person reference for other schemas (no @context). */
export function buildPersonEntity(locale: SchemaLocale) {
  return compactJsonLd({
    "@type": "Person",
    name: PERSON.name,
    alternateName: PERSON.alternateName,
    jobTitle: personJobTitle(locale),
    url: localizedHomeUrl(locale),
    image: personImageUrl(),
    sameAs: [...PERSON.sameAs],
  })!;
}
