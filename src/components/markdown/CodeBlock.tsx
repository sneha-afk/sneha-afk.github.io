import React, { useState, useEffect, useRef } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneSpace as baseTheme } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyIcon, CheckIcon } from "@components/Icons";

const codeTheme = {
  ...baseTheme,
  'code[class*="language-"]': {
    ...baseTheme['code[class*="language-"]'],
    background: "transparent",
  },
};

const COPY_FEEDBACK_DURATION = 1500;
const loadedLanguages = new Set<string>();

const loaders: Record<string, () => Promise<any>> = {
  typescript: () => import("react-syntax-highlighter/dist/esm/languages/prism/typescript"),
  javascript: () => import("react-syntax-highlighter/dist/esm/languages/prism/javascript"),
  python: () => import("react-syntax-highlighter/dist/esm/languages/prism/python"),
  c: () => import("react-syntax-highlighter/dist/esm/languages/prism/c"),
  lua: () => import("react-syntax-highlighter/dist/esm/languages/prism/lua"),
  go: () => import("react-syntax-highlighter/dist/esm/languages/prism/go"),
  powershell: () => import("react-syntax-highlighter/dist/esm/languages/prism/powershell"),
  json: () => import("react-syntax-highlighter/dist/esm/languages/prism/json"),
  bash: () => import("react-syntax-highlighter/dist/esm/languages/prism/bash"),
};

const loadLanguage = async (lang: string): Promise<boolean> => {
  if (!loaders[lang]) return false;
  try {
    const mod = await loaders[lang]();
    SyntaxHighlighter.registerLanguage(lang, mod.default);
    loadedLanguages.add(lang);
    return true;
  } catch (err) {
    console.error(`Failed to load language: ${lang}`, err);
    return false;
  }
};

const extractLanguage = (className?: string): string | null => className?.match(/language-(\w+)/)?.[1] ?? null;

const InlineCode: React.FC<React.HTMLAttributes<HTMLElement>> = ({ children, ...props }) => (
  <code className="inline-code" {...props}>
    {children}
  </code>
);

interface BlockCodeProps extends React.HTMLAttributes<HTMLPreElement> {
  language: string;
  children: string;
  showLineNumbers?: boolean;
}

const BlockCode: React.FC<BlockCodeProps> = ({ language, children, showLineNumbers = true, ...props }) => {
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (language === "mermaid") {
      setReady(true);
      return;
    }

    loadLanguage(language).then((success) => {
      if (!success && loaders[language]) setLoadError(true);
      setReady(true);
    });
  }, [language]);

  const handleCopy = async () => {
    if (!navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION);
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  // If language is mermaid, just render raw div
  if (language === "mermaid") return <div className="mermaid">{children}</div>;

  // Show raw code if Prism is still loading or failed
  if (!ready || loadError) {
    return (
      <pre className="code-block-fallback" {...props}>
        {children}
      </pre>
    );
  }

  return (
    <div className="code-block-wrapper" ref={wrapperRef}>
      <button
        type="button"
        className={`code-copy${copied ? " is-copied" : ""}`}
        onClick={handleCopy}
        disabled={!navigator.clipboard}
        aria-label={copied ? `Copied ${language} code` : `Copy ${language} code`}
      >
        <span className="code-copy-lang">{language}</span>
        {copied ? <CheckIcon aria-hidden /> : <CopyIcon aria-hidden />}
        <span className="sr-only" aria-live="polite">
          {copied && "Code copied to clipboard"}
        </span>
      </button>

      <SyntaxHighlighter
        style={codeTheme}
        language={language}
        PreTag="div"
        showLineNumbers={showLineNumbers}
        className="code-block"
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  showLineNumbers?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  inline = false,
  className = "",
  children,
  showLineNumbers = true,
  ...props
}) => {
  const code = String(children ?? "").replace(/\n$/, "");
  const lang = extractLanguage(className);

  return inline || !lang ? (
    <InlineCode {...props}>{children}</InlineCode>
  ) : (
    <BlockCode language={lang} showLineNumbers={showLineNumbers} {...(props as React.HTMLAttributes<HTMLPreElement>)}>
      {code}
    </BlockCode>
  );
};

export default CodeBlock;
