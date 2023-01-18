import cn from "classnames";
import { FC } from "react";
import styles from "./Paragraph.module.scss";

interface ParagraphProps {
  text: string;
  color: "dark" | "light";
}

const Paragraph: FC<ParagraphProps> = ({ text, color }) => {
  return (
    <p className={cn(styles.paragraph, styles[`color-${color}`])}>{text}</p>
  );
};

export default Paragraph;
