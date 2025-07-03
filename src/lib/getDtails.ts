import { Detail } from "@/types";
import { base } from "./base";

export default function getDetails(locale: string): Promise<Detail[]> {
  const details: Detail[] = [];
  const baseTableName = locale === "en" ? "projects details" : "project details pl";
  console.log(baseTableName)
  return new Promise((resolve, reject) => {
    base(baseTableName)
      .select({
        fields: [
          "header",
          "overview",
          "technologies",
          "backend",
          "keyFeatures",
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

            details.push({
              id,
              header,
              overview,
              technologies,
              backend,
              keyFeatures,
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
