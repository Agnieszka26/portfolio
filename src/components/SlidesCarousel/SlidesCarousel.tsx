"use client";

import { ImageDb } from "@/types";
import Image from "next/image";
import {
  FC,
  useCallback,
  useEffect,
  useState,
  type KeyboardEvent,
} from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import cn from "classnames";
import styles from "./SlidesCarousel.module.scss";

const DESKTOP_MIN_WIDTH_PX = 768;
const CAROUSEL_SIZES = "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px";

type SlideImageSource = {
  src: string;
  width: number;
  height: number;
};

function slideImageSource(slide: ImageDb, preferLarge: boolean): SlideImageSource {
  if (preferLarge) {
    const large = slide.thumbnails?.large;
    return {
      src: large?.url ?? slide.thumbnails?.full?.url ?? slide.url,
      width: large?.width ?? slide.width,
      height: large?.height ?? slide.height,
    };
  }

  const small = slide.thumbnails?.small;
  const large = slide.thumbnails?.large;
  return {
    src: small?.url ?? large?.url ?? slide.thumbnails?.full?.url ?? slide.url,
    width: small?.width ?? large?.width ?? slide.width,
    height: small?.height ?? large?.height ?? slide.height,
  };
}

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

function usePrefersLargeThumbnail(): boolean {
  const [prefersLarge, setPrefersLarge] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(min-width: ${DESKTOP_MIN_WIDTH_PX}px)`,
    );
    setPrefersLarge(mediaQuery.matches);
    const onChange = (event: MediaQueryListEvent) => {
      setPrefersLarge(event.matches);
    };

    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return prefersLarge;
}
const SlidesCarousel: FC<{ slides: ImageDb[] }> = ({ slides }) => {
  const [index, setIndex] = useState(0);
  const prefersLargeThumbnail = usePrefersLargeThumbnail();
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
          {slides.map((slide, i) => {
            const isActive = i === index;
            const shouldRenderImage = isSlideNearActive(i, index, count);
            const { src, width, height } = slideImageSource(
              slide,
              prefersLargeThumbnail,
            );

            return (
              <div
                key={slide.id || `${slide.filename}-${i}`}
                className={styles.slide}
                style={{ width: `${slideWidthPercent}%` }}
                aria-hidden={!isActive}
              >
                {shouldRenderImage ? (
                  <Image
                    className={styles.image}
                    src={src}
                    alt={slide.filename || `Slide ${i + 1}`}
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
