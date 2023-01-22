"use client";
import About from "@/components/About/About";
import HeroArea from "@/components/HeroArea/HeroArea";
import WorkSection from "@/components/WorkSection/WorkSection";
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
    []
  );
  return (
    <>
      <HeroArea executeScroll={executeScroll} />
      <WorkSection scrollRef={scrollRef} />
      <About />
    </>
  );
};
export default Page;
