import React from 'react';
import { Link } from 'react-router';
import './css/courseTableOfContents.css';

/**
*  This component shows the course table of contents and
*  allows students to jump from one assignment to another
*/
class CourseTableOfContentsComponent extends React.Component {

  static propTypes = {
    courseData: React.PropTypes.object,
  }

  /**
   * @return {JSX} JSX for links to each of the sections in the course
   */
  getCourseDetails() {
    const sections = this.props.courseData.currentCourse.sections;
    return sections.map(this.getSectionDetails.bind(this));
  }

  /**
   * @param  {Object}  section  The section we're generating links for
   * @return {JSX} JSX for links to topics within an individual section
   */
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

  /**
   * @param  {Boolean}  isComplete  Whether this topic or section is complete
   * @return  {JSX}  JSX for the done icon - will return
   *  null if the topic/section is not yet complete
   */
  getDoneIcon(isComplete) {
    if (isComplete) {
      return (<i className="material-icons">done</i>);
    }
  }

  /**
   * @param {Object} section  The section we're generating TOC for
   * @return  {JSX}  Links to the topics in this section
   */
  getTopicDetailsForSection(section) {
    return section.topics.map(this.getTopicMarkup.bind(this, section));
  }

  /**
   * @param  {Object}  section  The section to which this topic belongs
   * @param  {Object}  topic  The topic we're generating TOC for
   * @return  {JSX}  JSX for link to this topic
   */
  getTopicMarkup(section, topic) {
    const courseID = this.props.courseData.currentCourse.courseID;
    const linkPath = `/doCourse/${courseID}/${section.sectionID}/${topic.topicID}`;
    return (
      <Link
        to={linkPath}
        activeStyle={{ backgroundColor: '#e0e0e0' }}
        className="mdl-navigation__link"
        key={topic.topicID}
      >
        {topic.topicName}
        {this.getDoneIcon(topic.isComplete)}
      </Link>
    );
  }

  /**
   * @return  {JSX}  JSX for TOC or null if no course is active
   */
  render() {
    if (!this.props.courseData.currentCourse) {
      return null;
    }
    return (
      <div className="mdl-layout__drawer">
        <span styleName="toc-title">
          {this.props.courseData.currentCourse.courseName}
        </span>
        <nav className="mdl-navigation">
          {this.getCourseDetails()}
        </nav>
      </div>
    );
  }
}

export default CourseTableOfContentsComponent;
