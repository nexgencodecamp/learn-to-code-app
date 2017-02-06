import localStorageWrapper from 'store';
const localStoragePrefix = 'nexGen/learnToCode';

/**
  Get the user data from local storage
  e.g. first name

  @return {Object}  User info
*/
export function getUserInfo() {
  const userInfo = localStorageWrapper.get(`${localStoragePrefix}/userInfo`) || {};
  if (userInfo.firstName) {
    userInfo.loggedIn = true;
  }
  return userInfo;
};

/**
  Sets the user's first name in local storage
  @param  {String}  firstName  The user's first name
*/
export function setFirstName(firstName) {
  const clonedUserInfo = Object.assign({}, (getUserInfo() || {}));
  clonedUserInfo.firstName = firstName;
  localStorageWrapper.set(`${localStoragePrefix}/userInfo`, clonedUserInfo);
};

/**
  Get the course progress data from local storage
  e.g. course progress

  @return {Object}  Course Progress
*/
export function getCompletedTopics() {
  return localStorageWrapper.get(`${localStoragePrefix}/completedTopics`) || [];
};

/**
  Saves a completed topic in local storage
  @param  {Number}  completedTopic  The user's courseProgress
*/
export function addCompletedTopic(completedTopic) {
  const completedTopics = getCompletedTopics();
  completedTopics.push(completedTopic);
  localStorageWrapper.set(`${localStoragePrefix}/completedTopics`, completedTopics);
};
