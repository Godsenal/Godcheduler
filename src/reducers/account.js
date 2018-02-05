import { Map } from 'immutable';

import * as types from '../actions/ActionTypes';

const initialState = Map({
  isLoggedIn: false,
});
export default function account(state = initialState, action) {
  switch (action.type) {
    case types.ACCOUNT_LOGIN:
      return state.set('isLoggedIn', true);
    default:
      return state;
  }
}
