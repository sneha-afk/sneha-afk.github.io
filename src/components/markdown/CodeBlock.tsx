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
SyntaxHighlighter.registerLanguage("typescript", ts);
SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("c", c);
SyntaxHighlighter.registerLanguage("lua", lua);
SyntaxHighlighter.registerLanguage("go", go);

const codeTheme = { ...baseTheme, 'code[class*="language-"]': {} };

const CodeBlock: React.FC<any> = ({
  inline,
  className,
  children,
  ...props
}) => {
  const languageMatch = /language-(\w+)/.exec(className || "");
  const [copied, setCopied] = useState(false);

  if (!inline && languageMatch) {
    const language = languageMatch[1];
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(String(children));
        setCopied(true);
        setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
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
          style={codeTheme}
          language={language}
          PreTag="div"
          showLineNumbers
          className="code-block"
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
};

export default CodeBlock;
