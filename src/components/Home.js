import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Container, Text, Button} from 'native-base';

export default class Home extends Component {

  render() {
    return (
      <Container>
        <Text>I'm Home</Text>
        <Button rounded onPress={()=>this.props.navigation.navigate('Calender')}>
          <Text>Go to Calender</Text>
        </Button>
      </Container>
    )
  }
}
