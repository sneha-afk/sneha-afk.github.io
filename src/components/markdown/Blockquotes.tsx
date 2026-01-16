import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * CustomBlockquote Component
 *
 * Renders special blockquotes with type indicators.
 *
 * Usage in Markdown:
 * > INFO: Your informational message here
 * > WARNING: Your warning message here
 * > DANGER: Your danger message here
 * > TIP: Your tip message here
 * > NOTE: Your note message here
 */

const TYPES = {
  INFO: "info",
  WARNING: "warning",
  DANGER: "danger",
  TIP: "tip",
  NOTE: "note",
};

const extractText = (children: React.ReactNode): string => {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (!children) return "";
  if (Array.isArray(children)) return children.map(extractText).join("\n");

  if (React.isValidElement(children)) {
    const { children: nested } = children.props as { children?: React.ReactNode };

    if (children.type === "p" || children.type === "div") {
      return extractText(nested) + "\n";
    }
    if (children.type === "br") return "\n";

    return extractText(nested);
  }

  return "";
};

interface Props {
  children: React.ReactNode;
}

const CustomBlockquote: React.FC<Props> = ({ children }) => {
  const text = extractText(children).trim();
  const match = text.match(/^(INFO|WARNING|DANGER|TIP|NOTE):\s*(.*)/is);

  if (!match) {
    return <blockquote>{children}</blockquote>;
  }

  const [, typeStr, content] = match;
  const type = TYPES[typeStr.toUpperCase() as keyof typeof TYPES];

  return (
    <blockquote className={`blockquote-${type}`} data-type={type}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ p: "span" }}>
        {content}
      </ReactMarkdown>
    </blockquote>
  );
};

export default CustomBlockquote;
