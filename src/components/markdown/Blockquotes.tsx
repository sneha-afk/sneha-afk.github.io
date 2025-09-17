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

const BlockquoteType = {
  INFO: "info",
  WARNING: "warning",
  DANGER: "danger",
  TIP: "tip",
  NOTE: "note",
};

const extractText = (children: React.ReactNode): string => {
  if (typeof children === "string") return children;
  if (typeof children === "number") return children.toString();
  if (!children) return "";
  if (Array.isArray(children)) return children.map(extractText).join("\n");
  if (React.isValidElement(children)) {
    const propsWithChildren = children.props as { children?: React.ReactNode };

    // Preserve paragraph breaks
    if (children.type === "p" || children.type === "div") {
      return extractText(propsWithChildren.children) + "\n";
    }

    // Preserve explicit line breaks
    if (children.type === "br") {
      return "\n";
    }

    return extractText(propsWithChildren.children);
  }
  return "";
};

interface CustomBlockquoteProps {
  children: React.ReactNode;
}

const CustomBlockquote: React.FC<CustomBlockquoteProps> = ({ children }) => {
  const text = extractText(children).trim();
  const match = text.match(/^(INFO|WARNING|DANGER|TIP|NOTE):\s*(.*)/is);

  if (!match) return <blockquote>{children}</blockquote>;

  const [, typeStr, content] = match;
  const type =
    BlockquoteType[typeStr.toUpperCase() as keyof typeof BlockquoteType];

  return (
    <blockquote className={`blockquote-${type}`} data-type={type}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ p: "span" }}>
        {content}
      </ReactMarkdown>
    </blockquote>
  );
};

export default CustomBlockquote;
