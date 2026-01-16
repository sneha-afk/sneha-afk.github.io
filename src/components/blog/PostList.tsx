import React from "react";
import { Link } from "react-router-dom";
import { usePosts } from "@context";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import "@styles/components/_post-list.scss";

export interface Post {
  slug: string;
  title: string;
  date: string;
}

interface PostListProps {
  limit?: number;
}

const PostCard: React.FC<Post> = ({ slug, title, date }) => (
  <li>
    <Link to={`/blog/${slug}`} className="post-card">
      <span className="post-date">{date}</span>
      <span className="post-title">{title}</span>
    </Link>
  </li>
);

const PostList: React.FC<PostListProps> = ({ limit }) => {
  const { posts, loading } = usePosts();

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
