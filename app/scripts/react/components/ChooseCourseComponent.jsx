// @flow
import React from 'react';
import { connect } from 'react-redux';
import Select from './forms/ReactSelectWrapper';
import './css/chooseCourse.css';
import CourseProgressActionCreator from '../actionCreators/courseProgress.js';

/**
*  This component is where the student chooses which course they
*  want to study
*/
class ChooseCourseComponent extends React.Component {

  /**
   *  Bind methods to component so can use them with onClick
   */
  constructor() {
    super();
    this.handleChooseCourse = this.handleChooseCourse.bind(this);
    this.handleChangeCourse = this.handleChangeCourse.bind(this);
  }

  static propTypes = {
    courseData: React.PropTypes.object,
  }

  static contextTypes = {
    router: React.PropTypes.object,
  }

  /**
   * Triggered when the user chooses a course from the dropdown
   * (but before the button is clicked)
   * @param  {Object} chosenCourse  The dropdown option for the chosen course
   */
  handleChangeCourse(chosenCourse) {
    this.props.changeCourse(chosenCourse.value);
  }

  /**
   * Triggered when the user clicks the start course button.
   * We then use React Router to move the user to the DoCourse page.
   * @param  {Event} e  The click event fired by the button
   */
  handleChooseCourse(e) {
    const chosenCourse = this.props.courseData.currentCourse;
    this.context.router.push(`/doCourse/${chosenCourse}`);
    e.preventDefault();
  }

  /**
   *  @return  {Array} the data required to populate the course dropdown
   */
  getCourseList() {
    return this.props.courseData.courses.map((course, index) => ({
      value: course.courseID,
      label: course.courseName,
    }));
  }

  /**
   *  @return {JSX} JSX for the choose course component
   **/
  render() {
    const currentCourse = this.props.courseData.currentCourse;
    return (
      <div>
        <div
          styleName="choose-course-wrapper"
          className="mdl-layout__tab-panel is-active"
          id="chooseCourseDropdown"
        >
          <h2>Welcome {this.props.userInfo.firstName}!</h2>
          <Select
              name="form-field-name"
              options={this.getCourseList()}
              onChange={this.handleChangeCourse}
              value={currentCourse}
          />
          <br/>
          <button
            onClick={this.handleChooseCourse}
            id="chooseCourse"
            className="mdl-button mdl-js-button
              mdl-button--raised vertical-center"
          >
            <i className="material-icons">play_circle_filled</i> Start Course!
          </button>
        </div>
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
    userInfo: state.userInfo,
  };
}

/**
*  Maps action creators to props.
*  @param  {Function}  dispatch - the Redux event dispatcher method
*  @return  {Object}  Action creator methods that should be added to props.
*/
function mapDispatchToProps(dispatch) {
  return {
    changeCourse(courseID) {
      dispatch(CourseProgressActionCreator.changeCourse(courseID));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCourseComponent);
