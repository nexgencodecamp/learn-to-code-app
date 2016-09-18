// @flow
import React from 'react';

class ChooseCourseComponent extends React.Component {

  constructor() {
    super();
    this.handleChooseCourse = this.handleChooseCourse.bind(this);
  }

  handleChooseCourse(e) {
    const chosenCourse = this.props.chosenCourse;
    this.props.changeRoute('startCourse', [chosenCourse]);
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <script src="../scripts/vendor/mdl-select.min.js"></script>
        <link rel="stylesheet" href="../styles/getmdl-select.min.css" />
        <div className="mdl-layout__tab-panel is-active" id="chooseCourseDropdown">
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select">
             <input className="mdl-textfield__input" value={this.props.chosenCourse} type="text" id="chosenCourse" tabIndex="-1"/>
             <label className="mdl-textfield__label" htmlFor="chosenCourse">Choose a Course</label>
             <ul className="mdl-menu mdl-menu--bottom-left mdl-js-menu" htmlFor="chosenCourse">
               <li className="mdl-menu__item">Course 1</li>
               <li className="mdl-menu__item">Course 2</li>
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

ChooseCourseComponent.propTypes = {
  changeRoute: React.PropTypes.func
};

export default ChooseCourseComponent;
