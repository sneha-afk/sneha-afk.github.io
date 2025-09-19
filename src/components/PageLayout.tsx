import React, { useCallback } from "react";
import NavigationBar from "@components/NavigationBar";

interface PageLayoutProps {
  title?: string;
  showBackLink?: boolean;
  showPageTitle?: boolean;
  Header?: React.ComponentType;
  Footer?: React.ComponentType;
}

const PageLayout = ({
  title,
  showBackLink = true,
  showPageTitle = true,
  Header = DefaultHeader,
  Footer = DefaultFooter,
  children,
}: React.PropsWithChildren<PageLayoutProps>) => {
  const handleBackClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      window.history.back();
    },
    [],
  );

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

const DefaultHeader = React.memo(() => {
  const headerNav = [
    { name: "/home", url: "/" },
    { name: "/resume", url: "/resume" },
    { name: "/projects", url: "/projects" },
    { name: "/blog", url: "/blog" },
  ];

  return (
    <header>
      <NavigationBar navigation={headerNav} />
    </header>
  );
});
DefaultHeader.displayName = "DefaultHeader";

const DefaultFooter = React.memo(() => {
  const footerNav = [
    { name: "/github", url: "https://github.com/sneha-afk" },
    { name: "/linkedin", url: "https://www.linkedin.com/in/sneha-de/" },
  ];

  return (
    <footer>
      <NavigationBar title="" navigation={footerNav} />
    </footer>
  );
});
DefaultFooter.displayName = "DefaultFooter";

export default React.memo(PageLayout);
