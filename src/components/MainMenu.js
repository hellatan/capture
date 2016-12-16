import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default function MainMenu({ items, viewItem }) {
    return (
         <View style={styles.container}>
            <Text>{items.length}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
