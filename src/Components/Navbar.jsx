import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link" activeClassName="active-link">
        Home
      </NavLink>
      <NavLink to="/bots" className="nav-link" activeClassName="active-link">
        Bots
      </NavLink>
    </nav>
  );
};

export default Navbar;
