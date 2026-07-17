"use client";

import styles from "@/assets/styles/index.module.scss";
import Animation from "@/atoms/Animation/Animation";
import Button from "@/atoms/Button/Button";
import Header from "@/typography/Header/Header";
import Paragraph from "@/typography/Paragraph/Paragraph";
import Link from "next/link";
import Image from "next/image";
import image from "@/assets/images/undraw_proud-coder_9prj.svg";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("ContactPage");

  return (
    <div className={styles.page}>
      <Animation type="fade-down" aboveTheFold>
        <div className={[styles.container, styles.contactPage].join(" ")}>
          <div className={styles.containerLeft}>
            <Header text={t("title")} color={"dark"} as="h1" />
            <Paragraph text={t("subtitle")} color="dark" />

            <Link href="https://www.linkedin.com/in/agnieszka-m%C4%99drek/">
              <Button text={t("go_linkedin")} color={"light"} />
            </Link>

            <Link href="mailto:agna.medrek@gmail.com">
              <Button text={t("send_email")} color={"light"} />
            </Link>
          </div>

          <Image
            src={image}
            alt="contact"
            className={styles.image}
            width={500}
            height={500}
          />
        </div>
      </Animation>
    </div>
  );
}
