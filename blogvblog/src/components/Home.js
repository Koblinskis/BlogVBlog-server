import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => (
  <div>
    <h1 className="home__title">Blog V Blog</h1>
    <div className="home__text">
      <p>This webpage allows people to vote on titles of blogs they find most interesting.</p>
      <p>Vote for the title that seems the most appeasing.</p>
      <p className="home__small-text">Created by S. Michael Koblinski</p>
      <p className="home__small-text">Uses MongoDB for a server. <br/>React for the frontend, and <br/>NodeJS for the backend</p>
    </div>
    <button className="home__button">
      <NavLink to="/versus" className="home__button-text">Versus Page</NavLink>
    </button> <br/>
    <button className="home__button">
      <NavLink to="/winners" className="home__button-text">Winners Page</NavLink>
    </button>
  </div>
)

export default Home