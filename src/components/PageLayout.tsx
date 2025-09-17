import React, { useEffect } from "react";
import NavigationBar from "@components/NavigationBar";

import "@styles/_code_format.scss";
import "@styles/_tables.scss";
import "@styles/_blockquotes.scss";
import "@styles/_footnotes.scss";
import "@styles/_images.scss";
import "highlight.js/styles/base16/horizon-dark.css";

interface PageLayoutProps {
  title?: string;
  showBackLink?: boolean;
  showPageTitle?: boolean;
  enableMathJax?: boolean;
  Header?: React.ComponentType;
  Footer?: React.ComponentType;
}

const PageLayout = ({
  title,
  showBackLink = true,
  showPageTitle = true,
  enableMathJax = false,
  Header = DefaultHeader,
  Footer = DefaultFooter,
  children,
}: React.PropsWithChildren<PageLayoutProps>) => {
  useEffect(() => {
    const addCodeLanguageLabels = () => {
      document
        .querySelectorAll('pre > code[class*="language-"]')
        .forEach((codeEl) => {
          const preEl = codeEl.parentElement as HTMLPreElement;
          if (!preEl || preEl.dataset.hasLangLabel) return;

          const className = [...codeEl.classList].find((c) =>
            c.startsWith("language-"),
          );
          if (!className) return;

          const lang = className.replace("language-", "");
          if (!lang) return;

          const label = document.createElement("div");
          label.textContent = lang;
          label.className = "code-lang-label";
          preEl.style.position = "relative";
          preEl.dataset.hasLangLabel = "true";
          preEl.appendChild(label);
        });
    };

    // Try multiple times in case highlighting is still processing
    const timeouts = [10, 100, 500].map((delay) =>
      setTimeout(addCodeLanguageLabels, delay),
    );

    return () => timeouts.forEach(clearTimeout);
  }, [children]);

  useEffect(() => {
    // MathJax configuration and loading
    if (enableMathJax) {
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

      // Load MathJax script
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
      script.defer = true;
      document.head.appendChild(script);

      return () => {
        // Cleanup script on unmount
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, [enableMathJax]);

  const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.history.back();
  };

  return (
    <div className="page-layout">
      <Header />

      <main>
        {showBackLink && (
          <a href="#" onClick={handleBackClick} className="back-link">
            /back
          </a>
        )}

        {showPageTitle && title && <h2 className="post-title">{title}</h2>}

        <div className="page-content">{children}</div>
      </main>

      <Footer />
    </div>
  );
};

// Default components that can be overridden
const DefaultHeader = () => {
  const headerNav = [
    { name: "/home", url: "/" },
    { name: "/resume", url: "/resume" },
    { name: "/projects", url: "/projects" },
    { name: "/posts", url: "/posts" },
  ];

  return (
    <header>
      <NavigationBar navigation={headerNav} />
    </header>
  );
};

const DefaultFooter = () => {
  const footerNav = [
    { name: "/github", url: "https://github.com/sneha-afk" },
    { name: "/linkedin", url: "https://www.linkedin.com/in/sneha-de/" },
  ];

  return (
    <footer>
      <NavigationBar title="" navigation={footerNav} />
    </footer>
  );
};

export default PageLayout;
