import React, { useEffect, useState, Suspense } from "react";
import remarkGfm from "remark-gfm";
import { LoadingSpinner } from "@components";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const [mdElement, setMdElement] = useState<React.ReactElement | null>(null);

  useEffect(() => {
    let mounted = true;

    async function renderMarkdown() {
      const { MarkdownAsync } = await import("react-markdown");
      const Blockquote = (await import("./Blockquotes")).default;
      const CodeBlock = (await import("./CodeBlock")).default;

      const rehypePlugins: any[] = [];
      if (content.includes("```mermaid")) {
        const rehypeMermaid = (await import("rehype-mermaid")).default;
        rehypePlugins.push(rehypeMermaid);
      }

      const markdownComponents = {
        blockquote: ({ children }: any) => (
          <Suspense fallback={<span>Loading blockquote…</span>}>
            <Blockquote>{children}</Blockquote>
          </Suspense>
        ),
        code: (props: any) => (
          <Suspense fallback={<span>Loading code…</span>}>
            <CodeBlock {...props} />
          </Suspense>
        ),
      };

      const element = await MarkdownAsync({
        remarkPlugins: [remarkGfm],
        rehypePlugins,
        components: markdownComponents,
        children: content,
      });

      if (mounted) setMdElement(element);
    }

    renderMarkdown();

    return () => {
      mounted = false;
    };
  }, [content]);

  if (!mdElement)
    return <LoadingSpinner text="Rendering..." fullscreen={false} />;

  return mdElement;
};

export default MarkdownRenderer;
