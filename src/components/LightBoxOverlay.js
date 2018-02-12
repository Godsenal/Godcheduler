import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Animated, Dimensions, StyleSheet, PanResponder, TouchableOpacity, Text } from 'react-native';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;

const DRAG_DISMISS_THRESHOLD = 150;

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  },
  open: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    // Android pan handlers crash without this declaration:
    backgroundColor: 'transparent',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: WINDOW_WIDTH,
    backgroundColor: 'transparent',
    marginTop: 20,
    zIndex: 110,
  },
  closeButton: {
    fontSize: 35,
    color: 'white',
    lineHeight: 40,
    width: 40,
    textAlign: 'center',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 1.5,
    shadowColor: 'black',
    shadowOpacity: 0.8,
  },
});

export default class LightBoxOverlay extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    swipeToDismiss: PropTypes.bool.isRequired,
    springConfig: PropTypes.shape({
      tension: PropTypes.number.isRequired,
      friction: PropTypes.number.isRequired,
    }).isRequired,
    origin: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired,
  }
  state = {
    target: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    isPanning: false,
    isAnimating: false,
    pan: new Animated.Value(0),
    defaultAnim: new Animated.Value(0),
  }
  componentWillMount() {
    if (this.props.swipeToDismiss) {
      this._panResponder = PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: () => !this.state.isAnimating,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => (
          !this.state.isAnimating && gestureState.dx !== 0 && gestureState.dy !== 0
        ),
        onMoveShouldSetPanResponder: () => !this.state.isAnimating,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => (
          !this.state.isAnimating && gestureState.dx !== 0 && gestureState.dy !== 0
        ),
  
        onPanResponderGrant: () => {
          this.state.pan.setValue(0);
          this.setState({ isPanning: true });
        },
        onPanResponderMove: Animated.event([
          null,
          { dy: this.state.pan },
        ]),
        onPanResponderTerminationRequest: () => true,
        onPanResponderRelease: (evt, gestureState) => {
          if (Math.abs(gestureState.dy) > DRAG_DISMISS_THRESHOLD) {
            this.setState({
              isPanning: false,
              target: {
                y: gestureState.dy,
                x: gestureState.dx,
                opacity: 1 - Math.abs(gestureState.dy / WINDOW_HEIGHT),
              },
            });
            this.close();
          } else {
            Animated.spring(
              this.state.pan,
              { toValue: 0, ...this.props.springConfig },
            ).start(() => { this.setState({ isPanning: false }); });
          }
        },
      });
    }
  }
  componentWillReceiveProps(props) {
    if (this.props.isOpen !== props.isOpen && props.isOpen) {
      this.open();
    }
  }
  open = () => {
    this.setState({
      isAnimating: true,
      target: {
        x: 0,
        y: 0,
        opacity: 1,
      },
    });

    Animated.spring(
      this.state.defaultAnim,
      { toValue: 1, ...this.props.springConfig },
    ).start(() => {
      this.setState({ isAnimating: false });
    });
  }
  close = () => {
    this.setState({
      isAnimating: true,
    });

    Animated.spring(
      this.state.defaultAnim,
      { toValue: 0, ...this.props.springConfig },
    ).start(() => {
      this.setState({
        isAnimating: false,
      });
      this.props.onClose();
    });
  }
  render() {
    const {
      defaultAnim,
      target,
      pan,
      isPanning,
    } = this.state;
    const { origin, isOpen, swipeToDismiss } = this.props;
    const lightboxOpacityStyle = {
      opacity: defaultAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, target.opacity],
      }),
    };
    let handlers;
    if (swipeToDismiss) {
      handlers = this._panResponder.panHandlers;
    }

    let dragStyle;
    if (isPanning) {
      dragStyle = {
        top: this.state.pan,
      };
      lightboxOpacityStyle.opacity = pan.interpolate({
        inputRange: [-WINDOW_HEIGHT, 0, WINDOW_HEIGHT], outputRange: [0, 1, 0],
      });
    }

    const background = (
      <Animated.View
        style={[styles.background, lightboxOpacityStyle, { backgroundColor: 'black' }]}
      >
      </Animated.View>
    );
    const animatedStyle = {
      left: defaultAnim.interpolate({
        inputRange: [0, 1], outputRange: [origin.x, target.x],
      }),
      top: defaultAnim.interpolate({
        inputRange: [0, 1], outputRange: [origin.y, target.y],
      }),
      width: defaultAnim.interpolate({
        inputRange: [0, 1], outputRange: [origin.width, WINDOW_WIDTH],
      }),
      height: defaultAnim.interpolate({
        inputRange: [0, 1], outputRange: [origin.height, WINDOW_HEIGHT],
      }),
    };
    const header = (
      <Animated.View style={[styles.header, lightboxOpacityStyle]}>
        <TouchableOpacity onPress={this.close}>
          <Text style={styles.closeButton}>×</Text>
        </TouchableOpacity>
      </Animated.View>
    );
    return (
      <Modal visible={isOpen} transparent onRequestClose={() => this.close()}>
        {background}
        {header}
        <Animated.View style={[styles.open, animatedStyle, dragStyle]} {...handlers}>
          { this.props.children }
        </Animated.View>
      </Modal>
    );
  }
}
