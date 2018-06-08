import React from 'react';
import { BackHandler } from 'react-native';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
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

class App extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onHardwareBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onHardwareBack);
  }

  onHardwareBack = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  }

  render() {
    const { dispatch, nav } = this.props;
    return (
      <RootNavigator
        navigation={addNavigationHelpers({ dispatch, state: nav, addListener })}
      />
    );
  }
}


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
