import { Detail } from "@/types";
import { unstable_cache } from "next/cache";
import { base, escapeAirtableFormulaString } from "./base";

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
  getId: () => string;
  get: (field: string) => unknown;
}): Detail {
  const id = record.getId();
  const header = record.get("header") as string;
  const overview = record.get("overview") as string;
  const technologies = record.get("technologies") as string;
  const backend = record.get("backend") as string;
  const keyFeatures = record.get("keyFeatures") as string;
  const challenges = record.get("challenges") as string | undefined;
  const slidesRaw = record.get("slides");
  const slides = Array.isArray(slidesRaw)
    ? slidesRaw
    : slidesRaw != null
      ? [slidesRaw]
      : undefined;

  return {
    id,
    header,
    overview,
    technologies,
    backend,
    keyFeatures,
    challenges,
    slides,
  };
}

async function fetchDetailById(
  locale: string,
  header: string,
): Promise<Detail | null> {
  const records = await base(detailsTableName(locale))
    .select({
      filterByFormula: `{header} = "${escapeAirtableFormulaString(header)}"`,
      maxRecords: 1,
      fields: [...DETAIL_FIELDS],
    })
    .firstPage();

  const record = records[0];
  if (!record) return null;

  return mapRecordToDetail(record);
}

async function fetchDetails(locale: string): Promise<Detail[]> {
  const details: Detail[] = [];
  const baseTableName = detailsTableName(locale);
  return new Promise((resolve, reject) => {
    base(baseTableName)
      .select({
        fields: [...DETAIL_FIELDS],
      })
      .eachPage(
        function page(records: any[], fetchNextPage: () => void) {
          records.forEach((record) => {
            details.push(mapRecordToDetail(record));
          });

          fetchNextPage();
        },
        function done(err: any) {
          if (err) return reject(err);

          return resolve(details);
        },
      );
  });
}

const getDetailsCached = unstable_cache(fetchDetails, ["details"], {
  revalidate: REVALIDATE_SECONDS,
  tags: ["details"],
});

export default function getDetails(locale: string): Promise<Detail[]> {
  return getDetailsCached(locale);
}

export function getDetailById(
  locale: string,
  id: string,
): Promise<Detail | null> {
  return unstable_cache(
    () => fetchDetailById(locale, id),
    ["detail", locale, id],
    {
      revalidate: REVALIDATE_SECONDS,
      tags: [`detail-${id}`, `details-${locale}`, "details"],
    },
  )();
}
