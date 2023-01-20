import Header from "@/typography/Header/Header";
import Paragraph from "@/typography/Paragraph/Paragraph";
import Image from "next/image";
import { FC } from "react";
import logo from "../../../public/logo.svg";
import styles from "./Footer.module.scss";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <div className={styles.footerContainer}>
      <footer className={styles.footer}>
        <div className={styles.containerLeft}>
          <Header text="Want to work?" color={"light"} />
        </div>
        <div className={styles.containerRight}>
          <Paragraph
            text="If you need a modern and powerful website for your business, startup or yourself, I am available for work. You can email me directly at hello@email.com"
            color="light"
          />
        </div>
      </footer>
      <div className={styles.paragraphReserved}>
        <span>
          <Image src={logo} alt="logo" />
        </span>
        © All rights reserved
      </div>
    </div>
  );
};

export default Footer;
