import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import routeReducer from './reducers/routeReducer.js';
import courseProgressReducer from './reducers/courseProgressReducer.js';

const reducer = combineReducers({
  route: routeReducer,
  courseData: courseProgressReducer
});

export default function storeCreator(initalState) {
  return applyMiddleware(thunk)(createStore)(reducer, initalState);
}
