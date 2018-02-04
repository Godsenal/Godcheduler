import React, { Component } from "react";
import { StyleSheet, Dimensions, View, Platform } from "react-native";
import Main from './containers/Main';
import { Provider } from 'react-redux';
import { store } from './store';

import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';

registerScreens(store, Provider);

const tabs = [{
  label: 'TaskList',
  screen: 'main.TaskList',
  title: 'TaskList',
}, {
  label: 'Calendar',
  screen: 'main.Calendar',
  title: 'Calendar',
}];


Navigation.startTabBasedApp({
  tabs,
  animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
  tabsStyle: {
    tabBarBackgroundColor: '#003a66',
    tabBarButtonColor: '#ffffff',
    tabBarSelectedButtonColor: '#ff505c',
    tabFontFamily: 'BioRhyme-Bold',
  },
  appStyle: {
    tabBarBackgroundColor: '#003a66',
    navBarButtonColor: '#ffffff',
    tabBarButtonColor: '#ffffff',
    navBarTextColor: '#ffffff',
    tabBarSelectedButtonColor: '#ff505c',
    navigationBarColor: '#003a66',
    navBarBackgroundColor: '#003a66',
    statusBarColor: '#002b4c',
    tabFontFamily: 'BioRhyme-Bold',
  },
  animationType: 'slide-horizontal'
});