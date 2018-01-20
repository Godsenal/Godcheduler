import * as types from '../actions/ActionTypes';
import { Map, List, fromJS } from 'immutable';

const initialState = Map({
  add: Map({
    modal: Map({
      open: false,
      taskType: 'default',
      data: Map({})
    })
  }),
  list: Map({
    tasks: Map({}),
    status: 'INIT',
  })
});

// Use update function when use previous state,
// if not, use set function
export default function task(state = initialState,action){
  switch (action.type) {
    case types.TASK_ADD:
      return state.updateIn(['list','tasks'],(val) => {
        if(val.has(action.task.category)){
          return val.set(action.task.category,val.get(action.task.category).push(Map({description: action.task.description})));
        }
        else{
          return val.set(action.task.category,List([Map({description: action.task.description})]))
        }
      })
      break;
    case types.TASK_ADD_OPEN:
      return state.setIn(['add','modal','open'],true)
                  .setIn(['add','modal','taskType'],action.taskType)
                  .setIn(['add','modal','data'],fromJS(action.data));
    case types.TASK_ADD_CLOSE:
      return state.setIn(['add','modal','open'],false)
                  .setIn(['add','modal','taskType'],'default')
                  .setIn(['add','modal','data'],fromJS());
    default:
      return state;
      break;
  }
}