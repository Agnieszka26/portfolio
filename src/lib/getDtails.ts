import { Detail } from "@/types";
import { unstable_cache } from "next/cache";
import { listAllRecords } from "./airtableClient";

const REVALIDATE_SECONDS = 3600;

const DETAIL_FIELDS = [
  "header",
  "overview",
  "technologies",
  "backend",
  "keyFeatures",
  "challenges",
  "slides",
] as const;

function detailsTableName(locale: string): string {
  return locale === "en" ? "projects details" : "project details pl";
}

function mapRecordToDetail(record: {
  id: string;
  fields: Record<string, unknown>;
}): Detail {
  const header = record.fields.header as string;
  const overview = record.fields.overview as string;
  const technologies = record.fields.technologies as string;
  const backend = record.fields.backend as string;
  const keyFeatures = record.fields.keyFeatures as string;
  const challenges = record.fields.challenges as string | undefined;
  const slidesRaw = record.fields.slides;
  const slides = Array.isArray(slidesRaw)
    ? slidesRaw
    : slidesRaw != null
      ? [slidesRaw]
      : undefined;

  return {
    id: record.id,
    header,
    overview,
    technologies,
    backend,
    keyFeatures,
    challenges,
    slides,
  };
}

async function fetchDetails(locale: string): Promise<Detail[]> {
  try {
    const records = await listAllRecords(detailsTableName(locale), {
      fields: DETAIL_FIELDS,
    });
    return records.map(mapRecordToDetail);
  } catch (error) {
    console.warn(
      `[getDetails] Failed to fetch details for locale "${locale}":`,
      error instanceof Error ? error.message : error,
    );
    return [];
  }
}

const getDetailsCached = unstable_cache(fetchDetails, ["details"], {
  revalidate: REVALIDATE_SECONDS,
  tags: ["details"],
});

export default function getDetails(locale: string): Promise<Detail[]> {
  return getDetailsCached(locale);
}

export async function getDetailById(
  locale: string,
  id: string,
): Promise<Detail | null> {
  const details = await getDetails(locale);
  return details.find((detail) => detail.header === id) ?? null;
}
