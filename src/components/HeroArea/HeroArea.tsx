import Button from "@/atoms/Button/Button";
import { RoutesPath } from "@/constants";
import Header from "@/typography/Header/Header";
import Paragraph from "@/typography/Paragraph/Paragraph";
import "animate.css/animate.min.css";
import { init } from "aos";
import Link from "next/link";
import { FC, useEffect, useRef } from "react";
import Scroll from "../Scroll/Scroll";
import styles from "./HeroArea.module.scss";
interface HeroAreaProps {
  executeScroll?: () => void;
}

const HeroArea: FC<HeroAreaProps> = ({ executeScroll }) => {
  const myRef = useRef(null);
  useEffect(() => {
    init();
  });
  return (
    <div className={styles.heroArea}>
      <div className={styles.containerLeft} data-aos="fade-up">
        <Header
          text={`Hi, I’m Agnieszka,  React Frontend Developer`}
          color="light"
        />

        <Paragraph
          color="light"
          text={`My interests are centered around web design and development, frontend technologies and programming software used to create websites. My skills include JavaScript, CSS, HTML. I work with React, Next.js and React Native frameworks.`}
        />
        <Link href={RoutesPath.MY_WORK}>
          <Button text={"see my work"} color={"dark"} />
        </Link>
      </div>
      <div className={styles.containerRight} data-aos="fade-up">
        <Scroll onClick={executeScroll} />
      </div>
    </div>
  );
};

export default HeroArea;
