import styles from "@/assets/styles/index.module.scss";
import Button from "@/atoms/Button/Button";
import { RoutesPath } from "@/constants";
import Header from "@/typography/Header/Header";
import Paragraph from "@/typography/Paragraph/Paragraph";
import cn from "classnames";
import Link from "next/link";
import { FC } from "react";
import Scroll from "../Scroll/Scroll";
interface HeroAreaProps {
  executeScroll?: () => void;
}

const HeroArea: FC<HeroAreaProps> = ({ executeScroll }) => {

  return (
    <div className={cn(styles.heroArea)}>
      <div className={cn(styles.fixedBox, styles.container)}>
        <div className={cn(styles.containerLeft)}>
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

        <div className={styles.containerRight}>
          <Scroll onClick={executeScroll} />
        </div>
      </div>
    </div>
  );
};

export default HeroArea;
