import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class CategoryTaskList extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <View>

        <Text>{this.props.navigation.state.category}</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryTaskList)
