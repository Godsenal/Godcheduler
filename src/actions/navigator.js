import {
  NAVIGATOR_CHANGE
} from './ActionTypes';

export function changeNavigator(currentState){
  return {
    type: NAVIGATOR_CHANGE,
    currentState
  }
}