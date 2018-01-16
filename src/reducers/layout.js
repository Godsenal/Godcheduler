import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

import { Dimensions } from "react-native";

const initialState = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};
export default function layout(state,action){
  if(typeof state === 'undefined') {
    state = initialState;
  }

  switch (action.type) {
    case types.LAYOUT_CHANGE:
      return update(state, {
        width:{$set: action.width},
        height:{$set: action.height}
      })
      break;
    default:
      return state;
      break;
  }
}