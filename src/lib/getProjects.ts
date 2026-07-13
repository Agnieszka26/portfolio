import { Project, RemoteCoverImage } from "@/types";
import { unstable_cache } from "next/cache";
import { listAllRecords } from "./airtableClient";
import { remoteCoverFromField } from "./airtableAttachment";

const REVALIDATE_SECONDS = 3600;

const PORTFOLIO_IMAGES_BASE = "/portfolio_images";

function localCover(
  filename: string,
  width: number,
  height: number,
): RemoteCoverImage {
  return {
    url: `${PORTFOLIO_IMAGES_BASE}/${filename}.webp`,
    width,
    height,
  };
}

const FALLBACK_COVER = localCover("digitalAgency", 3000, 1511);

/** Legacy: map `publicUrl` text to public assets when the `images` attachment is empty. */
const imageMap: Record<string, RemoteCoverImage> = {
  digitalAgency: localCover("digitalAgency", 3000, 1511),
  expenceCalculator: localCover("expenceCalculator", 3000, 1511),
  kettlo: localCover("kettlo", 3000, 1629),
  smartwear: localCover("smartwear", 3000, 1629),
  trudly: localCover("trudly", 3000, 1629),
  trudlyMini: localCover("trudly_mini", 3000, 1629),
  mailingSystem: localCover("mailingSystem", 3000, 1511),
  "mailingSystem.": localCover("mailingSystem", 3000, 1511),
  pokedex: localCover("pokedex", 3000, 1511),
  sailormerry: localCover("sailormerry", 3000, 1511),
  userApp: localCover("userApp", 3000, 1511),
};

function resolveProjectImage(
  imagesRaw: unknown,
  publicUrl: string | undefined,
): RemoteCoverImage {
  const fromAirtable = remoteCoverFromField(imagesRaw);
  if (fromAirtable) return fromAirtable;

  const legacyKey = typeof publicUrl === "string" ? publicUrl : undefined;
  if (legacyKey && imageMap[legacyKey]) {
    return imageMap[legacyKey];
  }

  return FALLBACK_COVER;
}

const PROJECT_FIELDS = [
  "header",
  "paragraph_en",
  "tags",
  "linkToLive",
  "linkToGithub",
  "type",
  "publicUrl",
  "paragraph_pl",
  "images",
] as const;

function mapRecordToProject(record: {
  id: string;
  fields: Record<string, unknown>;
}): Project {
  const header = record.fields.header as string;
  const paragraph = record.fields.paragraph_en as string;
  const tags = record.fields.tags as string;
  const linkToLive = record.fields.linkToLive as string;
  const linkToGithub = record.fields.linkToGithub as string;
  const type = record.fields.type as string;
  const paragraph_pl = record.fields.paragraph_pl as string;
  const publicUrl = record.fields.publicUrl as string | undefined;
  const imagesRaw = record.fields.images;
  const image = resolveProjectImage(imagesRaw, publicUrl);

  return {
    id: record.id,
    header,
    paragraph,
    tags,
    linkToLive,
    image,
    linkToGithub,
    type,
    paragraph_pl,
  };
}

async function fetchProjects(): Promise<Project[]> {
  try {
    const records = await listAllRecords("portfolio projects", {
      fields: PROJECT_FIELDS,
    });
    return records.map(mapRecordToProject);
  } catch (error) {
    console.warn(
      "[getProjects] Failed to fetch projects:",
      error instanceof Error ? error.message : error,
    );
    return [];
  }
}

const getProjectsCached = unstable_cache(fetchProjects, ["projects"], {
  revalidate: REVALIDATE_SECONDS,
  tags: ["projects"],
});

export default function getProjects(): Promise<Project[]> {
  return getProjectsCached();
}

export async function getProjectById(id: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((project) => project.header === id) ?? null;
}
