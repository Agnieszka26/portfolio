import { Project, RemoteCoverImage } from "@/types";
import { unstable_cache } from "next/cache";
import { base, escapeAirtableFormulaString } from "./base";
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
  getId: () => string;
  get: (field: string) => unknown;
}): Project {
  const id = record.getId();
  const header = record.get("header") as string;
  const paragraph = record.get("paragraph_en") as string;
  const tags = record.get("tags") as string;
  const linkToLive = record.get("linkToLive") as string;
  const linkToGithub = record.get("linkToGithub") as string;
  const type = record.get("type") as string;
  const paragraph_pl = record.get("paragraph_pl") as string;
  const publicUrl = record.get("publicUrl") as string | undefined;
  const imagesRaw = record.get("images");
  const image = resolveProjectImage(imagesRaw, publicUrl);

  return {
    id,
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

async function fetchProjectById(header: string): Promise<Project | null> {
  const records = await base("portfolio projects")
    .select({
      filterByFormula: `{header} = "${escapeAirtableFormulaString(header)}"`,
      maxRecords: 1,
      fields: [...PROJECT_FIELDS],
    })
    .firstPage();

  const record = records[0];
  if (!record) return null;

  return mapRecordToProject(record);
}

async function fetchProjects(): Promise<Project[]> {
  const projects: Project[] = [];
  return new Promise((resolve, reject) => {
    base("portfolio projects")
      .select({
        fields: [...PROJECT_FIELDS],
      })
      .eachPage(
        function page(records: any[], fetchNextPage: () => void) {
          records.forEach((record) => {
            projects.push(mapRecordToProject(record));
          });

          fetchNextPage();
        },
        function done(err: any) {
          if (err) return reject(err);

          return resolve(projects);
        },
      );
  });
}

const getProjectsCached = unstable_cache(fetchProjects, ["projects"], {
  revalidate: REVALIDATE_SECONDS,
  tags: ["projects"],
});

export default function getProjects(): Promise<Project[]> {
  return getProjectsCached();
}

export function getProjectById(id: string): Promise<Project | null> {
  return unstable_cache(
    () => fetchProjectById(id),
    ["project", id],
    {
      revalidate: REVALIDATE_SECONDS,
      tags: [`project-${id}`, "projects"],
    },
  )();
}
