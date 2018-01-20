import React, { Component } from 'react';
import { Animated, View, StyleSheet, Modal } from 'react-native';
import {connect} from 'react-redux';
import { Container, Left, Right, Header,Body, Title, Content, Input, Text,Item, Button,} from 'native-base';
import PropTypes from 'prop-types';
import {addTask, closeAddTask} from '../actions/task';

import Icon from '@expo/vector-icons/Entypo';

class AddTask extends Component {
  state = {
    slideAnim: new Animated.Value(0),
    description: '',
  }
  /*
  componentWillReceiveProps = (nextProps) => {
    var height = 0;
    if((this.props.task.add.open !== nextProps.task.add.open)&&nextProps.task.add.open){
      height=this.props.layout.height;
    }
    Animated.timing(
      this.state.slideAnim,
      {
        toValue: height,
        duration: 200,
      }
    ).start();
  }
  */
  handleChange = (text) => {
    this.setState({
      description: text,
    });
  }
  addTask = () => {
    let task = {
      category: this.props.modal.data.category,
      description: this.state.description
    };
    this.props.addTask(task);
    this.props.closeAddTask();
    this.setState({
      description: '',
    });
  }
  render() {
    const {description} = this.state;
    return (
      <Modal
        visible={this.props.task.getIn(['add','modal','open'])}
        animationType={'slide'}
        onRequestClose={() => this.props.closeAddTask()}>

        <Header style={styles.header}>
          <Left>
            <Button transparent onPress={this.props.closeAddTask}>
              <Icon name='cross' size={24} color='white'/>
            </Button>
          </Left>
          <Body>
            <Title style={{color:'white'}}>Add Task</Title>
          </Body>
          <Right/>
        </Header>
        <Content style={styles.content}>
          <Item regular>
            <Input placeholder='Regular Textbox' value={description} onChangeText={(text)=>this.handleChange(text)}/>
          </Item>
          <Button style={styles.button} bordered onPress={this.addTask}>
            <Text>등록</Text>
          </Button>
        </Content>
      </Modal>
    )
  }
}

var styles = StyleSheet.create({
  header: {
    backgroundColor: '#04ACF4',
  },
  content: {
    padding: 20,
    display: 'flex',
  },
  button: {
    flex: 1,
  },
  subView: {
    backgroundColor: '#FBFBFB',
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: 0,
    right: 0,
    left: 0, 
    flex: 1,
  }
});

const mapStateToProps = (state) => {
  return {
    task: state.task,
    layout: state.layout,
    modal: state.task.getIn(['add','modal']).toJS()
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addTask : (task) => {
      dispatch(addTask(task));
    },
    closeAddTask: ()=> {
      dispatch(closeAddTask());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
