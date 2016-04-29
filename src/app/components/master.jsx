import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link } from 'react-router'
import {
    AppCanvas,
    AppBar,
    Avatar,
    Divider,
    FlatButton,
    LeftNav,
    IconButton,
    IconMenu,
    MenuItem,
    List,
    ListItem,
} from 'material-ui'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'



class Master extends React.Component {

    propTypes: {
        children: React.PropTypes.node,
        history: React.PropTypes.object,
        location: React.PropTypes.object
    }

    constructor(props) {
        super(props)
        this.state = {
            isMount: false,
            leftNavOpen: false,
            userInfo: {username: ""},
        }
        this._logout = this._logout.bind(this)
        this._getUserInfo = this._getUserInfo.bind(this)
        this._handleLogout = this._handleLogout.bind(this)
    }

    render() {
        if (!this.state.isMount) {
            $.get(
                "/api/user/info",
                this._getUserInfo
            )
        }

        if (this.props.location.pathname === '/login') {
            return (
                <AppCanvas>
                    {this.props.children}
                </AppCanvas>
            )
        }
        else {
            return (
                <AppCanvas>
                    {this._getAppBar()}
                    <div style={{position: 'absolute', top: 80, left: 40, right: 40, bottom: 20}}>
                        {this.props.children}
                    </div>
                    {this._getLeftNav()}
                </AppCanvas>
            )
        }
    }

    _getAppBar() {
        let routes2subtitle = {
            "//": "",
            "/server/": " - Server Status",
            "/ssh_permission/": " - SSH Permission",
            "/deploy/": " - Deploy",
            "/dockers_status/": " - Docker Status",
            "/register_user/": "- Register User",
        }
        let titleArray = this.props.location.pathname.split('/')
        let titleCut = [titleArray[0], titleArray[1], ""].join('/')
        let title = 'Sophon' + routes2subtitle[titleCut]

        return (
            <div>
                <AppBar title={title}
                 iconElementRight={this._getUserStatus()} 
                 style={{position: 'absolute', top: 0}}
                 onLeftIconButtonTouchTap={this.handleLeftNavToggle} />
            </div>
        )
    }

    _handleLogout(data) {
        this.setState({userInfo: {}, isMount: false})
        this.props.history.replace('/login')
    }

    _logout() {
        $.get("/api/user/logout", this._handleLogout)
    }

    _getUserStatus() {

        let currentUserText = "Current User: " + this.state.userInfo.username
        
        return (
            <IconMenu
             iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
             anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
             targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                <MenuItem value="0" primaryText={currentUserText} />
                <MenuItem value="1" primaryText="Change Password" href="/#/change_password" />
                <MenuItem value="2" primaryText="Logout" onTouchTap={this._logout} />
            </IconMenu>
        )
    }

    _getLeftNav() {

        let registerUserListItem = ""

        if (this.state.isMount && this.state.userInfo["type"] === 1) {
            registerUserListItem = <ListItem href="/#/register_user" value="register_user" primaryText="Register User" onTouchTap={this.handleLeftNavClose}/>
        }

        return (
            <LeftNav
                ref="leftNav"
                docked={false} 
                open={this.state.leftNavOpen}
                onRequestChange={this.handleLeftNavClose}>
                <List>
                    <ListItem href="/#/" value="index" primaryText="Sophon" onTouchTap={this.handleLeftNavClose}/>
                    <Divider inset={false} />
                    <ListItem href="/#/server" value="server" primaryText="Server" onTouchTap={this.handleLeftNavClose}/>
                    <ListItem href="/#/ssh_permission" value="ssh-permission" primaryText="SSH Permission" onTouchTap={this.handleLeftNavClose}/>
                    <ListItem href="/#/deploy" value="deploy" primaryText="Deploy" onTouchTap={this.handleLeftNavClose}/>
                    <ListItem href="/#/dockers_status" value="docker" primaryText="Docker Status" onTouchTap={this.handleLeftNavClose}/>
                    {registerUserListItem}
                </List>
            </LeftNav>
        )
    }

    handleLeftNavToggle = () => this.setState({leftNavOpen: !this.state.leftNavOpen})

    handleLeftNavClose = () => this.setState({leftNavOpen: false})

    _getUserInfo(data) {
        if (data.hasOwnProperty("id")) {
            this.setState({userInfo: data, isMount: true})
        }
    }
}

export default Master
