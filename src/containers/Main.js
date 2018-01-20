import React, { Component } from "react";
import { StyleSheet, Dimensions, View,Text, StatusBar } from "react-native";
import FooterNavigator from '../navigator/TabNavigator';
import {Footer} from '../components';
import {connect} from 'react-redux';


import {changeLayout} from '../actions/layout';
import {changeNavigator} from '../actions/navigator';


class Main extends Component{
  state = {
    routeName: {}
  }
  componentDidMount = () => {
    const {width, height} = Dimensions.get('window');
    this.props.changeLayout(width, height);
  }

  
  onLayout = () => {
    const {width, height} = Dimensions.get('window');
    this.props.changeLayout(width, height);
  }
  /*Navigation이 바뀔 때 마다 store update 
    https://github.com/react-navigation/react-navigation/issues/962 
    요 링크 참고*/

  _getCurrentRouteName(navState) {

    if (navState.hasOwnProperty('index')) {
        this._getCurrentRouteName(navState.routes[navState.index])
    } else {
        this.props.changeNavigator(navState);
    }

  }
  onNavigationStateChange =  (prevState, newState, action) => {
    this._getCurrentRouteName(newState);
  }

  render(){
    return(
      <View style={{flex: 1}} onLayout={this.onLayout}>
        <FooterNavigator onNavigationStateChange={this.onNavigationStateChange}/>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    layout: state.layout,
    navigator: state.navigator,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeLayout : (width, height) => {
      dispatch(changeLayout(width,height))
    },
    changeNavigator : (state) => {
      dispatch(changeNavigator(state))
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);