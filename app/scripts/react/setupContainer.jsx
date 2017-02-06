import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import createStore from './appStore';
import waitForComponentToLoad from '../utils/waitForComponentToLoad';
import BaseComponent from './components/BaseComponent';
import getCourseDataWithProgress from './data/courseData';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { getUserInfo } from './data/localStorageUtil';

/**
 * Sets up the React container
 */
function setupContainer() {
  const container = document.querySelector('#reactContainer');
  const userInfo = getUserInfo();
  const courseData = getCourseDataWithProgress();
  const appStore = createStore({
    courseData,
    userInfo,
  });
  const history = syncHistoryWithStore(browserHistory, appStore);

  ReactDOM.render(
    <Provider store={appStore}>
      <BaseComponent enhancedHistory={history} userInfo={userInfo}/>
    </Provider>,
    container
  );
}

waitForComponentToLoad().then(setupContainer);
