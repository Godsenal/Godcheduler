import Icon from 'react-native-vector-icons/Foundation';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text } from 'native-base';
import { View, ScrollView, StyleSheet } from 'react-native';

import { ImminentList, CategoryList, Fab } from '../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

class TaskList extends Component {
  handleCategoryClick = (category) => {
    
  } 

  handleAddTask =() => {
    this.props.navigator.showModal({
      screen: 'modal.AddTask',
      title: 'Add Task',
    });
  }
  render() {
    const { list, layout } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <ImminentList />
          <Text style={{marginTop: 20, marginLeft: 20, fontSize: 12}}>Categories</Text>
          <CategoryList handleCategoryClick={this.handleCategoryClick}/>
        </ScrollView>
        <Fab position="right" callback={this.handleAddTask}>
          <Icon name="pencil" color="#FFFFFF" size={20} />
        </Fab>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  list: state.task.get('list'),
  layout: state.layout,
});

export default connect(mapStateToProps)(TaskList);

