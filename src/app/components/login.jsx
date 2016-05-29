import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'
import {
    AppCanvas,  
    Paper,
    Styles,
    RaisedButton,
    TextField,
} from 'material-ui'

const { Colors } = Styles


class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            passwordErrorText: "",
            usernameErrorText: "",
        }
        this._submit = this._submit.bind(this)
        this._handleData = this._handleData.bind(this)
    }

    _submit() {
        let username = $("#username").val()
        let password = $("#password").val()

        try {
            this.setState({
                usernameErrorText: "",
                passwordErrorText: "",
            })
        }
        finally {
            if (!username.trim()) {
                this.setState({usernameErrorText: "Please input username"})
            }
            else if (!password.trim()) {
                this.setState({passwordErrorText: "Please input password"})
            }
            else {
                $.post(
                    "/api/user/login",
                    {username: username, password: password},
                    this._handleData,
                )
            }
        }
    }

    _handleData(data) {
        if (data["id"] != null) {
            this.props.history.replace('/')
        }
        else {
            this.setState({passwordErrorText: "Wrong username or password"})
        }
    }

    render() {
        let styles = {
            position: 'fixed',
            width: '100%',
            height: '100%',
            backgroundColor: Colors.grey200,
        }

        return(
        	<AppCanvas>
                <div style={styles}>
                    {this._getLoginPaper()}
                </div>
        	</AppCanvas>
        )
    }
    
    _getLoginPaper() {
        let styles = {
            width: '328px',
            height: '380px',
            position: 'fixed',
            top: '50%',
            left: '50%',
            marginTop: '-164px',
            marginLeft: '-190px',
        }

        return (
            <Paper zDepth={2} style={styles}>
                {this._getForm()}
            </Paper>
        )
    }

    _getForm() {
        let styles = {
            marginTop: '20%',
            marginLeft: '35px',
        }

        return (
            <div style={styles}>
                {this._getFormHeader()}
                {this._getFormTextField()}
                {this._getPoweredby()}
                {this._getFormBtn()}
            </div>
        )
    }

    _getFormHeader() {
        let styles = {
            fontSize: '50px',
            fontWeight: '300',
            color: Colors.lightBlue300,
            marginBottom: '20px',
        }

        return (
            <h2 style={styles}>Login</h2>
        )
    }

    _getFormTextField() {
        return (
            <div>
                <TextField
                 id="username"
                 errorText={this.state.usernameErrorText}
                 floatingLabelText="Username"
                 hintText="Input your username" />
                <TextField
                 id="password"
                 errorText={this.state.passwordErrorText}
                 floatingLabelText="Password"
                 type="password"
                 hintText="Input your Password" />
            </div>
        )
    }

    
    _getPoweredby() {
        let styles = {
            position: 'absolute',
            left: '35px',
            bottom: '15px',
            fontSize: '3px',
            color: '#909090',
        }

        return (
            <span style={styles}>Powered by <a href="https://github.com/TheSophon/sophon">Sophon</a></span>
        )
    }

    _getFormBtn() {
        let styles = {
            position: 'absolute',
            left: '203px',
            bottom: '20px',
        }

        return (
            <RaisedButton label="Submit" secondary={true} style={styles} onTouchTap={this._submit}/>
        )
    }
}

export default Login
