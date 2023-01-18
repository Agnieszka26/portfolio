import cn from "classnames";
import { FC } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
  color: "dark" | "light";
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ text, color, onClick }) => {
  return (
    // <div className={cn(styles.boxShadow, styles[`color-${color}`])}>
    <button
      onClick={onClick}
      className={cn(styles.button, styles[`color-${color}`])}
    >
      {text}
    </button>
    // </div>
  );
};

export default Button;
