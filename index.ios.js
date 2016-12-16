// @flow
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import App from './src/App';

export default class capture extends Component {
  render() {
    return <App />;
  }
}

AppRegistry.registerComponent('capture', () => capture);
