import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadPosts, type PostMeta } from "@utils";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import "@styles/components/_post-list.scss";

interface PostListProps {
  limit?: number;
}

const PostCard: React.FC<PostMeta> = ({ slug, title, date }) => (
  <li>
    <Link to={`/blog/${slug}`} className="post-card">
      <span className="post-date">{date}</span>
      <span className="post-title">{title}</span>
    </Link>
  </li>
);

const PostList: React.FC<PostListProps> = ({ limit }) => {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingSpinner text="Loading posts..." fullscreen={false} />;
  }

  const displayPosts = limit ? posts.slice(0, limit) : posts;

  return (
    <ul className="post-list">
      {displayPosts.map((post) => (
        <PostCard key={post.slug} {...post} />
      ))}
    </ul>
  );
};

export default PostList;
