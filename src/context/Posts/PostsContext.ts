import { createContext } from "react";
import type { PostMeta } from "@utils/loadPosts";

export type PostsContextType = {
  posts: PostMeta[];
  loading: boolean;
};

export const PostsContext = createContext<PostsContextType>({
  posts: [],
  loading: true,
});
