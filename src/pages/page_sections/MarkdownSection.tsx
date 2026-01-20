import { type MarkdownSection as MarkdownSectionType } from "@pages/section_types";
import ReactMarkdown from "react-markdown";
import HeaderSection from "@components/ui/HeaderSection";

export const MarkdownSection = ({ title, content, emoji, Component }: MarkdownSectionType) => {
  const Content = Component ?? <ReactMarkdown>{content ?? ""}</ReactMarkdown>;

  return emoji ? (
    <HeaderSection title={title ?? ""} emoji={emoji}>
      {Content}
    </HeaderSection>
  ) : (
    <section className="markdown-section">{Content}</section>
  );
};

export default MarkdownSection;
