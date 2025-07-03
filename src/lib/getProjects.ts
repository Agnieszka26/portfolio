import { Project } from "@/types";
import { base } from "./base";
import digitalAgency from "@/assets/images/portfolio_images/digitalAgency.png"
import expenceCalculator from "@/assets/images/portfolio_images/expenceCalculator.png"
import kettlo from "@/assets/images/portfolio_images/kettlo.png";
import smartwear from "@/assets/images/portfolio_images/smartwear.png";
import trudly from "@/assets/images/portfolio_images/trudly.png";
import trudlyMini from "@/assets/images/portfolio_images/trudly_mini.png";
import mailingSystem from "@/assets/images/portfolio_images/mailingSystem.png";
import pokedex from "@/assets/images/portfolio_images/pokedex.png";
import sailorMerry from "@/assets/images/portfolio_images/sailormerry.png";
import userApp from "@/assets/images/portfolio_images/userApp.png";

const imageMap: Record<string, any> = {
  "digitalAgency": digitalAgency,
  "expenceCalculator": expenceCalculator,
  "kettlo": kettlo,
  "smartwear": smartwear,
  "trudly": trudly,
  "trudlyMini": trudlyMini,
  "mailingSystem.": mailingSystem,
  "pokedex": pokedex,
  "sailormerry": sailorMerry,
  "userApp": userApp,
};

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
            const paragraph_pl = record.get("paragraph_pl");
            const publicUrl = record.get("publicUrl");
            const image = imageMap[publicUrl]

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
