import { PostList } from "@components";
import { type PageConfig } from "@pages/page_types";
import { PageRenderer } from "./PageRenderer";

export const blogPage: PageConfig = {
  title: "/blog",
  layout: {
    showPageTitle: false,
    showBackLink: true,
  },
  sections: [
    {
      type: "markdown",
      title: "/blog",
      Component: <PostList />,
    },
  ],
};

export default function BlogIndex() {
  return <PageRenderer page={blogPage} />;
}
