"use client";
import s from "@/assets/styles/index.module.scss";
import List from "@/atoms/List/List";
import Logo from "@/atoms/Logo/Logo";
import MobileList from "@/atoms/MobileList/MobileList";
import classnames from "classnames";
import Link from "next/link";
import { FC, useState } from "react";

import Hamburger from "./Hamburger";
import styles from "./Navbar.module.scss";
const Navbar: FC = () => {
  const [visibleList, setVisibleList] = useState(false);
  const handleHamburger = () => {
    setVisibleList((prev) => !prev);
  };

  const handleCloseHamburger = () => {
    setVisibleList(false);
  };
  return (
    <>
      <nav className={styles.navbar}>
        <div className={classnames(s.container, s.flex)}>
          <Logo />
          <Hamburger handleHamburger={handleHamburger} open={visibleList} />
          <List />
        </div>
      </nav>

      <MobileList
        visible={visibleList}
        handleCloseHamburger={handleCloseHamburger}
      />
    </>
  );
};

export default Navbar;


