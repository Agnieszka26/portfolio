import type { PortableTextBlock, PortableTextValue } from "@/types/post";
import { expandHtmlCodeBlocks } from "./expandHtmlCodeBlocks";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingOutlineItem = {
  id: string;
  text: string;
  level: HeadingLevel;
  key: string;
};

const HEADING_LEVELS: Record<string, HeadingLevel> = {
  h1: 1,
  h2: 2,
  h3: 3,
  h4: 4,
  h5: 5,
  h6: 6,
};

function isPortableTextBlock(
  block: PortableTextValue[number],
): block is PortableTextBlock {
  return block._type === "block";
}

export function normalizeHeadingText(text: string): string {
  return text.replace(/\s+/g, " ").trim().toLowerCase();
}

export function slugifyHeading(text: string): string {
  const slug = normalizeHeadingText(text)
    .replace(/[^0-9a-z\u00c0-\u024f]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "section";
}

export function blockPlainText(block: PortableTextBlock): string {
  return (block.children ?? [])
    .map((child) => (typeof child.text === "string" ? child.text : ""))
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

export function buildHeadingOutline(
  blocks: PortableTextValue,
  title?: string | null,
): HeadingOutlineItem[] {
  const titleKey = title ? normalizeHeadingText(title) : "";
  const seen = new Map<string, number>();
  const items: HeadingOutlineItem[] = [];

  for (const block of blocks) {
    if (!isPortableTextBlock(block)) continue;

    const level = HEADING_LEVELS[block.style ?? ""];
    if (!level) continue;

    const text = blockPlainText(block);
    if (!text) continue;
    if (level === 1 && titleKey && normalizeHeadingText(text) === titleKey) {
      continue;
    }

    const base = slugifyHeading(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);

    items.push({
      id: count === 0 ? base : `${base}-${block._key}`,
      text,
      level,
      key: block._key,
    });
  }

  return items;
}

export function articleHeadings(
  value: PortableTextValue | null | undefined,
  title?: string | null,
): HeadingOutlineItem[] {
  if (!value?.length) return [];
  return buildHeadingOutline(expandHtmlCodeBlocks(value), title);
}
