import React from "react";

import "@styles/components/_navigation.scss";
import ButtonLink from "@components/ButtonLink";

type NavItem = {
  name: string;
  url: string;
};

type NavigationBarProps = {
  title?: string;
  navigation: NavItem[];
};

const NavigationBar: React.FC<NavigationBarProps> = ({ title = "Sneha De", navigation }) => {
  return (
    <div className="container">
      <header className="site-navbar">
        <h1>{title}</h1>

        <nav aria-label="Primary navigation">
          {navigation.map((item) => (
            <ButtonLink key={item.url} link={item.url} label={item.name} />
          ))}
        </nav>
      </header>
    </div>
  );
};

export default NavigationBar;
