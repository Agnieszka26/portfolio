import { toJsonLdScript } from "@/lib/seo/schema";

type JsonLdProps = {
  /** Any JSON-serializable schema.org object (or array / @graph). */
  data: object;
};

/**
 * Server-friendly JSON-LD script tag.
 * Safe in RSC trees — no client hydration of the payload.
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: toJsonLdScript(data),
      }}
    />
  );
}
