import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';


const DOUBLE_PRESS_DELAY = 400;

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
      { text: `Row ${i + 1}`, id: i }
    )),
  }
  detectDoubleTap = (id) => {
    const time = new Date().getTime();
    const delta = this.lastTap[id] ? (time - this.lastTap[id]) : -1;

    if (delta > 0 && delta < DOUBLE_PRESS_DELAY) {
      return true;
    }
    this.lastTap[id] = time;
    return false;
  };
  _onPress = (id) => {
    const isDoubleTap = this.detectDoubleTap(id);

    if (isDoubleTap) {
      this.setState({
        data: this.state.data.filter(item => (
          item.id !== id
        )),
      });
    }
  };
  _renderItem = ({ item }) => (
    <TouchableOpacity key={item.id} style={styles.item} onPress={() => this._onPress(item.id)}>
      <View>
        <Text style={{ color: 'black' }}>
          {item.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
  render() {
    const { data } = this.state;
    console.log(data);
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
