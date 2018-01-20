import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class CategoryTaskList extends Component {

  render() {
    return (
      <View>
        
        <Text>{this.props.currentState.params?this.props.currentState.params.category:''}</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  currentState: state.navigator.get('currentState').toJS()
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryTaskList)
