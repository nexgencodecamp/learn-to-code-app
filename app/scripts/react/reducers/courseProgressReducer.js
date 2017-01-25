import findIndex from 'lodash.findindex';

/**
@param  {Object}  state  The state prior to reduction
@param  {Object}  action  The reducer action
@return  {Object}  The state after reducer operations
*/
export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'CHANGE_COURSE':
      return Object.assign({}, state, action.value);
    case 'START_COURSE':
      return getNewStateAfterStartingCourse(state, action.value);
    case 'COMPLETE_TOPIC':
      return getNewStateAfterCompletingTopic(state, action);
    case '@@router/LOCATION_CHANGE':
      return getNewStateAfterChangingRoute(state, action);
    default:
      return state;
  }
}

/**
* Utility function to generate state after starting a course
* Needed because need to find the first section and first topic for
* that course.
* @param  {Object} state The old state
* @param  {number} courseID The ID of the course being started
* @return  {Object} The new state after reduction
*/
function getNewStateAfterStartingCourse(state, courseID) {
  return Object.assign({}, state, {
    currentCourse: getCourseDataFromID(state, courseID),
    currentSection: getFirstSectionForCourse(state, courseID),
    currentTopic: getFirstTopicForFirstSectionInCourse(state, courseID),
  });
}

/**
*  This function figures out what topic/section the user is on
*  after they click on a link in the TOC and change topics
*  @param  {Object} state The current router state
*  @param  {Object} action The router action which we can use to find the new path
*  @return  {Object}  The new courseData state after changing topics
*/
function getNewStateAfterChangingRoute(state, action) {
  if (action.payload.pathname.indexOf('doCourse') > -1) {
    const linkParts = action.payload.pathname.split('doCourse/')[1].split('/');
    // todo - handle dodgey non int paths
    const courseID = parseInt(linkParts[0]);
    const sectionID = parseInt(linkParts[1]);
    const topicID = parseInt(linkParts[2]);

    if (linkParts.length === 1) {
      return getNewStateAfterStartingCourse(state, courseID);
    } else if (linkParts.length === 3) {
      // changing topic
      return getNewStateAfterChangingTopic(state,
        {
          value: {
            courseID,
            sectionID,
            topicID,
          },
        }
      );
    }
    return state;
  } else {
    return state;
  }
}

/**
*  @return  {Object}  The first topic in the first section of a course
*  @param  {Object} state  The current courseData state
*  @param {Number} courseID The course ID
*/
function getFirstTopicForFirstSectionInCourse(state, courseID) {
  const relevantSection = getFirstSectionForCourse(state, courseID);
  return relevantSection.topics[0];
}

/**
*  @return  {Object}  The first section in a specified course
*  @param  {Object} state  The current courseData state
*  @param {Number} courseID The course ID
*/
function getFirstSectionForCourse(state, courseID) {
  const relevantCourse = getCourseDataFromID(state, courseID);
  return relevantCourse.sections[0];
}

/**
*  @return {Object} The data for the course matching the specified course ID
*  @param  {Object} state  The current courseData state
*  @param {Number} courseID The course ID we're looking up
*/
function getCourseDataFromID(state, courseID) {
  return state.courses.find((course) =>
    course.courseID === courseID
  );
}

/**
*  @return {Object} The data for the section matching the specified section ID
*  @param  {Object} course  The data for the course containing this section
*  @param {Number} sectionID The course ID we're looking up
*/
function getSectionDataFromID(course, sectionID) {
  return course.sections.find((section) =>
    section.sectionID === sectionID
  );
}

/**
*  @return {Object} The data for the topic matching the specified topic ID
*  @param  {Object} section  The data for the section containing this topic
*  @param {Number} topicID The course ID we're looking up
*/
function getTopicDataFromID(section, topicID) {
  return section.topics.find((topic) =>
    topic.topicID === topicID
  );
}

