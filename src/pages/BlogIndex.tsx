import React from "react";
import { PageLayout, PostList } from "@components";

const BlogIndex: React.FC = () => {
  return (
    <PageLayout title="/blog">
      <PostList />
    </PageLayout>
  );
};

export default BlogIndex;
