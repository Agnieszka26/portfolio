import { Detail } from "@/types";
import { unstable_cache } from "next/cache";
import { base } from "./base";

const REVALIDATE_SECONDS = 3600;

async function fetchDetails(locale: string): Promise<Detail[]> {
  const details: Detail[] = [];
  const baseTableName = locale === "en" ? "projects details" : "project details pl";
  return new Promise((resolve, reject) => {
    base(baseTableName)
      .select({
        fields: [
          "header",
          "overview",
          "technologies",
          "backend",
          "keyFeatures",
          "challenges",
          "slides",
        ],
      })
      .eachPage(
        function page(records: any[], fetchNextPage: () => void) {
          records.forEach((record) => {
            const id = record.getId();
            const header = record.get("header");
            const overview = record.get("overview");
            const technologies = record.get("technologies");
            const backend = record.get("backend");
            const keyFeatures = record.get("keyFeatures");
            const challenges = record.get("challenges");
            const slidesRaw = record.get("slides");
            const slides = Array.isArray(slidesRaw)
              ? slidesRaw
              : slidesRaw != null
                ? [slidesRaw]
                : undefined;

            details.push({
              id,
              header,
              overview,
              technologies,
              backend,
              keyFeatures,
              challenges,
              slides,
            });
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
