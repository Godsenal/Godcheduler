import React, { Component } from "react";
import { StyleSheet, Dimensions, View, StatusBar } from "react-native";
import AppNavigator from '../navigator/AppNavigator';
import FooterNavigator from '../navigator/TabNavigator';
import {Footer, AddTask} from '../components';
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
        <FooterNavigator />
        <AddTask />
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