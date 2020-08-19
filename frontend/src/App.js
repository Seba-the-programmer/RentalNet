import React from 'react'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Home from './components/Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/search/:token' component={Login}/>
          <Route exact path='/account/:token' component={Login}/>
          <Route exact path='/about' component={Login}/>
          <Route exact path='/home/:token' component={Home}/>
          <Route exact path='/recovering' component={Login}/>
          <Route exact path='/register' component={Login}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
  )
}

export default App;
