import React from 'react';
import { Link } from 'react-router';

class CourseTableOfContentsComponent extends React.Component {

  static propTypes = {
    courseData: React.PropTypes.object
  }

  constructor() {
    super();
  }

  getCourseDetails() {
    return this.props.courseData.currentCourse.sections.map(this.getSectionDetails.bind(this));
  }

  getSectionDetails(section) {
    return (
      <div key={section.sectionName}>
        <span className="drawer-sub-title">
          {section.sectionName}
          {this.getDoneIcon(section.isComplete)}
        </span>
        {this.getTopicDetailsForSection(section)}
      </div>
    );
  }

  getDoneIcon(isComplete) {
    if (isComplete) {
      return (<i className="material-icons">done</i>);
    }
  }

  getTopicDetailsForSection(section) {
    return section.topics.map(this.getTopicMarkup.bind(this, section));
  }

  getTopicMarkup(section, topic) {
    const courseID = this.props.courseData.currentCourse.courseID;
    const linkPath = `/doCourse/${courseID}/${section.sectionID}/${topic.topicID}`;
    return (
      <Link to={linkPath} activeStyle={{ backgroundColor: '#e0e0e0' }} className="mdl-navigation__link" key={topic.topicID}>
        New link
        {topic.topicName}
        {this.getDoneIcon(topic.isComplete)}
      </Link>
    );
  }

  render() {
    if (!this.props.courseData.currentCourse) {
      return null;
    }
    return (
      <div className="mdl-layout__drawer">
        <span className="mdl-layout-title">{this.props.courseData.currentCourse.courseName}</span>
        <nav className="mdl-navigation">
          {this.getCourseDetails()}
        </nav>
      </div>
    );
  }
}

export default CourseTableOfContentsComponent;
