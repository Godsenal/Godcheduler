import {StackNavigator} from 'react-navigation';
import {AddTask} from '../containers';

export default ModalNavigator = StackNavigator({
  addTask: {
    screen: AddTask,
  }
},{
  mode: 'modal',
  navigationOptions: {
    gesturesEnabled: false,
  },
  transitionConfig: () => ({
    transitionSpec: {
      duration: 300,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const { index } = scene;

      const height = layout.initHeight;
      const translateY = position.interpolate({
        inputRange: [0, 0, 0],
        outputRange: [height, 0, 0],
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      });

      return { transform: [{ translateY }] };
    },
  }),
});