"use client";

import { FC } from "react";
import styles from "./Scroll.module.scss";

interface ScrollProps {
  targetId?: string;
}

const Scroll: FC<ScrollProps> = ({ targetId }) => {
  const handleClick = () => {
    if (targetId) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={styles.revealWrapper}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <p className={styles.revealText}>SCROLL</p>
    </div>  );
};

export default Scroll;
