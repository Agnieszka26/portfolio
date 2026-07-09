"use client";

import dynamic from "next/dynamic";
import { ReactNode, Suspense } from "react";

const Animation = dynamic(() => import("./Animation"), { ssr: false });

type LazyAnimationProps = {
  children: ReactNode;
  x?: number;
  y?: number;
};

function AnimationFallback({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

const LazyAnimation = ({ children, x, y }: LazyAnimationProps) => {
  return (
    <Suspense fallback={<AnimationFallback>{children}</AnimationFallback>}>
      <Animation x={x} y={y}>
        {children}
      </Animation>
    </Suspense>
  );
};

export default LazyAnimation;
