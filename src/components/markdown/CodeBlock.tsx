import React, { useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneSpace as baseTheme } from "react-syntax-highlighter/dist/esm/styles/prism";

import ts from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import js from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import c from "react-syntax-highlighter/dist/esm/languages/prism/c";
import lua from "react-syntax-highlighter/dist/esm/languages/prism/lua";
import go from "react-syntax-highlighter/dist/esm/languages/prism/go";

// Register languages
[
  ["typescript", ts],
  ["javascript", js],
  ["python", python],
  ["c", c],
  ["lua", lua],
  ["go", go],
].forEach(([name, lang]) => SyntaxHighlighter.registerLanguage(name, lang));

const codeTheme = { ...baseTheme, 'code[class*="language-"]': {} };

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  inline = false,
  className = "",
  children,
  ...props
}) => {
  const [copied, setCopied] = useState(false);
  const codeString = String(children ?? "").replace(/\n$/, "");
  const languageMatch = /language-(\w+)/.exec(className || "");
  const language = languageMatch?.[1];

  // Inline code
  if (inline || !language) {
    return (
      <code className="inline-code" {...props}>
        {children}
      </code>
    );
  }

  if (language === "mermaid") {
    return (
      <div
        className="mermaid"
        dangerouslySetInnerHTML={{ __html: codeString }}
      />
    );
  }

  // Regular syntax-highlighted block
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="code-block-wrapper">
      <div
        className="code-lang-label"
        onClick={handleCopy}
        style={{ cursor: "pointer" }}
        title={copied ? "Copied!" : `Copy ${language} code`}
      >
        {copied ? "✔" : `${language}`} 📋
      </div>
      <SyntaxHighlighter
        style={codeTheme as any}
        language={language}
        PreTag="div"
        showLineNumbers
        className="code-block"
        {...props}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
