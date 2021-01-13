import React from "react"
import PageTitle from "./PageTitle"
import Navigation from "./Navigation"

function Header() {
  return (
    <div className="header">
      <PageTitle />
      <Navigation />
    </div>
  )
}

export default Header
