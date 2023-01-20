import { FC } from "react";
import Project from "../Project/Project";
import { projectsDetails } from "./workDetails";
import styles from "./WorkSection.module.scss";

const WorkSection: FC = () => {
  return (
    <section className={styles.workSection}>
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
