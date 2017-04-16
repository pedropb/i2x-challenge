import React, { Component } from 'react';
import {Card, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailError: '',
      password: '',
      passwordError: ''
    }
  }

  handleSubmit(event) {

  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });

    if (event.target.value.length === 0) {
      this.setState({ emailError: 'Email is required.'});
    }
    else {
      if (event.target.value.match(/^\S+@\S+\.\S+$/)) {
        this.setState({ emailError: ''});
      }
      else {
        this.setState({ emailError: 'Email is invalid.'});
      }
    }
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });

    if (event.target.value.length === 0) {
      this.setState({ passwordError: 'Password is required.'});
    }
    else {
      this.setState({ passwordError: '' });
    }
  }

  render () {
    return (
        <Card className="login-wrapper">
          <form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
            <h2>Welcome!</h2><br />
            <TextField
                floatingLabelText="E-mail"
                hintText="Enter e-mail"
                name="email"
                onChange={this.handleEmailChange.bind(this)}
                value={this.state.email}
                errorText={this.state.emailError}
              /><br />
            <TextField
                floatingLabelText="Password"
                hintText="Enter password"
                type="password"
                name="password"
                onChange={this.handlePasswordChange.bind(this)}
                value={this.state.password}
                errorText={this.state.passwordError}
              /><br />
            <RaisedButton type="submit" label="Login" primary={true} />
          </form>
        </Card>
    );
  }
}

export default Login;