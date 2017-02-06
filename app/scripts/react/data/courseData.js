/* eslint-disable max-len */
import { getCompletedTopics } from './localStorageUtil';

/**
*  @return {Object} The course data with completed topics marked off based on history in local storage
*/
export default function getCourseDataWithProgress() {
  const courseDataWithCompletedTopics = Object.assign({}, courseData);
  courseDataWithCompletedTopics.courses.forEach((course) => {
    course.isComplete = updateSectionCompletionAndCheckIfAllComplete(course);
  });

  courseDataWithCompletedTopics.currentCourse = {
    courseID: 1,
  };
  return courseDataWithCompletedTopics;
};

/**
*  Updates section.isComplete for all sections in course and checks overall
*  section completeness.
*  @return  {Boolean} Whether all sections in a course are complete
*  @param  {Object}  course  The course containing sections
*/
function updateSectionCompletionAndCheckIfAllComplete(course) {
  return course.sections.reduce((allComplete, section) => {
    const allTopicsComplete = updateTopicCompletionAndCheckIfAllComplete(section);
    section.isComplete = allTopicsComplete;
    if (!allTopicsComplete) {
      return false;
    }
    return true;
  }, true);
}

/**
*  Updates topic.isComplete for all topics in section and checks overall
*  section completeness.
*  @return  {Boolean} Whether all topics in a section are complete
*  @param  {Object}  section  The section in this course
*/
function updateTopicCompletionAndCheckIfAllComplete(section) {
  const completedTopics = getCompletedTopics();
  return section.topics.reduce((allComplete, topic) => {
    if (completedTopics.includes(topic.topicID)) {
      topic.isComplete = true;
      return allComplete;
    }
    return false;
  }, true);
}

const courseData = {
  courses: [
    {
      courseName: 'Course 1 - the awesome one',
      courseID: 1,
      sections: [
        {
          sectionName: 'Section 1',
          sectionID: 1,
          topics: [
            {
              topicID: 1,
              topicName: 'A great topic',
              topicContent: `You are an ambassador to the planet Zorg, whose inhabitants can only understand English if it is entered through their translation engine, known as "return". Say "hello" to the Zorglings. They'll be thrilled to hear from you!`,
              expectedResult: 'hello',
            },
          ],
        },
        {
          sectionName: 'Section 2',
          sectionID: 2,
          topics: [
            {
              topicID: 2,
              topicName: 'A good topic',
              topicContent: `You are an ambassador to the planet Zorg, whose inhabitants can only understand English if it is entered through their translation engine, known as "console.log". Extend a warm greeting to the Zorglings. They'll be thrilled to hear from you!`,
              expectedResult: 'hello',
            },
          ],
        },
      ],
    },
    {
      courseName: 'Course 2 - the more awesome one',
      courseID: 2,
      sections: [
        {
          sectionName: 'Section 1',
          sectionID: 4,
          topics: [
            {
              topicID: 3,
              topicName: 'An excellent topic',
              topicContent: `You are an ambassador to the planet Zorg, whose inhabitants can only understand English if it is entered through their translation engine, known as "console.log". Extend a warm greeting to the Zorglings. They'll be thrilled to hear from you!`,
              expectedResult: 'hello',
            },
          ],
        },
        {
          sectionName: 'Section 2',
          sectionID: 5,
          topics: [
            {
              topicID: 4,
              topicName: 'A thrilling topic',
              topicContent: `You are an ambassador to the planet Zorg, whose inhabitants can only understand English if it is entered through their translation engine, known as "console.log". Extend a warm greeting to the Zorglings. They'll be thrilled to hear from you!`,
              expectedResult: 'hello',
            },
          ],
        },
      ],
    },
    {
      courseName: 'Course 3 - the most awesome one!',
      courseID: 3,
      sections: [
        {
          sectionName: 'Section 1',
          sectionID: 7,
          topics: [
            {
              topicID: 5,
              topicName: 'A fantastic topic',
              topicContent: `You are an ambassador to the planet Zorg, whose inhabitants can only understand English if it is entered through their translation engine, known as "console.log". Extend a warm greeting to the Zorglings. They'll be thrilled to hear from you!`,
            },
          ],
        },
        {
          sectionName: 'Section 2',
          sectionID: 8,
          topics: [
            {
              topicID: 6,
              topicName: 'An excellent topic',
              topicContent: `You are an ambassador to the planet Zorg, whose inhabitants can only understand English if it is entered through their translation engine, known as "console.log". Extend a warm greeting to the Zorglings. They'll be thrilled to hear from you!`,
            },
          ],
        },
      ],
    },
  ],
};
