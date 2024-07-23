import styles from "@/assets/styles/index.module.scss";
import { RoutesPath } from "@/constants";
import { Project } from "@/types";
import { FC, RefObject } from "react";
import ProjectComponent from "../Project/Project";
interface ProjectsSectionProps {
  projectsDetails: Project[];
  toElScrollRef?: RefObject<HTMLDivElement>
}

const ProjectsSection: FC<ProjectsSectionProps> = ({ projectsDetails, toElScrollRef }) => {
  return (
    <section className={styles.container} ref={toElScrollRef}>
      {projectsDetails.map(
        (
          { header, paragraph, image, tags: t, linkToGithub, linkToLive },
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
              paragraph={paragraph}
              image={image[0].thumbnails.full.url}
              tags={tags}
              linkToGithub={
                linkToGithub ??
                RoutesPath.SOURCE_CODE_NOT_AVAILABLE + "/" + header
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
