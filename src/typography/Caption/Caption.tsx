import { FC } from "react";
import styles from "./Caption.module.scss";

interface CaptionProps {
  text: string;
}

const Caption: FC<CaptionProps> = ({ text }) => {
  return <p className={styles.caption}>{text}</p>;
};

export default Caption;
