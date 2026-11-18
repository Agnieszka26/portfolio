import Animation from "@/atoms/Animation/Animation";
import Button from "@/atoms/Button/Button";
import Caption from "@/typography/Caption/Caption";
import Header from "@/typography/Header/Header";
import Heading from "@/typography/Heading/Heading";
import Paragraph from "@/typography/Paragraph/Paragraph";
import Tag from "@/typography/Tag/Tag";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import NextLink from "next/link";
import { FC } from "react";
import styles from "./Project.module.scss";
import { projectSlug, type RemoteCoverImage } from "@/types";
import { RoutesPath } from "@/constants";
import cn from "classnames";

interface ProjectProps {
  heading: string;
  header: string;
  tags: string[];
  paragraph: string;
  image: RemoteCoverImage;
  linkToGithub: string;
  linkToLive: string;
  index: number;
  locale: string;
  learnMoreLabel: string;
  seeProjectLabel: string;
  id: string;
  seeGithubLabel: string;
  layout?: "page";
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
  seeGithubLabel,
  id,
  layout,
}) => {
  return (
    <div className={cn(styles.project, layout === "page" && styles.projectPage)}>
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

          <div className={styles.actions}>
            <Link
              href={`${RoutesPath.PROJECTS}/${projectSlug({ id, header })}`}
              locale={locale}
              aria-label={learnMoreLabel + " of the " + header + " project"}
            >
              <Button text={learnMoreLabel} color={"dark"} />
            </Link>
            <NextLink
              href={linkToGithub}
              aria-label={seeGithubLabel + " of the " + header + " project"}
            >
              <Button text={seeGithubLabel} color={"light"} />
            </NextLink>
            <NextLink
              href={linkToLive}
              aria-label={seeProjectLabel + " of the " + header + " project"}
            >
              <Button text={seeProjectLabel} color={"blue"} />
            </NextLink>
          </div>
        </Animation>
      </div>
      <div className={styles.containerRight}>
        <Animation
          type={index % 2 === 0 ? "slide-left" : "slide-right"}
          distance={10}
        >
          <NextLink
            href={linkToLive}
            target="_blank"
            rel="noreferrer"
            className={styles.a}
          >
            <Image
              className={styles.img}
              src={image.url}
              alt={`Preview of the ${header} project`}
              quality={80}
              width={image.width}
              height={image.height}
            />
            <Caption text={seeProjectLabel} />
          </NextLink>
        </Animation>
      </div>
    </div>
  );
};

export default ProjectComponent;
