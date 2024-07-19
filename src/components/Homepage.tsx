"use client";
import About from "@/components/About/About";
import HeroArea from "@/components/HeroArea/HeroArea";
import ProjectsSection from "@/components/ProjectSection/ProjectsSection";
import { Project } from "@/types";
import { createRef, useEffect } from "react";

const HomePage = ({
  professionalProjectsDetails,
}: {
  professionalProjectsDetails: Project[];
}) => {
  const scrollRef = createRef<HTMLDivElement>();
  const executeScroll = () => scrollRef.current!.scrollIntoView();
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
  return (
    <>
      <HeroArea executeScroll={executeScroll} />
      <ProjectsSection
        scrollRef={scrollRef}
        projectsDetails={professionalProjectsDetails}
      />
      <About />
    </>
  );
};
export default HomePage;
