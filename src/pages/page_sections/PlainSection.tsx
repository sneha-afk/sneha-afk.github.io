import { type PlainSection as PlainSectionType } from "@pages/section_types";
import HeaderSection from "@components/HeaderSection";

export const PlainSection = ({ title, content, emoji, Component }: PlainSectionType) => {
  const sectionContent = Component ? Component : content;

  if (emoji) {
    return (
      <HeaderSection title={title ?? ""} emoji={emoji}>
        {sectionContent}
      </HeaderSection>
    );
  }

  return <section className="plainSection">{sectionContent}</section>;
};

export default PlainSection;
