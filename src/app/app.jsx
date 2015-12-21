import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Master from './components/master'

injectTapEventPlugin()


render((
  <Router history={browserHistory}>
    <Route path="/" component={Master}>
    </Route>
  </Router>
), document.getElementById('app'))
