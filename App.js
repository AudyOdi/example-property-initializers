import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import List from './src/List';
import names from './src/name-fixture';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          innerContainerStyles={{ paddingTop: 50 }}
          centerComponent={{
            text: 'Example App',
            style: { color: '#FFF', fontSize: 20 },
          }}
        />
        <List list={names} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
