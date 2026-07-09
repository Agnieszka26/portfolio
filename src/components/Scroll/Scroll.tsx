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
    <div className={styles.revealWrapper} onClick={handleClick}>
      <p className={styles.revealText}>SCROLL</p>
    </div>
  );
};

export default Scroll;
