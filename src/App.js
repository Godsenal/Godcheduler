import React, { Component } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import Main from './containers/Main';
import { Provider } from 'react-redux';
import { store } from './store';


export default class App extends Component{
  

  render(){
    return(
      <Provider store={store}>
        <View style={{flex: 1}}>
          <Main />
        </View>
      </Provider>
    );
  }
}
