"use client";

import ProjectsSection from "@/components/ProjectSection/ProjectsSection";
import { hobbyProjectsDetails } from "@/components/ProjectSection/workDetails";
import { createRef, useEffect } from "react";
import styles from "../contact/page.module.scss";

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
        projectsDetails={hobbyProjectsDetails}
      />
    </div>
  );
};

export default Work;
