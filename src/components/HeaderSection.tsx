import React, { forwardRef } from "react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  emoji?: string;
  subtitle?: string;
  className?: string;
}

const HeaderSection = forwardRef<HTMLDivElement, SectionProps>(
  ({ title, emoji, subtitle, children, className = "" }, ref) => {
    return (
      <section className={`section ${className}`} ref={ref}>
        <header className="section-header">
          <h2 className="section-title">
            {emoji && <span className="section-emoji">{emoji} </span>}
            {title}
          </h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </header>
        <div className="section-content">{children}</div>
      </section>
    );
  }
);

HeaderSection.displayName = "Section";

export default HeaderSection;
