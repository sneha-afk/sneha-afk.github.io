import { useContext } from "react";
import { PostsContext, type PostsContextType } from "./PostsContext";

export const usePosts = (): PostsContextType => useContext(PostsContext);
