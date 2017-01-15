// @flow
import React from 'react';
import { connect } from 'react-redux';
import Select from './forms/ReactSelectWrapper';
import './css/chooseCourse.css';

class ChooseCourseComponent extends React.Component {

  constructor() {
    super();
    this.handleChooseCourse = this.handleChooseCourse.bind(this);
    this.handleChangeCourse = this.handleChangeCourse.bind(this);
    this.state = {};
  }

  static propTypes = {
    courseData: React.PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  handleChangeCourse(chosenCourse) {
    this.chosenCourse = chosenCourse;
  }

  handleChooseCourse(e) {
    const chosenCourse = this.chosenCourse;
    this.context.router.push(`/doCourse/${chosenCourse}`);
    e.preventDefault();
  }

  getCourseList() {
    return this.props.courseData.courses.map((course, index) => ({
      value: index + 1,
      label: course.courseName
    }));
  }

  render() {
    // todo - shouldn't directly include script tag and CSS here
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

function mapStateToProps(state) {
  return {
    courseData: state.courseData,
    userInfo: state.userInfo
  };
}

export default connect(mapStateToProps)(ChooseCourseComponent);
