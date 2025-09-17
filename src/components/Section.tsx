import React from "react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  emoji?: string;
}

const Section: React.FC<SectionProps> = ({ title, emoji, children }) => {
  return (
    <section>
      <h2>
        {emoji && <span className="emoji">{emoji} </span>}
        {title}
      </h2>
      <div className="section-content">{children}</div>
    </section>
  );
};

export default Section;
