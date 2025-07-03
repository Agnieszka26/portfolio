import styles from "@/assets/styles/index.module.scss";
import Button from "@/atoms/Button/Button";
import Header from "@/typography/Header/Header";
import Paragraph from "@/typography/Paragraph/Paragraph";
import cn from "classnames";
import Link from "next/link";
import React, { FC } from "react";
import Scroll from "../Scroll/Scroll";
import { useTranslations } from "next-intl";

interface HeroAreaProps {
  executeScroll?: () => void;
}

const HeroArea = ({ executeScroll }: HeroAreaProps) => {
  const t = useTranslations("HeroArea");
  return (
    <div className={cn(styles.heroArea)}>
      <div className={cn(styles.fixedBox, styles.container)}>
        <div className={cn(styles.containerLeft)}>
          <Header text={t("title")} color="light" />

          <Paragraph text={t("description_1")} color="light" />
          <Paragraph text={t("description_2")} color="light" />
          <Paragraph text={t("description_3")} color="light" />
          <Link
            href={
              "https://docs.google.com/forms/d/e/1FAIpQLSc_qJZfLheGYwedgUzP76BO-qpTuKBLfze30xUDdHWjXf5ptA/viewform"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button text={t("ctaButton")} color={"dark"} />
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
