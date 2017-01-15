export default {
  changeCourse(courseID) {
    return {
      type: 'CHANGE_COURSE',
      value: {
        currentCourse: courseID,
      },
    };
  },
  completeTopic(courseID, sectionID, topicID) {
    return {
      type: 'COMPLETE_TOPIC',
      value: {
        courseID,
        sectionID,
        topicID,
      },
    };
  },
  changeTopic(courseID, sectionID, topicID) {
    return {
      type: 'CHANGE_TOPIC',
      value: {
        courseID,
        sectionID,
        topicID,
      },
    };
  },
  startCourse(courseID) {
    return {
      type: 'START_COURSE',
      value: courseID,
    };
  },
};
