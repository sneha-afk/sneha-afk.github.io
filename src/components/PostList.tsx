import React from "react";
import { Link } from "react-router-dom";
import { usePosts } from "@context";
import "@styles/_post_list.scss";

import { LoadingSpinner } from "@components";

export interface Post {
  slug: string;
  title: string;
  date: string;
}

interface PostListProps {
  limit?: number;
}

const PostList: React.FC<PostListProps> = ({ limit }) => {
  const { posts, loading } = usePosts();

  if (loading)
    return (
      <LoadingSpinner text="Loading list of posts..." fullscreen={false} />
    );

  const displayPosts = posts.slice(0, limit ?? undefined);

  return (
    <ul className="post-list">
      {displayPosts.map((post) => (
        <Link key={post.slug} to={`/blog/${post.slug}`}>
          <li key={post.slug} className="post-card">
            <span className="post-date">{post.date}</span>
            <span className="post-title">{post.title}</span>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default PostList;
