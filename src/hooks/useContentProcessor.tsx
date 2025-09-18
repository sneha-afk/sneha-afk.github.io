import { useEffect } from "react";
import { useScript } from "@utils";

interface UseContentProcessorOptions {
  enableMathJax?: boolean;
  enableMermaid?: boolean;
  dependencies?: React.DependencyList;
}

/**
 * Retry processor with async/await support:
 * - Calls `processFn` at multiple delays
 * - Awaits the result if it's a promise
 * - Stops early if `stopOnSuccess` is true and result is `true`
 */
const useRetryProcessor = (
  processFn: () => boolean | void | Promise<boolean | void>,
  dependencies: React.DependencyList,
  delays: number[] = [100, 300, 1000, 2000],
  stopOnSuccess = true,
) => {
  useEffect(() => {
    let stopped = false;
    const timeouts: number[] = [];

    delays.forEach((delay) => {
      const id = window.setTimeout(async () => {
        if (stopped) return;

        try {
          const result = await processFn();
          if (stopOnSuccess && result === true) {
            stopped = true;
            timeouts.forEach(clearTimeout);
          }
        } catch (err) {
          console.warn("Retry processor error:", err);
        }
      }, delay);

      timeouts.push(id);
    });

    return () => timeouts.forEach(clearTimeout);
  }, dependencies);
};

/**
 * useContentProcessor:
 * 1. Use `useScript` to inject an external script into the DOM (async)
 * 2. Can do any configurations within an effect here
 * 3. Wait for the `ready` state from the script, then dispatch a process function to:
 * 4. `useRetryProcessor` takes in timeouts to wait for a script to finish and can
 *      be stopped on first success as needed
 */
export const useContentProcessor = ({
  enableMathJax = false,
  enableMermaid = false,
  dependencies = [],
}: UseContentProcessorOptions) => {
  const mathJaxStatus = useScript(
    enableMathJax
      ? "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"
      : null,
  );

  const mermaidStatus = useScript(
    enableMermaid
      ? "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs"
      : null,
    { type: "module" },
  );

  useEffect(() => {
    if (!enableMathJax || (window as any).MathJax) return;

    (window as any).MathJax = {
      tex: {
        inlineMath: [
          ["$", "$"],
          ["\\(", "\\)"],
        ],
        displayMath: [
          ["$$", "$$"],
          ["\\[", "\\]"],
        ],
        tags: "none",
      },
      options: {
        skipHtmlTags: [
          "script",
          "noscript",
          "style",
          "textarea",
          "pre",
          "code",
        ],
      },
      loader: { load: ["[tex]/noerrors", "[tex]/noundefined"] },
      svg: { fontCache: "local" },
    };
  }, [enableMathJax]);

  const processMathJax = async () => {
    if (!enableMathJax) return true;
    const mj = (window as any).MathJax;

    if (mathJaxStatus === "ready" && mj?.typesetPromise) {
      try {
        await mj.typesetPromise();
        return true;
      } catch (err) {
        console.warn("MathJax processing error:", err);
      }
    }
    return false;
  };

  const processMermaid = async () => {
    if (!enableMermaid) return true;
    const mermaid = (window as any).mermaid;

    if (mermaidStatus === "ready" && mermaid) {
      try {
        mermaid.initialize({ startOnLoad: true });
        return true;
      } catch (err) {
        console.warn("Mermaid processing error:", err);
      }
    }
    return false;
  };

  useRetryProcessor(processMathJax, [
    enableMathJax,
    mathJaxStatus,
    ...dependencies,
  ]);

  useRetryProcessor(processMermaid, [
    enableMermaid,
    mermaidStatus,
    ...dependencies,
  ]);
};
