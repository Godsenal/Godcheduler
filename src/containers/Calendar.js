import React, { Component } from 'react';
import {Container, Text, Header, Body, Title} from 'native-base';
import PropTypes from 'prop-types';

class Calendar extends Component {
  static propTypes = {

  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title style={{color: '#04ACF4'}}>Calander</Title>
          </Body>
        </Header>
        <Text>
          I'm Calander
        </Text>
      </Container>
    )
  }
}

export default Calendar
