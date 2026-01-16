import React from "react";
import { Link } from "react-router-dom";
import { stripLeadingChar } from "@components/utils";
import "@styles/components/_breadcrumbs.scss";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, separator = " / " }) => (
  <nav className="breadcrumbs" aria-label="Breadcrumb">
    {items.map((item, i) => (
      <span key={i}>
        {item.path ? <Link to={item.path}>{item.label}</Link> : stripLeadingChar(item.label, "/")}
        {i < items.length - 1 && separator}
      </span>
    ))}
  </nav>
);

export default Breadcrumbs;
