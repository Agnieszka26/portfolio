"use client";

import { usePathname } from "@/i18n/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";

/** Paths without a locale prefix, keyed by locale (`/post/slug`). */
export type PostAlternatePaths = Record<string, string>;

const PostAlternatePathsContext = createContext<PostAlternatePaths | null>(
  null,
);
const SetPostAlternatePathsContext = createContext<
  (paths: PostAlternatePaths | null) => void
>(() => {});

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export function PostAlternatePathsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [paths, setPaths] = useState<PostAlternatePaths | null>(null);
  const onPost = pathname === "/post" || pathname.startsWith("/post/");

  return (
    <SetPostAlternatePathsContext.Provider value={setPaths}>
      <PostAlternatePathsContext.Provider value={onPost ? paths : null}>
        {children}
      </PostAlternatePathsContext.Provider>
    </SetPostAlternatePathsContext.Provider>
  );
}

export function usePostAlternatePaths(): PostAlternatePaths | null {
  return useContext(PostAlternatePathsContext);
}

export function SetPostAlternatePaths({
  paths,
}: {
  paths: PostAlternatePaths;
}) {
  const setPaths = useContext(SetPostAlternatePathsContext);
  const serialized = JSON.stringify(paths);

  useIsomorphicLayoutEffect(() => {
    setPaths(JSON.parse(serialized) as PostAlternatePaths);
    return () => setPaths(null);
  }, [serialized, setPaths]);

  return null;
}
