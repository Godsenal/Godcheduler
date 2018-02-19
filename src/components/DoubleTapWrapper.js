import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, ViewPropTypes } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import { AnimatedRow } from './';

const DOUBLE_PRESS_DELAY = 400;

export default class DoubleTapWrapper extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    onPress: PropTypes.func,
    onDoubleTap: PropTypes.func.isRequired,
    animation: PropTypes.bool,
    onAnimationEnd: PropTypes.func.isRequired,
    style: ViewPropTypes.style,
    animationComponent: PropTypes.element,
  }
  static defaultProps = {
    animation: true,
    style: {
      height: 50,
      backgroundColor: '#E9E9E9',
      marginTop: 5,
      borderRadius: 5,
    },
    onPress: () => {},
    animationComponent: <Icon name="check" color="#FBFBFB" size={20} />,
  }
  constructor() {
    super();
    this.lastTap = 0;
    this.isRemoving = false;
  }
  _onPress = () => {
    const isDoubleTap = this.detectDoubleTap();
    this.props.onPress(); // 필요할까봐 만듬
    if (isDoubleTap) {
      this.props.onDoubleTap();
      this.isRemoving = true;
    }
  };
  detectDoubleTap = () => {
    const time = new Date().getTime();
    const delta = time - this.lastTap;

    if (delta < DOUBLE_PRESS_DELAY) {
      return true;
    }
    this.lastTap = time;
    return false;
  };
  render() {
    const {
      animation,
      animationComponent,
      children,
      onAnimationEnd,
    } = this.props;
    const innerView = animation ?
      (
        <AnimatedRow
          remove={this.isRemoving}
          onRemove={onAnimationEnd}
        >
          {!this.isRemoving ? children : animationComponent || children}
        </AnimatedRow>
      ) :
      children;
    return (
      <TouchableOpacity {...this.props} onPress={this._onPress} disabled={this.isRemoving}>
        {innerView}
      </TouchableOpacity>
    );
  }
}
