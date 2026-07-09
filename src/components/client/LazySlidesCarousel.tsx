"use client";

import { ImageDb } from "@/types";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const SlidesCarousel = dynamic(
  () => import("@/components/SlidesCarousel/SlidesCarousel"),
  { ssr: false },
);

type LazySlidesCarouselProps = {
  slides: ImageDb[];
};

const LazySlidesCarousel = ({ slides }: LazySlidesCarouselProps) => {
  return (
    <Suspense fallback={null}>
      <SlidesCarousel slides={slides} />
    </Suspense>
  );
};

export default LazySlidesCarousel;
