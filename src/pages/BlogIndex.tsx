import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import { loadPosts, type PostMeta } from "../utils/loadPosts";

import "../styles/_post_index.scss";

const BlogIndex: React.FC = () => {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <PageLayout title="Blog">Loading posts…</PageLayout>;

  return (
    <PageLayout title="/posts">
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            {post.date}
            {": "}
            <Link to={`/posts/${post.slug}`}>{post.title}</Link>{" "}
          </li>
        ))}
      </ul>
    </PageLayout>
  );
};

export default BlogIndex;
