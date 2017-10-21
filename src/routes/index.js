import React from 'react'
import { Route, Switch } from 'react-router'
import Home from './Home'
import About from './About'
import NoMatch from './NoMatch'
import NavBar from '../components/NavBar'

const routes = (
  <div>
    <NavBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route component={NoMatch} />
    </Switch>
  </div>
)

export default routes