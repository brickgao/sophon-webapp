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


class ChangePassword extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            snackBarOpen: false,
            passwordErrorText: "",
            passwordAgainErrorText: "",
        }
        this._handleChangePassword = this._handleChangePassword.bind(this)
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
                message="Change your password successfully"
                autoHideDuration={4000}
                onRequestClose={this._handleRequestClose}
            />
        )
    }

    _openSnackBar() {
        this.setState({snackBarOpen: true})
    }

    _handleChangePassword() {
        let password = $("#password").val()
        let passwordAgain = $("#password_again").val()

        try {
            this.setState({
                passwordErrorText: "",
                passwordAgainErrorText: "",
            })
        }
        finally {
            if (password === "") {
                this.setState({passwordErrorText: "Please input password"})
            }
            else if (passwordAgain !== password) {
                this.setState({passwordAgainErrorText: "Two passwords is not same"})
            }
            else {
                $.ajax({
                    url: "/api/user/password",
                    type: "PUT",
                    data: {
                        password: password,
                    },
                    success: this._openSnackBar,
                })
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
                <span>Password</span><br/>
                <TextField
                 id="password"
                 hintText="Password"
                 fullWidth={true}
                 type="password"
                 errorText={this.state.passwordErrorText}
                /><br/>
                <span>Password Confirmation</span><br/>
                <TextField
                 id="password_again"
                 hintText="Password Confirmation"
                 fullWidth={true}
                 type="password"
                 errorText={this.state.passwordAgainErrorText}
                /><br/>
                <RaisedButton label="Submit" secondary={true} onTouchTap={this._handleChangePassword}/>
            </div>
        )
    }
}

export default ChangePassword
