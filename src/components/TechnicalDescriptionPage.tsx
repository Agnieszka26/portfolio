"use client";
import styles from "@/assets/styles/index.module.scss";
import Button from "@/atoms/Button/Button";
import { Detail } from "@/types";
import Header from "@/typography/Header/Header";
import Paragraph from "@/typography/Paragraph/Paragraph";
import { useEffect } from "react";
import Description from "./Description/Description";
import cn from "classnames";
import Link from "next/link";
import { useTranslations } from "next-intl";
import OrbitingLayout from "./OrbitingLayout/OrbitingLayout";

export default function TechnicalDescriptionPage({
  detail,
}: {
  detail?: Detail;
}) {
  const t = useTranslations("TechnicalDescriptionPage");  
  useEffect(
    () => () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    [],
  );
  return (
    <div className={cn(styles.page, styles.container)}>
      <Header text={t("title")} color={"dark"} />

      <Paragraph
        text={t("subtitle")} 
        color={"dark"}
      />

      <Link href="https://www.linkedin.com/in/agnieszka-m%C4%99drek/">
        <Button text={"LinkedIn"} color={"light"} />
      </Link>

      <Link href="https://www.instagram.com/amedrek/">
        <Button text={"Instagram"} color={"light"} />
      </Link>
      <div style={{height: "100vh"}}>

      {detail &&  <OrbitingLayout><Description text={detail.overview} /> </OrbitingLayout> }
      </div>
        {/* <div className={styles.gridContainer}>
          {/* <Description text={detail.overview} />
          <Description text={detail.keyFeatures} />
          <Description text={detail.technologies} />
          <Description text={detail.backend} /> 
        </div> */}
 
    </div>
  );
}
