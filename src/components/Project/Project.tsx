import Button from "@/atoms/Button/Button";
import Caption from "@/typography/Caption/Caption";
import Header from "@/typography/Header/Header";
import Heading from "@/typography/Heading/Heading";
import Paragraph from "@/typography/Paragraph/Paragraph";
import Tag from "@/typography/Tag/Tag";
import "animate.css/animate.min.css";
import Image from "next/image";
import { FC } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import {
  directionAnimationOnScroll,
  directionAnimationOnScrollSwap,
  isEven,
} from "../../assets/helpers/index";
import styles from "./Project.module.scss";

interface ProjectProps {
  heading: string;
  header: string;
  tags?: string[];
  paragraph: string;
  image: string;
  linkToGithub: string;
  linkToLive: string;
  index: number;
}

const ProjectComponent: FC<ProjectProps> = ({
  heading,
  header,
  tags,
  paragraph,
  image,
  linkToGithub,
  linkToLive,
  index,
}) => {
  return (
    <div className={styles.project}>
      <div className={styles.containerLeft}>
        <ScrollAnimation
          animateIn={directionAnimationOnScroll(isEven(index))}
          animateOnce={true}
          offset={index === 0 ? 0 : 100}
        >
          <Heading text={heading} />
          <Header text={header} color="dark" />
          <div className={styles.tagContainer}>
            {tags?.map((tag) => <Tag key={tag} text={tag} />)}
          </div>
          <Paragraph color="dark" text={paragraph} />

          <a href={linkToGithub} target="_blank" rel="noreferrer">
            <Button text={"go to code"} color={"light"} />
          </a>
        </ScrollAnimation>
      </div>
      <div className={styles.containerRight}>
        <ScrollAnimation
          animateIn={directionAnimationOnScrollSwap(isEven(index))}
          animateOnce={true}
        >
          <a
            href={linkToLive}
            target="_blank"
            rel="noreferrer"
            className={styles.a}
          >
            <Image
              className={styles.img}
              src={image}
              alt="preview project"
              quality={100}
              width={500}
              height={500}
            />
            <Caption text={"see this project live →"} />
          </a>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default ProjectComponent;
