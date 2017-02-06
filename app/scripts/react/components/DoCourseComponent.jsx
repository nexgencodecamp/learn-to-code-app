// @flow

import React from 'react';
import CourseTableOfContentsComponent from './CourseTableOfContentsComponent';
import JavascriptSandboxComponent from './JavascriptSandboxComponent';
import { connect } from 'react-redux';
import courseProgressActionCreator from '../actionCreators/courseProgress.js';
import './css/doCourse.css';

/**
* This component shows the question the student needs
* to answer and includes a coding sandbox for them to work with.
* When they get the right code, the Next button is shown.
*/
class DoCourseComponent extends React.Component {

  /**
   *  Bind methods to component so can use them with onClick
   */
  constructor() {
    super();
    this.handleCompleteTopic = this.handleCompleteTopic.bind(this);
  }

  static propTypes = {
    completeCourseTopic: React.PropTypes.func,
    courseData: React.PropTypes.object,
  }

  static contextTypes = {
    router: React.PropTypes.object,
  }

  /**
   *  Triggered after the user successfully completes a topic.
   *  Triggers action to move them to next topic.
   **/
  handleCompleteTopic() {
    const currentCourseID = this.props.courseData.currentCourse.courseID;
    const currentSectionID = this.props.courseData.currentSection.sectionID;
    const currentTopicID = this.props.courseData.currentTopic.topicID;

    this.completeCourseTopic(currentCourseID, currentSectionID, currentTopicID);
  }

  /**
   * Bit hacky but we need to do this
   * to hide the drawer when the component unmounts. Doing it like
   * this because the drawer is based on a class on a parent element.
   * //todo - refactor this at some point.
   **/
  removeDrawer() {
    const container = document.querySelector('#container');
    container.classList.remove('mdl-layout--fixed-drawer');
  }

  /**
   * See above. Same logic for adding drawer.
   */
  addDrawer() {
    // todo - this should be controlled by router
    const container = document.querySelector('#container');
    container.classList.add('mdl-layout--fixed-drawer');
  }

  /**
   * Triggered when the component gets mounted.
   * Show the drawer so we can render table of contents.
   */
  componentDidMount() {
    this.addDrawer();
  }

  /**
   * Triggered when the component gets unmounted.
   * Hide the drawer at this point because it isn't relevant
   * if the DoCourse screen isn't showing.
   */
  componentWillUnmount() {
    this.removeDrawer();
  }

  /**
   *  @return  {JSX}  Table of contents JSX
   */
  getCourseTableOfContents() {
    return React.createElement(CourseTableOfContentsComponent, {
      courseData: this.props.courseData,
      params: this.props.params,
    });
  }

  /**
   * @return  {JSX}  Shows details about the current topic above code input
   *                so the student knows what they're meant to do.
   */
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

  /**
   * @return  {ReactElement} The coding sandbox that the student
   *            uses to write code.
   */
  getSandboxComponent() {
    return React.createElement(JavascriptSandboxComponent, {
      expectedResult: this.props.courseData.currentTopic.expectedResult,
    });
  }

  /**
   * @return  {JSX}  The main contents of the Course screen including:
   *   - course description
   *   - code sandbox
   */
  getMainContent() {
    const wasCorrect = this.props.codeExecutionResult.correctStatus;
    const buttonVisibleClass = wasCorrect ? '' : 'hidden';
    const buttonClasses = `${buttonVisibleClass} mdl-button mdl-js-button
              mdl-button--raised vertical-center`;
    if (this.currentCourse && this.currentCourse.isComplete) {
      return (
        <div className="page-content" styleName="do-course-wrapper">
          <h3>
            You've completed the course! Well done :)
            <br/>
            <a href="/">Go back and choose another course</a>
          </h3>
        </div>
      );
    } else {
      return (
        <div className="page-content" styleName="do-course-wrapper">
          <div id="sectionContent">
            {this.getTopicContent()}
          </div>
          {this.getSandboxComponent()}
          <button
            onClick={this.handleCompleteTopic} id="gotoNext"
            className={buttonClasses}
          >
            <i className="material-icons">check_circle</i> Goto Next
          </button>
        </div>
      );
    }
  }

  /**
   * @return {JSX} the table of contents and the coding window
   */
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

/**
*  Maps Redux store state to props
*  @param  {Object}  state - the Redux state
*  @return  {Object}  props based on Redux state
*/
function mapStateToProps(state) {
  return {
    courseData: state.courseData,
    codeExecutionResult: state.codeExecutionResult,
  };
}

/**
*  Maps action creators to props.
*  @param  {Function}  dispatch - the Redux event dispatcher method
*  @return  {Object}  Action creator methods that should be added to props.
*/
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
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoCourseComponent);
