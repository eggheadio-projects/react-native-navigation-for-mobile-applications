import React from 'react';
import { AsyncStorage, View, Text } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import Home from './screens/Home';
import Profile from './screens/Profile';

const checkAuth = () => {
  return new Promise(async (resolve, reject) => {
    const isAuthorized = await AsyncStorage.getItem('authorized');
    if (isAuthorized) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
}

const AuthStack = StackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: 'Sign Up',
    }
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: 'Sign In',
    }
  }
});

const PrimaryApp = TabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => <FontAwesome name="home" size={26} color={tintColor} />
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => <FontAwesome name="user" size={26} color={tintColor} />
      }
    }
  }
);

// NEW CODE
class App extends React.Component {
  state = {
    isAuthorized: false,
    checkingInitialAuth: true,
  }

  async componentWillMount() {
    const isAuthorized = await checkAuth();
    this.setState({
      isAuthorized,
      checkingInitialAuth: false,
    });
  }

  signIn = () => {
    this.setState({ isAuthorized: true });
    AsyncStorage.setItem('authorized', 'true');
  }

  signOut = () => {
    this.setState({ isAuthorized: false });
    AsyncStorage.removeItem('authorized');
  }

  render() {
    const { isAuthorized, checkingInitialAuth } = this.state;
    if (checkingInitialAuth) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Loading...</Text>
        </View>
      );
    } else if (isAuthorized) {
      return <PrimaryApp screenProps={{ signOut: this.signOut }} />;
    } else {
      return <AuthStack screenProps={{ signIn: this.signIn }} />;
    }
  }
}

export default App;
