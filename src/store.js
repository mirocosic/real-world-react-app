import { applyMiddleware, createStore, combineReducers} from 'redux';
import { localStorageMiddleware, promiseMiddleware } from './middleware';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import auth from './reducers/auth';
import common from './reducers/common';
import home from './reducers/home';
import settings from './reducers/settings';
import article from './reducers/article';
import articleList from './reducers/articleList';
import profile from './reducers/profile';
import editor from './reducers/editor';


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

const store = createStore(reducer, composeWithDevTools(applyMiddleware(promiseMiddleware, localStorageMiddleware, logger)));

export default store;
