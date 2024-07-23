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
          "images",
          "linkToGithub",
          "type",
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
            const image = record.get("images");
            const linkToGithub = record.get("linkToGithub");
            const type = record.get("type");

            projects.push({
              id,
              header,
              paragraph,
              tags,
              linkToLive,
              image,
              linkToGithub,
              type,
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
