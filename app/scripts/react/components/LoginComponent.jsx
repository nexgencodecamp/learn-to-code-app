// @flow
import React from 'react';

class LoginComponent extends React.Component {

  constructor() {
    super();
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.props.changeRoute('chooseCourse');
  }

  render() {
    return (
      <div>
        <button onClick={this.handleLogin}>Login</button>
      </div>
    );
  }
}

export default LoginComponent;
