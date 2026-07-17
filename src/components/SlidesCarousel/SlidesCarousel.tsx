"use client";

import type { SlideImage } from "@/types";
import Image from "next/image";
import { FC, useCallback, useState, type KeyboardEvent } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import cn from "classnames";
import styles from "./SlidesCarousel.module.scss";

const CAROUSEL_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px";

function isSlideNearActive(
  slideIndex: number,
  activeIndex: number,
  count: number,
): boolean {
  if (count <= 1) return true;

  const directDistance = Math.abs(slideIndex - activeIndex);
  const wrapDistance = count - directDistance;
  return Math.min(directDistance, wrapDistance) <= 1;
}

const SlidesCarousel: FC<{ slides: SlideImage[] }> = ({ slides }) => {
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
    <div className={styles.root} tabIndex={0} onKeyDown={onKeyDown}>
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
          {slides.map((slide, i) => {
            const isActive = i === index;
            const shouldRenderImage = isSlideNearActive(i, index, count);
            const { url: src, width, height } = slide;

            return (
              <div
                key={slide.id || `slide-${i}`}
                className={styles.slide}
                style={{ width: `${slideWidthPercent}%` }}
                aria-hidden={!isActive}
              >
                {shouldRenderImage ? (
                  <Image
                    className={styles.image}
                    src={src}
                    alt={`Agnieszka Mędrek - Portfolio: Slide ${i + 1} of ${count} | Use case example`}
                    width={width}
                    height={height}
                    sizes={CAROUSEL_SIZES}
                    quality={85}
                    priority={isActive}
                    loading={isActive ? undefined : "lazy"}
                    draggable={false}
                  />
                ) : (
                  <div
                    className={styles.slidePlaceholder}
                    style={{ aspectRatio: `${width} / ${height}` }}
                    aria-hidden
                  />
                )}
              </div>
            );
          })}
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
          <div
            className={styles.dots}
            role="tablist"
            aria-label="Slide indicators"
          >
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
