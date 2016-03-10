import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'
import {
    MenuItem,
    RaisedButton,
    SelectField,
    TextField,
} from 'material-ui'


class RegisterUser extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            passwordErrorText: "",
            usernameErrorText: "",
            SSHPublicKeyErrorText: "",
        }
    }

    render() {
        return(
            <div>
                {this._getForm()}
            </div>
        )
    }

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
                <SelectField value={1}>
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
                <RaisedButton label="Submit" secondary={true}/>
            </div>
        )
    }
}

export default RegisterUser
