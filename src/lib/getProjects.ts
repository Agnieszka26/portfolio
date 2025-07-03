import { Project } from "@/types";
import { base } from "./base";

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
            const image = record.get("publicUrl");
            const paragraph_pl = record.get("paragraph_pl");

            projects.push({
              id,
              header,
              paragraph,
              tags,
              linkToLive,
              image,
              linkToGithub,
              type,
              paragraph_pl
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
