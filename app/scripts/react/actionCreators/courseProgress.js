import { addCompletedTopic } from '../data/localStorageUtil';

export default {
  changeCourse(courseID) {
    return {
      type: 'CHANGE_COURSE',
      value: {
        currentCourse: {
          courseID: courseID,
        },
      },
    };
  },
  completeTopic(courseID, sectionID, topicID) {
    addCompletedTopic(topicID);
    return {
      type: 'COMPLETE_TOPIC',
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
