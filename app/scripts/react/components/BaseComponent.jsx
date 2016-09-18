// @flow
import React from 'react';
import { connect } from 'react-redux';
import ChooseCourseComponent from './ChooseCourseComponent';
import DoCourseComponent from './DoCourseComponent';
import LoginComponent from './LoginComponent';
import changeRouteActionCreator from '../actionCreators/changeRoute.js';
import courseProgressActionCreator from '../actionCreators/courseProgress.js';

class BaseComponent extends React.Component {

  constructor() {
    super();
  }

  showRoutedComponent() {
    // todo change to react router
    const route = this.props.route;
    if (route.route === 'chooseCourse') {
      return React.createElement(ChooseCourseComponent, {
        startCourse: this.props.startCourse,
        courseData: this.props.courseData
      });
    } else if (route.route === 'startCourse') {
      return React.createElement(DoCourseComponent, {
        changeRoute: this.props.changeRoute,
        courseProgressData: route.params,
        courseData: this.props.courseData,
        completeCourseTopic: this.props.completeCourseTopic
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
    courseData: state.courseData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeRoute(route, routeParams) {
      dispatch(changeRouteActionCreator.changeRoute(route, routeParams));
    },
    completeCourseTopic(courseID, sectionID, topicID) {
      dispatch(courseProgressActionCreator.completeTopic(courseID, sectionID, topicID));
    },
    startCourse(courseID) {
      dispatch(courseProgressActionCreator.startCourse(courseID));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseComponent);
