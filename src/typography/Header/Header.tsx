import { FC } from "react";
import styles from "./Header.module.scss";

interface HeaderProps {
  text: string;
}

const Header: FC<HeaderProps> = ({ text }) => {
  return <h1 className={styles.header}>{text}</h1>;
};

export default Header;
