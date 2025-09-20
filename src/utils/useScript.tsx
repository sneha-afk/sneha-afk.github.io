import { useEffect, useState } from "react";

interface UseScriptOptions {
  type: "module" | "text/javascript";
  async: boolean;
  defer: boolean;
}

interface UseScriptProps {
  src?: string;
  options?: UseScriptOptions;
}

export function useScript({
  src,
  options = {
    type: "text/javascript",
    async: true,
    defer: true,
  },
}: UseScriptProps): "loading" | "ready" | "error" {
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    src ? "loading" : "ready",
  );

  useEffect(() => {
    if (!src) return;

    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${src}"]`,
    );

    const handleLoad = () => setStatus("ready");
    const handleError = () => setStatus("error");

    if (!script) {
      script = document.createElement("script");
      script.src = src;
      script.type = options.type;
      script.async = options.async;
      script.defer = options.defer;

      script.addEventListener("load", handleLoad);
      script.addEventListener("error", handleError);

      document.head.appendChild(script);
    } else {
      setStatus("ready");
    }

    return () => {
      if (script) {
        script.removeEventListener("load", handleLoad);
        script.removeEventListener("error", handleError);
      }
    };
  }, [src, options.type, options.async, options.defer]);

  return status;
}
