import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import courseProgressReducer from './reducers/courseProgressReducer.js';
import { routerReducer } from 'react-router-redux';

const reducer = combineReducers({
  courseData: courseProgressReducer,
  routing: routerReducer
});

export default function storeCreator(initalState) {
  return applyMiddleware(thunk)(createStore)(reducer, initalState);
}
