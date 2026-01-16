import React from "react";
import ButtonLink from "@components/ui/ButtonLink";
import { getGithubSourceUrl } from "@components/utils";

interface ViewSourceButtonProps {
  slug: string;
  label?: string;
}

const ViewSourceButton: React.FC<ViewSourceButtonProps> = ({ slug, label = "View source" }) => (
  <ButtonLink label={label} href={getGithubSourceUrl(slug)} external />
);

export default ViewSourceButton;
