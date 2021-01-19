import React, { useContext } from "react"
import { NavLink } from "react-router-dom"

import { UserContext } from "../../context/userContext"

function Navigation() {
  const [role] = useContext(UserContext)
  const activeClassName = "active"
  const navItems = [
    {
      exact: true,
      to: "/",
      label: "Home",
    },
  ]

  if (role === "user") {
    navItems.push({
      to: "/create-video",
      label: "Upload video",
    })
    navItems.push({
      to: "/logout",
      label: "Logout",
    })
  } else if (!role) {
    navItems.push({
      to: "/login",
      label: "Login",
    })
    navItems.push({
      to: "/register",
      label: "Singup",
    })
  }

  return (
    <nav className="nav">
      {navItems.map((nav) => (
        <NavLink
          key={nav.to}
          className="nav__link"
          activeClassName={activeClassName}
          to={nav.to}
          exact={nav.exact}
        >
          {nav.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default Navigation
