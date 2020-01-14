import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => (
  <div>
    <NavLink to="/" activeClassName="is-active">Home</NavLink>
    <NavLink to="/versus" activeClassName="is-active">Versus</NavLink>
    <NavLink to="/winners" activeClassName="is-active">Winners</NavLink>
  </div>
)

export default Header