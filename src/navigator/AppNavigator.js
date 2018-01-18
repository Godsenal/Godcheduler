import {StackNavigator} from 'react-navigation';
import {Calendar} from '../containers';

export default AppNavigator = StackNavigator({
  Calendar: {
    screen: Calendar,
    navigationOptions:{
      title: 'Calendar',
    }
  },
});