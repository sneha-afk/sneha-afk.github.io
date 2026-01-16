import React, { useState, useEffect, useCallback } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneSpace as baseTheme } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyIcon, CheckIcon } from "@components/ui/Icons";

const COPY_FEEDBACK_DURATION = 1500;

const codeTheme = {
  ...baseTheme,
  'code[class*="language-"]': {
    ...baseTheme['code[class*="language-"]'],
    background: "transparent",
  },
};

const loaders: Record<string, () => Promise<{ default: unknown }>> = {
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

const loadedLanguages = new Set<string>();
const loadLanguage = async (lang: string): Promise<boolean> => {
  if (loadedLanguages.has(lang)) return true;
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

const useClipboard = (duration = COPY_FEEDBACK_DURATION) => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      if (!navigator.clipboard) return;
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), duration);
      } catch (err) {
        console.error("Failed to copy", err);
      }
    },
    [duration]
  );

  return { copied, copy, available: !!navigator.clipboard };
};

const useLanguageLoader = (lang: string) => {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (lang === "mermaid") {
      setReady(true);
      return;
    }

    let mounted = true;
    loadLanguage(lang).then((success) => {
      if (!mounted) return;
      setError(!success && !!loaders[lang]);
      setReady(true);
    });

    return () => {
      mounted = false;
    };
  }, [lang]);

  return { ready, error };
};

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
  const { ready, error } = useLanguageLoader(language);
  const { copied, copy, available } = useClipboard();

  if (language === "mermaid") return <div className="mermaid">{children}</div>;
  if (!ready || error)
    return (
      <pre className="code-block-fallback" {...props}>
        {children}
      </pre>
    );

  return (
    <div className="code-block-wrapper">
      <button
        type="button"
        className={`code-copy${copied ? " is-copied" : ""}`}
        onClick={() => copy(children)}
        disabled={!available}
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
