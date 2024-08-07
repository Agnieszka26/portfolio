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

export default function TechnicalDescriptionPage({
  detail,
}: {
  detail?: Detail;
}) {
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
      <Header text={"Sorry, the code is not available!"} color={"dark"} />

      <Paragraph
        text={
          "There is description of the project below, although are you interested to talk about my programming and coding skills? You are welcome to reach me on: "
        }
        color={"dark"}
      />

      <Link href="https://www.linkedin.com/in/agnieszka-m%C4%99drek/">
        <Button text={"LinkedIn"} color={"light"} />
      </Link>

      <Link href="https://www.instagram.com/amedrek/">
        <Button text={"Instagram"} color={"light"} />
      </Link>
      {detail && (
        <div className={styles.gridContainer}>
          <Description text={detail.overview} />
          <Description text={detail.keyFeatures} />
          <Description text={detail.technologies} />
          <Description text={detail.backend} />
        </div>
      )}
    </div>
  );
}
