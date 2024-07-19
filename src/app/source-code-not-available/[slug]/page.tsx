"use client";
import Button from "@/atoms/Button/Button";
import Description from "@/components/Description/Description";
import { descriptions } from "@/constants/desctiptions";
import Header from "@/typography/Header/Header";
import Paragraph from "@/typography/Paragraph/Paragraph";
import { useEffect } from "react";
import styles from "@/assets/styles/index.module.scss";

type ParamsSlug = "trudly" | "trudly_mini" | "kettlo" | "smartwear";

export default function SourceCodeNotAvailable({
  params,
}: {
  params: { slug: ParamsSlug };
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

    <div className={styles.page}>


      <Header text={"Sorry, the code is not available!"} color={"dark"} />

      <Paragraph
        text={
          "There is description of the project below, although are you interested to talk about my programming and coding skills? You are welcome to reach me on: "
        }
        color={"dark"}
      />

      <a href="https://www.linkedin.com/in/agnieszka-m%C4%99drek/">
        <Button text={"LinkedIn"} color={"light"} />
      </a>

      <a href="https://www.instagram.com/amedrek/">
        <Button text={"Instagram"} color={"light"} />
      </a>


      <div className={styles.gridContainer}>

        <Description section={descriptions[params.slug]?.overview} />
        <Description section={descriptions[params.slug]?.technologies} />
        <Description section={descriptions[params.slug]?.backend} />
        <Description section={descriptions[params.slug]?.keyFeatures} />

      </div>


    </div>

  );
}
