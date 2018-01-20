import React, { Component } from 'react';
import { Animated, View, StyleSheet, Modal } from 'react-native';
import {connect} from 'react-redux';
import { Container, Header,Body, Title, Content, Input, Text,Item, Button,} from 'native-base';
import PropTypes from 'prop-types';
import {addTask, closeAddTask} from '../actions/task';
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
    this.props.addTask(this.state.description);
    this.props.closeAddTask();
  }
  render() {
    const {description} = this.state;
    return (
      <Modal
        visible={this.props.task.getIn(['add','open'])}
        animationType={'slide'}
        onRequestClose={() => this.props.closeAddTask()}>

        <Header>
          <Body>
            <Title>Add Task</Title>
          </Body>
        </Header>
        <Button onPress={this.props.closeAddTask}><Text>X</Text></Button>
        <Content>
          <Text>Category: {this.props.currentState.params?this.props.currentState.params.category:''}</Text>
          <Item regular>
            <Input placeholder='Regular Textbox' value={description} onChangeText={(text)=>this.handleChange(text)}/>
          </Item>
          <Button bordered onPress={this.addTask}>
            <Text>등록</Text>
          </Button>
        </Content>
      </Modal>
    )
  }
}

var styles = StyleSheet.create({
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
    currentState: state.navigator.get('currentState').toJS()
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addTask : (description) => {
      dispatch(addTask(description));
    },
    openAddTask: ()=> {
      dispatch(openAddTask());
    },
    closeAddTask: ()=> {
      dispatch(closeAddTask());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
