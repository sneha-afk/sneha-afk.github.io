import { useContext } from "react";
import { PostsContext } from "./PostsContext";

export const usePosts = () => useContext(PostsContext);
