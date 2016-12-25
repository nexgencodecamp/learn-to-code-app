import { setFirstName } from '../data/localStorageUtil';

export default {
  handleLogin(firstName) {
    setFirstName(firstName);
    return {
      type: 'LOGIN',
      value: {
        firstName,
        loggedIn: true,
      },
    };
  },
  updateFirstName(firstName) {
    return {
      type: 'UPDATE_FIRST_NAME',
      value: {
        firstName,
      },
    };
  },
};
