// @flow
import React from 'react';
import ChooseCourseComponent from './chooseCourse';

class BaseComponent extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <ChooseCourseComponent/>
    );
  }
}

export default BaseComponent;
