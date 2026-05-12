"use client";

import { ImageDb } from "@/types";
import { FC, useCallback, useState, type KeyboardEvent } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import cn from "classnames";
import styles from "./SlidesCarousel.module.scss";

function slideImageUrl(slide: ImageDb): string {
  return (
    slide.thumbnails?.large?.url ??
    slide.thumbnails?.full?.url ??
    slide.thumbnails?.small?.url ??
    slide.url
  );
}

const SlidesCarousel: FC<{ slides: ImageDb[] }> = ({ slides }) => {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const goPrev = useCallback(() => {
    setIndex((i) => (i <= 0 ? count - 1 : i - 1));
  }, [count]);

  const goNext = useCallback(() => {
    setIndex((i) => (i >= count - 1 ? 0 : i + 1));
  }, [count]);

  if (count === 0) return null;

  const trackWidthPercent = count * 100;
  const slideWidthPercent = 100 / count;
  const translatePercent = (index * 100) / count;

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    }
  };

  return (
    <div
      className={styles.root}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div
        className={styles.viewport}
        role="region"
        aria-roledescription="carousel"
        aria-label="Project slides"
      >
        <div
          className={styles.track}
          style={{
            width: `${trackWidthPercent}%`,
            transform: `translateX(-${translatePercent}%)`,
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.id || `${slide.filename}-${i}`}
              className={styles.slide}
              style={{ width: `${slideWidthPercent}%` }}
              aria-hidden={i !== index}
            >
              {/* Native img: slide URLs (e.g. Airtable) are not all in next.config remotePatterns */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles.image}
                src={slideImageUrl(slide)}
                alt={slide.filename || `Slide ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.navButton}
            onClick={goPrev}
            aria-label="Previous slide"
          >
            <FiChevronLeft size={22} aria-hidden />
          </button>
          <div className={styles.dots} role="tablist" aria-label="Slide indicators">
            {slides.map((slide, i) => (
              <button
                key={slide.id || `dot-${i}`}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(styles.dot, i === index && styles.dotActive)}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.navButton}
            onClick={goNext}
            aria-label="Next slide"
          >
            <FiChevronRight size={22} aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
};

export default SlidesCarousel;
