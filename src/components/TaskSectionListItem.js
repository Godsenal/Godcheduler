import React, { Component } from 'react';
import { Animated, View, Text, ScrollView, FlatList, TouchableOpacity, StyleSheet, findNodeHandle, UIManager } from 'react-native';
import PropTypes from 'prop-types';

import { DoubleTapWrapper } from './';
import { color } from '../config';

const DEFAULT_TRANSITION = 250;
const DEFAULT_PADDING = 20;
const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: color.whitegray,
  },
  cardBody: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    overflow: 'hidden',
  },
  cardFooter: {
    height: 20,
    padding: DEFAULT_PADDING,
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default class AnimatedCard extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    containerHeight: PropTypes.number.isRequired,
    scrollTo: PropTypes.func,
    allowScroll: PropTypes.func,
    isLast: PropTypes.bool,
  }
  static defaultProps = {
    scrollTo: () => {},
    allowScroll: () => {},
    isLast: false,
  }
  state = {
    data: this.props.data,
    opacity: new Animated.Value(0),
    isInit: true,
    removeQueue: [],
    removeItem: '',
  }
  _isAnimating = false;

  _onDoubleTap = (date, id) => {
    this.setState(prevState => ({
      removeQueue: [...prevState.removeQueue, { date, id }],
      removeItem: id,
    }));
  }
  _removeItem = (id) => {
    this.setState(prevState => ({
      data: prevState.data.filter(item => item.id !== id),
      removeQueue: prevState.removeQueue.slice(0, -1),
    }));
  }
  _onTap = () => {
    const willOpacity = this.state.isInit ? 1 : 0;
    this._isAnimating = true;

    const handle = findNodeHandle(this._root.getNode());
    UIManager.measureLayoutRelativeToParent(handle, (err) => { console.error(err); }, (ox, oy) => {
      if (!this.state.isInit) {
        this.props.allowScroll(true);
      } else {
        this.props.allowScroll(false);
        this.props.scrollTo(oy - 40);
      }
      Animated.timing(this.state.opacity, {
        toValue: willOpacity,
        duration: DEFAULT_TRANSITION,
      }).start(this._onAnimationEnd);
    });
  }
  _onAnimationEnd = () => {
    this._isAnimating = false;
    this.setState({
      isInit: !this.state.isInit,
    });
  }
  _renderBody = () => {
    const { data } = this.state;
    const { isLast } = this.props;
    if (isLast) {
      return (
        <View style={styles.cardBody}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <DoubleTapWrapper
                key={item.id}
                {...item}
                onDoubleTap={() => this._onDoubleTap(item.id)}
                onAnimationEnd={() => this._removeItem(item.id)}
              >
                <Text style={{ color: 'black' }}>
                  {item.text}
                </Text>
              </DoubleTapWrapper>
            )}
            keyExtractor={item => (item.id)}
            extraData={this.state.removeQueue}
          />
        </View>
      );
    }
    const { isInit, opacity } = this.state;
    const { containerHeight } = this.props;
    const bodyStyle = [styles.cardBody, {
      height: opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [200, containerHeight - (40 + (DEFAULT_PADDING * 2))],
      }),
    }];
    return (
      <Animated.View style={bodyStyle}>
        <ScrollView
          scrollEnabled={!isInit}
        >
          {data.slice(0, isInit || this._isAnimating ? 3 : 10).map(item => (
            <DoubleTapWrapper
              key={item.id}
              {...item}
              onDoubleTap={() => this._onDoubleTap(item.id)}
              onAnimationEnd={() => this._removeItem(item.id)}
            >
              <Text style={{ color: 'black' }}>
                {item.text}
              </Text>
            </DoubleTapWrapper>
          ))}
        </ScrollView>
      </Animated.View>
    );
  }
  render() {
    const { isInit } = this.state;
    const { isLast } = this.props;
    return (
      <Animated.View style={styles.card} ref={(ref) => { this._root = ref; }}>
        {this._renderBody()}
        {
          isLast ? null :
          <View style={styles.cardFooter}>
            <TouchableOpacity onPress={this._onTap}>
              <Text style={{ textAlign: 'right' }}>{isInit ? '더 보기' : '최소화'}</Text>
            </TouchableOpacity>
          </View>
        }
      </Animated.View>
    );
  }
}
