import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { TaskSectionListItem } from './';


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
      >
        <TaskSectionListItem
          header="오늘"
          scrollTo={this._scrollTo}
          containerHeight={layout.height}
          allowScroll={this._allowScroll}
          data={data.slice(0, 10)}
        />
        <TaskSectionListItem
          header="내일"
          scrollTo={this._scrollTo}
          containerHeight={layout.height}
          allowScroll={this._allowScroll}
          data={data.slice(11, 20)}
        />
        <TaskSectionListItem
          header="다가오는"
          scrollTo={this._scrollTo}
          containerHeight={layout.height}
          allowScroll={this._allowScroll}
          data={data.slice(21, 50)}
          lastSection
        />
      </ScrollView>
    );
  }
}
