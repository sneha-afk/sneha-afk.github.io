import React, { useState, useEffect } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneSpace as baseTheme } from "react-syntax-highlighter/dist/esm/styles/prism";

const codeTheme = {
  ...baseTheme,
  'code[class*="language-"]': {
    ...baseTheme['code[class*="language-"]'],
    background: "transparent",
  },
};

const COPY_FEEDBACK_DURATION = 1500;

const loaded = new Set<string>();
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

const loadLang = async (lang: string): Promise<boolean> => {
  if (loaded.has(lang) || !loaders[lang]) return false;

  try {
    const mod = await loaders[lang]();
    SyntaxHighlighter.registerLanguage(lang, mod.default);
    loaded.add(lang);
    return true;
  } catch (error) {
    console.error(`Failed to load language: ${lang}`, error);
    return false;
  }
};

const extractLanguage = (className?: string): string | null => {
  if (!className) return null;

  const classes = className.split(/\s+/);
  for (const cls of classes) {
    const match = /^language-(\w+)$/.exec(cls);
    if (match) return match[1];
  }

  return null;
};

export const CopyIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

export const CheckIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

const InlineCode: React.FC<InlineCodeProps> = ({ children, ...props }) => {
  return (
    <code className="inline-code" {...props}>
      {children}
    </code>
  );
};

interface BlockCodeProps extends React.HTMLAttributes<HTMLPreElement> {
  language: string;
  children: string;
  showLineNumbers?: boolean;
}

const BlockCode: React.FC<BlockCodeProps> = ({ language, children, showLineNumbers = true, ...props }) => {
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    // will be handled separately, no loading of a syntax
    if (language === "mermaid") {
      setReady(true);
      return;
    }

    loadLang(language).then((success) => {
      if (!success && loaders[language]) {
        setLoadError(true);
      }
      setReady(true);
    });
  }, [language]);

  const handleCopy = async () => {
    if (!navigator.clipboard) {
      console.warn("Clipboard API not available");
      return;
    }

    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  if (language === "mermaid") {
    return <div className="mermaid">{children}</div>;
  }

  if (!ready) {
    return (
      <pre className="code-block-loading" {...props}>
        {children}
      </pre>
    );
  }

  return (
    <div className="code-block-wrapper">
      <button
        type="button"
        className={`code-copy${copied ? " is-copied" : ""}`}
        onClick={handleCopy}
        disabled={!navigator.clipboard}
        aria-label={copied ? `Copied ${language} code to clipboard` : `Copy ${language} code to clipboard`}
      >
        <span className="code-copy-lang">{language}</span>
        {copied ? <CheckIcon aria-hidden /> : <CopyIcon aria-hidden />}

        <span className="sr-only" aria-live="polite">
          {copied && "Code copied to clipboard"}
        </span>
      </button>

      {loadError ? (
        <pre className="code-block-fallback" {...props}>
          {children}
        </pre>
      ) : (
        <SyntaxHighlighter
          style={codeTheme as any}
          language={language}
          PreTag="div"
          showLineNumbers={showLineNumbers}
          className="code-block"
        >
          {children}
        </SyntaxHighlighter>
      )}
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

  if (inline || !lang) {
    return <InlineCode {...props}>{children}</InlineCode>;
  }

  return (
    <BlockCode language={lang} showLineNumbers={showLineNumbers} {...(props as React.HTMLAttributes<HTMLPreElement>)}>
      {code}
    </BlockCode>
  );
};

export default CodeBlock;
