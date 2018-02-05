import React, { Component } from "react";
import { StyleSheet, Dimensions, View, Text, Platform } from "react-native";
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { registerScreens } from './screens';
import { store } from './stores';

import { color } from './config';
const Icon = require('react-native-vector-icons/Entypo');

var listIcon;
var calendarIcon;

const tabs = [{
  label: 'TaskList',
  screen: 'main.TaskList',
  title: 'TaskList',
  icon: listIcon,
}, {
  label: 'Calendar',
  screen: 'main.Calendar',
  title: 'Calendar',
  icon: calendarIcon,
}];


registerScreens(store, Provider);

/*
  login 여부에 따라 바꾸는 건 이것좀 참고함.
  https://github.com/wix/react-native-navigation/blob/master/old-example-redux/src/app.js
  이것좀 참고함.
*/
class App extends Component {
	constructor(props) {
    super(props);
    this._populateIcons().then(() => {
      /* 
        redux의 state가 바뀔 때 마다 onStoreUpdate를 event handler로 사용 
        store.subscribe(this.onStoreUpdate);
      */
      this.startApp(true); //store.getState().account.get('isLoggedIn')
      
    }).catch((error) => {
      console.error(error);
    });
    
  }
  
  /*
  onStoreUpdate = () => {
    let {account} = store.getState();

    if (this.currentAccount != account) {
      this.currentAccount = account;
      this.startApp(account.get('isLoggedIn'));
    }
  }
   react-vector-icon을 로딩시켜주는 작업. 이미지로 뽑을지 이걸로 할지 결정.
    https://github.com/wix/react-native-navigation/issues/43#issuecomment-223907515
  */
  _populateIcons = function () {
    return new Promise(function (resolve, reject) {
      Promise.all(
        [
          Icon.getImageSource('list', 20),
          Icon.getImageSource('calendar', 20),
        ]
      ).then((values) => {
        listIcon = values[0];
        calendarIcon = values[1];
        resolve(true);
      }).catch((error) => {
        console.log(error);
        reject(error);
      }).done();
    });
  };
	startApp(isLoggedIn) {
    /* Login 여부에 따라 화면 결정 */
    if(isLoggedIn){
      Navigation.startTabBasedApp({
        tabs : [{
          label: 'TaskList',
          screen: 'main.TaskList',
          title: 'TaskList',
          icon: listIcon,
        }, {
          label: 'Calendar',
          screen: 'main.Calendar',
          title: 'Calendar',
          icon: calendarIcon,
        }],
        animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
        tabsStyle: {
          tabBarBackgroundColor: color.lightgray,
          tabBarButtonColor: '#A5A9AE',
          tabBarSelectedButtonColor: color.skyblue,
          tabFontFamily: 'BioRhyme-Bold',
        },
        appStyle: {
          tabBarBackgroundColor: color.lightgray,
          navBarButtonColor: '#04ACF4',
          tabBarButtonColor: '#ffffff',
          navBarTextColor: '#04ACF4',
          tabBarSelectedButtonColor: '#ff505c',
          navigationBarColor: '#04ACF4',
          navBarBackgroundColor: color.lightgray,
          statusBarColor: '#002b4c',
          tabFontFamily: 'BioRhyme-Bold',
        },
        animationType: 'none'
      });
    }
    else{
      Navigation.startSingleScreenApp({
        screen: {
          screen: 'main.Login', // unique ID registered with Navigation.registerScreen
          title: 'Welcome', // title of the screen as appears in the nav bar (optional)
          navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
          navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
        },
      });
    }
		
  }
  
}

export default App;
