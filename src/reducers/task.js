import * as types from '../actions/ActionTypes';
import { Map, List, fromJS } from 'immutable';

const initialState = Map({
  add: Map({
    open: false,
  }),
  list: Map({
    tasks: List([]),
    status: 'INIT',
  })
});

// Use update function when use previous state,
// if not, use set function
export default function task(state = initialState,action){
  switch (action.type) {
    case types.TASK_ADD:
      return state.updateIn(['list','tasks'],arr => {
        arr.push(action.task.fromJS())
      })
      break;
    case types.TASK_ADD_OPEN:
      return state.setIn(['add','open'],true);
    case types.TASK_ADD_CLOSE:
      return state.setIn(['add','open'],false);
    default:
      return state;
      break;
  }
}