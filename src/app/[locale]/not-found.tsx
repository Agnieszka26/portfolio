import { RoutesPath } from "@/constants";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import styles from "@/assets/styles/index.module.scss";
export default function NotFound() {
  const t = useTranslations("TechnicalDescriptionPage")
  const locale = useLocale();

  return (
    <div className={styles.page}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}>
      <div className={styles.box}>

        <h1 style={{ margin: "0 0 0.75rem", fontSize: "1.75rem" }}>
          {t("not_found_title")}
        </h1>
        <p style={{ margin: 0, opacity: 0.75 }}>
          {t("not_found_body")}
        </p>
        <Link
         href={`/${locale}${RoutesPath.PROJECTS}`}
         className={styles.link}
       >
         {t("not_found_link")}
        </Link>
      </div>
    </div>
  );
}
