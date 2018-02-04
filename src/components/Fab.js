import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

export default class Fab extends Component {
  static propTypes = {
    position: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
  }
  render() {
    const {position, callback} = this.props;
    return (
      <TouchableOpacity
        style={[styles.fab,position=='right'?{right: 10}:{left: 10}]}
        onPress={callback}>
        {this.props.children}
      </TouchableOpacity>
    )
  }
}

var styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    backgroundColor: '#04ACF4',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    bottom: 10,
    zIndex: 101,
  },
});
