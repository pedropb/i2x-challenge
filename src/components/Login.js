import React, { Component } from 'react';

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
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input name="email"
            onChange={this.handleEmailChange.bind(this)}
            value={this.state.email} />
          <div id="email-error">{this.state.emailError}</div>
          <input name="password"
            type="password"
            onChange={this.handlePasswordChange.bind(this)}
            value={this.state.password} />
          <div id="password-error">{this.state.passwordError}</div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;