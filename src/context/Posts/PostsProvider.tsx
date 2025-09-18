import { useState, useEffect, type ReactNode } from "react";
import { PostsContext } from "./PostsContext";
import { loadPosts, type PostMeta } from "@utils/loadPosts";

interface PostsProviderProps {
  children: ReactNode;
}

export const PostsProvider = ({ children }: PostsProviderProps) => {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  return (
    <PostsContext.Provider value={{ posts, loading }}>
      {children}
    </PostsContext.Provider>
  );
};
