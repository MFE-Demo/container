import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header>
      <div className="center-column">
        <h1>flickFinder</h1>
      </div>
      <nav>
        <ul className="center-column">
          <li>
            <NavLink to="/"></NavLink>
          </li>
          <li>
            <NavLink></NavLink>
          </li>
          <li>
            <NavLink></NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
