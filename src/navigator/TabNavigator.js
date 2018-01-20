import {TabNavigator} from 'react-navigation';
import {Footer} from '../components';

import Calendar from '../containers/Calendar';
import TaskList from '../containers/TaskList';




const FooterNavigator = TabNavigator({
  list: {
    screen: TaskList,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.routeName,
    }),
  },
  calendar: {
    screen: Calendar,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.routeName,
    }),
  }
}, {
  headerMode:'none',
  swipeEnabled: true,
  animationEnabled: true,
  tabBarComponent: Footer,
  tabBarPosition: 'bottom',
});

export default FooterNavigator;