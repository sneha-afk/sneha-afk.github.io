import React, { useEffect, useState, Suspense } from "react";
import { useParams } from "react-router-dom";

import PageLayout from "../components/PageLayout";
import { loadOnePost, type Post } from "../utils/loadOnePost";
import Breadcrumbs from "../components/Breadcrumbs";

const MarkdownRenderer = React.lazy(() => import("@components/markdown/MarkdownRenderer"));

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

  if (loading) return <PageLayout title="Loading…">Loading post…</PageLayout>;
  if (!post) return <PageLayout title="Not Found">Post not found</PageLayout>;

  return (
    <PageLayout title={post.title} enableMathJax>
      <Breadcrumbs
        items={[
          { label: "~", path: "/" },
          { label: "posts", path: "/posts" },
          { label: post.title },
        ]}
      />
      <Suspense fallback={<div>Rendering post…</div>}>
        <MarkdownRenderer content={post.content} />
      </Suspense>
    </PageLayout>
  );
};

export default BlogPost;
