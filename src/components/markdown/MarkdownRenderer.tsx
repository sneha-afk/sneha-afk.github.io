import React, { useEffect, useState, Suspense } from "react";
import { LoadingSpinner } from "@components";
import { useContentProcessor } from "@hooks";

interface MarkdownRendererProps {
  content: string;
  enableMathJax?: boolean;
  showLoadingSpinner?: boolean;
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
  showLoadingSpinner = true,
}) => {
  const [mdElement, setMdElement] = useState<React.ReactElement | null>(null);

  useEffect(() => {
    async function renderMarkdown() {
      const [
        { MarkdownAsync },
        BlockquoteModule,
        CodeBlockModule,
        remarkGfmModule,
        rehypeMermaidModule,
        remarkMathModule,
        rehypeMathjaxModule,
      ] = await Promise.all([
        import("react-markdown"),
        import("./Blockquotes"),
        import("./CodeBlock"),
        import("remark-gfm"),
        content.includes("```mermaid") ? import("rehype-mermaid") : Promise.resolve({ default: null }),
        enableMathJax ? import("remark-math") : Promise.resolve({ default: null }),
        enableMathJax ? import("rehype-mathjax/browser") : Promise.resolve({ default: null }),
      ]);

      const Blockquote = BlockquoteModule.default;
      const CodeBlock = CodeBlockModule.default;

      /* eslint-disable @typescript-eslint/no-explicit-any */
      const remarkPlugins: any[] = [remarkGfmModule.default];
      const rehypePlugins: any[] = [];
      /* eslint-enable @typescript-eslint/no-explicit-any */

      if (rehypeMermaidModule.default) {
        rehypePlugins.push([rehypeMermaidModule.default, { strategy: "inline-svg" }]);
      }

      if (remarkMathModule.default && rehypeMathjaxModule.default) {
        remarkPlugins.push(remarkMathModule.default);
        rehypePlugins.push([rehypeMathjaxModule.default, mathJaxConfig]);
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

  return mdElement || (showLoadingSpinner ? <LoadingSpinner text="Rendering..." fullscreen={false} /> : null);
};

export default MarkdownRenderer;
