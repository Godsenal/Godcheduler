import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

import { TaskSectionListItem } from './';
import { color } from '../config';

const styles = StyleSheet.create({
  header: {
    height: 20,
    padding: 20,
    backgroundColor: color.whitegray,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default class TaskSectionList extends Component {
  state = {
    data: Array(50).fill(0).map((item, i) => (
      { text: `일정 ${i + 1}`, id: `${i}` }
    )),
    layout: {
      width: 0,
      height: 0,
    },
    allowScroll: true,
  }
  _onLayout = (e) => {
    const { width, height } = e.nativeEvent.layout;
    this.setState({
      layout: {
        width,
        height,
      },
    });
  }
  _scrollTo = (offsetY) => {
    this._scrollRoot.scrollTo({ x: 0, y: offsetY, animated: true });
  }
  _allowScroll = (allow) => {
    this.setState({
      allowScroll: allow,
    });
  }
  render() {
    const { layout, allowScroll, data } = this.state;
    return (
      <ScrollView
        ref={(ref) => { this._scrollRoot = ref; }}
        onLayout={this._onLayout}
        scrollEnabled={allowScroll}
        stickyHeaderIndices={[0, 2, 4]}
      >
        <View style={styles.header}>
          <Text>오늘</Text>
        </View>
        <TaskSectionListItem
          scrollTo={this._scrollTo}
          containerHeight={layout.height}
          allowScroll={this._allowScroll}
          data={data.slice(0, 10)}
        />
        <View style={styles.header}>
          <Text>내일</Text>
        </View>
        <TaskSectionListItem
          scrollTo={this._scrollTo}
          containerHeight={layout.height}
          allowScroll={this._allowScroll}
          data={data.slice(11, 20)}
        />
        <View style={styles.header}>
          <Text>다가오는</Text>
        </View>
        <TaskSectionListItem
          scrollTo={this._scrollTo}
          containerHeight={layout.height}
          allowScroll={this._allowScroll}
          data={data.slice(21, 50)}
          isLast
        />
      </ScrollView>
    );
  }
}
