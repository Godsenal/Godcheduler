import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  add: {
    open: false,
  },
  list: {
    tasks: [],
    status: 'INIT',
  },
};

export default function task(state,action){
  if(typeof state === 'undefined') {
    state = initialState;
  }

  switch (action.type) {
    case types.TASK_ADD:
      return update(state, {
        list:{
          tasks:{$push: [action.task]}
        }
      })
      break;
    case types.TASK_ADD_TOGGLE:
      return update(state, {
        add: {
          open: {$set: !state.add.open}
        }
      })
    default:
      return state;
      break;
  }
}