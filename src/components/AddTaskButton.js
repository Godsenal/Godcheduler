import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'

export default class AddTaskButton extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    handleAddTask: PropTypes.func.isRequired,
  }
  render() {
    return (
      <TouchableOpacity
          style={[styles.centerTab,{left: (this.props.width / 2 - 30)}]}
          onPress={this.props.handleAddTask}>
          <Text>ADD</Text>
        </TouchableOpacity>
    )
  }
}

var styles = StyleSheet.create({
  centerTab: {
    position: 'absolute',
    backgroundColor: '#04ACF4',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    bottom: 60,
    left: (Dimensions.get('window').width / 2 - 30),
    zIndex: 101,
  },
});
