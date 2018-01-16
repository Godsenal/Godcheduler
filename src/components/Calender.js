import React, { Component } from 'react';
import {Container, Text, Header, Body, Title} from 'native-base';
import PropTypes from 'prop-types';

export class Calender extends Component {
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
          I'm Calender
        </Text>
      </Container>
    )
  }
}

export default Calender
