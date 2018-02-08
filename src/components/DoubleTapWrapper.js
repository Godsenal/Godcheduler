import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { AnimatedRow } from './';

const DOUBLE_PRESS_DELAY = 400;

export default class DoubleTapWrapper extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    onPress: PropTypes.func,
    onDoubleTap: PropTypes.func.isRequired,
    animation: PropTypes.bool.isRequired,
    onAnimationEnd: PropTypes.func.isRequired,
    innerStyle: PropTypes.node.isRequired,
    animationComponent: PropTypes.element,
  }
  static defaultProps = {
    onPress: () => {},
    animationComponent: null,
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
      innerStyle,
      onAnimationEnd,
    } = this.props;
    const innerView = animation ?
      (
        <AnimatedRow
          style={innerStyle}
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
