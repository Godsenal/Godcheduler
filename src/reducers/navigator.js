import * as types from '../actions/ActionTypes';
import { Map, List, fromJS } from 'immutable';

//Tab Navigator의 sub navigator인 tasklist navigator의 상태를 저장.
const initialState = Map({
  currentState: Map({})
});
export default function navigator(state = initialState,action){
  switch (action.type) {
    case types.NAVIGATOR_CHANGE:
      return state.set('currentState',fromJS(action.currentState));
      break;
    default:
      return state;
      break;
  }
}