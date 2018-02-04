import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Container, Header, Body, Title,Text, Button, List, ListItem} from 'native-base';
import {View, ScrollView, StyleSheet} from 'react-native';

import {ImminentTasks, CategoryList, AddTaskButton} from '../components';

import AddTask from './AddTask';

class TaskList extends Component {
  static navigatorButtons = {
    fab: {
      collapsedId: 'share',
      collapsedIcon: require('../img/pen.svg'),
      collapsedIconColor: 'red', // optional
      backgroundColor: '#607D8B'
    }
  };
  handleCategoryClick = (category) => {
    this.props.navigator.push({
      screen:'taskList.CategoryTaskList',
      title: category,
      passProps: {category},
      animated: true,
      animationType: 'slide-horizontal',
    })
  } 

  handleAddTask =() => {
    this.props.navigator.showModal({
      screen: 'modal.AddTask',
      title: 'Add Task'
    })
  }
  render() {
    const {list, layout} = this.props;
    return (
      <ScrollView style={styles.container}>
        <AddTaskButton width={layout.get('width')} handleAddTask={this.handleAddTask} />
        <ImminentTasks/>
        <Text style={{marginTop: 20, marginLeft: 20, fontSize: 12}}>Categories</Text>
        <CategoryList handleCategoryClick={this.handleCategoryClick}/>
      </ScrollView>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    list: state.task.get('list'),
    layout: state.layout,
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  }
})
export default connect(mapStateToProps)(TaskList);

