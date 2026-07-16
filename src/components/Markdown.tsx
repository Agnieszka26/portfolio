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

  return (
    <div className={className}>
      <LazyMarkdown>{children}</LazyMarkdown>
    </div>
  );
}
