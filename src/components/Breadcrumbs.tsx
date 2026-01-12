import React from "react";
import { Link } from "react-router-dom";
import "@styles/components/_breadcrumbs.scss";

type BreadcrumbItem = {
  label: string;
  path?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

function removeLeadingChar(str: string, char: string): string {
  if (str.startsWith(char)) {
    return str.substring(1);
  }
  return str;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="breadcrumbs">
      {items.map((item, i) => (
        <span key={i}>
          {item.path ? <Link to={item.path}>{item.label}</Link> : removeLeadingChar(item.label, "/")}
          {i < items.length - 1 && " / "}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
