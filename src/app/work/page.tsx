"use client";
import WorkSection from "@/components/WorkSection/WorkSection";
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
    []
  );
  const scrollRef = createRef<HTMLDivElement>();
  return (
    <div className={styles.page}>
      <WorkSection scrollRef={scrollRef} />
    </div>
  );
};

export default Work;
