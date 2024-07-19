import { Project } from "@/types";
import { FC, MutableRefObject } from "react";
import ProjectComponent from "../Project/Project";

interface ProjectsSectionProps {
  scrollRef?: MutableRefObject<HTMLDivElement | null>;
  projectsDetails: Project[];
}

//TODO::    if linkToGithub  ?? RoutesPath.SOURCE_CODE_NOT_AVAILABLE + "/kettlo",

const ProjectsSection: FC<ProjectsSectionProps> = ({
  scrollRef,
  projectsDetails,
}) => {
  return (
    <section ref={scrollRef}>
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
              linkToGithub={linkToGithub}
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
