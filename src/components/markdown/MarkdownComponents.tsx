import { type Components } from "react-markdown";
import Blockquote from "./Blockquotes";

export const markdownComponents: Components = {
  blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
};
