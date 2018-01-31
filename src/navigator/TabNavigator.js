import {TabNavigator} from 'react-navigation';
import {Footer} from '../components';

import CalendarView from '../containers/CalendarView';
import TaskList from '../containers/TaskList';

import TaskListNavigator from './TaskListNavigator';


export default FooterNavigator = TabNavigator({
  list: {
    screen: TaskListNavigator,
  },
  calendar: {
    screen: CalendarView,
    navigationOptions: {title:'Calendar'},
  }
}, {
  swipeEnabled: true,
  animationEnabled: true,
  tabBarComponent: Footer,
  tabBarPosition: 'bottom',
});