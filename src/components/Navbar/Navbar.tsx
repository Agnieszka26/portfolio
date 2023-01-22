"use client";
import List from "@/atoms/List/List";
import Logo from "@/atoms/Logo/Logo";
import MobileList from "@/atoms/MobileList/MobileList";
import Image from "next/image";
import { FC, useState } from "react";
import hamburger from "../../../public/hamburger.svg";
import styles from "./Navbar.module.scss";

const Navbar: FC = () => {
  const [visibleList, setVisibleList] = useState(false);
  const handleHamburger = () => {
    setVisibleList((prev) => !prev);
  };
  return (
    <>
      <nav className={styles.navbar}>
        <Logo />
        <div className={styles.hamburger}>
          <button onClick={handleHamburger}>
            <Image src={hamburger} alt="hamburger" height={50} width={50} />
          </button>
        </div>

        <List />
      </nav>

      {visibleList ? <MobileList /> : null}
    </>
  );
};

export default Navbar;
