import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'
import {
    MenuItem,
    RaisedButton,
    SelectField,
    TextField,
    Snackbar,
} from 'material-ui'


class RegisterUser extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user_type: 1,
            snackBarOpen: false,
            passwordErrorText: "",
            usernameErrorText: "",
            SSHPublicKeyErrorText: "",
        }
        this._handleNewUser = this._handleNewUser.bind(this)
        this._openSnackBar = this._openSnackBar.bind(this)
    }

    render() {
        return(
            <div>
                {this._getForm()}
                {this._getSnackbar()}
            </div>
        )
    }

    _handleRequestClose = () => this.setState({snackBarOpen: false})

    _getSnackbar() {
        return (
            <Snackbar
                open={this.state.snackBarOpen}
                message="Add a new user successfully"
                autoHideDuration={4000}
                onRequestClose={this._handleRequestClose}
            />
        )
    }

    _openSnackBar() {
        this.setState({snackBarOpen: true})
    }

    _handleNewUser() {
        let username = $("#username").val()
        let password = $("#password").val()
        let ssh_public_key = $("#ssh_public_key").val()
        let user_type = this.state.user_type

        try {
            this.setState({
                usernameErrorText: "",
                passwordErrorText: "",
                SSHPublicKeyErrorText: "",
            })
        }
        finally {
            if (username === "") {
                this.setState({usernameErrorText: "Please input user name"})
            }
            else if (password === "") {
                this.setState({passwordErrorText: "Please input password"})
            }
            else if (ssh_public_key === "") {
                this.setState({SSHPublicKeyErrorText: "Please input SSH public key"})
            }
            else {
                $.post(
                    "/api/user/reg",
                    {
                        username: username,
                        password: password,
                        type: user_type,
                        public_key: ssh_public_key,
                    },
                    this._openSnackBar
                )
            }
        }
    }

    _handleUserTypeChange = (event, index, value) => this.setState({user_type: value})

    _getForm() {

        let styles = {
            width: '50%',
        }

        return (
            <div style={styles}>
                <span>Username</span><br/>
                <TextField
                 id="username"
                 hintText="username"
                 fullWidth={true}
                 errorText={this.state.usernameErrorText}
                /><br/>
                <span>Password</span><br/>
                <TextField
                 id="password"
                 hintText="password"
                 fullWidth={true}
                 type="password"
                 errorText={this.state.passwordErrorText}
                /><br/>
                <span>User type</span><br/>
                <SelectField value={this.state.user_type} onChange={this._handleUserTypeChange}>
                    <MenuItem value={1} primaryText="Admin"/>
                    <MenuItem value={2} primaryText="Developer"/>
                </SelectField><br/>
                <span>SSH Public key</span><br/>
                <TextField
                 id="ssh_public_key"
                 hintText="SSH Public Key"
                 fullWidth={true}
                 multiLine={true}
                 errorText={this.state.SSHPublicKeyErrorText}
                 rows={3}
                 rowsMax={3}
                /><br/>          
                <br/>
                <RaisedButton label="Submit" secondary={true} onTouchTap={this._handleNewUser}/>
            </div>
        )
    }
}

export default RegisterUser
