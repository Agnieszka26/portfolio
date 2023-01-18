import { FC } from "react";
import styles from "./Paragraph.module.scss";

interface ParagraphProps {
  text: string;
}

const Paragraph: FC<ParagraphProps> = ({ text }) => {
  return <h1 className={styles.paragraph}>{text}</h1>;
};

export default Paragraph;
