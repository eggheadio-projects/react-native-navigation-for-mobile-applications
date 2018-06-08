import React from 'react';
import { Button, View, SafeAreaView, Animated, StyleSheet, Easing, Text } from 'react-native';
import { StackNavigator, StackRouter, createNavigationContainer, createNavigator, Transitioner, addNavigationHelpers } from 'react-navigation';

const Home = ({ navigation }) => (
  <SafeAreaView>
    <Text>Home screen</Text>
    <Button
      title="Go to details"
      onPress={() => navigation.navigate('Details')}
    />
  </SafeAreaView>
);

const Details = ({ navigation }) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#7FB7BE' }}>
    <Text>Details screen</Text>
    <Button
      title="Go back"
      onPress={() => navigation.goBack()}
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
}, {
  // headerMode: 'none',
  // https://github.com/react-navigation/react-navigation/blob/276249c4c792cc2592d5e829a9c87e81be9dd823/src/TypeDefinition.js
  transitionConfig: () => {
    return {
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: interpolator,
      headerTitleInterpolator: interpolator,
      headerLeftInterpolator: interpolator,
      headerRightInterpolator: interpolator,
      containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    };
  },
});

const interpolator = (sceneProps) => {
  const { layout, position, scene } = sceneProps;

  const opacity = position.interpolate({
    inputRange: [scene.index - 1, scene.index, scene.index + 1],
    outputRange: [0, 1, 0],
  });

  const scale = position.interpolate({
    inputRange: [scene.index - 1, scene.index, scene.index + 1],
    outputRange: [0.8, 1, 1],
  });

  const height = layout.initHeight;
  const translateY = position.interpolate({
    inputRange: [scene.index - 1, scene.index, scene.index + 1],
    outputRange: [height, 0, 0],
  });

  return {
    opacity,
    transform: [
      { scale },
      { translateY },
    ],
  }
}

export default MainAppStack;
