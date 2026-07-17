import { FC, ReactNode } from "react";
import styles from "./Heading.module.scss";

interface HeadingProps {
  text: ReactNode;
}

const Heading: FC<HeadingProps> = ({ text }) => {
  return (
    <div className={styles.heading}>
      <h4>{text}</h4>
    </div>
  );
};

export default Heading;
