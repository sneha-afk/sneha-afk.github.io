import React from "react";
import { Link } from "react-router-dom";
import { isExternalUrl } from "@components/utils";
import "@styles/components/_buttons.scss";

interface ButtonLinkProps {
  label: string;
  href: string;
  external?: boolean;
  className?: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ label, href, external, className = "button-link" }) => {
  const isExternal = external ?? isExternalUrl(href);

  if (isExternal) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }

  return (
    <Link className={className} to={href}>
      {label}
    </Link>
  );
};

export default ButtonLink;
