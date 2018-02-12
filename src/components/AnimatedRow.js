import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

const DEFAULT_TRANSITION = 500;
export default class AnimatedRow extends Component {
  static propTypes = {
    remove: PropTypes.bool.isRequired,
    onRemove: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
  }
  state = {
    opacity: new Animated.Value(0),
    backgroundColor: new Animated.Value(0),
  }
  componentDidMount() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: DEFAULT_TRANSITION,
    }).start();
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.remove && nextProps.remove) {
      this.onRemoving(nextProps.onRemove);
    }
  }
  onRemoving = (callback) => {
    Animated.sequence([
      Animated.timing(this.state.backgroundColor, {
        toValue: 1,
        duration: DEFAULT_TRANSITION,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: DEFAULT_TRANSITION,
      }),
    ]).start(callback);
  }
  render() {
    const { style } = this.props;
    const { opacity, backgroundColor } = this.state;
    const backgroundColorAnim = backgroundColor.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', '#23BD7E'],
    });
    return (
      <Animated.View
        style={[style, { flex: 1, opacity, backgroundColor: backgroundColorAnim }]}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
