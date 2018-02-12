import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, TouchableOpacity } from 'react-native';

import { LightBoxOverlay } from './';

const SPRING_CONFIG = { tension: 30, friction: 7 };

export default class LightBox extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    swipeToDismiss: PropTypes.bool,
  }
  static defaultProps = {
    swipeToDismiss: false,
  }
  state = {
    origin: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
    isOpen: false,
    layoutOpacity: new Animated.Value(1),
  }
  getOverlayProps = () => ({
    isOpen: this.state.isOpen,
    origin: this.state.origin,
    springConfig: SPRING_CONFIG,
    swipeToDismiss: this.props.swipeToDismiss,
    children: cloneElement(this.props.children, { isFull: true }),
    onClose: this._close,
  })
  _open = () => {
    this._root.measure((ox, oy, width, height, fx, fy) => {
      this.setState({
        isOpen: false,
        origin: {
          width,
          height,
          x: fx,
          y: fy,
        },
      }, () => {
        this.setState({
          isOpen: true,
        });
        setTimeout(() => {
          this._root && this.state.layoutOpacity.setValue(0);
        });
      });
    });
  }
  _close = () => {
    this.state.layoutOpacity.setValue(1);
    this.setState({
      isOpen: false,
    });
  }
  render() {
    const { layoutOpacity } = this.state;
    return (
      <View ref={component => this._root = component} onLayout={() => {}}>
        <Animated.View style={{ opacity: layoutOpacity }}>
          <TouchableOpacity
            onPress={this._open}
          >
            {this.props.children}
          </TouchableOpacity>
        </Animated.View>
        <LightBoxOverlay {...this.getOverlayProps()} />
      </View>
    );
  }
}
