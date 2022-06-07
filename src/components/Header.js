import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Around The U.S. logo" className="header__logo" />
      <div className="login">
          <nav className="header__menu">
            <p>{props.email}</p>
            <NavLink
              activeClassName="header__item_active"
              exact
              to={props.link}
              className="header__item"
            >
             {props.page}
            </NavLink>
          </nav>
      </div>
    </header>
  );
}
export default Header;
