import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import createStore from './appStore';
import waitForComponentToLoad from '../utils/waitForComponentToLoad';
import BaseComponent from './components/BaseComponent';
import CourseData from './data/courseData';
import { browserHistory } from 'react-router';

import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

/**
 * Sets up the React container
 */
function setupContainer() {
  const container = document.querySelector('#reactContainer');
  const appStore = createStore({
    courseData: CourseData,
    routing: routerReducer
  });
  const history = syncHistoryWithStore(browserHistory, appStore);

  ReactDOM.render(
    <Provider store={appStore}>
      <BaseComponent enhancedHistory={history} />
    </Provider>,
    container
  );
}

waitForComponentToLoad().then(setupContainer);
