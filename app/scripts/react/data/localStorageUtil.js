import localStorageWrapper from 'store';
const localStoragePrefix = 'nexGen/learnToCode';

/**
  Get the user data from local storage
  e.g. first name, course progress

  @return {Object}  User info
*/
export function getUserInfo() {
  return localStorageWrapper.get(`${localStoragePrefix}/userInfo`) || {};
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
