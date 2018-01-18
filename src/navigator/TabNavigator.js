import {TabNavigator} from 'react-navigation';
import {Footer} from '../components';

import Calendar from '../containers/Calendar';
import TaskList from '../containers/TaskList';



export default FooterNavigator = TabNavigator({
  list: {
    screen: TaskList,
  },
  calendar: {
    screen: Calendar,
    key: 'tab1',
  }
}, {
  swipeEnabled: true,
  animationEnabled: true,
  tabBarComponent: Footer,
});