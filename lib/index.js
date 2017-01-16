import React from 'react'
import ReactDOM from 'react-dom'
import {
  Router,
  IndexRout,
  Route,
  browserHistory
} from 'react-router'
// import ReactStormpath, {
//   Router,
//   HomeRoute,
//   LoginRoute, 
//   AuthenticatedRoute
// } from 'react-stormpath'

import MasterPage from './pages/MasterPage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'

// ReactStormpath.init()

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={MasterPage} />
    <Route path='/register' component={RegistrationPage} />
  </Router>,
  document.getElementById('root')
)

