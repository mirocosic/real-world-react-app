import { applyMiddleware, createStore, combineReducers} from 'redux';
import { localStorageMiddleware, promiseMiddleware, logRocketIdentifyUser } from './middleware';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import LogRocket from 'logrocket';
import Raven from 'raven-js';
import createRavenMiddleware from "raven-for-redux";

import auth from './reducers/auth';
import common from './reducers/common';
import home from './reducers/home';
import settings from './reducers/settings';
import article from './reducers/article';
import articleList from './reducers/articleList';
import profile from './reducers/profile';
import editor from './reducers/editor';

LogRocket.init('hgvzbn/konduit');
Raven.config('https://9bf379ab6627464e90cb7d68023181c8@sentry.io/275612').install();

const reducer = combineReducers({
  auth,
  common,
  home,
  settings,
  article,
  articleList,
  profile,
  editor
});

const logger = createLogger({
   collapsed: (getState, action) => action.type === 'ASYNC_START'
});

const store = createStore(reducer,
  composeWithDevTools(
    applyMiddleware(
      promiseMiddleware,
      localStorageMiddleware,
      LogRocket.reduxMiddleware(),
      logRocketIdentifyUser,
      createRavenMiddleware(Raven, {}),
      logger)));

export default store;
