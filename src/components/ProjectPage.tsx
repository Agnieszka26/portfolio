"use client";

import styles from "@/assets/styles/index.module.scss";
import ProjectsSection from "@/components/ProjectSection/ProjectsSection";
import { Project } from "@/types";

const ProjectPage = ({ projectsDetails }: { projectsDetails: Project[] }) => {
  return (
    <div className={styles.page}>
      <ProjectsSection projectsDetails={projectsDetails} />
    </div>
  );
};

export default ProjectPage;
