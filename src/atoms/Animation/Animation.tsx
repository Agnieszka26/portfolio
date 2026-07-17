"use client";

import cn from "classnames";
import {
  CSSProperties,
  ElementType,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Animation.module.scss";
import { observeReveal, unobserveReveal } from "./revealObserver";

export type AnimationType =
  | "fade"
  | "fade-up"
  | "fade-down"
  | "slide-left"
  | "slide-right";

const typeClassMap: Record<AnimationType, string> = {
  fade: styles.fade,
  "fade-up": styles.fadeUp,
  "fade-down": styles.fadeDown,
  "slide-left": styles.slideLeft,
  "slide-right": styles.slideRight,
};

interface AnimationProps {
  children: ReactNode;
  type?: AnimationType;
  className?: string;
  as?: ElementType;
  threshold?: number;
  duration?: number;
  distance?: number;
  /**
   * Skip entrance animation and render content immediately.
   * Use for above-the-fold / LCP-critical content.
   */
  aboveTheFold?: boolean;
  /** Alias for `aboveTheFold` — disables the initial hide/reveal. */
  disableInitialAnimation?: boolean;
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function isElementInViewport(element: Element, threshold: number) {
  const rect = element.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const viewportWidth =
    window.innerWidth || document.documentElement.clientWidth;

  const visibleHeight =
    Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
  const visibleWidth =
    Math.min(rect.right, viewportWidth) - Math.max(rect.left, 0);

  if (visibleHeight <= 0 || visibleWidth <= 0) {
    return false;
  }

  const visibleRatio =
    (visibleHeight * visibleWidth) / (rect.width * rect.height || 1);

  return visibleRatio >= threshold;
}

type RevealPhase = "resting" | "pending" | "revealed";

const Animation = ({
  children,
  type = "fade-up",
  className,
  as: Component = "div",
  threshold = 0.3,
  duration = 0.25,
  distance = 20,
  aboveTheFold = false,
  disableInitialAnimation = false,
}: AnimationProps) => {
  const skipEntrance = aboveTheFold || disableInitialAnimation;
  const ref = useRef<HTMLElement>(null);
  // Progressive enhancement: visible by default (SSR + first paint).
  // Below-fold content is only hidden after mount, while off-screen.
  const [phase, setPhase] = useState<RevealPhase>(
    skipEntrance ? "revealed" : "resting",
  );

  useEffect(() => {
    if (skipEntrance) {
      return;
    }

    const element = ref.current;
    if (!element) {
      // `as` didn't forward the ref — fail open rather than hiding content.
      setPhase("revealed");
      return;
    }

    if (prefersReducedMotion()) {
      setPhase("revealed");
      return;
    }

    // Already on screen: keep visible, skip entrance animation (LCP-safe).
    if (isElementInViewport(element, threshold)) {
      setPhase("revealed");
      return;
    }

    // Off-screen: hide, then reveal on scroll.
    setPhase("pending");

    const reveal = () => setPhase("revealed");
    observeReveal(element, reveal, threshold);

    return () => unobserveReveal(element);
  }, [threshold, skipEntrance]);

  const inlineStyle = {
    "--animation-duration": `${duration}s`,
    "--animation-distance": `${distance}px`,
  } as CSSProperties;

  return (
    <Component
      ref={ref}
      className={cn(
        styles.root,
        typeClassMap[type],
        phase === "pending" && styles.pending,
        phase === "revealed" && styles.isVisible,
        className,
      )}
      style={inlineStyle}
    >
      {children}
    </Component>
  );
};

export default Animation;
