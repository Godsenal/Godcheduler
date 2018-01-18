import {StackNavigator} from 'react-navigation';
import {TaskList, CategoryTaskList} from '../containers';

export default TaskListNavigator = StackNavigator({
  taskList: {
    screen: TaskList,
    navigationOptions: {title:'TaskList'},
  },
  categoryTaskList: {
    screen: CategoryTaskList,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.category,
    }),
  }
},{
});