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
    case types.TASK_ADD_TOGGLE:
      return state.updateIn(['add','open'],val => !val);
    default:
      return state;
      break;
  }
}