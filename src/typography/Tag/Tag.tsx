import { FC } from "react";
import styles from "./Tag.module.scss";

interface TagProps {
  text: string;
}

const Tag: FC<TagProps> = ({ text }) => {
  return (
    <div className={styles.tag}>
      <p className={styles.p}>{text}</p>
    </div>
  );
};

export default Tag;
