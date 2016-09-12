// @flow
import React from 'react';
import ChooseCourseComponent from './chooseCourse';
import changeRouteActionCreator from '../actionCreators/changeRoute.js';

class BaseComponent extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <ChooseCourseComponent changeRoute={changeRouteActionCreator.changeRoute} />
    );
  }
}

export default BaseComponent;
