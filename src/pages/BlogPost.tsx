import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import PageLayout from "../components/PageLayout";
import { loadOnePost, type Post } from "../utils/loadOnePost";
import { markdownComponents } from "../components/markdown/MarkdownComponents";
import "../styles/posts.scss";
import Breadcrumbs from "../components/Breadcrumbs";

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
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={markdownComponents}
      >
        {post.content}
      </ReactMarkdown>
    </PageLayout>
  );
};

export default BlogPost;
