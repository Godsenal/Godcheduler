import React, { Component } from 'react';
import { Animated, View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, findNodeHandle, UIManager, Platform } from 'react-native';
import PropTypes from 'prop-types';

import { DoubleTapWrapper } from './';
import { color } from '../config';

const DEFAULT_TRANSITION = 150;
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
    header: PropTypes.string.isRequired,
    containerHeight: PropTypes.number.isRequired,
    scrollTo: PropTypes.func,
    allowScroll: PropTypes.func,
    lastSection: PropTypes.bool,
  }
  static defaultProps = {
    scrollTo: () => {},
    allowScroll: () => {},
    lastSection: false,
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
      this.setState({
        isInit: !this.state.isInit,
      }, () => {
        if (this.state.isInit) {
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
    });
  }
  _onAnimationEnd = () => {
    this._isAnimating = false;
  }
  _renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: '90%',
        backgroundColor: color.whitegray,
        marginLeft: '5%',
        marginRight: '5%',
      }}
    />
  );
  _renderItem = ({ item }) => (
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
  )
  _renderBody = () => {
    const { data, removeQueue } = this.state;
    const { lastSection } = this.props;
    if (lastSection) {
      return (
        <View style={styles.cardBody}>
          <FlatList
            keyExtractor={item => item.id}
            renderItem={this._renderItem}
            ItemSeparatorComponent={this._renderSeparator}
            data={data}
            extraData={removeQueue}
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
        <FlatList
          keyExtractor={item => item.id}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._renderSeparator}
          data={isInit ? data.slice(0, 3) : data}
          extraData={removeQueue}
        />
      </Animated.View>
    );
  }
  _renderFooter = () => {
    const { isInit } = this.state;
    const { lastSection } = this.props;
    if (lastSection) {
      return null;
    }
    return (
      <View style={styles.cardFooter}>
        <TouchableOpacity onPress={this._onTap}>
          <Text style={{ textAlign: 'right' }}>{isInit ? '더 보기' : '최소화'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    const { opacity } = this.state;
    const { header } = this.props;
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
    return (
      <Animated.View style={containerStyle} ref={(ref) => { this._root = ref; }}>
        <Animated.View style={headerStyle}>
          <Text>{header}</Text>
        </Animated.View>
        {this._renderBody()}
        {this._renderFooter()}
      </Animated.View>
    );
  }
}
