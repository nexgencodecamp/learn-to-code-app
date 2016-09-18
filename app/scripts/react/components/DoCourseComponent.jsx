// @flow

import React from 'react';
import CourseTableOfContentsComponent from './CourseTableOfContentsComponent';
import JavascriptSandboxComponent from './JavascriptSandboxComponent';

class CodingWindowComponent extends React.Component {

  constructor() {
    super();
    this.handleCompleteTopic = this.handleCompleteTopic.bind(this);
  }

  handleCompleteTopic() {
    const currentCourseID = this.props.courseData.currentCourse.courseID;
    const currentSectionID = this.props.courseData.currentSection.sectionID;
    const currentTopicID = this.props.courseData.currentTopic.topicID;

    this.props.completeCourseTopic(currentCourseID, currentSectionID, currentTopicID);
  }

  removeDrawer() {
    const container = document.querySelector('#container');
    container.classList.remove('mdl-layout--fixed-drawer');
  }

  addDrawer() {
    // todo - this should be controlled by router
    const container = document.querySelector('#container');
    container.classList.add('mdl-layout--fixed-drawer');
  }

  componentDidMount() {
    this.addDrawer();
  }

  componentWillUnmount() {
    this.removeDrawer();
  }

  componentDidUpdate() {
    // scroll to top
    // todo - this doesn't work
    document.querySelector('#startCoding').scrollTop = 0
  }

  getCourseTableOfContents() {
    return React.createElement(CourseTableOfContentsComponent, {
      courseData: this.props.courseData
    });
  }

  getTopicContent() {
    const currentTopic = this.props.courseData.currentTopic;
    return (
      <div>
        <h3>{currentTopic.topicName}</h3>
        <br/>
        <div>{currentTopic.topicContent}</div>
      </div>
    );
  }

  getSandboxComponent() {
    return React.createElement(JavascriptSandboxComponent);
  }

  getMainContent() {
    if (this.props.courseData.currentCourse.isComplete) {
      return (
        <h3>
          You've completed the course! Well done :)
        </h3>
      );
    } else {
      return (
        <div className="page-content">
          <div id="sectionContent">
            {this.getTopicContent()}
          </div>
          {this.getSandboxComponent()}
          <button onClick={this.handleCompleteTopic} id="gotoNext" className="mdl-button mdl-js-button mdl-button--raised vertical-center">
            <i className="material-icons">check_circle</i> Goto Next
          </button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="mdl-layout__tab-panel is-active" id="startCoding">
        {this.getCourseTableOfContents()}
        <main className="mdl-layout__content">
          {this.getMainContent()}
        </main>
      </div>
    );
  }
}

CodingWindowComponent.propTypes = {
  changeRoute: React.PropTypes.func,
  completeCourseTopic: React.PropTypes.func,
  courseData: React.PropTypes.object
};

export default CodingWindowComponent;

