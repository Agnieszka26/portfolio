import Button from "@/atoms/Button/Button";
import Header from "@/typography/Header/Header";
import Paragraph from "@/typography/Paragraph/Paragraph";
import Image from "next/image";
import { FC } from "react";
import logo from "../../../public/logo.svg";
import styles from "./Footer.module.scss";

const Footer: FC = () => {
  return (
    <div className={styles.footerContainer}>
      <footer className={styles.footer}>
        <div className={styles.containerLeft}>
          <Header text="Want to work?" color={"light"} />
        </div>
        <div className={styles.containerRight}>
          <Paragraph
            text="I am junior developer who is looking for a job. I would love to take part in exiting projects. Do you want to see more projects on github ?"
            color="light"
          />
          <a href="https://github.com/Agnieszka26">
            <Button text={"view github"} color={"dark"} />
          </a>
          <Paragraph
            text="Please, do not hesitate and reach me by sending an email at agna.medrek@gmail.com"
            color="light"
          />
          <a href="mailto:agna.medrek@gmail.com">
            <Button text={"send email"} color={"dark"} />
          </a>
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
