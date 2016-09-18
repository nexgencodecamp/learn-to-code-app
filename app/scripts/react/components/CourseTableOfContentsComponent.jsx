import React from 'react';

class CourseTableOfContentsComponent extends React.Component {

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
    return section.topics.map(this.getTopicMarkup.bind(this));
  }

  getTopicMarkup(topic) {
    return (
      <a className="mdl-navigation__link" href="" key={topic.topicName}>
        {topic.topicName}
        {this.getDoneIcon(topic.isComplete)}
      </a>
    );
  }

  render() {
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
