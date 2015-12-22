import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'
import { AppCanvas, AppBar, Avatar, FlatButton, LeftNav, List, ListItem, Mixins, Styles, TextField, RaisedButton } from 'material-ui'


class Login extends React.Component {

	submit(e) {
		let username = $("#username").val().trim();
		let password = $("#password").val().trim();
		
	    if (!username || !password) {
	      return false;
	    }

		$.post("/#/index.html", {username: username, password: password}, function(){
			window.localtion = "/index.html";
		})
		.fail(function(){
			alert("error!");
		})	
		return false;
	}

    render() {
        return(
        	<AppCanvas>
        		<form onSubmit={this.submit}>
	                <TextField id="username"
	                 hintText="Username Field"
	                 floatingLabelText="username"/>
	      
	                <TextField id="password"
					 hintText="Password Field"
					 floatingLabelText="password"
					 type="password" />
					<RaisedButton label="Login" type="submit"/>
		        </form>
        	</AppCanvas>
        )
    }

}

export default Login

