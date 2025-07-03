import Button from "@/atoms/Button/Button";
import Header from "@/typography/Header/Header";
import Paragraph from "@/typography/Paragraph/Paragraph";
import Image from "next/image";
import { FC } from "react";
import logo from "../../../public/logo.svg";
import styles from "./Footer.module.scss";
import s from "@/assets/styles/index.module.scss";
import cn from "classnames";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Footer: FC = () => {
    const t = useTranslations("Footer");
  return (
    <div className={styles.footerContainer}>
      <footer className={cn(styles.footer, s.container)}>
        <div className={styles.containerLeft}>
          <Header text={t("title")} color={"light"} />
          <Paragraph
            text={t("description")}
            color="light"
          />
        </div>
        <div className={styles.containerRight}>
          <Paragraph
            text={t("label_github")}
            color="light"
          />
          <Link href="https://github.com/Agnieszka26">
            <Button text={t("view_github")} color={"dark"} />
          </Link>
          <Paragraph
            text={t("label_email")}
            color="light"
          />
          <Link href="mailto:agna.medrek@gmail.com">
            <Button text={t('send_email')} color={"dark"} />
          </Link>
          <Paragraph
            text={t("subtitle")}
            color="light"
          />
        </div>
      </footer>
      <div className={styles.paragraphReserved}>
        <span>
          <Image src={logo} alt="logo" />
        </span>
        {t("all_rights_reserved")}
      </div>
    </div>
  );
};

export default Footer;
