"use client";

import ProjectsSection from "@/components/ProjectSection/ProjectsSection";
import { createRef, useEffect } from "react";
import styles from "@/assets/styles/index.module.scss";
import { Project } from "@/types";

const ProjectPage = ({ projectsDetails }: { projectsDetails: Project[] }) => {
  useEffect(
    () => () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    [],
  );
  const scrollRef = createRef<HTMLDivElement>();
  return (
    <div className={styles.page}>
      <ProjectsSection
        scrollRef={scrollRef}
        projectsDetails={projectsDetails}
      />
    </div>
  );
};

export default ProjectPage;
