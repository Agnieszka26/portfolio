import { SITE_URL } from "@/lib/metadata";

/** Absolute URL matching `trailingSlash: true` in next.config.js */
export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${normalized.replace(/\/+$/, "")}/`;
}

/**
 * Recursively drop `null`, `undefined`, empty strings, and empty arrays
 * so JSON-LD never emits invalid empty properties.
 */
export function compactJsonLd<T>(value: T): T | undefined {
  if (value == null) return undefined;
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length ? (trimmed as T) : undefined;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return value;
  }
  if (Array.isArray(value)) {
    const items = value
      .map((item) => compactJsonLd(item))
      .filter((item): item is NonNullable<typeof item> => item != null);
    return items.length ? (items as T) : undefined;
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .map(([key, nested]) => [key, compactJsonLd(nested)] as const)
      .filter(([, nested]) => nested != null);

    if (!entries.length) return undefined;
    return Object.fromEntries(entries) as T;
  }
  return undefined;
}

export function toJsonLdScript(data: object): string {
  const compacted = compactJsonLd(data);
  return JSON.stringify(compacted ?? {});
}
