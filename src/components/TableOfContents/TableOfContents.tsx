"use client";

import type { HeadingOutlineItem } from "@/lib/portableText/headingOutline";
import cn from "classnames";
import { useTranslations } from "next-intl";
import { useEffect, useId, useState } from "react";
import styles from "./TableOfContents.module.scss";

type TableOfContentsProps = {
  items: HeadingOutlineItem[];
};

const LEVEL_CLASS: Record<HeadingOutlineItem["level"], string | undefined> = {
  1: undefined,
  2: styles.level2,
  3: styles.level3,
  4: styles.level4,
  5: styles.level5,
  6: styles.level6,
};

function anchorOffsetPx(nav: HTMLElement): number {
  const raw = getComputedStyle(nav).getPropertyValue("--anchor-offset").trim();
  const amount = Number.parseFloat(raw);
  if (!Number.isFinite(amount)) return 0;
  if (raw.endsWith("rem")) {
    const root =
      Number.parseFloat(getComputedStyle(document.documentElement).fontSize) ||
      16;
    return amount * root;
  }
  return amount;
}

function activeHeadingId(
  items: HeadingOutlineItem[],
  line: number,
): string | null {
  let active: string | null = null;
  let firstVisible: string | null = null;

  for (const item of items) {
    const node = document.getElementById(item.id);
    if (!node) continue;
    const top = node.getBoundingClientRect().top;
    if (
      firstVisible === null &&
      top < window.innerHeight &&
      top + node.offsetHeight > 0
    ) {
      firstVisible = item.id;
    }
    if (top <= line) active = item.id;
  }

  return active ?? firstVisible;
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const t = useTranslations("BlogPage");
  const labelId = useId();
  const [nav, setNav] = useState<HTMLElement | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!nav || items.length === 0) return;

    let frame = 0;
    let line = anchorOffsetPx(nav) + 32;
    const sync = () => {
      frame = 0;
      const next = activeHeadingId(items, line);
      setActiveId((current) => (current === next ? current : next));
    };
    const requestSync = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(sync);
    };
    const onResize = () => {
      line = anchorOffsetPx(nav) + 32;
      requestSync();
    };

    const nodes = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node instanceof HTMLElement);

    const observer = new IntersectionObserver(requestSync, {
      rootMargin: "0px 0px -40% 0px",
      threshold: [0, 1],
    });
    nodes.forEach((node) => observer.observe(node));

    sync();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("hashchange", requestSync);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("hashchange", requestSync);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items, nav]);

  if (items.length === 0) return null;

  const activeIndex = items.findIndex((item) => item.id === activeId);

  return (
    <nav className={styles.toc} aria-labelledby={labelId} ref={setNav}>
      <p id={labelId} className={styles.kicker}>
        {t("onThisPage")}
      </p>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const state =
            activeIndex === -1
              ? undefined
              : index < activeIndex
                ? styles.passed
                : index === activeIndex
                  ? styles.current
                  : undefined;

          return (
            <li
              key={item.id}
              className={cn(
                styles.item,
                LEVEL_CLASS[item.level],
                item.level <= 2 && styles.group,
                state,
              )}
              aria-current={index === activeIndex ? "location" : undefined}
            >
              <span className={styles.mark} aria-hidden="true" />
              <a className={styles.link} href={`#${item.id}`}>
                {item.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
