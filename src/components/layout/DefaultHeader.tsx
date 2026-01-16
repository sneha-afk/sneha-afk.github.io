import React, { memo } from "react";
import NavigationBar from "@components/navigation/NavigationBar";

const NAV_ITEMS = [
  { name: "/home", url: "/" },
  { name: "/resume", url: "/resume" },
  { name: "/projects", url: "/projects" },
  { name: "/blog", url: "/blog" },
];

const DefaultHeader: React.FC = () => (
  <header>
    <NavigationBar title="Sneha De" items={NAV_ITEMS} />
  </header>
);

export default memo(DefaultHeader);
