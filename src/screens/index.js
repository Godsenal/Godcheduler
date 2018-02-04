import { Navigation } from 'react-native-navigation';
import {AddTask, Calendar, CategoryTaskList, TaskList} from '../containers';

export function registerScreens(store, provider) {
  Navigation.registerComponent('main.TaskList', () => TaskList, store, provider);
  Navigation.registerComponent('main.Calendar', () => Calendar, store, provider);
  Navigation.registerComponent('taskList.CategoryTaskList', () => CategoryTaskList, store, provider);
  Navigation.registerComponent('modal.AddTask', () => AddTask, store, provider);

}