import React from 'react';
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="nav">
      <NavLink className="nav__link" activeClassName="active" to='/' exact={true}>Home</NavLink>
      <NavLink className="nav__link" to="/create-video">Upload video</NavLink>
    </nav>
  )
}

export default Navigation;