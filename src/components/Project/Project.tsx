import Button from "@/atoms/Button/Button";
import Caption from "@/typography/Caption/Caption";
import Header from "@/typography/Header/Header";
import Heading from "@/typography/Heading/Heading";
import Paragraph from "@/typography/Paragraph/Paragraph";
import Tag from "@/typography/Tag/Tag";
import Image, { StaticImageData } from "next/image";
import { FC } from "react";
import styles from "./Project.module.scss";

interface ProjectProps {
  heading: string;
  header: string;
  tags?: string[];
  paragraph: string;
  image: StaticImageData;
  linkToGithub: string;
  linkToLive: string;
  index: number;
}

const Project: FC<ProjectProps> = ({
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
        <Heading text={heading} />
        <Header text={header} color="dark" />
        <div className={styles.tagContainer}>
          {tags?.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </div>
        <Paragraph color="dark" text={paragraph} />

        <a href={linkToGithub} target="_blank" rel="noreferrer">
          <Button text={"go to code"} color={"light"} />
        </a>
      </div>
      <div className={styles.containerRight}>
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
          />
          <Caption text={"see this project live →"} />
        </a>
      </div>
    </div>
  );
};

export default Project;
