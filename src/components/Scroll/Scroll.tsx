import { FC } from "react";
import styles from "./Scroll.module.scss";

interface ScrollProps {
  onClick?: () => void;
}

const Scroll: FC<ScrollProps> = ({ onClick }) => {
  return (
    <div className={styles.revealWrapper} onClick={onClick}>
    <p className={styles.revealText}>SCROLL</p>
  </div>
  );
};

export default Scroll;
