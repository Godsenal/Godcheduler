import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import { DoubleTapWrapper, TaskSectionList } from '../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    borderWidth: 1,
    padding: 10,
  },
  item: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#FBFBFB',
  },
  row: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
});
export default class ListInCategory extends Component {
  onDoubleTap = (date, id) => {
    this.setState(prevState => ({
      removeQueue: [...prevState.removeQueue, { date, id }],
      removeItem: id,
    }));
  }
  _renderItem = ({ item }) => (
    <DoubleTapWrapper
      key={item.id}
      {...item}
      style={styles.item}
      onDoubleTap={() => this.onDoubleTap(item.date, item.id)}
      animation
      innerStyle={styles.row}
      animationComponent={<Icon name="check" color="#FBFBFB" size={20} />}
      onAnimationEnd={() => this.removeItem(item.date, item.id)}
    >
      <Text style={{ color: 'black' }}>
        {item.text}
      </Text>
    </DoubleTapWrapper>
  );
  render() {
    return (
      <View style={styles.container}>
        <TaskSectionList />
      </View>
    );
  }
}
