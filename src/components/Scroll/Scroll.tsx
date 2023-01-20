import { FC } from "react";
import styles from "./Scroll.module.scss";

const Scroll: FC = () => {
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
