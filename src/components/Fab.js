import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
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

const Fab = ({ position, callback, children }) => (
  <TouchableOpacity
    style={[styles.fab, position === 'right' ? { right: 10 } : { left: 10 }]}
    onPress={callback}
  >
    {children}
  </TouchableOpacity>
);

Fab.propTypes = {
  position: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Fab;

