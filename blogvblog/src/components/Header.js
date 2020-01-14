import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from '../styles/Header.module.css'

const Header = () => (
  <div className={styles.header}>
    <NavLink to="/" className={styles.header__title}>Blog V Blog</NavLink>
    <NavLink to="/versus" activeClassName={styles.active} className={styles.header__text}>Versus</NavLink>
    <NavLink to="/winners" activeClassName={styles.active} className={styles.header__text}>Winners</NavLink>
    <NavLink to="/hire" activeClassName={styles.active} className={styles.header__text}>Hire Me!</NavLink>
  </div>
)

export default Header