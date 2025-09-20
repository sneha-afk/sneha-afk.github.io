import React from "react";
import { ButtonLink } from "@components";

interface ViewSourceButtonProps {
  slug: string;
  label?: string;
}

const ViewSourceButton: React.FC<ViewSourceButtonProps> = ({
  slug,
  label = "View source",
}) => {
  const githubUrl = `https://github.com/sneha-afk/sneha-afk.github.io/blob/main/public/posts/${slug}.md`;

  return <ButtonLink label={label} link={githubUrl} newTab />;
};

export default ViewSourceButton;
