import { Detail } from "@/types";
import { base } from "./base";

export default function getDetails(locale: string): Promise<Detail[]> {
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
          "stack",
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
            const stack = record.get("stack");
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
              stack,
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
