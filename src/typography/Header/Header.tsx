import cn from "classnames";
import { FC } from "react";
import styles from "./Header.module.scss";

interface HeaderProps {
  text: string;
  color: "dark" | "light";
}

const Header: FC<HeaderProps> = ({ text, color }) => {
  return (
    <h1 className={cn(styles.header, styles[`color-${color}`])}>{text}</h1>
  );
};

export default Header;
