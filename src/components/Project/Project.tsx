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
import type { RemoteCoverImage } from "@/types";

interface ProjectProps {
  heading: string;
  header: string;
  tags?: string[];
  paragraph: string;
  image: RemoteCoverImage;
  linkToGithub: string;
  linkToLive: string;
  index: number;
  locale: string;
  learnMoreLabel: string;
  seeProjectLabel: string;
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
  locale,
  learnMoreLabel,
  seeProjectLabel,
}) => {
  return (
    <div className={styles.project}>
      <div className={styles.containerLeft}>
        <Animation
          type={index % 2 === 0 ? "slide-right" : "slide-left"}
          distance={10}
        >
          <Heading text={heading} />
          <Header text={header} color="dark" as="h2" />
          <div className={styles.tagContainer}>
            {tags?.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
          <Paragraph color="dark" text={paragraph} />
          <Link href={linkToGithub} locale={locale}>
            <Button text={learnMoreLabel} color={"light"} />
          </Link>
        </Animation>
      </div>
      <div className={styles.containerRight}>
        <Animation
          type={index % 2 === 0 ? "slide-left" : "slide-right"}
          distance={10}
        >
          <Link
            href={linkToLive}
            target="_blank"
            rel="noreferrer"
            className={styles.a}
          >
            <Image
              className={styles.img}
              src={image.url}
              alt={`preview project ${header}`}
              quality={80}
              width={image.width}
              height={image.height}
            />
            <Caption text={seeProjectLabel} />
          </Link>
        </Animation>
      </div>
    </div>
  );
};

export default ProjectComponent;
