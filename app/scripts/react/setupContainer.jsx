import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import createStore from './appStore';
import waitForComponentToLoad from '../utils/waitForComponentToLoad';
import BaseComponent from './components/BaseComponent';
import CourseData from './data/courseData';

/**
 * Sets up the React container
 */
function setupContainer() {
  const container = document.querySelector('#reactContainer');
  const appStore = createStore({
    route: {
      route: 'login'
    },
    courseData: CourseData
  });
  ReactDOM.render(
    <Provider store={appStore}>
      <BaseComponent />
    </Provider>,
    container
  );
}

console.log('setupContainer');
waitForComponentToLoad().then(setupContainer);
