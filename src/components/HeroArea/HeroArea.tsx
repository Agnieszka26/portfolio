import Button from "@/atoms/Button/Button";
import Header from "@/typography/Header/Header";
import Paragraph from "@/typography/Paragraph/Paragraph";
import { FC } from "react";
import Scroll from "../Scroll/Scroll";
import styles from "./HeroArea.module.scss";

const HeroArea: FC = () => {
  return (
    <div className={styles.heroArea}>
      <div className={styles.containerLeft}>
        <Header
          text={`Hi, I’m Agnieszka,  React Frontend Developer`}
          color="light"
        />
        <Paragraph
          color="light"
          text={`My interests are centered around web design and development, frontend technologies and programming software used to create websites. My skills include JavaScript, CSS, HTML. I work with React, Next.js and React Native frameworks.`}
        />
        <Button text={"see my work"} color={"dark"} />
      </div>
      <div className={styles.containerRight}>
        <Scroll />
      </div>
    </div>
  );
};

export default HeroArea;
