import React from 'react'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Home from './components/Home'
import Register from './components/Register'
import Done from './components/Register/Done'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/search/:token' component={Login}/>
          <Route exact path='/account/:token' component={Login}/>
          <Route exact path='/library/:token' component={Login}/>
          <Route exact path='/about' component={Login}/>
          <Route exact path='/home/:token' component={Home}/>
          <Route exact path='/recovering' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/register/done/:id' component={Done}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
  )
}

export default App;
