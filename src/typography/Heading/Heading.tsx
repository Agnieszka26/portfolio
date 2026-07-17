import { FC, ReactNode } from "react";
import styles from "./Heading.module.scss";

interface HeadingProps {
  text: ReactNode;
}

const Heading: FC<HeadingProps> = ({ text }) => {
  return (
    <div className={styles.heading}>
      <p>{text}</p>
    </div>
  );
};

export default Heading;
