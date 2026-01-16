import React, { useEffect, useState, Suspense, useCallback } from "react";
import { LoadingSpinner } from "@components";
import { useContentProcessor } from "@hooks";

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
  output: { linebreaks: { inline: false } },
};

const Loading = () => <span>Loading...</span>;

interface Props {
  content: string;
  enableMathJax?: boolean;
  showLoadingSpinner?: boolean;
}

const MarkdownRenderer: React.FC<Props> = ({ content, enableMathJax = false, showLoadingSpinner = true }) => {
  const [element, setElement] = useState<React.ReactElement | null>(null);

  const renderMarkdown = useCallback(async () => {
    const hasMermaid = content.includes("```mermaid");

    const [{ MarkdownAsync }, { default: Blockquote }, { default: CodeBlock }, { default: remarkGfm }, mermaid, math] =
      await Promise.all([
        import("react-markdown"),
        import("./Blockquotes"),
        import("./CodeBlock"),
        import("remark-gfm"),
        hasMermaid ? import("rehype-mermaid") : Promise.resolve({ default: null }),
        enableMathJax ? Promise.all([import("remark-math"), import("rehype-mathjax/browser")]) : Promise.resolve(null),
      ]);

    const remarkPlugins: any[] = [remarkGfm];
    const rehypePlugins: any[] = [];

    if (mermaid.default) {
      rehypePlugins.push([mermaid.default, { strategy: "inline-svg" }]);
    }

    if (math) {
      const [remarkMath, rehypeMathjax] = math;
      remarkPlugins.push(remarkMath.default);
      rehypePlugins.push([rehypeMathjax.default, mathJaxConfig]);
    }

    return MarkdownAsync({
      remarkPlugins,
      rehypePlugins,
      components: {
        blockquote: ({ children }) => (
          <Suspense fallback={<Loading />}>
            <Blockquote>{children}</Blockquote>
          </Suspense>
        ),
        code: (props) => (
          <Suspense fallback={<Loading />}>
            <CodeBlock {...props} />
          </Suspense>
        ),
      },
      children: content,
    });
  }, [content, enableMathJax]);

  useEffect(() => {
    let mounted = true;

    renderMarkdown().then((rendered) => {
      if (mounted) setElement(rendered);
    });

    return () => {
      mounted = false;
    };
  }, [renderMarkdown]);

  useContentProcessor({ enableMathJax, mathJaxConfig });

  return element ?? (showLoadingSpinner ? <LoadingSpinner text="Rendering..." fullscreen={false} /> : null);
};

export default MarkdownRenderer;
