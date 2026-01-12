import { type SectionConfig } from "./section_types";

import {
  ContactSection,
  TimelineSection,
  SkillsSection,
  ProjectsSection,
  MarkdownSection,
  PlainSection,
} from "./page_sections";

interface SectionRendererProps {
  section: SectionConfig;
}

export const SectionRenderer = ({ section }: SectionRendererProps) => {
  switch (section.type) {
    case "contact":
      return <ContactSection {...section} />;
    case "timeline":
      return <TimelineSection {...section} />;
    case "skills":
      return <SkillsSection {...section} />;
    case "projects":
      return <ProjectsSection {...section} />;
    case "markdown":
      return <MarkdownSection {...section} />;
    case "plain":
      return <PlainSection {...section} />;
    default:
      return null;
  }
};
