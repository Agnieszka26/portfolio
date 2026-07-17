import styles from "@/assets/styles/index.module.scss";
import pageStyles from "./TechnicalDescriptionPage.module.scss";
import { type ProjectDetails, toSlideImages } from "@/types";
import type { ReactNode } from "react";
import Description from "./Description/Description";
import cn from "classnames";
import Tag from "@/typography/Tag/Tag";
import LazySlidesCarousel from "@/components/client/LazySlidesCarousel";
import Markdown from "@/components/Markdown";
import Header from "@/typography/Header/Header";
import { getLocale, getTranslations } from "next-intl/server";
import Button from "@/atoms/Button/Button";
import ScrollToTopOnUnmount from "@/components/client/ScrollToTopOnUnmount";
import { Link } from "@/i18n/navigation";

function stackToTags(stack: string) {
  return stack
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function LabeledSection({
  id,
  label,
  children,
  className,
}: {
  id: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(pageStyles.section, className)}
      aria-labelledby={id}
    >
      <h2 id={id} className={pageStyles.sectionLabel}>
        {label}
      </h2>
      {children}
    </section>
  );
}

export default async function TechnicalDescriptionPage({
  detail,
  tags,
  linkToLive,
}: {
  detail: ProjectDetails;
  tags: string;
  linkToLive: string;
}) {
  const t = await getTranslations("TechnicalDescriptionPage");
  const locale = await getLocale();
  const stackTags = tags ? stackToTags(tags) : [];
  const slides = toSlideImages(detail.slides);

  return (
    <ScrollToTopOnUnmount>
      <div className={cn(styles.page, styles.container)}>
        <article className={pageStyles.article}>
          <div className={pageStyles.headerBlock}>
            <Header text={detail.header} color="dark" as="h1" />

            {tags?.length > 0 && (
              <div className={pageStyles.tagRow}>
                {stackTags.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </div>
            )}
          </div>
          <Link
            href={linkToLive}
            target="_blank"
            rel="noopener noreferrer"
            locale={locale}
            className={pageStyles.liveLink}
          >
            <Button text={t("see_live_preview")} color="light" />
          </Link>
          <aside className={pageStyles.notice} role="note">
            <Markdown>{detail.overview ?? ""}</Markdown>
          </aside>
          <div className={pageStyles.detailsGrid}>
            <LabeledSection id="section-tech" label={t("section_tech")}>
              <Description text={detail.technologies ?? ""} />
            </LabeledSection>
            <LabeledSection
              id="section-features"
              label={t("section_features")}
            >
              <Description text={detail.keyFeatures ?? ""} />
            </LabeledSection>
          </div>

          {slides.length > 0 ? (
            <LabeledSection
              id="section-gallery"
              label={t("section_gallery")}
              className={pageStyles.mediaSection}
            >
              <LazySlidesCarousel key={detail._id} slides={slides} />
            </LabeledSection>
          ) : null}

          <div className={pageStyles.detailsGrid}>
            <LabeledSection id="section-backend" label={t("section_backend")}>
              <Description text={detail.backend ?? ""} />
            </LabeledSection>
            {detail.challenges ? (
              <LabeledSection
                id="section-challenges"
                label={t("section_challenges")}
              >
                <Description text={detail.challenges} />
              </LabeledSection>
            ) : null}
          </div>
        </article>
      </div>
    </ScrollToTopOnUnmount>
  );
}
