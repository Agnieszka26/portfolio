/** Sanity image asset as returned by GROQ with metadata.dimensions. */
export type SanityImageAsset = {
  _id: string;
  url: string;
  metadata?: {
    dimensions?: {
      width: number;
      height: number;
      aspectRatio?: number;
    };
  };
};

/** Sanity image field (hotspot enabled on project schema). */
export type SanityImage = {
  _key?: string;
  asset?: SanityImageAsset | null;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  } | null;
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  } | null;
};

/** Normalized cover for `next/image` (derived from SanityImage). */
export type RemoteCoverImage = {
  url: string;
  width: number;
  height: number;
};

/** Normalized slide for the case-study carousel. */
export type SlideImage = {
  id: string;
  url: string;
  width: number;
  height: number;
};

/**
 * Project card fields — mirrors `sanity/schemaTypes/project.ts`
 * (list / preview surface).
 */
export type Project = {
  _id: string;
  id?: string | null;
  header: string;
  paragraph?: string | null;
  tags?: string | null;
  type: string;
  language?: string | null;
  image: SanityImage;
  linkToGithub?: string | null;
  linkToLive?: string | null;
};

/**
 * Full project document including case-study fields and gallery.
 * Replaces the former Airtable `Detail` type.
 */
export type ProjectDetails = Project & {
  overview?: string | null;
  technologies?: string | null;
  backend?: string | null;
  keyFeatures?: string | null;
  challenges?: string | null;
  slides?: SanityImage[] | null;
};

/** @deprecated Prefer `ProjectDetails` — kept for gradual call-site migration. */
export type Detail = ProjectDetails;

const FALLBACK_COVER: RemoteCoverImage = {
  url: "/portfolio_images/digitalAgency.webp",
  width: 3000,
  height: 1511,
};

export function toRemoteCoverImage(
  image: SanityImage | null | undefined,
): RemoteCoverImage {
  const url = image?.asset?.url;
  if (!url) return FALLBACK_COVER;

  return {
    url,
    width: image?.asset?.metadata?.dimensions?.width ?? 1200,
    height: image?.asset?.metadata?.dimensions?.height ?? 630,
  };
}

export function toSlideImages(
  slides: SanityImage[] | null | undefined,
): SlideImage[] {
  if (!slides?.length) return [];

  return slides
    .map((slide, index) => {
      const url = slide.asset?.url;
      if (!url) return null;

      return {
        id: slide._key ?? slide.asset?._id ?? `slide-${index}`,
        url,
        width: slide.asset?.metadata?.dimensions?.width ?? 1200,
        height: slide.asset?.metadata?.dimensions?.height ?? 800,
      };
    })
    .filter((slide): slide is SlideImage => slide != null);
}

/** Route / lookup key: prefer stable `id`, else `header`. */
export function projectSlug(project: Pick<Project, "id" | "header">): string {
  return (project.id && project.id.trim()) || project.header;
}
