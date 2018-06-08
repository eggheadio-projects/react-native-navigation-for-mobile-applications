import React from 'react';
import { Button, View, SafeAreaView} from 'react-native';
import { StackNavigator } from 'react-navigation';

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
      onPress={() => null}
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

const MainAppStack = StackNavigator({
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

export default MainAppStack;
