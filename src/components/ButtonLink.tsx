import "@styles/_button.scss";
import { Link } from "react-router-dom";

interface ButtonLinkProps {
  label: string;
  link: string;
}

function ButtonLink({ label, link }: ButtonLinkProps) {
  return (
    <Link className="button-link" key={link} to={link}>
      {label}
    </Link>
  );
}

export default ButtonLink;
