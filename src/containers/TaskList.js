import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Container, Header, Body, Title,Text, Button, List, ListItem} from 'native-base';
import {View, ScrollView, StyleSheet} from 'react-native';

import {ImminentTasks, CategoryList} from '../components';

import AddTask from './AddTask';

class TaskList extends Component {

  handleCategoryClick = (category) => {
    this.props.navigation.navigate('categoryTaskList',{category});
  }
  render() {
    const {list} = this.props;
    return (
      <ScrollView style={styles.container}>
        <AddTask />
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
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  }
})
export default connect(mapStateToProps)(TaskList);

