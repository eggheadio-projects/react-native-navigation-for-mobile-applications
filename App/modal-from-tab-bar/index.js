import React from 'react';
import { Button, SafeAreaView, Text } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Favorites = ({ navigation }) => (
  <SafeAreaView>
    <Text>Hello from the favorites tab</Text>
  </SafeAreaView>
);

const Recents = ({ navigation }) => (
  <SafeAreaView>
    <Text>Hello from the recents tab</Text>
  </SafeAreaView>
);

const MainApp = TabNavigator({
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      title: 'Favorites',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons color={tintColor} name="star" size={26} />
    },
  },
  Recents: {
    screen: Recents,
    navigationOptions: {
      title: 'Recents',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons color={tintColor} name="clock" size={26} />
    },
  },
});

const ModalScreen = ({ navigation }) => (
  <SafeAreaView>
    <Button
      title="Close modal"
      onPress={() => navigation.goBack(null)}
    />
  </SafeAreaView>
);

const RootNavigator = StackNavigator({
  MainApp: {
    screen: MainApp,
  },
  Modal: {
    screen: ModalScreen,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});

export default RootNavigator;
