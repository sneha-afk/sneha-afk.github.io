import React, { memo } from "react";
import DefaultHeader from "./DefaultHeader";
import DefaultFooter from "./DefaultFooter";

interface PageLayoutProps {
  title?: string;
  showBackLink?: boolean;
  showPageTitle?: boolean;
  Header?: React.ComponentType;
  Footer?: React.ComponentType;
  children: React.ReactNode;
}

const BackLink: React.FC = () => (
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      window.history.back();
    }}
    className="back-link"
  >
    /back
  </a>
);

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  showBackLink = true,
  showPageTitle = true,
  Header = DefaultHeader,
  Footer = DefaultFooter,
  children,
}) => (
  <div className="page-layout">
    <Header />
    <main>
      {showBackLink && <BackLink />}
      {showPageTitle && title && <h2 className="post-title">{title}</h2>}
      <div className="page-content">{children}</div>
    </main>
    <Footer />
  </div>
);

export default memo(PageLayout);
