import LazyMarkdown from "@/components/client/LazyMarkdown";

type MarkdownProps = {
  children: string;
  className?: string;
};

/**
 * Reusable Markdown renderer for Sanity `markdownContent` fields.
 * Supports GFM: headings, emphasis, links, lists, code, blockquotes, tables.
 */
export default function Markdown({ children, className }: MarkdownProps) {
  if (!children) return null;

  const content = <LazyMarkdown>{children}</LazyMarkdown>;

  return className ? <div className={className}>{content}</div> : content;  
}
