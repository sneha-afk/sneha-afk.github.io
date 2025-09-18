import "@styles/_button.scss";
import { Link } from "react-router-dom";

interface ButtonLinkProps {
  label: string;
  link: string;
  newTab?: boolean;
}

function ButtonLink({ label, link, newTab = false }: ButtonLinkProps) {
  const isExternal = link.startsWith("http");
  if (isExternal) {
    return (
      <a
        className="button-link"
        href={link}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
      >
        {label}
      </a>
    );
  }

  return (
    <Link className="button-link" key={link} to={link}>
      {label}
    </Link>
  );
}

export default ButtonLink;
