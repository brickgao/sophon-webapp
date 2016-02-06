import React from 'react'
import { render } from 'react-dom'
import { browserHistory, IndexRoute, Router, Route, Link } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Master from './components/master'
import Login from './components/login'
import ServerStatus from './components/server_status'
import ServerStatusIndex from './components/server_status_index'
import ServerStatusDetail from './components/server_status_detail'
import SSHPermission from './components/ssh_permission'
import DockersStatus from './components/dockers_status'
import Deploy from './components/deploy'
import DeployIndex from './components/deploy_index'
import DeployDetail from './components/deploy_detail'


injectTapEventPlugin()


render((
  <Router history={browserHistory}>
    <Route path="/" component={Master}>
        <Route path="login" component={Login} />
        <Route path="server" component={ServerStatus}>
            <IndexRoute component={ServerStatusIndex} />
            <Route path=":id" component={ServerStatusDetail} />
        </Route>
        <Route path="deploy" component={Deploy}>
            <IndexRoute component={DeployIndex} />
            <Route path=":id" component={DeployDetail} />
        </Route>
        <Route path="ssh_permission" component={SSHPermission} />
        <Route path="dockers_status" component={DockersStatus} />
    </Route>
  </Router>
), document.getElementById('app'))
