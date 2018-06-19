import React from 'react';
import { Button, View, SafeAreaView, Modal, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';

const Home = ({ navigation, screenProps }) => (
  <SafeAreaView>
    <Button
      title="Go to details"
      onPress={() => navigation.navigate('Details')}
    />
    <Button
      title="Go to modal"
      // onPress={() => null}
      onPress={() => screenProps.changeModalVisibility(true)}
    />
  </SafeAreaView>
);

const Details = ({ navigation, screenProps }) => (
  <SafeAreaView>
    <Button
      title="Go to modal"
      // onPress={() => null}
      onPress={() => screenProps.changeModalVisibility(true)}
    />
  </SafeAreaView>
);

const MainAppStack = createStackNavigator({
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

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    borderRadius: 5,
  },
});

// NEW CODE BELOW HERE...
export default class App extends React.Component {
  state = {
    modalVisible: false,
  };

  changeModalVisibility = (modalVisible = false) => {
    this.setState({ modalVisible });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MainAppStack
          screenProps={{ changeModalVisibility: this.changeModalVisibility }}
        />
        <Modal
          visible={this.state.modalVisible}
          animationType="fade"
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalBody}>
              <Text>
                This is my modal, there are many like it but this one is mine.
              </Text>
              <Button
                title="Close modal"
                onPress={() => this.changeModalVisibility(false)}
              />
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    );
  }
}
