import {
  buildProjectDescription,
  stripMarkdown,
} from "@/lib/metadata";
import type { ProjectDetails } from "@/types/project";
import { projectSlug, toRemoteCoverImage } from "@/types/project";
import { buildPersonEntity } from "./personSchema";
import { type SchemaLocale } from "./siteIdentity";
import { absoluteUrl, compactJsonLd } from "./utils";

export type CreativeWorkSchema = {
  "@context": "https://schema.org";
  "@type": "CreativeWork";
  name: string;
  description?: string;
  url: string;
  image?: string;
  creator: ReturnType<typeof buildPersonEntity>;
  keywords?: string | string[];
  inLanguage?: string;
  codeRepository?: string;
};

function extractKeywords(project: ProjectDetails): string[] {
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

type BuildProjectSchemaOptions = {
  project: ProjectDetails;
  locale: SchemaLocale;
  slug?: string;
  fallbackDescription: string;
};

export function buildCreativeWorkSchema({
  project,
  locale,
  slug,
  fallbackDescription,
}: BuildProjectSchemaOptions): CreativeWorkSchema {
  const projectId = slug ?? projectSlug(project);
  const pageUrl = absoluteUrl(`/${locale}/projects/${projectId}`);
  const description = buildProjectDescription(
    project,
    fallbackDescription,
    locale,
  );
  const keywords = extractKeywords(project);
  const coverUrl = project.image?.asset?.url
    ? toRemoteCoverImage(project.image).url
    : undefined;
  // Only emit absolute image URLs (Sanity CDN); skip local fallbacks.
  const image =
    coverUrl && /^https?:\/\//i.test(coverUrl) ? coverUrl : undefined;

  return compactJsonLd({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.header,
    description,
    url: pageUrl,
    image,
    creator: buildPersonEntity(locale),
    keywords: keywords.length ? keywords : undefined,
    inLanguage: locale.startsWith("pl") ? "pl-PL" : "en-US",
    codeRepository: project.linkToGithub ?? undefined,
  }) as CreativeWorkSchema;
}
