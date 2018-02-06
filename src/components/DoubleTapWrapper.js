import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

const DOUBLE_PRESS_DELAY = 400;

export default class DoubleTapWrapper extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    onPress: PropTypes.func,
    onDoubleTap: PropTypes.func.isRequired,
  }
  static defaultProps = {
    onPress: () => {},
  }
  constructor() {
    super();
    this.lastTap = {};
  }
  _onPress = (id) => {
    const isDoubleTap = this.detectDoubleTap(id);

    this.props.onPress(); // 필요할까봐 만듬
    if (isDoubleTap) {
      this.props.onDoubleTap(id);
    }
  };
  detectDoubleTap = (id) => {
    const time = new Date().getTime();
    const delta = this.lastTap[id] ? (time - this.lastTap[id]) : -1;

    if (delta > 0 && delta < DOUBLE_PRESS_DELAY) {
      return true;
    }
    this.lastTap[id] = time;
    return false;
  };
  render() {
    const { id } = this.props;
    return (
      <TouchableOpacity {...this.props} onPress={() => this._onPress(id)}>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}
