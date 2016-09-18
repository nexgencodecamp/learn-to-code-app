import React from 'react';

class CourseTableOfContentsComponent extends React.Component {
  render() {
    return (
      <div className="mdl-layout__drawer">
        <span className="mdl-layout-title">Course Content</span>
        <nav className="mdl-navigation">
          <span className="drawer-sub-title">Section One</span>
          <a className="mdl-navigation__link" href="">Topic 1
            <i className="material-icons">done</i>
          </a>
          <a className="mdl-navigation__link" href="" id="topic2">Topic 2</a>
          <a className="mdl-navigation__link" href="">Topic 3</a>
          <a className="mdl-navigation__link" href="">Topic 4</a>
        </nav>
      </div>
    );
  }
}

export default CourseTableOfContentsComponent;
