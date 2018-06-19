import React from 'react';
import { Button, View, SafeAreaView} from 'react-native';
import { createStackNavigator } from 'react-navigation';

const Foo = ({ navigation }) => (
  <View>
    <Button
      title="Go to bar"
      onPress={() => navigation.navigate('Bar')}
    />
  </View>
);

const Bar = ({ navigation }) => (
  <View>
    <Button
      title="Go to baz"
      onPress={() => navigation.navigate('Baz')}
    />
    <Button
      title="Replace with baz"
      onPress={() => navigation.dispatch(replaceCurrentScreen('Baz'))}
    />
  </View>
);

const Baz = ({ navigation }) => (
  <View>
    <Button
      title="Go back"
      onPress={() => navigation.goBack()}
    />
  </View>
);

const MainAppStack = createStackNavigator({
  Food: {
    screen: Foo,
    navigationOptions: {
      title: 'Foo',
    },
  },
  Bar: {
    screen: Bar,
    navigationOptions: {
      title: 'Bar',
    },
  },
  Baz: {
    screen: Baz,
    navigationOptions: {
      title: 'Baz',
    },
  },
});

const replaceCurrentScreen = (routeName, params = {}) => ({
  type: 'ReplaceCurrentScreen',
  routeName,
  params,
});

const prevGetStateForActionHomeStack = MainAppStack.router.getStateForAction;
MainAppStack.router.getStateForAction = (action, state) => {
  if (state && action.type === 'ReplaceCurrentScreen') {
    const routes = state.routes.slice(0, state.routes.length - 1);
    routes.push(action);
    return {
      ...state,
      routes,
      index: routes.length - 1,
    };
  }
  return prevGetStateForActionHomeStack(action, state);
};

export default MainAppStack;
