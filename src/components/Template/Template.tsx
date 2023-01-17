import { FC, ReactNode } from "react";
import styles from "./Template.module.scss";

interface TemplateProps {
  children: ReactNode;
}

const Template: FC<TemplateProps> = ({ children }) => {
  return <div className={styles.template}>{children}</div>;
};

export default Template;
