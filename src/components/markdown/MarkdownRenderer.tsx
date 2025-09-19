import React, { useEffect, useState, Suspense } from "react";
import { LoadingSpinner } from "@components";
import { useScript } from "@utils";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface MarkdownRendererProps {
  content: string;
  enableMathJax?: boolean;
}

const mathConfig = {
  tex: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
  },
  svg: { fontCache: "global" },
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  enableMathJax = false,
}) => {
  const [mdElement, setMdElement] = useState<React.ReactElement | null>(null);

  useScript(
    enableMathJax
      ? "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"
      : null,
    { async: true, defer: true },
  );

  useEffect(() => {
    if (!enableMathJax) return;
    if (!(window as any).MathJax) {
      (window as any).MathJax = mathConfig;
    }
  }, [enableMathJax]);

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
        rehypePlugins.push([rehypeMathjax, mathConfig]);
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

      if (enableMathJax && (window as any).MathJax?.typesetPromise) {
        (window as any).MathJax.typesetPromise();
      }
    }

    renderMarkdown();
  }, [content, enableMathJax]);

  return mdElement || <LoadingSpinner text="Rendering..." fullscreen={false} />;
};

export default MarkdownRenderer;
