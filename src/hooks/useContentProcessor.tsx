import { useEffect } from "react";

interface UseContentProcessorOptions {
  enableMathJax?: boolean;
  dependencies?: React.DependencyList;
}

/**
 * Retry mechanism for DOM post-processors.
 * - Schedules processFn multiple times with delays
 * - Can optionally stop once processFn returns true
 */
const useRetryProcessor = (
  processFn: () => boolean | void,
  dependencies: React.DependencyList,
  delays: number[] = [10, 100, 500],
  stopOnSuccess = true,
) => {
  useEffect(() => {
    let stopped = false;
    const timeouts: number[] = [];

    delays.forEach((delay, i) => {
      const id = window.setTimeout(() => {
        if (stopped) return;
        const result = processFn();

        if (stopOnSuccess && result === true) {
          stopped = true;
          timeouts.slice(i + 1).forEach(clearTimeout);
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
  // normalize dependencies to ensure stable array shape
  const stableDeps = Array.isArray(dependencies) ? dependencies : [];

  /**
   * Adds language labels to <pre><code class="language-xxx"> blocks.
   * Returns true once all blocks are processed (so retries can stop).
   */
  const addCodeLanguageLabels = () => {
    let didWork = false;
    let allProcessed = true;

    document
      .querySelectorAll('pre > code[class*="language-"]')
      .forEach((codeEl) => {
        if (codeEl.hasAttribute("data-processed")) return;

        allProcessed = false;
        const preEl = codeEl.parentElement as HTMLPreElement | null;
        if (!preEl) return;

        const langClass = [...codeEl.classList].find((c) =>
          c.startsWith("language-"),
        );
        if (!langClass) return;

        const lang = langClass.replace("language-", "");
        if (!lang) return;

        const label = document.createElement("div");
        label.textContent = lang;
        label.className = "code-lang-label";
        preEl.style.position = "relative";
        preEl.appendChild(label);

        codeEl.setAttribute("data-processed", "true");
        didWork = true;
      });

    return allProcessed && didWork;
  };

  /**
   * Runs MathJax typesetting if enabled and available.
   * Guarded by `enableMathJax` so it won’t run unnecessarily.
   */
  const processMathJax = () => {
    if (!enableMathJax) return false;

    const mj = (window as any).MathJax;
    if (mj?.typesetPromise) {
      mj.typesetPromise().catch((err: Error) =>
        console.warn("MathJax processing error:", err),
      );
      return true;
    }
    return false;
  };

  // Code block labels: stop retries once complete
  useRetryProcessor(addCodeLanguageLabels, stableDeps, [10, 100, 500], true);

  // MathJax: always run full retry schedule, guard inside function
  useRetryProcessor(
    processMathJax,
    stableDeps,
    [100, 300, 800, 1500, 2500],
    false,
  );

  /**
   * One-time MathJax configuration and script injection.
   */
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
          tags: "ams",
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
        loader: { load: ["[tex]/ams"] },
        svg: { fontCache: "global" },
      };
    }

    if (!document.querySelector('script[src*="mathjax"]')) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
      script.defer = true;
      document.head.appendChild(script);

      return () => {
        script.parentNode?.removeChild(script);
      };
    }
  }, [enableMathJax]);
};
