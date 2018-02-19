import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeLayout } from '../actions/layout';

class Main extends Component {
  // change layout state when device layout changed.
  static propTypes = {
    changeLayout: PropTypes.func.isRequired,
  }
  componentDidMount = () => {
    const { width, height } = Dimensions.get('window');
    this.props.changeLayout(width, height);
  }
  onLayout = () => {
    const { width, height } = Dimensions.get('window');
    this.props.changeLayout(width, height);
  }
  render() {
    return (
      <View style={{ flex: 1 }} onLayout={this.onLayout} />
    );
  }
}

const mapStateToProps = state => ({
  layout: state.layout,
});

const mapDispatchToProps = dispatch => ({
  changeLayout: (width, height) => {
    dispatch(changeLayout(width, height));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
