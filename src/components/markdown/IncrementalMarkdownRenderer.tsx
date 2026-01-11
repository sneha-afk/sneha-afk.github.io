import React, { useEffect, useMemo, useRef, useState } from "react";
import MarkdownRenderer from "@components/markdown/MarkdownRenderer";

function chunkMarkdownByHeaders(content: string): string[] {
  const chunks: string[] = [];
  const length = content.length;

  let chunkStart = 0; // start index of current chunk
  let i = 0;

  while (i < length) {
    // Detect start of a fenced code block
    if (content[i] === "`" && content.slice(i, i + 3) === "```") {
      i += 3; // skip opening fence

      // Skip until closing fence or EOF
      while (i < length && content.slice(i, i + 3) !== "```") i++;

      // Skip closing fence if present
      if (i < length) i += 3;

      continue; // go to next char
    }

    // Detect start of a line
    const lineStart = i;
    while (i < length && content[i] !== "\n") i++;
    const lineEnd = i;

    // Check if this line is a header
    const lineTrimmed = content.slice(lineStart, lineEnd).trimStart();
    if (
      lineTrimmed.length > 0 &&
      lineTrimmed[0] === "#" &&
      lineTrimmed.match(/^#{1,6}\s/) // fast check for # followed by space
    ) {
      // Push previous chunk if non-empty
      if (lineStart > chunkStart) {
        chunks.push(content.slice(chunkStart, lineStart).trimEnd());
      }
      chunkStart = lineStart; // start new chunk at this header
    }

    i++; // skip newline
  }

  // handle final chunk
  if (chunkStart < length) chunks.push(content.slice(chunkStart).trimEnd());

  return chunks;
}

interface IncrementalMarkdownRendererProps {
  content: string;
  enableMathJax?: boolean;
  chunkDelayMs?: number;
  chunksPerTick?: number;
}

const IncrementalMarkdownRenderer: React.FC<IncrementalMarkdownRendererProps> = ({
  content,
  enableMathJax = false,
  chunkDelayMs = 16,
  chunksPerTick = 1,
}) => {
  const chunks = useMemo(() => chunkMarkdownByHeaders(content), [content]);
  const [visibleChunks, setVisibleChunks] = useState(0);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (visibleChunks >= chunks.length) return;

    /**
     * - chunkDelayMs controls the delay between ticks (default: 16ms ~ one frame at 60fps)
     * - at each tick, show chunksPerTick
     * - re-runs when visibleChunks changes and schedules next tick until everything is shown
     */
    timerRef.current = window.setTimeout(() => {
      setVisibleChunks((prev) => Math.min(prev + chunksPerTick, chunks.length));
    }, chunkDelayMs);

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [visibleChunks, chunks.length, chunkDelayMs, chunksPerTick]);

  if (chunks.length === 0) return null;

  return (
    <>
      {chunks.slice(0, visibleChunks).map((chunk, index) => (
        <div key={index} className="markdown-chunk">
          <MarkdownRenderer content={chunk} enableMathJax={enableMathJax} showLoadingSpinner={index === 0} />
        </div>
      ))}
    </>
  );
};

export default IncrementalMarkdownRenderer;
