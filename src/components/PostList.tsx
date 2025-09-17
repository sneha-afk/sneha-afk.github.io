import React from "react";
import { Link } from "react-router-dom";
import { usePosts } from "@context/PostsContext";
import "@styles/_post_list.scss";

export interface Post {
  slug: string;
  title: string;
  date: string;
}

interface PostListProps {
  posts?: Post[];
  limit?: number;
}

const PostList: React.FC<PostListProps> = ({ posts, limit }) => {
  const context = usePosts();
  const displayPosts = (posts ?? context.posts).slice(0, limit ?? undefined);

  return (
    <ul className="post-list">
      {displayPosts.map((post) => (
        <li key={post.slug} className="post-card">
          <Link to={`/posts/${post.slug}`}>
            <span className="post-date">{post.date}</span>
            <span className="post-title">{post.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
