import List from "@/atoms/List/List";
import { FC } from "react";
import styles from "./Navbar.module.scss";

const Navbar: FC = () => {
  return (
    <nav className={styles.navbar}>
      <List />
    </nav>
  );
};

export default Navbar;
