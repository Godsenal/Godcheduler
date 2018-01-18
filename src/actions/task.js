import {
  TASK_ADD,
  TASK_ADD_OPEN,
  TASK_ADD_CLOSE,
} from './ActionTypes';

export function addTask(description){
  let task = {
    description,
  };
  return {
    type: TASK_ADD,
    task
  }
}

export function openAddTask(){
  return {
    type: TASK_ADD_OPEN,
  }
}

export function closeAddTask(){
  return {
    type: TASK_ADD_CLOSE,
  }
}