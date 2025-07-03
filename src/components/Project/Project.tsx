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
import { FC, use } from "react";
import styles from "./Project.module.scss";
import { useLocale, useTranslations } from "next-intl";
import { RoutesPath } from "@/constants";

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
  const t = useTranslations("Section");
  const locale = useLocale();
  return (
    <div className={styles.project}>
      <div className={styles.containerLeft}>
        <Animation x={animateDirectionLeft(index)}>
          <Heading text={t(heading)} />
          <Header text={header} color="dark" />
          <div className={styles.tagContainer}>
            {tags?.map((tag) => <Tag key={tag} text={tag} />)}
          </div>
          <Paragraph color="dark" text={paragraph} />

          {linkToGithub === "" ? (
           <Link
              href={`${RoutesPath.SOURCE_CODE_NOT_AVAILABLE}/${header}`}
              locale={locale}
            >
              <Button text={t("go_to_code")} color={"light"} />
            </Link>
          ) : (
             <Link href={linkToGithub} target="_blank" rel="noreferrer">
              <Button text={t("go_to_code")} color={"light"} />
            </Link>
            
          )}
      
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
            <Caption text={t("see_project")} />
          </Link>
        </Animation>
      </div>
    </div>
  );
};

export default ProjectComponent;
