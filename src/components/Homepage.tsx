"use client";
import About from "@/components/About/About";
import HeroArea from "@/components/HeroArea/HeroArea";
import ProjectsSection from "@/components/ProjectSection/ProjectsSection";
import { Project } from "@/types";
import { useTranslations } from "next-intl";
import { createRef, useEffect } from "react";

const HomePage = ({
  professionalProjectsDetails,
}: {
  professionalProjectsDetails: Project[];
}) => {
  const toElScrollRef = createRef<HTMLDivElement>();
  const executeScroll = () => toElScrollRef.current?.scrollIntoView();
  const t = useTranslations('HomePage');
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
      <h1>{t('title')}</h1>;
      <ProjectsSection
        toElScrollRef={toElScrollRef}
        projectsDetails={professionalProjectsDetails}
      />
    </>
  );
};
export default HomePage;
