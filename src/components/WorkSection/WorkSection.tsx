import { FC, MutableRefObject } from "react";
import Project from "../Project/Project";
import { projectsDetails } from "./workDetails";
import styles from "./WorkSection.module.scss";

interface WorkSectionProps {
  scrollRef?: MutableRefObject<HTMLDivElement | null>;
}

const WorkSection: FC<WorkSectionProps> = ({ scrollRef }) => {
  return (
    <section className={styles.workSection} ref={scrollRef}>
      {projectsDetails.map(
        (
          { heading, header, paragraph, image, tags, linkToGithub, linkToLive },
          index
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
        )
      )}
    </section>
  );
};

export default WorkSection;
