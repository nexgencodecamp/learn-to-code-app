// @flow
import React from 'react';
import { Router, Route, RouterContext, browserHistory, applyRouterMiddleware } from 'react-router';
import ChooseCourseComponent from './ChooseCourseComponent';
import DoCourseComponent from './DoCourseComponent';
import LoginComponent from './LoginComponent';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

class BaseComponent extends React.Component {

  constructor() {
    super();
  }

  getIndexComponent() {
    if (this.props.userInfo.loggedIn) {
      return ChooseCourseComponent;
    }
    'testing';
    return LoginComponent;
  }

  render() {
    return (
      <Router history={this.props.enhancedHistory} >
        <Route path='/login' component={LoginComponent} />
        <Route path='/chooseCourse' component={ChooseCourseComponent} />
        <Route path='/doCourse/:courseID' component={DoCourseComponent} />
        <Route path='/doCourse/:courseID/:sectionID/:topicID' component={DoCourseComponent} />
        <Route path='/' component={this.getIndexComponent()} />
      </Router>
    );
  }
}

export default BaseComponent;
