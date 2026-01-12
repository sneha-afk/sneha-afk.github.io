import type { PageConfig } from "@pages/page_types";
import { PROJECTS } from "./data/projects.page";
import { PageRenderer } from "./PageRenderer";

export const projectPageConfig: PageConfig = {
  title: "Projects",
  layout: { showPageTitle: false },
  sections: [
    {
      type: "projects",
      title: "Projects",
      items: PROJECTS,
    },
  ],
};

export default function ProjectsPage() {
  return <PageRenderer page={projectPageConfig} />;
}
