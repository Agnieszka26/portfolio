"use client";

import { createRef, useEffect } from "react";
import styles from "../contact/page.module.scss";
import ProjectsSection from "@/components/ProjectSection/ProjectsSection";
import { professionalProjectsDetails } from "@/components/ProjectSection/workDetails";

const Work = () => {
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
        projectsDetails={professionalProjectsDetails}
      />
    </div>
  );
};

export default Work;
