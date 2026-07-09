"use client";

import { ReactNode, useEffect } from "react";

const ScrollToTopOnUnmount = ({ children }: { children: ReactNode }) => {
  useEffect(
    () => () => {
      window.scroll(0, 0);
    },
    [],
  );

  return <>{children}</>;
};

export default ScrollToTopOnUnmount;
