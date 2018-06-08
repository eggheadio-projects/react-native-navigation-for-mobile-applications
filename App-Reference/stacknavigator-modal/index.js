import React from 'react';
import { Button, View, SafeAreaView} from 'react-native';
import { StackNavigator } from 'react-navigation';

const Home = ({ navigation }) => (
  <SafeAreaView>
    <Button
      title="Go to details"
      onPress={() => navigation.navigate('Details')}
    />
    <Button
      title="Go to modal"
      onPress={() => navigation.navigate('Modal')}
    />
  </SafeAreaView>
);

const Details = ({ navigation }) => (
  <SafeAreaView>
    <Button
      title="Go to modal"
      onPress={() => navigation.navigate('Modal')}
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

// NEW CODE BELOW HERE...
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
    screen: MainAppStack,
  },
  Modal: {
    screen: ModalScreen,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});

export default RootNavigator;
