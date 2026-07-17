import cn from "classnames";
import { FC } from "react";
import styles from "./Header.module.scss";

type HeadingTag = "h1" | "h2" | "h3";

interface HeaderProps {
  text: string;
  color: "dark" | "light";
  as?: HeadingTag;
}

const Header: FC<HeaderProps> = ({ text, color, as: Tag = "h1" }) => {
  return (
    <Tag className={cn(styles.header, styles[`color-${color}`])}>{text}</Tag>
  );
};

export default Header;
