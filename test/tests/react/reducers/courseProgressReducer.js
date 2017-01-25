import test from 'tape';
import courseProgressReducer from '~/app/scripts/react/reducers/courseProgressReducer';
import courseData from '~/test/fixtures/courseDataFixture';

test(`Reducer should successfully get next topic in section when advancing from first topic`,
(t) => {
  const fakeAction = {
    type: 'COMPLETE_TOPIC',
    value: {
      courseID: 1,
      sectionID: 1,
      topicID: 1,
    },
  };
  const expectedResult = {
    currentCourse: 1,
    currentSection: 1,
    currentTopic: 2,
  };
  const output = courseProgressReducer(courseData, fakeAction);
  t.equal(output.currentCourse, expectedResult.currentCourse);
  t.equal(output.currentSection, expectedResult.currentSection);
  t.equal(output.currentTopic, expectedResult.currentTopic);
  t.end();
});

test(`Reducer should move to next section when advancing from last topic
  in section`, (t) => {
  const fakeAction = {
    type: 'COMPLETE_TOPIC',
    value: {
      courseID: 1,
      sectionID: 1,
      topicID: 2,
    },
  };
  const expectedResult = {
    currentCourse: 1,
    currentSection: 2,
    currentTopic: 1,
  };
  const output = courseProgressReducer(courseData, fakeAction);
  t.equal(output.currentCourse, expectedResult.currentCourse);
  t.equal(output.currentSection, expectedResult.currentSection);
  t.equal(output.currentTopic, expectedResult.currentTopic);
  t.end();
});

test(`Reducer should complete course when complete last topic in last section`,
(t) => {
  const fakeAction = {
    type: 'COMPLETE_TOPIC',
    value: {
      courseID: 1,
      sectionID: 2,
      topicID: 3,
    },
  };
  const expectedResult = {
    currentCourse: false,
    currentSection: false,
    currentTopic: false,
  };
  const output = courseProgressReducer(courseData, fakeAction);
  t.equal(output.currentCourse, expectedResult.currentCourse);
  t.equal(output.currentSection, expectedResult.currentSection);
  t.equal(output.currentTopic, expectedResult.currentTopic);
  t.end();
});