/**
*  Used to set the current course, section and topic
*  based on an action triggered by changing routes
*  (getNewStateAfterChangingRoute).
*  @return  {Object}  New state after updating current course/section/topic
*  @param  {Object}  state  The current courseData state
*  @param  {Object}  action  The action that's triggering the topic change
*/
function getNewStateAfterChangingTopic(state, action) {
  // todo - should have tests for this part
  const newState = Object.assign({}, state);
  const relevantCourse = getCourseDataFromID(newState, parseInt(action.value.courseID));
  const relevantSection = getSectionDataFromID(relevantCourse, parseInt(action.value.sectionID));
  const relevantTopic = getTopicDataFromID(relevantSection, parseInt(action.value.topicID));
  return Object.assign({}, state, {
    currentCourse: relevantCourse,
    currentSection: relevantSection,
    currentTopic: relevantTopic,
  });
}

/**
*  Used to set the current course, section and topic
*  after the student completes a previous topic. If they've just
*  completed the last topic in a section, it should advance them to the
*  next section and if it was the last section in a course, it should complete
*  the course.
*  @return  {Object}  New state after updating current course/section/topic
*  @param  {Object}  state  The current courseData state
*  @param  {Object}  action  The complete topic action that's triggering change
*/
function getNewStateAfterCompletingTopic(state, action) {
  // todo - should have tests for this part
  const newState = Object.assign({}, state);
  const relevantCourse = getCourseDataFromID(newState, action.value.courseID);
  const relevantSection = getSectionDataFromID(relevantCourse, action.value.sectionID);
  const relevantTopicIndex = findIndex(relevantSection.topics,
    (topic) => topic.topicID === action.value.topicID);
  relevantSection.topics[relevantTopicIndex].isComplete = true;

  return getStateWithNextTopicAndSection(
    newState,
    relevantSection.sectionID,
    relevantCourse.courseID,
    relevantTopicIndex
  );
}

/**
*  Called by getNewStateAfterCompletingTopic
*  @return  {Object}  State for the next topic/section
*  @param  {Object}  state  The current courseData state
*  @param  {Number}  relevantSectionID  The current section ID
*  @param  {Number}  relevantCourseID  The current course ID
*  @param  {Number}  relevantTopicIndex  The index of the current topic
*/
function getStateWithNextTopicAndSection(
    state,
    relevantSectionID,
    relevantCourseID,
    relevantTopicIndex
) {
  const newState = Object.assign({}, state);
  const relevantCourse = getCourseDataFromID(newState, relevantCourseID);
  const relevantSection = getSectionDataFromID(relevantCourse, relevantSectionID);
  const relevantSectionIndex = findIndex(relevantCourse.sections,
    (section) => section.sectionID === relevantSectionID);
  newState.currentTopic = getNextTopic(relevantSection.topics, relevantTopicIndex);

  if (!newState.currentTopic) {
    // last topic was final one in section
    // move onto next section
    relevantSection.isComplete = true;
    newState.currentSection = getNextSection(relevantCourse.sections, relevantSectionIndex);
    if (newState.currentSection) {
      // still have sections in this course
      newState.currentTopic = newState.currentSection.topics[0];
    } else {
      // no sections left - course complete
      relevantCourse.isComplete = true;
    }
  }

  return newState;
}

/**
*  @return  {Object}  The next section in this course or false if current
                      section is last one.
*  @param  {Array}  sections  All of the sections in this course
*  @param  {Number}  currentSectionIndex  The index of the current section
*/
function getNextSection(sections, currentSectionIndex) {
  if (sections.length === currentSectionIndex - 1) {
    return false;
  }
  return sections[currentSectionIndex + 1];
}

/**
*  @return  {Object}  The next topic in this section or false if current
                      topic is last one.
*  @param  {Array}  topics  All of the topics in this section
*  @param  {Number}  currentTopicIndex  The index of the current topic
*/
function getNextTopic(topics, currentTopicIndex) {
  if (topics.length === currentTopicIndex - 1) {
    return false;
  }
  return topics[currentTopicIndex + 1];
}
