import { Project, RemoteCoverImage } from "@/types";
import { base } from "./base";
import { remoteCoverFromField } from "./airtableAttachment";

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

export default function getProjects(): Promise<Project[]> {
  const projects: Project[] = [];
  return new Promise((resolve, reject) => {
    base("portfolio projects")
      .select({
        fields: [
          "header",
          "paragraph_en",
          "tags",
          "linkToLive",
          "linkToGithub",
          "type",
          "publicUrl",
          "paragraph_pl",
          "images",
        ],
      })
      .eachPage(
        function page(records: any[], fetchNextPage: () => void) {
          records.forEach((record) => {
            const id = record.getId();
            const header = record.get("header");
            const paragraph = record.get("paragraph_en");
            const tags = record.get("tags");
            const linkToLive = record.get("linkToLive");
            const linkToGithub = record.get("linkToGithub");
            const type = record.get("type");
            const paragraph_pl = record.get("paragraph_pl");
            const publicUrl = record.get("publicUrl");
            const imagesRaw = record.get("images");
            const image = resolveProjectImage(imagesRaw, publicUrl);

            projects.push({
              id,
              header,
              paragraph,
              tags,
              linkToLive,
              image,
              linkToGithub,
              type,
              paragraph_pl,
            });
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
