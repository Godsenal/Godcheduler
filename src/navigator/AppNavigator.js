import {StackNavigator} from 'react-navigation';
import {Home, Calender} from '../components';

export default AppNavigator = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions:{
      title: 'Home',
    }
  },
  Calender: {
    screen: Calender,
    navigationOptions:{
      title: 'Calender',
    }
  },
});