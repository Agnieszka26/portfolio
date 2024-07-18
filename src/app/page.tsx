"use client";
import About from "@/components/About/About";
import HeroArea from "@/components/HeroArea/HeroArea";
import ProjectsSection from "@/components/ProjectSection/ProjectsSection";
import { professionalProjectsDetails } from "@/components/ProjectSection/workDetails";
import { createRef, useEffect } from "react";

const Page = () => {
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
export default Page;
