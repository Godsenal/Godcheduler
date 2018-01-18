import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Text, View, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/Entypo';
import { toggleAddTask } from '../actions/task';

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
    const {navigation} = this.props;
    return (
      <View style={styles.footer}>
        <View style={styles.center}>
          <TouchableOpacity
            style={styles.centerTab}
            onPress={this.props.toggleAddTask}>
            <Icon name='pencil' size={24} color='white'/>
          </TouchableOpacity>
        </View>
        {
          navigation.state.routes.map((tab,i)=>{
            return(
              <View key={i}>
                <TouchableOpacity
                  style={styles.tab} key={i}
                  onPress={()=>this.tabPress(tab.routeName,i)}>
                    <Icon name={iconList[tab.routeName]} size={24} style={[styles.text,navigation.state.index == i?styles.activeTab:{}]}/>
                    <Text style={[styles.text,navigation.state.index == i?styles.activeTab:{}]}>{tab.routeName}</Text>
                </TouchableOpacity>
              </View>
            );
          })
        }
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
    backgroundColor: '#FBFBFB'
  },
  tab: {
    flex:1,
    width: 60,
    height: 30,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 50,

    zIndex: 100,
  },
  centerTab: {
    backgroundColor: '#04ACF4',
    
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    toggleAddTask: ()=> {
      dispatch(toggleAddTask());
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Footer);