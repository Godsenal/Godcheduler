import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import Icon from '@expo/vector-icons/Entypo';

export class Fab extends Component {
  render() {
    return (
      <TouchableOpacity
          style={styles.fab}
          onPress={this.props.handleFabPress}>
          <Icon name={this.props.icon} size={24} color='white'/>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#04ACF4',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    zIndex: 100,
  }  
})

export default Fab;