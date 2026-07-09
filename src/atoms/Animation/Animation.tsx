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
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

const Animation = ({
  children,
  type = "fade-up",
  className,
  as: Component = "div",
  threshold = 0.3,
  duration = 0.8,
  distance = 20,
}: AnimationProps) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    if (prefersReducedMotion()) {
      setIsVisible(true);
      return;
    }

    const reveal = () => setIsVisible(true);
    observeReveal(element, reveal, threshold);

    return () => unobserveReveal(element, threshold);
  }, [threshold]);

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
        isVisible && styles.isVisible,
        className,
      )}
      style={inlineStyle}
    >
      {children}
    </Component>
  );
};

export default Animation;
