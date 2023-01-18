import List from "@/atoms/List/List";
import Logo from "@/atoms/Logo/Logo";
import { FC } from "react";
import styles from "./Navbar.module.scss";

const Navbar: FC = () => {
  return (
    <nav className={styles.navbar}>
      <Logo />
      <List />
    </nav>
  );
};

export default Navbar;
