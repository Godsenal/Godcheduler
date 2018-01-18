//import {Provider} from 'react-redux';
//import store from './src/redux/store';
import Scheduler from './src/App';

import React, {Component} from 'react';
import {View} from 'react-native';
import { Font, AppLoading } from "expo";
export default class App extends Component {

  /* To solve problem between native-base and expo */
  state = {
    loading: true,
  }
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }
  render() {
    if(this.state.loading){
      return(
        <View></View>
      )
    }
    return (
      <Scheduler />
    );
  }
}

