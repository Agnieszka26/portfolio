"use client";

import { ReactNode, useEffect } from "react";

const ScrollToTopOnUnmount = ({ children }: { children: ReactNode }) => {
  useEffect(
    () => () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    [],
  );

  return <>{children}</>;
};

export default ScrollToTopOnUnmount;
