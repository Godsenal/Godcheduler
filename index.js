//import {Provider} from 'react-redux';
//import store from './src/redux/store';
import App from './src/App';

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';

class Scheduler extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('Scheduler', () => Scheduler);
