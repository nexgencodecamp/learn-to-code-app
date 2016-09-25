// @flow
import React from 'react';

class LoginComponent extends React.Component {

  constructor() {
    super();
    this.handleLogin = this.handleLogin.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  handleLogin() {
    this.context.router.push('/chooseCourse');
  }

  render() {
    return (
      <div>
        Click login to start your journey :)
        <br/>
        <button onClick={this.handleLogin}>Login</button>
      </div>
    );
  }
}

export default LoginComponent;
