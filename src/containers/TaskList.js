import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Container, Header, Body, Title,Text, Button, List, ListItem} from 'native-base';
import {View, ScrollView} from 'react-native';

import {ImminentTasks, CategoryList} from '../components';

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
        <ScrollView>
          <ImminentTasks/>
          <Text style={{marginTop: 20, marginLeft: 20, fontSize: 12}}>Categories</Text>
          <CategoryList/>
        </ScrollView>
      </Container>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    list: state.task.get('list'),
  }
}
export default connect(mapStateToProps)(TaskList);

