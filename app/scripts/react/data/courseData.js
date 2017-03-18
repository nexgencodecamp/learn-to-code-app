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
      courseName: 'Course 1 - intro to Javascript',
      courseID: 1,
      sections: [
        {
          sectionName: 'Variables',
          sectionID: 1,
          topics: [
            {
              topicID: 1,
              topicName: 'Strings',
              topicLesson: 'A javascript string is a collection of letters, numbers or characters inside quotation marks. All of these are strings: "123", "Mary had a little lamb", "Pirates are *&!@#ing awesome!", "true". These are not strings: 123, false, testing(); - because they don\'t have quotation marks around them.',
              topicContent: `A crazy rabbit is running towards you with horrible yellow teeth and an evil glint in its eye. Using a javascript String, tell this deranged creature to Stop!`,
              expectedResult: 'Stop!',
              distractorRationale: {
                '*': '(Remember that Javascript strings look like this: "Rabbits are evil creatures" - one or more words inside quotation marks.) Make sure that your answer is a string and it has exactly this content: Stop!',
                'stop': 'Close - make sure you include the exclamation mark and a capital letter - Stop!',
              },
            },
            {
              topicID: 2,
              topicName: 'Booleans',
              topicLesson: 'Booleans are either true or false. They have no quotation marks around them. "true" is not a boolean but true is.',
              topicContent: `The rabbit glares at you for pausing his rampage and then says: "I'll stop on one condition: you have to give me ten carrots. Do you have ten carrots in your bag?". It just so happens you do, so tell him the truth using a Boolean value.`,
              expectedResult: true,
              distractorRationale: {
                '*': `Don't forget that Booleans are either true or false. They don't have quotation marks around them.`,
                'false': `Don't lie! You do have 10 carrots in your bag.`,
              },
            },
            {
              topicID: 3,
              topicLesson: `Numbers are numbers :) 123.57 is a number. "123.57" is not a number (it's a String)`,
              topicName: 'Numbers',
              topicContent: `Mourning the loss of your carrots, you are walking in the park when you come across an alien trying to swim in the pond. The poor chap gets attacked by ducks and after screaming for help in an unintelligble language, it sinks beneath the surface. You jump in and pull it out and commence CPR, hoping you won't catch any diseases it has. Seeing a passerby, you ask them to call the ambulance but this person's phone doesn't have any 0s on it. Tell them an emergency number to call instead (try the one that works in American movies;))`,
              expectedResult: 911,
              distractorRationale: {
                '*': `The answer is 1000 - 89.`,
                '000': `Close but that number doesn't work in the USA!`,
              },
            },
            {
              topicID: 4,
              topicLesson: `We're surrounded by objects. A table is an object. So is a chair. So are you! In Javascript, objects look like this:
                var zombie = {
                  scary: true,
                  numberOfEyes: 1,
                  favouriteFood: 'brains'
                };
              `,
              topicName: 'Objects',
              topicContent: `When the ambulance arrives, they ask you to give them the alien's vital statistics in Object format. They want to know how many arms the alien has (7), what its heart rate is (437) and how many noses it has (4).`,
              expectedResult: {
                arms: 7,
                heartRate: 437,
                noses: 4,
              },
              distractorRationale: {
                '*': `Make sure you provide an object with the correct properties: 7 arms, heartRate of 437, 4 noses`,
              },
            },
          ],
        },
        {
          sectionName: 'Logic',
          sectionID: 2,
          topics: [
            {
              topicID: 5,
              topicLesson: `In Javascript, you can assign values to an object like this: zombie.undead = true; Now the Zombie will look like this:
                var zombie = {
                  undead: true,
                  scary: true,
                  numberOfEyes: 1,
                  favouriteFood: 'brains'
                };
              `,
              topicName: 'Assigning values',
              topicContent: `The paramedics don't know what to do with the alien so they put some iodine up his nose. This makes his hair stand up on end and he farts loudly. With a panicked look, he says something to you that you don't understand. Then all of a sudden, it hits you: he's talking javascript! He asks you me.status === 'ok'. Tell your alien friend that he's ok. (Hint: if you were telling your mum that computer games are good for you, you would say: games.effect = 'good'; Don't forget the semi colon at the end!)`,
              expectedInput: `you.status = 'ok';`,
            },
            {
              topicID: 6,
              topicName: 'Checking equality',
              topicContent: `The alien looks relieved now that you've told him he's ok. Now he asks you another question: me.currentLocation === 'Mars'. Respond with a boolean value.`,
              expectedOutput: false,
            },
            {
              topicID: 7,
              topicName: 'Inequality',
              topicContent: `This news alarms the alien. me.currentLocation !== 'Mars' he asks in a shrill tone. Respond with another boolean.`,
              expectedOutput: true,
            },
            {
              topicID: 8,
              topicName: 'Greater than',
              topicContent: `A loud beeping noise erupts from the heart rate monitor attached to the alien. The paramedic swears and tells you "Holy moly! This dude's heart rate just exceeded 500 beats per minute! Ask him if that's normal." With trepidation, you search for the right words to tell the alien that his heart rate is over 500 beats per minute. (Hint you'll need to refer )`,
              expectedInput: 'you.heartRate > 500',
            },
            {
              topicID: 9,
              topicName: 'Less than',
              topicContent: `The alien smiles and tells you "if (me.heartRate > 500) { me.status = 'Good'; }". Breathing a sigh of relief, you tell the paramedic and he says "Seriously? You mean if his heart rate stayed below 500, he would have died?". It seems a bit impolite to ask the question but you're a pretty rude person, so you think about how to ask it. (Hint: status = 'dead' if someone is going to die.)`,
              expectedInput: `if (you.heartRate < 500) { you.status = 'dead'; }`,
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
