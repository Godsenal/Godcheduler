import {StackNavigator} from 'react-navigation';
import CategoryTaskList from '../containers/CategoryTaskList';

import FooterNavigator from './TabNavigator';
export default OverTab = StackNavigator({
  taskList: {
    screen: FooterNavigator,
  },
  categoryTaskList: {
    screen: CategoryTaskList,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.routeName,
    }),
  }
},{
  headerMode: 'screen'
});