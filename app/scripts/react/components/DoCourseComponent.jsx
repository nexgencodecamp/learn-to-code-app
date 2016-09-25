// @flow

import React from 'react';
import CourseTableOfContentsComponent from './CourseTableOfContentsComponent';
import JavascriptSandboxComponent from './JavascriptSandboxComponent';

class CodingWindowComponent extends React.Component {

  constructor(props) {
    super();
    this.courseData = props.courseData;
    this.handleCompleteTopic = this.handleCompleteTopic.bind(this);
  }

  static propTypes = {
    completeCourseTopic: React.PropTypes.func,
    courseData: React.PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  handleCompleteTopic() {
    const currentCourseID = this.courseData.currentCourse.courseID;
    const currentSectionID = this.courseData.currentSection.sectionID;
    const currentTopicID = this.courseData.currentTopic.topicID;

    this.completeCourseTopic(currentCourseID, currentSectionID, currentTopicID);
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
    document.querySelector('#startCoding').scrollTop = 0;
    const params = this.props.params;
    this.courseData = this.props.courseData;

    if (params.topicID &&
      (!this.courseData.currentTopic || params.topicID !== this.courseData.currentTopic.topicID)
    ) {
      // user has navigated to a different topic using the table of contents links
      this.props.changeCourseTopic(
        params.courseID,
        params.sectionID,
        params.topicID
      );
    }
  }

  getCourseTableOfContents() {
    return React.createElement(CourseTableOfContentsComponent, {
      courseData: this.courseData
    });
  }

  getTopicContent() {
    if (this.currentTopic) {
      return (
        <div>
          <h3>{this.currentTopic.topicName}</h3>
          <br/>
          <div>{this.currentTopic.topicContent}</div>
        </div>
      );
    }
  }

  getSandboxComponent() {
    return React.createElement(JavascriptSandboxComponent);
  }

  getMainContent() {
    if (this.currentCourse && this.currentCourse.isComplete) {
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
    this.currentCourse = this.courseData.currentCourse;
    this.currentSection = this.courseData.currentSection;
    this.currentTopic = this.courseData.currentTopic;
    this.completeCourseTopic = this.props.completeCourseTopic;

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

export default CodingWindowComponent;

