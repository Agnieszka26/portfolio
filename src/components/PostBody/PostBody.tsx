import { highlightCode } from "@/lib/highlightCode";
import { expandHtmlCodeBlocks } from "@/lib/portableText/expandHtmlCodeBlocks";
import {
  buildHeadingOutline,
  type HeadingLevel,
} from "@/lib/portableText/headingOutline";
import type { PortableTextCodeBlock, PortableTextValue } from "@/types/post";
import { PortableText, type PortableTextComponents } from "next-sanity";
import type { ReactNode } from "react";
import styles from "./PostBody.module.scss";

type PostBodyProps = {
  value: PortableTextValue;
  title?: string | null;
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

const HEADING_TAG: Record<
  HeadingLevel,
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
};

function HeadingBlock({
  level,
  ids,
  children,
  value,
}: {
  level: HeadingLevel;
  ids: ReadonlyMap<string, string>;
  children?: ReactNode;
  value: { _key?: string };
}) {
  const Tag = HEADING_TAG[level];
  const id = value._key ? ids.get(value._key) : undefined;

  return (
    <Tag id={id} tabIndex={id ? -1 : undefined}>
      {children}
    </Tag>
  );
}

function createComponents(
  ids: ReadonlyMap<string, string>,
): PortableTextComponents {
  function heading(level: HeadingLevel) {
    function PostHeading(props: {
      children?: ReactNode;
      value: { _key?: string };
    }) {
      return <HeadingBlock level={level} ids={ids} {...props} />;
    }

    return PostHeading;
  }

  return {
    block: {
      h1: heading(1),
      h2: heading(2),
      h3: heading(3),
      h4: heading(4),
      h5: heading(5),
      h6: heading(6),
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
}

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

export default async function PostBody({ value, title }: PostBodyProps) {
  if (!value?.length) return null;

  const blocks = await withHighlightedCode(expandHtmlCodeBlocks(value));
  const ids = new Map(
    buildHeadingOutline(blocks, title).map((heading) => [
      heading.key,
      heading.id,
    ]),
  );

  return (
    <div className={styles.body}>
      <PortableText value={blocks} components={createComponents(ids)} />
    </div>
  );
}
