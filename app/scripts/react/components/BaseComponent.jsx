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
      <Router history={this.props.enhancedHistory} >
        <Route path='/login' component={LoginComponent} />
        <Route path='/chooseCourse' component={ChooseCourseComponent} />
        <Route path='/doCourse/:courseID' component={DoCourseComponent} />
        <Route path='/doCourse/:courseID/:sectionID/:topicID' component={DoCourseComponent} />
        <Route path='/' component={LoginComponent} />
      </Router>
    );
  }
}

export default BaseComponent;
