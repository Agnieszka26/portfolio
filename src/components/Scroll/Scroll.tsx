import { FC } from "react";
import styles from "./Scroll.module.scss";

interface ScrollProps {
  // children: ReactNode;
}

const Scroll: FC<ScrollProps> = () => {
  return (
    <div className={styles.scrollContainer}>
      <div className={styles.scrollLine}></div>
      <div className={styles.scrollText}>
        <p>SCROLL</p>
      </div>
    </div>
  );
};

export default Scroll;
