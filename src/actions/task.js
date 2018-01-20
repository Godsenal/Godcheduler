import {
  TASK_ADD,
  TASK_ADD_OPEN,
  TASK_ADD_CLOSE,
} from './ActionTypes';

export function addTask(task){
  return {
    type: TASK_ADD,
    task
  }
}

export function openAddTask(taskType = 'default', data = {}){
  return {
    type: TASK_ADD_OPEN,
    taskType,
    data
  }
}

export function closeAddTask(){
  return {
    type: TASK_ADD_CLOSE,
  }
}