import React from 'react';
import { Button, SafeAreaView } from 'react-native';
import { StackNavigator } from 'react-navigation';

const Home = ({ navigation, screenProps }) => (
  <SafeAreaView>
    <Button
      title="Go to details"
      onPress={() => navigation.navigate('Details')}
    />
    <Button
      title="Go to modal"
      onPress={() => null}
    />
  </SafeAreaView>
);

const Details = ({ navigation, screenProps }) => (
  <SafeAreaView>
    <Button
      title="Go to modal"
      onPress={() => null}
    />
  </SafeAreaView>
);

const MainAppStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
    },
  },
  Details: {
    screen: Details,
    navigationOptions: {
      title: 'Details',
    },
  },
});

export default MainAppStack;
