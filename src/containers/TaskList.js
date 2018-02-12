import Icon from 'react-native-vector-icons/Foundation';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Content, Text } from 'native-base';
import { StyleSheet } from 'react-native';

import StackHOC from './StackHOC';
import { ImminentList, CategoryList, Fab } from '../components';
import { color } from '../config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

class TaskList extends Component {
  handleCategoryClick = (category) => {
    this.props.push({
      screen: 'stack.ListInCategory',
      animated: true,
      animationType: 'slide-horizontal',
      title: category.name,
      navigatorStyle: {
        navBarBackgroundColor: category.color,
        navBarTextColor: color.lightgray,
        navBarButtonColor: color.lightgray,
      },
    });
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
      <Container style={styles.container}>
        <Content>
          <ImminentList />
          <Text style={{ marginTop: 20, marginLeft: 20, fontSize: 12 }}>Categories</Text>
          <CategoryList handleCategoryClick={this.handleCategoryClick} />
        </Content>
        <Fab position="right" callback={this.handleAddTask}>
          <Icon name="pencil" color="#FFFFFF" size={20} />
        </Fab>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  list: state.task.get('list'),
  layout: state.layout,
});

export default StackHOC(connect(mapStateToProps)(TaskList));

