import React from 'react';
import PageTitle from './PageTitle';
import Navigation from './Navigation';
import './Header.scss'

function Header() {
  return(
    <div className="header">
      <PageTitle />
      <Navigation />
    </div>
  )
}

export default Header;