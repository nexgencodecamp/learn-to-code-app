// @flow
import React from 'react';
import { connect } from 'react-redux';
import ChooseCourseComponent from './ChooseCourseComponent';
import CodingWindowComponent from './CodingWindowComponent';
import LoginComponent from './LoginComponent';
import changeRouteActionCreator from '../actionCreators/changeRoute.js';

class BaseComponent extends React.Component {

  constructor() {
    super();
  }

  showRoutedComponent() {
    const route = this.props.route;
    if (route.route === 'chooseCourse') {
      return React.createElement(ChooseCourseComponent, {
        changeRoute: this.props.changeRoute
      });
    } else if (route.route === 'startCourse') {
      return React.createElement(CodingWindowComponent, {
        changeRoute: this.props.changeRoute,
        progress: route.params
      });
    } else if (route.route === 'login') {
      return React.createElement(LoginComponent, {
        changeRoute: this.props.changeRoute
      });
    }
  }

  render() {
    return (
      <div>
        {this.showRoutedComponent()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    route: state.route,
    courseProgress: state.courseProgress
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeRoute(route, routeParams) {
      dispatch(changeRouteActionCreator.changeRoute(route, routeParams));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseComponent);
