import { type Components } from "react-markdown";
import Blockquote from "./Blockquotes";
import CustomAbbreviation from "./Abbreviations";

export const markdownComponents: Components = {
  blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
  abbr: ({ children, title }) => (
    <CustomAbbreviation title={title}>{children}</CustomAbbreviation>
  ),
};
