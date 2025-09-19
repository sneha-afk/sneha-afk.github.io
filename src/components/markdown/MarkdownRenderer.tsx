import React, { useEffect, useState, Suspense } from "react";
import { LoadingSpinner } from "@components";

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

  useEffect(() => {
    if (!enableMathJax) return;

    if (!(window as any).MathJax) {
      (window as any).MathJax = mathConfig;

      if (!document.getElementById("mathjax-script")) {
        const script = document.createElement("script");
        script.id = "mathjax-script";
        script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
        script.async = true;
        document.head.appendChild(script);
      }
    }
  }, [enableMathJax]);

  useEffect(() => {
    async function renderMarkdown() {
      const { default: ReactMarkdown } = await import("react-markdown");
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

      const element = (
        <ReactMarkdown
          remarkPlugins={remarkPlugins}
          rehypePlugins={rehypePlugins}
          components={{
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
          }}
        >
          {content}
        </ReactMarkdown>
      );

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
