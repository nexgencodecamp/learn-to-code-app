// @flow
import React from 'react';

class ChooseCourseComponent extends React.Component {

  constructor() {
    super();
    this.handleChooseCourse = this.handleChooseCourse.bind(this);
    this.handleChangeCourse = this.handleChangeCourse.bind(this);
  }

  static propTypes = {
    startCourse: React.PropTypes.func,
    courseData: React.PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  handleChangeCourse(e) {
    this.state = {
      // todo - need to properly set value of dropdown
      chosenCourse: parseInt(e.target.value)
    };
  }

  handleChooseCourse(e) {
    const chosenCourse = this.state.chosenCourse;
    this.props.startCourse(chosenCourse);
    this.context.router.push(`/doCourse/${chosenCourse}`);
    e.preventDefault();
  }

  getCourseList() {
    return this.props.courseData.courses.map(course => (
      <li key={`course-${course.courseName}`} className="mdl-menu__item">{course.courseName}</li>
    ));
  }

  render() {
    // blocker todo - dropdown not working properly
    // todo - shouldn't directly include script tag and CSS here
    return (
      <div>
        <script src="../scripts/vendor/mdl-select.min.js"></script>
        <link rel="stylesheet" href="../styles/getmdl-select.min.css" />
        <div className="mdl-layout__tab-panel is-active" id="chooseCourseDropdown">
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select">
            <input className="mdl-textfield__input" onChange={this.handleChangeCourse} value={this.props.chosenCourse} type="text" id="chosenCourse" tabIndex="-1"/>
            <label className="mdl-textfield__label" htmlFor="chosenCourse">Choose a Course</label>
            <ul className="mdl-menu mdl-menu--bottom-left mdl-js-menu" htmlFor="chosenCourse">
              {this.getCourseList()}
            </ul>
          </div>
          <br/>
          <button onClick={this.handleChooseCourse} id="chooseCourse" className="mdl-button mdl-js-button mdl-button--raised vertical-center">
            <i className="material-icons">play_circle_filled</i> Start Course!
          </button>
        </div>
      </div>
    );
  }
}

export default ChooseCourseComponent;
