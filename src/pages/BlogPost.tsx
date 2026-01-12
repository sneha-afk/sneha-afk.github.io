import React, { useEffect, useState, Suspense } from "react";
import { useParams } from "react-router-dom";

import { loadOnePost, type Post } from "@utils";
import { NotFoundPage } from "@pages";
import { PageRenderer } from "./PageRenderer";
import { type PageConfig } from "@pages/page_types";
import { PageLayout, Breadcrumbs, LoadingSpinner, ViewSourceButton } from "@components";

const IncrementalMarkdownRenderer = React.lazy(() => import("@components/markdown/IncrementalMarkdownRenderer"));

const BlogPostComponent: React.FC<{ post: Post }> = ({ post }) => {
  const slug = post.slug ?? post.title;

  return (
    <Suspense fallback={<LoadingSpinner text="Rendering post..." fullscreen={false} />}>
      <Breadcrumbs items={[{ label: "~", path: "/" }, { label: "blog", path: "/blog" }, { label: post.title }]} />

      <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#666" }}>{post.date}</p>

      {post.tags && (
        <div className="post-tag-list">
          {post.tags.map((tag) => (
            <span key={tag} className="post-tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      <IncrementalMarkdownRenderer content={post.content} enableMathJax chunksPerTick={2} />

      <ViewSourceButton slug={slug} />
    </Suspense>
  );
};

export const BlogPost: React.FC = () => {
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

  if (loading) {
    return (
      <PageLayout>
        <LoadingSpinner text="Loading post..." fullscreen={false} />
      </PageLayout>
    );
  }

  if (!post) return <NotFoundPage />;

  const postPageConfig: PageConfig = {
    title: (post.title.startsWith("/") ? "" : "/") + post.title,
    layout: { showBackLink: true, showPageTitle: true },
    sections: [
      {
        type: "plain",
        Component: <BlogPostComponent post={post} />,
      },
    ],
  };

  return <PageRenderer page={postPageConfig} />;
};

export default BlogPost;
