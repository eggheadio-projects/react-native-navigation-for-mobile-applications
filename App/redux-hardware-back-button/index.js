import React from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import logger from 'redux-logger';

import RootNavigator, { MainApp } from './router';

const initialState = RootNavigator.router.getStateForAction(
  MainApp.router.getActionForPathAndParams('Favorites')
);

const navReducer = (state = initialState, action) => {
  const nextState = RootNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

const rootReducer = combineReducers({
  nav: navReducer,
});

const reactNavigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);
const addListener = createReduxBoundAddListener("root");

const App = ({ dispatch, nav }) => (
  <RootNavigator
    navigation={addNavigationHelpers({ dispatch, state: nav, addListener })}
  />
);

const mapStateToProps = (state) => ({
  nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(rootReducer, applyMiddleware(reactNavigationMiddleware, logger));

export default () => (
  <Provider store={store}>
    <AppWithNavigationState />
  </Provider>
);
