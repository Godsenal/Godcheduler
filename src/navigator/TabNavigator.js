import {TabNavigator} from 'react-navigation';
import {Home, Calender, Profile,TaskList, AddTask, Footer} from '../components';

export default FooterNavigator = TabNavigator({
  list: {
    screen: TaskList,
  },
  calendar: {
    screen: Calender,
    key: 'tab1',
  }
}, {
  swipeEnabled: true,
  animationEnabled: true,
  tabBarComponent: Footer,
});