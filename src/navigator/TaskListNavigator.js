import {StackNavigator} from 'react-navigation';
/* 자꾸 임폴트 에러남 ㅡ ㅡ */
import TaskList from '../containers/TaskList';
import CategoryTaskList from '../containers/CategoryTaskList';

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