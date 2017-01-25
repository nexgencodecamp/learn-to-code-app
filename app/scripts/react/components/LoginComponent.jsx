// @flow
import React from 'react';
import { connect } from 'react-redux';
import userInfoActions from '../actionCreators/userInfo.js';
import './css/login.css';

/**
*  The login component handles the login process
*  (though currently it's not real login,
*  it just asks for the user's name).
*/
class LoginComponent extends React.Component {

  /**
   * Bind events so they work with onClick/onKeyPress
   **/
  constructor() {
    super();
    this.state = this.state || {};
    this.handleLogin = this.handleLogin.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleEnterFirstName = this.handleEnterFirstName.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object,
  }

  /**
   * Triggered when the user changes the first name field.
   * @param  {Event}  e  The change event
   **/
  handleEnterFirstName(e) {
    this.props.updateFirstName(e.target.value);
  }

  /**
   * Triggered when the user clicks login or presses enter.
   **/
  handleLogin() {
    this.props.processLogin(this.props.userInfo.firstName);
    this.context.router.push('/chooseCourse');
  }

  /**
   * @param  {Event}  e  The keypress event
   */
  handleKeyPress(e) {
    const ENTER_KEY = 13;
    if (e.which === ENTER_KEY) {
      this.handleLogin();
    }
  }

  /**
   * Renders the component using CSS modules for styling.
   * @return {JSX}  JSX
   */
  render() {
    return (
      <div styleName='loginWrapper' onKeyPress={this.handleKeyPress}>
        Hi friend! We haven't met yet. Can you give me your first name please?
        <br/>
        <input type="text" onChange={this.handleEnterFirstName}/>
        <button onClick={this.handleLogin}>Login</button>
      </div>
    );
  }
}

/**
*  Maps action creators to props.
*  @param  {Function}  dispatch - the Redux event dispatcher method
*  @return  {Object}  Action creator methods that should be added to props.
*/
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

/**
*  Maps Redux store state to props
*  @param  {Object}  state - the Redux state
*  @return  {Object}  props based on Redux state
*/
function mapStateToProps(state) {
  return {
    userInfo: state.userInfo,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
