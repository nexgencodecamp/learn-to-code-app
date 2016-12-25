// @flow

import React from 'react';
import CourseTableOfContentsComponent from './CourseTableOfContentsComponent';
import JavascriptSandboxComponent from './JavascriptSandboxComponent';
import { connect } from 'react-redux';
import courseProgressActionCreator from '../actionCreators/courseProgress.js';

class CodingWindowComponent extends React.Component {

  constructor(props) {
    super();
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
    const currentCourseID = this.props.courseData.currentCourse.courseID;
    const currentSectionID = this.props.courseData.currentSection.sectionID;
    const currentTopicID = this.props.courseData.currentTopic.topicID;

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
  }

  getCourseTableOfContents() {
    return React.createElement(CourseTableOfContentsComponent, {
      courseData: this.props.courseData,
      changeCourseTopic: this.props.changeCourseTopic,
      params: this.props.params
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
    return React.createElement(JavascriptSandboxComponent, {
      expectedResult: this.props.courseData.currentTopic.expectedResult
    });
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
    this.currentCourse = this.props.courseData.currentCourse;
    this.currentSection = this.props.courseData.currentSection;
    this.currentTopic = this.props.courseData.currentTopic;
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

function mapStateToProps(state) {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(CodingWindowComponent);
