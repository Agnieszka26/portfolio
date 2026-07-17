import styles from "@/assets/styles/index.module.scss";
import Button from "@/atoms/Button/Button";
import Header from "@/typography/Header/Header";
import Paragraph from "@/typography/Paragraph/Paragraph";
import cn from "classnames";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import Scroll from "../Scroll/Scroll";

interface HeroAreaProps {
  scrollTargetId?: string;
}

const HeroArea = async ({ scrollTargetId }: HeroAreaProps) => {
  const t = await getTranslations("HeroArea");

  return (
    <div className={cn(styles.heroArea)}>
      <div className={cn(styles.fixedBox, styles.container)}>
        <div className={cn(styles.containerLeft)}>
          <Header text={t("title")} color="light" as="h1" />

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
          <Scroll targetId={scrollTargetId} />
        </div>
      </div>
    </div>
  );
};

export default HeroArea;
