import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => (
  <div className="header">
    <NavLink to="/" className="header__title">Blog V Blog</NavLink>
    <NavLink to="/versus" activeClassName="header__active-link" className="header__text">Versus</NavLink>
    <NavLink to="/winners" activeClassName="header__active-link" className="header__text">Winners</NavLink>
    {/*<NavLink to="/hire" activeClassName="header__active-link" className="header__text">Hire Me!</NavLink>*/}
  </div>
)

export default Header