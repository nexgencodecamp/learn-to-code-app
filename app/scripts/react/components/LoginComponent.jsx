// @flow
import React from 'react';
import { connect } from 'react-redux';
import userInfoActions from '../actionCreators/userInfo.js';

class LoginComponent extends React.Component {

  constructor() {
    super();
    this.state = this.state || {};
    this.handleLogin = this.handleLogin.bind(this);
    this.handleEnterFirstName = this.handleEnterFirstName.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  handleEnterFirstName(e) {
    this.props.updateFirstName(e.target.value);
  }

  handleLogin() {
    this.props.processLogin(this.props.userInfo.firstName);
    this.context.router.push('/chooseCourse');
  }

  render() {
    return (
      <div>
        Hi friend! We haven't met yet. Can you give me your first name please?
        <br/>
        <input type="text" onChange={this.handleEnterFirstName}/>
        <button onClick={this.handleLogin}>Login</button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    processLogin(firstName) {
      dispatch(userInfoActions.handleLogin(firstName));
    },
    updateFirstName(firstName) {
      dispatch(userInfoActions.updateFirstName(firstName));
    },
  };
}

function mapStateToProps(state) {
  return {
    userInfo: state.userInfo
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
