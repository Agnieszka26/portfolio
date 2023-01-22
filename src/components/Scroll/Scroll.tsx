import { FC } from "react";
import styles from "./Scroll.module.scss";

interface ScrollProps {
  onClick?: () => void;
}

const Scroll: FC<ScrollProps> = ({ onClick }) => {
  return (
    <div className={styles.scrollContainer} onClick={onClick}>
      <div className={styles.scrollLine}></div>
      <div className={styles.scrollText}>
        <p>SCROLL</p>
      </div>
    </div>
  );
};

export default Scroll;
