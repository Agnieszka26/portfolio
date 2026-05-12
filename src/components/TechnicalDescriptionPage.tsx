"use client";

import styles from "@/assets/styles/index.module.scss";
import pageStyles from "./TechnicalDescriptionPage.module.scss";
import { Detail } from "@/types";
import { useEffect, type ReactNode } from "react";
import Description from "./Description/Description";
import cn from "classnames";
import Tag from "@/typography/Tag/Tag";
import SlidesCarousel from "./SlidesCarousel/SlidesCarousel";
import Header from "@/typography/Header/Header";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { RoutesPath } from "@/constants";
import Button from "@/atoms/Button/Button";
import ReactMarkdown from "react-markdown";

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

export default function TechnicalDescriptionPage({
  detail,
  tags,
  linkToLive,
}: {
  detail?: Detail;
  tags: string;
  linkToLive: string;
}) {
  const t = useTranslations("TechnicalDescriptionPage");
  const locale = useLocale();
  const stackTags = tags ? stackToTags(tags) : [];

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
      {!detail ? (
        <div className={pageStyles.empty}>
          <p className={pageStyles.emptyTitle}>{t("not_found_title")}</p>
          <p className={pageStyles.emptyBody}>{t("not_found_body")}</p>
          <Link
            href={RoutesPath.PROJECTS}
            locale={locale}
            className={pageStyles.emptyLink}
          >
            <Button text={t("not_found_link")} color="dark" />
          </Link>
        </div>
      ) : (
        <article className={pageStyles.article}>
          <div className={pageStyles.headerBlock}>
            <Header text={detail.header} color="dark" />

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
            locale={locale}
            className={pageStyles.emptyLink}
          >
            <Button text={t("see_live_preview")} color="light" />
          </Link>
          <aside className={pageStyles.notice} role="note">
            <ReactMarkdown>
              {detail.overview}
            </ReactMarkdown>
          </aside>
          <div className={pageStyles.detailsGrid}>

          <LabeledSection id="section-tech" label={t("section_tech")}>
            <Description text={detail.technologies} />
          </LabeledSection>
          <LabeledSection id="section-tech" label={t("section_features")}>
              <Description text={detail.keyFeatures} />
            </LabeledSection>
          </div>

          {detail.slides && detail.slides.length > 0 ? (
            <LabeledSection
              id="section-gallery"
              label={t("section_gallery")}
              className={pageStyles.mediaSection}
            >
              <SlidesCarousel key={detail.id} slides={detail.slides} />
            </LabeledSection>
          ) : null}

          <div className={pageStyles.detailsGrid}>
     
            <LabeledSection id="section-backend" label={t("section_backend")}>
              <Description text={detail.backend} />
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
      )}
    </div>
  );
}
