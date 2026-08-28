import {
  getSingletonHighlighter,
  type BundledLanguage,
} from "shiki";

const THEME = "dark-plus";

const LANGS = [
  "typescript",
  "tsx",
  "javascript",
  "jsx",
  "json",
  "html",
  "css",
  "bash",
] as const satisfies ReadonlyArray<BundledLanguage>;

const LANG_ALIASES: Record<string, BundledLanguage> = {
  ts: "typescript",
  typescript: "typescript",
  tsx: "tsx",
  js: "javascript",
  javascript: "javascript",
  jsx: "jsx",
  json: "json",
  html: "html",
  css: "css",
  bash: "bash",
  sh: "bash",
  shell: "bash",
};

let highlighterPromise: ReturnType<typeof getSingletonHighlighter> | null =
  null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = getSingletonHighlighter({
      themes: [THEME],
      langs: [...LANGS],
    });
  }
  return highlighterPromise;
}

export function resolveCodeLanguage(
  language: string | null | undefined,
  code: string,
): BundledLanguage {
  const fromField = language?.trim().toLowerCase();
  if (fromField && LANG_ALIASES[fromField]) {
    return LANG_ALIASES[fromField];
  }
  if (fromField && (LANGS as readonly string[]).includes(fromField)) {
    return fromField as BundledLanguage;
  }
  return guessLanguage(code);
}

function guessLanguage(code: string): BundledLanguage {
  const trimmed = code.trim();

  if (
    /^\{[\s\S]*\}$/.test(trimmed) &&
    /"[^"]+"\s*:/.test(trimmed) &&
    !/^\s*(type|const|let|var|interface|function|class)\b/m.test(trimmed)
  ) {
    return "json";
  }

  if (
    /<[A-Z][A-Za-z0-9.]*[\s/>]/.test(code) ||
    /return\s*\(\s*</.test(code)
  ) {
    return "tsx";
  }

  if (
    /^<\/?[a-z][\w-]*[\s/>]/.test(trimmed) &&
    !/^\s*(type|const|let|var|interface|function|class)\b/.test(trimmed)
  ) {
    return "html";
  }

  if (/^(npm |pnpm |yarn |git |cd |echo |#!)/m.test(trimmed)) {
    return "bash";
  }

  return "typescript";
}

/** VS Code Dark+ highlighting. HTML is escaped by Shiki. */
export async function highlightCode(
  code: string,
  language?: string | null,
): Promise<string> {
  const highlighter = await getHighlighter();
  const lang = resolveCodeLanguage(language, code);

  try {
    return highlighter.codeToHtml(code, {lang, theme: THEME});
  } catch {
    return highlighter.codeToHtml(code, {lang: "typescript", theme: THEME});
  }
}
