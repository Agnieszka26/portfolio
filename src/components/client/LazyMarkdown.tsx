"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const MarkdownContent = dynamic(() => import("./MarkdownContent"), {
  ssr: false,
});

type LazyMarkdownProps = {
  children: string;
};

const LazyMarkdown = ({ children }: LazyMarkdownProps) => {
  return (
    <Suspense fallback={<div>{children}</div>}>
      <MarkdownContent>{children}</MarkdownContent>
    </Suspense>
  );
};

export default LazyMarkdown;
