import React from "react";
import { Link } from "react-router-dom";
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
            <Link key={item.url} to={item.url}>
              {item.name}
            </Link>
          ))}
        </nav>
      </header>
    </div>
  );
};

export default NavigationBar;
