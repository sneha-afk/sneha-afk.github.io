import React from "react";
import "./NavigationBar.scss";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">Sneha De</h1>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
