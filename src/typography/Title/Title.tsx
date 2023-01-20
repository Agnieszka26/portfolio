import { FC } from "react";
import styles from "./Title.module.scss";

interface TitleProps {
  text: string;
}

const Title: FC<TitleProps> = ({ text }) => {
  return (
    <div className={styles.title}>
      <p>{text}</p>
    </div>
  );
};

export default Title;
