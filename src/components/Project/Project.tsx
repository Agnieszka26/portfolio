import {
  animateDirectionLeft,
  animateDirectionRight,
} from "@/assets/helpers/index";
import Animation from "@/atoms/Animation/Animation";
import Button from "@/atoms/Button/Button";
import Caption from "@/typography/Caption/Caption";
import Header from "@/typography/Header/Header";
import Heading from "@/typography/Heading/Heading";
import Paragraph from "@/typography/Paragraph/Paragraph";
import Tag from "@/typography/Tag/Tag";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
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
        <Animation x={animateDirectionLeft(index)}>
          <Heading text={heading} />
          <Header text={header} color="dark" />
          <div className={styles.tagContainer}>
            {tags?.map((tag) => <Tag key={tag} text={tag} />)}
          </div>
          <Paragraph color="dark" text={paragraph} />
          <Link href={linkToGithub} target="_blank" rel="noreferrer">
            <Button text={"go to code"} color={"light"} />
          </Link>
        </Animation>
      </div>
      <div className={styles.containerRight}>
        <Animation x={animateDirectionRight(index)}>
          <Link
            href={linkToLive}
            target="_blank"
            rel="noreferrer"
            className={styles.a}
          >
            <Image
              className={styles.img}
              src={image}
              alt={`preview project ${header}`}
              quality={100}
              width={500}
              height={500}
            />
            <Caption text={"see this project live →"} />
          </Link>
        </Animation>
      </div>
    </div>
  );
};

export default ProjectComponent;
