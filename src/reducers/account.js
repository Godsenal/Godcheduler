import * as types from '../actions/ActionTypes';
import { Map, List, fromJS } from 'immutable';


const initialState = Map({
  isLoggedIn: false,
});
export default function account(state = initialState,action){
  switch (action.type) {
    case types.ACCOUNT_LOGIN:
      return state.set('isLoggedIn',true);
      break;
    default:
      return state;
      break;
  }
}