import { Navigation } from 'react-native-navigation';
import { Login, AddTask, Calendar, TaskList, ListInCategory } from '../containers';

export function registerScreens(store, provider) {
  Navigation.registerComponent('main.Login', () => Login, store, provider);
  Navigation.registerComponent('main.TaskList', () => TaskList, store, provider);
  Navigation.registerComponent('main.Calendar', () => Calendar, store, provider);
  Navigation.registerComponent('stack.ListInCategory', () => ListInCategory, store, provider);

  Navigation.registerComponent('modal.AddTask', () => AddTask, store, provider);
}
