import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../components/Home'
import Versus from '../components/Versus'
import Winners from '../components/Winners'
import Header from '../components/Header'
import Footer from '../components/Footer'

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact={true}/>
        <Route path="/versus" component={Versus} />
        <Route path="/winners" component={Winners} />
      </Switch>
        <Footer/>
    </div>
  </BrowserRouter>
)

export default AppRouter