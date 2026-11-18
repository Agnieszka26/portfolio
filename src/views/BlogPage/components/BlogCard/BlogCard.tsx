import { Link } from "@/i18n/navigation";
import { Post, postSlug, toRemoteCoverImage } from '@/types';
import React from 'react'
import Image from "next/image";
import { useTranslations } from "next-intl";
import cardStyles from "./BlogCard.module.scss";

function estimateReadingMinutes(excerpt: string | null | undefined): number {
    const words = (excerpt ?? "").trim().split(/\s+/).filter(Boolean).length;
    return Math.max(3, Math.ceil(words / 40) || 3);
  }

  function formatPublishedDate(isoDate: string, locale: string): string {
    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) return isoDate;
  
    return new Intl.DateTimeFormat(locale.startsWith("pl") ? "pl-PL" : "en-US", {
      timeZone: "UTC",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
      .format(date)
      .toUpperCase();
  }
  

const BlogCard = ({post, locale}: {post: Post, locale: string}) => {
    const slug = postSlug(post);
    const cover = toRemoteCoverImage(post.coverImage);
    const primaryTag = post.tags?.find((tag) => tag.trim())?.trim();
    const readingMinutes = estimateReadingMinutes(post.excerpt);
    const t = useTranslations("BlogPage");
    
    return (
      <li key={post._id} className={cardStyles.item}>
        <article>
          <Link
            href={`/post/${slug}`}
            className={cardStyles.link}
            aria-label={`${t("readMore")}: ${post.title}`}
          >
            <div className={cardStyles.imageWrap}>
              <Image
                src={cover.url}
                alt={post.coverImage?.alt?.trim() || post.title}
                fill
                sizes="(max-width: 764px) 100vw, 50vw"
                className={cardStyles.image}
              />
            </div>

            <div className={cardStyles.body}>
              {primaryTag ? (
                <span className={cardStyles.tag}>{primaryTag}</span>
              ) : null}

              <h2 className={cardStyles.title}>{post.title}</h2>

              {post.excerpt ? (
                <p className={cardStyles.excerpt}>{post.excerpt}</p>
              ) : null}

              <div className={cardStyles.meta}>
                <div className={cardStyles.metaText}>
                  <time dateTime={post.publishedAt}>
                    {formatPublishedDate(post.publishedAt, locale)}
                  </time>
                  <span className={cardStyles.dot} aria-hidden="true">
                    •
                  </span>
                  <span>
                    {t("readingTime", { minutes: readingMinutes })}
                  </span>
                </div>
                <span className={cardStyles.arrow} aria-hidden="true">
                  →
                </span>
              </div>
            </div>
          </Link>
        </article>
      </li>
    );
}

export default BlogCard