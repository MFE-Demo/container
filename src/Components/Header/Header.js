import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../Redux/Reducers/authReducer";

import "./Header.css";

function Header(props) {
  let { user } = props;
  console.log(user);

  return (
    <header>
      <div className="center-column">
        <a id="main-header" href="/">
          <h1>
            <i className="fas fa-film" style={{ marginRight: "8px" }} />
            flickFinder
          </h1>
        </a>
      </div>
      <nav>
        <ul className="center-column">
          <li>
            <NavLink to="/">Browse movies</NavLink>
          </li>
          <li>
            <NavLink to="/shows/">Browse shows</NavLink>
          </li>
          <li>
            {user && user.loggedIn ? (
              <NavLink to="/" onClick={props.logout}>
                Logout
              </NavLink>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps, { logout })(Header);
