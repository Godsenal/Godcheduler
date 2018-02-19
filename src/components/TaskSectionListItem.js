import React, { Component } from 'react';
import { Animated, View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import { DoubleTapWrapper } from './';
import { color } from '../config';

const DEFAULT_TRANSITION = 250;
const DEFAULT_PADDING = 20;
const WINDOW_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: '5%',
    backgroundColor: 'white',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: color.whitegray,
  },
  cardHeader: {
    height: 20,
    padding: DEFAULT_PADDING,
    backgroundColor: color.whitegray,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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

export default class TaskSectionListItem extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    header: PropTypes.string.isRequired,
    containerHeight: PropTypes.number.isRequired,
    scrollTo: PropTypes.func,
    allowScroll: PropTypes.func,
  }
  static defaultProps = {
    scrollTo: () => {},
    allowScroll: () => {},
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
    this._root.getNode().measure((ox, oy) => {
      if (!this.state.isInit) {
        this.props.allowScroll(true);
      } else {
        this.props.allowScroll(false);
        this.props.scrollTo(oy);
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
  render() {
    const { isInit, opacity, data } = this.state;
    const { header, containerHeight } = this.props;
    const containerStyle = [styles.card, {
      marginHorizontal: opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [WINDOW_WIDTH * 0.05, 0],
      }),
    }];
    const headerStyle = [styles.cardHeader, {
      height: opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 30],
      }),
    }];
    const bodyStyle = [styles.cardBody, {
      height: opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [200, containerHeight - (40 + (DEFAULT_PADDING * 2))],
      }),
    }];
    return (
      <Animated.View style={containerStyle} ref={(ref) => { this._root = ref; }}>
        <Animated.View style={headerStyle}>
          <Text>{header}</Text>
        </Animated.View>
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
        <View style={styles.cardFooter}>
          <TouchableOpacity onPress={this._onTap}>
            <Text style={{ textAlign: 'right' }}>{isInit ? '더 보기' : '최소화'}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
}
