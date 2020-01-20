import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => (
  <div>
    <h1 className="home__title">Blog V Blog</h1>
    <div className="home__text">
      <p>This webpage allows people to vote on titles of blogs they find most interesting.</p>
    </div>
    <button className="home__button">
      <NavLink to="/versus" className="home__button-text">Versus Page</NavLink>
    </button>
  </div>
)

export default Home