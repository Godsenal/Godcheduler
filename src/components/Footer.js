import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Text, View, StyleSheet, TouchableHighlight, TouchableOpacity, Dimensions } from 'react-native';
import { openAddTask, closeAddTask } from '../actions/task';

const iconList = {
  list:'list',
  calendar:'calendar',
}
class Footer extends Component {
  state={
    selected: 0,
  }
  tabPress = (routeName, i) => {
    this.props.navigation.navigate(routeName);
    this.setState({
      selected: i
    })
  }
  render() {
    const {tabs, selected} = this.state;
    const {navigation, layout} = this.props;
    return (
      <View>
        <TouchableOpacity
          style={[styles.centerTab,{left: (layout.get('width') / 2 - 30)}]}
          onPress={()=>this.props.openAddTask()}>
          <Icon name='pencil' size={24} color='white'/>
        </TouchableOpacity>
        <View style={styles.footer}>
          {
            navigation.state.routes.map((tab,i)=>{
              return(
                <View 
                  style={styles.tab} key={i}>
                  <TouchableOpacity
                    onPress={()=>this.tabPress(tab.routeName,i)}>
                      <Icon name={iconList[tab.routeName]} size={24} style={[styles.text,navigation.state.index == i?styles.activeTab:{}]}/>
                      <Text style={[styles.text,navigation.state.index == i?styles.activeTab:{}]}>{tab.routeName}</Text>
                  </TouchableOpacity>
                </View>
              );
            })
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    bottom: 0,
    width: '100%',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#95D5F1',
    backgroundColor: '#FBFBFB',
  },
  tab: {
    flex:1,
    width: 60,
    height: 60,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    left: 0, 
    right: 0, 
    flex: 0,
    bottom: 20,
    zIndex: 100,
  },
  centerTab: {
    position: 'absolute',
    backgroundColor: '#04ACF4',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    bottom: 30,
    left: (Dimensions.get('window').width / 2 - 30),
    zIndex: 100,
  },
  activeTab: {
    color: '#04ACF4',
  },
  text: {
    textAlign: 'center',
    color: '#A5A9AE',
  }
});

const mapStateToProps = (state) => {
  return{
    add: state.task.add,
    layout: state.layout
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    openAddTask: ()=> {
      dispatch(openAddTask());
    },
    closeAddTask: () => {
      dispatch(closeAddTask());
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Footer);