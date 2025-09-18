import { useEffect } from "react";

interface UseContentProcessorOptions {
  enableMathJax?: boolean;
  dependencies?: React.DependencyList;
}

type ProcessorFn = () => boolean | void;

/**
 * A simple retry mechanism:
 * - Calls `processFn` at multiple delays
 * - Stops early if `stopOnSuccess` is true and processFn returns `true`
 */
const useRetryProcessor = (
  processFn: ProcessorFn,
  dependencies: React.DependencyList,
  delays: number[] = [50, 300, 1000],
  stopOnSuccess = true
) => {
  useEffect(() => {
    let stopped = false;
    const timeouts: number[] = [];

    delays.forEach((delay) => {
      const id = window.setTimeout(() => {
        if (stopped) return;
        const ok = processFn();
        if (stopOnSuccess && ok === true) {
          stopped = true;
          timeouts.forEach(clearTimeout);
        }
      }, delay);
      timeouts.push(id);
    });

    return () => timeouts.forEach(clearTimeout);
  }, dependencies);
};

export const useContentProcessor = ({
  enableMathJax = false,
  dependencies = [],
}: UseContentProcessorOptions) => {
  const processMathJax = () => {
    if (!enableMathJax) return false;
    const mj = (window as any).MathJax;
    if (mj?.typesetPromise) {
      mj.typesetPromise().catch((err: Error) =>
        console.warn("MathJax processing error:", err)
      );
      return true;
    }
    return false;
  };

  // Inject MathJax once if enabled
  useEffect(() => {
    if (!enableMathJax) return;

    if (!(window as any).MathJax) {
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

      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
      script.defer = true;
      script.async = true;
      document.head.appendChild(script);
    }
  }, [enableMathJax]);

  useRetryProcessor(
    processMathJax,
    [enableMathJax, ...dependencies],
    [100, 300, 1000, 2000],
    false
  );
};
