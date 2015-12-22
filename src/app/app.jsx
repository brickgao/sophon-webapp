import React from 'react'
import { render } from 'react-dom'
import { browserHistory, IndexRoute, Router, Route, Link } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Master from './components/master'
import Login from './components/login'
import ServerStatus from './components/server_status'


injectTapEventPlugin()


render((
  <Router history={browserHistory}>
    <Route path="/" component={Master}>
        <Route path="login" component={Login}/>
        <Route path="server" component={ServerStatus}/>
    </Route>
  </Router>
), document.getElementById('app'))
