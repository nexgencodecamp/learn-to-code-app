import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import courseProgressReducer from './reducers/courseProgressReducer.js';
import userInfoReducer from './reducers/userInfoReducer.js';
import codeExecutionReducer from './reducers/codeExecutionReducer.js';
import { routerReducer } from 'react-router-redux';

const reducer = combineReducers({
  courseData: courseProgressReducer,
  routing: routerReducer,
  userInfo: userInfoReducer,
  codeExecutionResult: codeExecutionReducer,
});

/**
  Used to generate the app store
  @param  {Object} initialState  The initial state for the store
  @return {Object} A redux store
*/
export default function storeCreator(initialState) {
  return applyMiddleware(thunk)(createStore)(reducer, initialState);
}
