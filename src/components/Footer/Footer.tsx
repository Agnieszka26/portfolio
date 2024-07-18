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
          <Header text="Seeking Opportunities" color={"light"} />
          <Paragraph
            text="As a developer actively seeking new career opportunities, I am eager to contribute to exciting projects and advance my skills in a professional environment. "
            color="light"
          />
        </div>
        <div className={styles.containerRight}>
          <Paragraph
            text="Explore my portfolio on GitHub for a deeper look at my projects:"
            color="light"
          />
          <a href="https://github.com/Agnieszka26">
            <Button text={"view github"} color={"dark"} />
          </a>
          <Paragraph
            text="Please feel free to reach out via email to discuss potential collaborations:"
            color="light"
          />
          <a href="mailto:agna.medrek@gmail.com">
            <Button text={"send email"} color={"dark"} />
          </a>
          <Paragraph
            text="I look forward to connecting with you!"
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
