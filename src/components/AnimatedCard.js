import React, { Component } from 'react';
import { Animated, View, Text, ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const DEFAULT_TRANSITION = 250;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    width: '90%',
    marginHorizontal: '5%',
    marginTop: 10,
    backgroundColor: '#F7F7F7',
    padding: 10,
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  cardBody: {
  },
  cardFooter: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
  },
});

export default class AnimatedCard extends Component {
  static propTypes = {
    header: PropTypes.string.isRequired,
    isFull: PropTypes.bool,
  }
  static defaultProps = {
    isFull: false,
  }
  state = {
    height: new Animated.Value(220),
    viewHeight: 0,
    isInit: true,
  }
  _isAnimating = false;
  _onLayout = (e) => {
    this.setState({
      viewHeight: e.nativeEvent.layout.height,
    });
  }
  _onTap = () => {
    const willHeight = this.state.isInit ? this.state.viewHeight : 220;
    this._isAnimating = true;
    Animated.timing(this.state.height, {
      toValue: willHeight,
      duration: DEFAULT_TRANSITION,
    }).start(this._onAnimationEnd);
  }

  _onAnimationEnd = () => {
    this._isAnimating = false;
    this.setState({
      isInit: !this.state.isInit,
    });
  }
  render() {
    const { header, isFull } = this.props;
    const bodyStyle = !isFull ? [styles.cardBody, {
      height: 220,
      overflow: 'hidden',
    }] : styles.cardBody;
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader} >
          <Text>{header}</Text>
        </View>
        <ScrollView style={bodyStyle}>
          {this.props.children}
        </ScrollView>
      </View>
    );
  }
}
