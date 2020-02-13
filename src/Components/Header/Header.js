import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header>
      <div className="center-column">
        <a style={{textDecoration: 'none'}}href="/">
          <h1>flickFinder</h1>
        </a>
      </div>
      <nav>
        <ul className="center-column">
          <li>
            <NavLink to="/">Browse movies</NavLink>
          </li>
          <li><NavLink to='/shows/'>Browse shows</NavLink></li>
          <li><NavLink to='/about'>About</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
