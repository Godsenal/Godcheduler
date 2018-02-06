import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';

import { DoubleTapWrapper } from '../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    borderWidth: 1,
    padding: 10,
  },
  item: {
    padding: 10,
    height: 44,
  },
});
export default class ListInCategory extends Component {
  constructor(props) {
    super(props);
    this.lastTap = {};
  }
  state = {
    data: Array(50).fill(0).map((item, i) => (
      { text: `Row ${i + 1}`, id: `${i}` }
    )),
  }
  deleteItem = (id) => {
    this.setState({
      data: this.state.data.filter(item => (
        item.id !== id
      )),
    });
  }
  _renderItem = ({ item }) => (
    <DoubleTapWrapper key={item.id} id={item.id} style={styles.item} onDoubleTap={this.deleteItem}>
      <View>
        <Text style={{ color: 'black' }}>
          {item.text}
        </Text>
      </View>
    </DoubleTapWrapper>
  );
  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}
