import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneSpace as baseTheme } from "react-syntax-highlighter/dist/esm/styles/prism";

import { markdownComponents as baseComponents } from "./MarkdownComponents";

import ts from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import c from "react-syntax-highlighter/dist/esm/languages/prism/c";

SyntaxHighlighter.registerLanguage("typescript", ts);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("c", c);

const codeTheme = {
  ...baseTheme,
  'code[class*="language-"]': {},
};

interface MarkdownRendererProps {
  content: string;
}

const markdownComponents = {
  ...baseComponents,
  code({ node, inline, className, children, ...props }: any) {
    const languageMatch = /language-(\w+)/.exec(className || "");

    if (!inline && languageMatch) {
      return (
        <div className="code-block-wrapper">
          <div className="code-lang-label">{languageMatch[1]}</div>
          <SyntaxHighlighter
            style={codeTheme}
            language={languageMatch[1]}
            PreTag="div"
            showLineNumbers
            className="code-block"
            lineProps={{
              style: {
                lineHeight: "1.6em",
                fontSize: "0.9rem",
                whiteSpace: "pre-wrap", // key for wrapping
                wordBreak: "break-word",
                overflowWrap: "anywhere",
              },
            }}
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </div>
      );
    }

    return (
      <code className="inline-code" {...props}>
        {children}
      </code>
    );
  },
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => (
  <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
    {content}
  </ReactMarkdown>
);

export default MarkdownRenderer;
