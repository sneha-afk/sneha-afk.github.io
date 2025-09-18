import { type Components } from "react-markdown";
import Blockquote from "./Blockquotes";
import CodeBlock from "./CodeBlock";

export const markdownComponents: Components = {
  blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
  code: (props) => <CodeBlock {...props} />,
};
