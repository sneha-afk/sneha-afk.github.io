import React from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import { usePosts } from "../context/PostsContext";

import "@styles/_post_index.scss";

const BlogIndex: React.FC = () => {
  const { posts } = usePosts();

  if (!posts || posts.length === 0) {
    return <PageLayout title="Blog">No posts found…</PageLayout>;
  }

  return (
    <PageLayout title="/posts">
      <ul>
        {posts.map((post) => (
          <li className="post-list" key={post.slug}>
            {post.date}: <Link to={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
};

export default BlogIndex;
