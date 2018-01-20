import React, { Component } from "react";
import { StyleSheet, Dimensions, View, StatusBar } from "react-native";
import FooterNavigator from '../navigator/TabNavigator';
import OverTabNavigator from '../navigator/OverTabNavigator';
import {Footer} from '../components';
import {connect} from 'react-redux';


import {changeLayout} from '../actions/layout';

class Main extends Component{
  componentDidMount = () => {
    const {width, height} = Dimensions.get('window');
    this.props.changeLayout(width, height);
  }
  
  onLayout = () => {
    const {width, height} = Dimensions.get('window');
    this.props.changeLayout(width, height);
  }
  render(){
    return(
      <View style={{flex: 1}} onLayout={this.onLayout}>
        <OverTabNavigator />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    layout: state.layout,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeLayout : (width, height) => {
      dispatch(changeLayout(width,height))
    },
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);