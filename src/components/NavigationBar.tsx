import React from "react";
import "../styles/_navigation.scss";

type NavItem = {
  name: string;
  url: string;
};

type NavigationBarProps = {
  title?: string;
  navigation: NavItem[];
};

const NavigationBar: React.FC<NavigationBarProps> = ({
  title = "Sneha De",
  navigation,
}) => {
  return (
    <div className="container">
      <header className="site-navbar">
        <h1>{title}</h1>

        <nav aria-label="Primary navigation">
          {navigation.map((item) => (
            <a href={item.url}>{item.name}</a>
          ))}
        </nav>
      </header>
    </div>
  );
};

export default NavigationBar;
