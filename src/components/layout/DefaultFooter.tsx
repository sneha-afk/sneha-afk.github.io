import React, { memo } from "react";
import NavigationBar from "@components/navigation/NavigationBar";

const SOCIAL_LINKS = [
  { name: "/github", url: "https://github.com/sneha-afk" },
  { name: "/linkedin", url: "https://www.linkedin.com/in/sneha-de/" },
];

const DefaultFooter: React.FC = () => (
  <footer>
    <NavigationBar items={SOCIAL_LINKS} ariaLabel="Social links" />
  </footer>
);

export default memo(DefaultFooter);
