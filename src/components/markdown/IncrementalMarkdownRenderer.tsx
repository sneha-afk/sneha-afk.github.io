import React, { useEffect, useMemo, useRef, useState, memo } from "react";
import MarkdownRenderer from "@components/markdown/MarkdownRenderer";

const chunkMarkdownByHeaders = (content: string): string[] => {
  const chunks: string[] = [];
  const len = content.length;
  let chunkStart = 0;
  let i = 0;

  while (i < len) {
    // Skip code blocks
    if (content.slice(i, i + 3) === "```") {
      i += 3;
      while (i < len && content.slice(i, i + 3) !== "```") i++;
      if (i < len) i += 3;
      continue;
    }

    // Read current line
    const lineStart = i;
    while (i < len && content[i] !== "\n") i++;

    // Check if it's a header
    const line = content.slice(lineStart, i).trimStart();
    if (line.length > 0 && line[0] === "#" && /^#{1,6}\s/.test(line)) {
      if (lineStart > chunkStart) {
        chunks.push(content.slice(chunkStart, lineStart).trimEnd());
      }
      chunkStart = lineStart;
    }

    i++;
  }

  // Add final chunk
  if (chunkStart < len) {
    chunks.push(content.slice(chunkStart).trimEnd());
  }

  return chunks;
};

const MarkdownChunk = memo<{
  content: string;
  enableMathJax: boolean;
  isFirst: boolean;
}>(({ content, enableMathJax, isFirst }) => (
  <div className="markdown-chunk">
    <MarkdownRenderer content={content} enableMathJax={enableMathJax} showLoadingSpinner={isFirst} />
  </div>
));

MarkdownChunk.displayName = "MarkdownChunk";

interface Props {
  content: string;
  enableMathJax?: boolean;
  chunkDelayMs?: number;
  chunksPerTick?: number;
}

const IncrementalMarkdownRenderer: React.FC<Props> = ({
  content,
  enableMathJax = false,
  chunkDelayMs = 16,
  chunksPerTick = 1,
}) => {
  const chunks = useMemo(() => chunkMarkdownByHeaders(content), [content]);
  const [visible, setVisible] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (visible >= chunks.length) return;

    timerRef.current = window.setTimeout(() => {
      setVisible((prev) => Math.min(prev + chunksPerTick, chunks.length));
    }, chunkDelayMs);

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [visible, chunks.length, chunkDelayMs, chunksPerTick]);

  if (chunks.length === 0) return null;

  return (
    <>
      {chunks.slice(0, visible).map((chunk, i) => (
        <MarkdownChunk key={i} content={chunk} enableMathJax={enableMathJax} isFirst={i === 0} />
      ))}
    </>
  );
};

export default IncrementalMarkdownRenderer;
