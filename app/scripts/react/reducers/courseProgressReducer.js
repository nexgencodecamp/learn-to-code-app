import findIndex from 'lodash.findindex';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'START_COURSE':
      return Object.assign({}, state, {
        currentCourse: getCourseDataFromID(state, action.value),
        currentSection: getFirstSectionForCourse(state, action.value),
        currentTopic: getFirstTopicForSection(state, action.value)
      });
    case 'COMPLETE_TOPIC':
      return getNewStateAfterCompletingTopic(state, action);
    case 'CHANGE_TOPIC':
      return Object.assign({}, state, {
        currentCourse: action.value.courseID,
        currentSection: action.value.sectionID,
        currentTopic: action.value.topicID
      });
    default:
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
