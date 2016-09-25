// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, RouterContext, browserHistory, applyRouterMiddleware } from 'react-router';
import ChooseCourseComponent from './ChooseCourseComponent';
import DoCourseComponent from './DoCourseComponent';
import LoginComponent from './LoginComponent';
import courseProgressActionCreator from '../actionCreators/courseProgress.js';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

class BaseComponent extends React.Component {

  constructor() {
    super();
  }

  getRouteData() {
    return {
      path: '/',
      component: LoginComponent,
      childRoutes: [
          { path: '/login', component: LoginComponent },
          {
              path: '/chooseCourse',
              component: ChooseCourseComponent,
              courseData: this.props.courseData,
              startCourse: this.props.startCourse
          },
          {
              path: '/doCourse/:courseID',
              component: DoCourseComponent,
              courseData: this.props.courseData
          },
          {
              path: '/doCourse/:courseID/:sectionID/:topicID',
              component: DoCourseComponent,
              courseData: this.props.courseData,
              completeCourseTopic: this.props.completeCourseTopic
          }
      ]
    };
  }

  useExtraProps() {
    return {
      renderRouteComponent: child => React.cloneElement(child, this.props)
    };
  }

  render() {
    return (
      <Router history={this.props.enhancedHistory} render={applyRouterMiddleware(this.useExtraProps())}>
        <Route path='/login' component={LoginComponent} />
        <Route path='/chooseCourse' component={ChooseCourseComponent} />
        <Route path='/doCourse/:courseID' component={DoCourseComponent} />
        <Route path='/doCourse/:courseID/:sectionID/:topicID' component={DoCourseComponent} />
        <Route path='/' component={LoginComponent} />
      </Router>
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
    completeCourseTopic(courseID, sectionID, topicID) {
      dispatch(courseProgressActionCreator.completeTopic(courseID, sectionID, topicID));
    },
    changeCourseTopic(courseID, sectionID, topicID) {
      dispatch(courseProgressActionCreator.changeTopic(courseID, sectionID, topicID));
    },
    startCourse(courseID) {
      dispatch(courseProgressActionCreator.startCourse(courseID));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseComponent);
