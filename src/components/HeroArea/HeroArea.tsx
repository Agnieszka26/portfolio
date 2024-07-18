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

  useEffect(() => {
    init();
  });
  return (
    <div className={styles.heroArea}>
      <div className={styles.containerLeft} data-aos="fade-up">
        <Header
          text={`Hi, I’m Agnieszka, Frontend Developer`}
          color="light"
        />

        <Paragraph
          color="light"
          text={`I am a dedicated and experienced mid-level developer specializing in front-end development. With a strong foundation in modern web technologies, I bring innovative solutions to complex problems and deliver high-quality user experiences.`}
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
