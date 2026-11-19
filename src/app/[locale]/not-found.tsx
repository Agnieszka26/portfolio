import { RoutesPath } from "@/constants";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import styles from "@/assets/styles/index.module.scss";
export default function NotFound() {
  const t = useTranslations("TechnicalDescriptionPage");

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
        <Link href={RoutesPath.PROJECTS} className={styles.link}>
         {t("not_found_link")}
        </Link>
      </div>
    </div>
  );
}
