import {TabNavigator} from 'react-navigation';
import {Footer} from '../components';

import Calendar from '../containers/Calendar';
import TaskList from '../containers/TaskList';

import TaskListNavigator from './TaskListNavigator';


export default FooterNavigator = TabNavigator({
  list: {
    screen: TaskListNavigator,
  },
  calendar: {
    screen: Calendar,
    navigationOptions: {title:'Calendar'},
  }
}, {
  swipeEnabled: true,
  animationEnabled: true,
  tabBarComponent: Footer,
  tabBarPosition: 'bottom',
});