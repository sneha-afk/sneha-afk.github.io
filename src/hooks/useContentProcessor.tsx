import { useScript } from "@utils";
import React, { useEffect } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface UseContentProcessorOptions {
  enableMathJax?: boolean;
  dependencies?: React.DependencyList;
  mathJaxConfig?: Record<string, any>;
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
  }, [dependencies, processFn, delays, stopOnSuccess]);
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
  dependencies = [],
  mathJaxConfig = {},
}: UseContentProcessorOptions) => {
  if (enableMathJax) {
    if (!(window as any).MathJax) {
      (window as any).MathJax = mathJaxConfig;
    }

    const mathJaxStatus = useScript({
      src: enableMathJax
        ? "https://cdn.jsdelivr.net/npm/mathjax@4/tex-svg.js"
        : undefined,
    });

    const processMathJax = async () => {
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

    useRetryProcessor(processMathJax, [mathJaxStatus, ...dependencies, true]);
  }
};
