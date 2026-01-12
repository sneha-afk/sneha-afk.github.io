import PageLayout from "@components/PageLayout";
import { type PageConfig } from "@pages/page_types";
import { SectionRenderer } from "./SectionRenderer";

interface PageRendererProps {
  page: PageConfig;
}

export const PageRenderer = ({ page }: PageRendererProps) => {
  const { title, layout, sections } = page;

  return (
    <PageLayout
      title={title}
      showBackLink={layout?.showBackLink}
      showPageTitle={layout?.showPageTitle}
      Header={layout?.Header}
      Footer={layout?.Footer}
    >
      {sections.map((section, index) => (
        <SectionRenderer key={index} section={section} />
      ))}
    </PageLayout>
  );
};