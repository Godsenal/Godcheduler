import { Map, List } from 'immutable';
import * as types from '../actions/ActionTypes';

const initialState = Map({
  add: Map({
    open: false,
  }),
  list: Map({
    tasks: List([]),
    status: 'INIT',
  }),
});

// Use update function when use previous state,
// if not, use set function
export default function task(state = initialState, action) {
  switch (action.type) {
    case types.TASK_ADD:
      return state.updateIn(['list', 'tasks'], (arr) => {
        arr.push(action.task.fromJS());
      });
    case types.TASK_ADD_OPEN:
      return state.setIn(['add', 'open'], true);
    case types.TASK_ADD_CLOSE:
      return state.setIn(['add', ' open'], false);
    default:
      return state;
  }
}
