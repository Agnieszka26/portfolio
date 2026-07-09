"use client";

import ReactMarkdown from "react-markdown";

type MarkdownContentProps = {
  children: string;
};

const MarkdownContent = ({ children }: MarkdownContentProps) => {
  return <ReactMarkdown>{children}</ReactMarkdown>;
};

export default MarkdownContent;
