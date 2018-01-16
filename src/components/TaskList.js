import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Container, Header, Body, Title,Text, Button, List, ListItem} from 'native-base';
import {View} from 'react-native';

class TaskList extends Component {
  render() {
    const {list} = this.props;
    return (
      <Container>
        <Header>
          <Body>
            <Title style={{color: '#04ACF4'}}>TaskList</Title>
          </Body>
        </Header>
        <Text>I'm TaskList</Text>
        <List>
          {
            list.tasks.map((item, i)=>{
              return(
                <ListItem key={i}>
                  <Text>{item.description}</Text>
                </ListItem>
              )
            })
          }
        </List>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.task.list,
  }
}
export default connect(mapStateToProps)(TaskList);

