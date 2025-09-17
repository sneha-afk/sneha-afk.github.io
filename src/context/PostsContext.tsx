import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  useMemo,
} from "react";
import { loadPosts, type PostMeta } from "@utils/loadPosts";

type PostsContextType = {
  posts: PostMeta[];
  loading: boolean;
};

const PostsContext = createContext<PostsContextType>({
  posts: [],
  loading: true,
});

export const PostsProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  const value = useMemo(() => ({ posts, loading }), [posts, loading]);

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);
