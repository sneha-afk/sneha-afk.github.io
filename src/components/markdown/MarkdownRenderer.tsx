import React, { useEffect, useState } from "react";
import { MarkdownAsync } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeMermaid from "rehype-mermaid";
import { markdownComponents } from "./MarkdownComponents";

import { LoadingSpinner } from "@components";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const [mdElement, setMdElement] = useState<React.ReactElement | null>(null);

  useEffect(() => {
    async function renderMarkdown() {
      const element = await MarkdownAsync({
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeMermaid],
        components: markdownComponents,
        children: content,
      });

      setMdElement(element);
    }

    renderMarkdown();
  }, [content]);

  if (!mdElement)
    return <LoadingSpinner text="Rendering..." fullscreen={false} />;

  return mdElement;
};

export default MarkdownRenderer;
