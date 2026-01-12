import { type MarkdownSection as MarkdownSectionType } from "@pages/section_types";
import ReactMarkdown from "react-markdown";
import HeaderSection from "@components/HeaderSection";

export const MarkdownSection = ({ title, content, emoji, Component }: MarkdownSectionType) => {
  const sectionContent = Component ? Component : <ReactMarkdown>{content ?? ""}</ReactMarkdown>;

  if (emoji) {
    return (
      <HeaderSection title={title ?? ""} emoji={emoji}>
        {sectionContent}
      </HeaderSection>
    );
  }

  return <section className="markdown-section">{sectionContent}</section>;
};

export default MarkdownSection;
