import {
  TASK_ADD,
  TASK_ADD_TOGGLE,
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

export function toggleAddTask(){
  return {
    type: TASK_ADD_TOGGLE,
  }
}