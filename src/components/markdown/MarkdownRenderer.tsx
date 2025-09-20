import React, { useEffect, useState, Suspense } from "react";
import { LoadingSpinner } from "@components";
import { useContentProcessor } from "@hooks";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface MarkdownRendererProps {
  content: string;
  enableMathJax?: boolean;
}

const mathJaxConfig = {
  tex: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
    processEscapes: true,
  },
  options: {
    skipHtmlTags: ["script", "noscript", "style", "textarea", "pre", "code"],
    menuOptions: {
      settings: {
        breakInline: false,

        enrich: false,
        collapsible: true,
      },
    },
  },
  svg: { fontCache: "local" },
  loader: { load: ["ui/lazy"] },
  output: {
    linebreaks: {
      inline: false,
    },
  },
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  enableMathJax = false,
}) => {
  const [mdElement, setMdElement] = useState<React.ReactElement | null>(null);

  useEffect(() => {
    async function renderMarkdown() {
      const { MarkdownAsync } = await import("react-markdown");
      const Blockquote = (await import("./Blockquotes")).default;
      const CodeBlock = (await import("./CodeBlock")).default;

      const remarkPlugins: any[] = [(await import("remark-gfm")).default];
      const rehypePlugins: any[] = [];

      if (content.includes("```mermaid")) {
        rehypePlugins.push((await import("rehype-mermaid")).default);
      }

      if (enableMathJax) {
        remarkPlugins.push((await import("remark-math")).default);
        const rehypeMathjax = (await import("rehype-mathjax/browser")).default;
        rehypePlugins.push([rehypeMathjax, mathJaxConfig]);
      }

      const element = await MarkdownAsync({
        remarkPlugins,
        rehypePlugins,
        components: {
          blockquote: ({ children }) => (
            <Suspense fallback={<span>Loading...</span>}>
              <Blockquote>{children}</Blockquote>
            </Suspense>
          ),
          code: (props) => (
            <Suspense fallback={<span>Loading...</span>}>
              <CodeBlock {...props} />
            </Suspense>
          ),
        },
        children: content,
      });

      setMdElement(element);
    }

    renderMarkdown();
  }, [content, enableMathJax]);

  useContentProcessor({ enableMathJax, mathJaxConfig });

  return mdElement || <LoadingSpinner text="Rendering..." fullscreen={false} />;
};

export default MarkdownRenderer;
