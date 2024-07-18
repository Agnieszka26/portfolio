import { StaticImageData } from "next/image";
import { FC, MutableRefObject } from "react";
import Project from "../Project/Project";


interface ProjectsSectionProps {
  scrollRef?: MutableRefObject<HTMLDivElement | null>;
  projectsDetails: {
    heading: string;
    header: string;
    tags: string[];
    paragraph: string;
    image: StaticImageData;
    linkToGithub: string;
    linkToLive: string;
  }[];
}

const ProjectsSection: FC<ProjectsSectionProps> = ({
  scrollRef,
  projectsDetails,
}) => {
  return (
    <section ref={scrollRef}>
      {projectsDetails.map(
        (
          { heading, header, paragraph, image, tags, linkToGithub, linkToLive },
          index,
        ) => (
          <Project
            key={header}
            heading={heading}
            header={header}
            paragraph={paragraph}
            image={image}
            tags={tags}
            linkToGithub={linkToGithub}
            linkToLive={linkToLive}
            index={index}
          />
        ),
      )}
    </section>
  );
};

export default ProjectsSection;
