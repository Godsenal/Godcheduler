import { combineReducers } from 'redux';
import task from './task';
import layout from './layout';
import account from './account';

const appReducers = combineReducers({
  task, layout, account,
});

const reducer = (state, action) => {
  if (action.type === 'AUTH_SIGNOUT') { // reducer가 이걸 거치게 만들어서 signout할 때 state를 모두 없애도록 함.
    state = undefined;
  }

  return appReducers(state, action);
};
export default reducer;
