import findIndex from 'lodash.findindex';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'START_COURSE':
      return getNewStateAfterStartingCourse(state, action.value);
    case 'COMPLETE_TOPIC':
      return getNewStateAfterCompletingTopic(state, action);
    case 'CHANGE_TOPIC':
      return getNewStateAfterChangingTopic(state, action);
    case '@@router/LOCATION_CHANGE':
      return getNewStateAfterChangingRoute(state, action);
    default:
      return state;
  }
}

function getNewStateAfterStartingCourse(state, courseID) {
  return Object.assign({}, state, {
    currentCourse: getCourseDataFromID(state, courseID),
    currentSection: getFirstSectionForCourse(state, courseID),
    currentTopic: getFirstTopicForSection(state, courseID)
  });
}

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
            topicID
          }
        }
      );
    }
    return state;
  } else {
    return state;
  }
}

function getFirstTopicForSection(state, courseID) {
  const relevantSection = getFirstSectionForCourse(state, courseID);
  return relevantSection.topics[0];
}

function getFirstSectionForCourse(state, courseID) {
  const relevantCourse = getCourseDataFromID(state, courseID);
  return relevantCourse.sections[0];
}

function getCourseDataFromID(state, courseID) {
  return state.courses.find(course =>
    course.courseID === courseID
  );
}

function getSectionDataFromID(course, sectionID) {
  return course.sections.find(section =>
    section.sectionID === sectionID
  );
}

function getTopicDataFromID(section, topicID) {
  return section.topics.find(topic =>
    topic.topicID === topicID
  );
}

function getNewStateAfterChangingTopic(state, action) {
  // todo - should have tests for this part
  const newState = Object.assign({}, state);
  const relevantCourse = getCourseDataFromID(newState, parseInt(action.value.courseID));
  const relevantSection = getSectionDataFromID(relevantCourse, parseInt(action.value.sectionID));
  const relevantTopic = getTopicDataFromID(relevantSection, parseInt(action.value.topicID));
debugger;
  return Object.assign({}, state, {
    currentCourse: relevantCourse,
    currentSection: relevantSection,
    currentTopic: relevantTopic
  });
}

function getNewStateAfterCompletingTopic(state, action) {
  // todo - should have tests for this part
  const newState = Object.assign({}, state);
  const relevantCourse = getCourseDataFromID(newState, action.value.courseID);
  const relevantSection = getSectionDataFromID(relevantCourse, action.value.sectionID);
  const relevantTopicIndex = findIndex(relevantSection.topics, topic => topic.topicID === action.value.topicID);
  relevantSection.topics[relevantTopicIndex].isComplete = true;

  return getStateWithNextTopicAndSection(
    newState,
    relevantSection.sectionID,
    relevantCourse.courseID,
    relevantTopicIndex
  );
}

// todo - too many params - code smell
function getStateWithNextTopicAndSection(state, relevantSectionID, relevantCourseID, relevantTopicIndex) {
  const newState = Object.assign({}, state);
  const relevantCourse = getCourseDataFromID(newState, relevantCourseID);
  const relevantSection = getSectionDataFromID(relevantCourse, relevantSectionID);
  const relevantSectionIndex = findIndex(relevantCourse.sections, section => section.sectionID === relevantSectionID);
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

function getNextSection(sections, currentSectionIndex) {
  if (sections.length === currentSectionIndex - 1) {
    return false;
  }
  return sections[currentSectionIndex + 1];
}

function getNextTopic(topics, currentTopicIndex) {
  if (topics.length === currentTopicIndex - 1) {
    return false;
  }
  return topics[currentTopicIndex + 1];
}
