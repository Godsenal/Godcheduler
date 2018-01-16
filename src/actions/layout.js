import {
  LAYOUT_CHANGE
} from './ActionTypes';

export function changeLayout(width, height){
  return {
    type: LAYOUT_CHANGE,
    width,
    height,
  }
}