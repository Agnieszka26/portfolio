import { highlightCode } from "@/lib/highlightCode";
import { expandHtmlCodeBlocks } from "@/lib/portableText/expandHtmlCodeBlocks";
import type { PortableTextCodeBlock, PortableTextValue } from "@/types/post";
import { PortableText, type PortableTextComponents } from "next-sanity";
import type { ReactNode } from "react";
import styles from "./PostBody.module.scss";

type PostBodyProps = {
  value: PortableTextValue;
};

type LinkMarkValue = {
  href?: string;
  openInNewTab?: boolean | null;
};

type HighlightedCodeBlock = PortableTextCodeBlock & {
  highlightedHtml?: string;
};

function CodeBlock({ value }: { value: HighlightedCodeBlock }) {
  if (value.highlightedHtml) {
    return (
      <div
        className={styles.pre}
        dangerouslySetInnerHTML={{ __html: value.highlightedHtml }}
      />
    );
  }

  if (!value?.code) return null;

  return (
    <pre className={styles.preFallback}>
      <code>{value.code}</code>
    </pre>
  );
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    normal: ({ children }) => {
      if (isEmptyPortableTextChildren(children)) return null;
      return <p>{children}</p>;
    },
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => <code>{children}</code>,
    link: ({ children, value }) => {
      const mark = value as LinkMarkValue | undefined;
      const href = mark?.href;
      if (!href) return <>{children}</>;

      const external = mark?.openInNewTab || /^https?:\/\//i.test(href);
      return (
        <a
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    codeBlock: ({ value }) => (
      <CodeBlock value={value as HighlightedCodeBlock} />
    ),
  },
};

function isEmptyPortableTextChildren(children: ReactNode): boolean {
  if (children == null || children === false) return true;
  if (typeof children === "string") return children.trim() === "";
  if (Array.isArray(children)) {
    return children.every((child) => isEmptyPortableTextChildren(child));
  }
  return false;
}

async function withHighlightedCode(
  blocks: PortableTextValue,
): Promise<PortableTextValue> {
  return Promise.all(
    blocks.map(async (block) => {
      if (block._type !== "codeBlock") return block;
      const highlightedHtml = await highlightCode(block.code, block.language);
      return { ...block, highlightedHtml };
    }),
  );
}

export default async function PostBody({ value }: PostBodyProps) {
  if (!value?.length) return null;

  const blocks = await withHighlightedCode(expandHtmlCodeBlocks(value));

  return (
    <div className={styles.body}>
      <PortableText value={blocks} components={components} />
    </div>
  );
}
