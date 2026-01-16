import React from "react";
import ButtonLink from "@components/ui/ButtonLink";
import "@styles/components/_navigation.scss";

export interface NavItem {
  name: string;
  url: string;
}

interface NavigationBarProps {
  title?: string;
  items: NavItem[];
  ariaLabel?: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ title, items, ariaLabel = "Primary navigation" }) => (
  <div className="container">
    <header className="site-navbar">
      {title && <h1>{title}</h1>}
      <nav aria-label={ariaLabel}>
        {items.map((item) => (
          <ButtonLink key={item.url} href={item.url} label={item.name} />
        ))}
      </nav>
    </header>
  </div>
);

export default NavigationBar;
