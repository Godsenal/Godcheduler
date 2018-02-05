import { Map } from 'immutable';
import { Dimensions } from 'react-native';
import * as types from '../actions/ActionTypes';

const initialState = Map({
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
});

export default function layout(state = initialState, action) {
  switch (action.type) {
    case types.LAYOUT_CHANGE:
      return state.set('width', action.width).set('height', action.height);
    default:
      return state;
  }
}
