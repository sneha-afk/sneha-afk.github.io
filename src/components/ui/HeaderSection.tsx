import React, { forwardRef } from "react";

interface HeaderSectionProps {
  title: string;
  children: React.ReactNode;
  emoji?: string;
  subtitle?: string;
  className?: string;
}

const HeaderSection = forwardRef<HTMLDivElement, HeaderSectionProps>(
  ({ title, emoji, subtitle, children, className }, ref) => (
    <section className={className ? `section ${className}` : "section"} ref={ref}>
      <header className="section-header">
        <h2 className="section-title">
          {emoji && <span className="section-emoji">{emoji} </span>}
          {title}
        </h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </header>
      <div className="section-content">{children}</div>
    </section>
  )
);

HeaderSection.displayName = "HeaderSection";

export default HeaderSection;
