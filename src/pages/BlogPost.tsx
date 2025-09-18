import React, { useEffect, useState, Suspense } from "react";
import { useParams } from "react-router-dom";

import { loadOnePost, type Post } from "@utils";
import {
  PageLayout,
  Breadcrumbs,
  LoadingSpinner,
  ViewSourceButton,
} from "@components";
import { NotFoundPage } from "@pages";

import "@styles/posts.scss";

const MarkdownRenderer = React.lazy(
  () => import("@components/markdown/MarkdownRenderer"),
);

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    loadOnePost(slug).then((p) => {
      setPost(p);
      setLoading(false);
    });
  }, [slug]);
  if (loading)
    return (
      <PageLayout>
        <LoadingSpinner text="Loading content..." fullscreen={false} />
      </PageLayout>
    );
  if (!post) return <NotFoundPage />;

  return (
    <PageLayout title={post.title} enableMathJax enableMermaid>
      <Suspense
        fallback={<LoadingSpinner text="Almost there..." fullscreen={false} />}
      >
        <Breadcrumbs
          items={[
            { label: "~", path: "/" },
            { label: "blog", path: "/blog" },
            { label: post.title },
          ]}
        />
        <MarkdownRenderer content={post.content} />
        <ViewSourceButton slug={slug ?? ""} />
      </Suspense>
    </PageLayout>
  );
};

export default BlogPost;
