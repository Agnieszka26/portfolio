import styles from "@/assets/styles/index.module.scss";
import { RoutesPath } from "@/constants";
import { Project } from "@/types";
import { FC, RefObject } from "react";
import ProjectComponent from "../Project/Project";
import {useLocale, useTranslations } from "next-intl";

interface ProjectsSectionProps {
  projectsDetails: Project[];
  toElScrollRef?: RefObject<HTMLDivElement>
}

const ProjectsSection: FC<ProjectsSectionProps> = ({ projectsDetails, toElScrollRef }) => {
 const locale = useLocale();
 
  return (
    <section className={styles.container} ref={toElScrollRef}>
      {projectsDetails.map(
        (
          { header, paragraph, image, tags: t, linkToGithub, linkToLive, paragraph_pl },
          index,
        ) => {
          const tags = t
            .split(",")
            .map((item) => item.trim().replace(/^"|"$/g, ""));

          return (
            <ProjectComponent
              key={header}
              heading={"latest work"}
              header={header}
              paragraph={locale == "en" ? paragraph : paragraph_pl}
              image={image}
              tags={tags}
              linkToGithub={
                linkToGithub ?? ""
              }
              linkToLive={linkToLive}
              index={index}
            />
          );
        },
      )}
    </section>
  );
};

export default ProjectsSection;
