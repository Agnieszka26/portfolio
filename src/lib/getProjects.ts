import { Project } from "@/types";

const Airtable = require("airtable");

const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_PERSONAL_ACCESS_TOKEN_SECRET,
}).base(process.env.NEXT_PUBLIC_API_TOKEN_BASE);

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
          "Attachments",
          "linkToGithub",
          "Type",
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
            const image = record.get("Attachments");
            const linkToGithub = record.get("linkToGithub");
            const type = record.get("Type");

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
