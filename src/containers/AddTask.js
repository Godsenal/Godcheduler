import React, { Component } from 'react';
import { Animated, View, StyleSheet, Modal } from 'react-native';
import {connect} from 'react-redux';
import { Container, Header,Body, Title, Content, Input, Text,Item, Button,} from 'native-base';
import PropTypes from 'prop-types';
import {addTask, closeAddTask} from '../actions/task';
class AddTask extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        title: 'close', // for a textual button, provide the button title (label)
        id: 'close', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
        showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
        buttonColor: 'blue', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
        buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
        buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
      },
    ]
  };

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      this.props.navigator.dismissModal({
        animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
      });
    }
  }

  
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
      <View>
        <Button onPress={this.props.closeAddTask}><Text>X</Text></Button>
        <Content>
          <Item regular>
            <Input placeholder='Regular Textbox' value={description} onChangeText={(text)=>this.handleChange(text)}/>
          </Item>
          <Button bordered onPress={this.addTask}>
            <Text>등록</Text>
          </Button>
        </Content>
      </View>
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
