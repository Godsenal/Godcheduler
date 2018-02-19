import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Footer, FooterTab, Input, Text, Item, Button } from 'native-base';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/Entypo';
import IoIcon from 'react-native-vector-icons/Ionicons';
import { addTask } from '../actions/task';
import { color } from '../config';

const styles = StyleSheet.create({
  formList: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: color.gray,
    padding: 10,
  },
  formField: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldText: {
    flex: 1,
  },
  subText: {
    fontSize: 12,
  },
  padding: {
    padding: 10,
  },
  item: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    color: color.gray,
  },
  badge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  description: {
    height: 60,
  },
  footer: {
    backgroundColor: color.skyblue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: color.lightgray,
  },
  icon: {
    marginLeft: 10,
  },
});

class AddTask extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        id: 'cancel',
        disableIconTint: true,
        showAsAction: 'ifRoom',
        buttonColor: color.skyblue,
        systemItem: 'stop',
      },
    ],
  };
  static propTypes = {
    addTask: PropTypes.func.isRequired,
    category: PropTypes.string,
    navigator: PropTypes.shape({
      setOnNavigatorEvent: PropTypes.func,
      dismissModal: PropTypes.func,
    }).isRequired,
  }
  static defaultProps = {
    category: '',
  }
  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  state = {
    // slideAnim: new Animated.Value(0),
    categories: [
      { name: 'Kim BumJune', color: '#13CE66' },
      { name: 'Game', color: '#4387D6' },
      { name: 'Eunhack', color: '#FA687F' },
      { name: 'Eunhack', color: '#FA687F' },
      { name: 'Eunhack', color: '#FA687F' },
      { name: 'Eunhack', color: '#FA687F' },
      { name: 'Eunhack', color: '#FA687F' },
      { name: 'Eunhack', color: '#FA687F' },
      { name: 'Eunhack', color: '#FA687F' },
    ],
    description: '',
  }
  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type === 'NavBarButtonPress') { // this is the event type for button presses
      Keyboard.dismiss();
      this.props.navigator.dismissModal({
        animationType: 'slide-down', // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
      });
    }
  }
  handleChange = (text) => {
    this.setState({
      description: text,
    });
  }
  addTask = () => {
    this.props.addTask(this.state.description);
  }
  render() {
    const { categories, description } = this.state;
    const currentCategory = this.props.category ? this.props.category : categories[0];
    return (
      <Container style={{ flex: 1 }}>
        <Content style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={styles.formList}>
            <Text>설명</Text>
            <TextInput
              style={styles.description}
              placeholder="어떤 일정인가요?"
              onChangeText={text => this.setState({ description: text })}
              value={description}
              multiline
            />
          </View>
          <TouchableOpacity style={styles.formList}>
            <View style={styles.formField}>
              <Text style={styles.fieldText}>카테고리</Text>
              <View style={styles.item}>
                <View style={[styles.badge, { backgroundColor: currentCategory.color }]} />
                <Text style={styles.itemText}>{currentCategory.name}</Text>
                <Icon style={styles.itemText} name="chevron-thin-right" size={20} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.formList}>
            <View style={styles.formField}>
              <Text style={styles.fieldText}>시간 및 날짜</Text>
              <View style={styles.item}>
                <Text style={styles.itemText}>오늘 12:30</Text>
                <Icon style={styles.itemText} name="chevron-thin-right" size={20} />
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.formList}>
            <View style={styles.formField}>
              <Text style={styles.fieldText}>위치</Text>
              <View style={styles.item}>
                <Text style={styles.itemText}>현위치로부터 예상 이동 시간 15분</Text>
              </View>
            </View>
            <View style={[styles.formField, styles.padding]}>
              <Text style={[styles.fieldText, styles.subText]}>교통수단</Text>
              <View style={styles.item}>
                <IoIcon name="md-car" size={20} style={styles.icon} />
                <IoIcon name="md-bus" size={20} style={styles.icon} />
                <IoIcon name="md-walk" size={20} style={styles.icon} />
              </View>
            </View>
            <Item rounded>
              <Input placeholder="주소 검색" />
            </Item>
          </View>
        </Content>
        <Footer>
          <FooterTab>
            <Button style={styles.footer} full>
              <Text style={styles.footerText}>등록</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  task: state.task,
  layout: state.layout,
});

const mapDispatchToProps = dispatch => ({
  addTask: (description) => {
    dispatch(addTask(description));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
